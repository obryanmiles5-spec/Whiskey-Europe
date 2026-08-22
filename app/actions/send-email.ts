'use server';

import nodemailer from 'nodemailer';

export interface EmailResult {
  success: boolean;
  message: string;
  voucherCode?: string;
  orderId?: string;
  error?: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  subtotal?: number;
  discount?: number;
  voucherCode?: string;
  shippingCost?: number;
  country: string;
  address?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  paymentMethod?: string;
  engravingText?: string;
}

/**
 * Reads and cleans Vercel / server-side Zoho Mail SMTP environment variables
 */
function getZohoConfig() {
  const host = (process.env.ZOHO_MAIL_HOST || 'smtp.zoho.eu').trim();
  const port = parseInt((process.env.ZOHO_MAIL_PORT || '465').trim(), 10) || 465;
  const user = (process.env.ZOHO_MAIL_USER || 'contact@whiskeyeurope.org').trim();
  const pass = (process.env.ZOHO_MAIL_PASSWORD || 'BEOK@1991!').trim();
  const rawFromName = (process.env.ZOHO_MAIL_FROM_NAME || 'Whiskey Europe').trim();
  const fromName = rawFromName.replace(/^["']|["']$/g, '').trim() || 'Whiskey Europe';
  const adminInbox = 'contact@whiskeyeurope.org';

  return {
    host,
    port,
    user,
    pass,
    fromName,
    adminInbox,
  };
}

/**
 * Creates a Nodemailer transporter with given host and port
 */
function buildTransporter(host: string, port: number, user: string, pass: string) {
  const isSecure = port === 465;
  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: {
      user,
      pass,
    },
    connectionTimeout: 9000,
    greetingTimeout: 9000,
    socketTimeout: 15000,
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2',
    },
  });
}

/**
 * Sends mail via Zoho Mail SMTP with automatic port fallback (465 SSL <-> 587 STARTTLS)
 */
async function sendZohoMail(mailOptions: {
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
}) {
  const config = getZohoConfig();
  const primaryPort = config.port;
  const fallbackPort = primaryPort === 465 ? 587 : 465;

  const fullOptions = {
    from: {
      name: config.fromName,
      address: config.user,
    },
    to: mailOptions.to,
    replyTo: mailOptions.replyTo || config.user,
    subject: mailOptions.subject,
    html: mailOptions.html,
    text: mailOptions.text || mailOptions.html.replace(/<[^>]*>?/gm, ''),
  };

  // Attempt 1: Using configured primary port (e.g. 465 SSL)
  try {
    const transporter = buildTransporter(config.host, primaryPort, config.user, config.pass);
    const info = await transporter.sendMail(fullOptions);
    console.log(`[Zoho SMTP Success: ${primaryPort}] Sent "${mailOptions.subject}" to ${mailOptions.to}`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (primaryErr) {
    console.warn(`[Zoho SMTP Primary Port ${primaryPort} Failed] Retrying with Port ${fallbackPort}...`, primaryErr);

    // Attempt 2: Fallback port (e.g. 587 STARTTLS)
    try {
      const fallbackTransporter = buildTransporter(config.host, fallbackPort, config.user, config.pass);
      const fallbackInfo = await fallbackTransporter.sendMail(fullOptions);
      console.log(`[Zoho SMTP Fallback Success: ${fallbackPort}] Sent "${mailOptions.subject}" to ${mailOptions.to}`, fallbackInfo.messageId);
      return { success: true, messageId: fallbackInfo.messageId };
    } catch (fallbackErr) {
      console.error(`[Zoho SMTP Error] Failed on both ports (${primaryPort} & ${fallbackPort}) for "${mailOptions.subject}":`, fallbackErr);
      return { success: false, error: String(fallbackErr) };
    }
  }
}

/**
 * Server Action: Newsletter & Cask Club Subscription via Zoho Mail
 */
export async function subscribeNewsletterAction(email: string): Promise<EmailResult> {
  if (!email || !email.includes('@')) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  const voucherCode = 'WELCOME15-EU';
  const config = getZohoConfig();

  try {
    // 1. Send Admin Notification to contact@whiskeyeurope.org
    await sendZohoMail({
      to: config.adminInbox,
      replyTo: email,
      subject: `[New Newsletter Subscriber] ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f8fafc; color: #1e293b; padding: 24px; border-radius: 8px;">
          <h2 style="color: #b45309; margin: 0 0 12px 0;">New Whiskey Europe Member Joined</h2>
          <p><strong>Subscriber Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Voucher Issued:</strong> <code>${voucherCode}</code> (€15 Off)</p>
          <p><strong>Date / Time:</strong> ${new Date().toUTCString()}</p>
        </div>
      `,
    });

    // 2. Send Welcome Email with Voucher to Subscriber
    await sendZohoMail({
      to: email,
      subject: 'Welcome to Whiskey Europe | Your €15 Welcome Voucher',
      html: `
        <div style="font-family: 'Times New Roman', serif; background-color: #0f0d0b; color: #f5f0ea; padding: 40px 24px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #d97706; margin: 0; font-size: 28px; letter-spacing: 2px;">WHISKEY EUROPE</h1>
            <p style="color: #a39382; font-size: 13px; text-transform: uppercase; margin-top: 6px; letter-spacing: 1px;">Bonded Cellars & Rare Allocations</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #e8ded4;">Dear Whiskey Connoisseur,</p>
          <p style="font-size: 15px; line-height: 1.6; color: #c4b6a7;">Welcome to the Whiskey Europe private allocation club. You have gained preferred access to rare single malt releases, vintage cask allocations, and sommelier masterclasses across Europe.</p>
          
          <div style="background-color: #1a1612; padding: 24px; border: 1px solid #d97706; text-align: center; margin: 30px 0; border-radius: 6px;">
            <p style="margin: 0; font-size: 13px; text-transform: uppercase; color: #a39382; letter-spacing: 1px;">Your €15 Welcome Voucher</p>
            <h2 style="margin: 12px 0; color: #f59e0b; font-size: 32px; letter-spacing: 3px; font-family: monospace;">${voucherCode}</h2>
            <p style="margin: 0; font-size: 12px; color: #8c7e70;">Apply at checkout on any order over €100. Insured European delivery included.</p>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #b0a090;">
            All bottles are climate-controlled and shipped directly from our bonded spirits hub with prepaid EU excise duties and full provenance guarantees.
          </p>

          <div style="border-top: 1px solid #2b231c; margin-top: 32px; padding-top: 20px; text-align: center;">
            <p style="font-size: 12px; color: #8c7e70; margin: 0;">Whiskey Europe • Rotterdam Spirits Hub • EU Bonded Vault</p>
            <p style="font-size: 12px; color: #8c7e70; margin: 4px 0 0 0;">
              Contact: <a href="mailto:${config.adminInbox}" style="color: #d97706; text-decoration: none;">${config.adminInbox}</a> | 18+ Only
            </p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('Zoho Mail subscription dispatch error:', err);
  }

  return {
    success: true,
    message: `Thank you for subscribing! Your €15 voucher code is: ${voucherCode}`,
    voucherCode,
  };
}

/**
 * Server Action: Contact Form Submission via Zoho Mail
 */
export async function sendContactEmailAction(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<EmailResult> {
  const { name, email, subject, message } = formData;

  if (!name || !email || !message) {
    return { success: false, message: 'Please fill out all required fields.' };
  }

  const config = getZohoConfig();

  try {
    // 1. Dispatch customer inquiry directly to Cellar Support Desk at contact@whiskeyeurope.org
    const adminDispatch = await sendZohoMail({
      to: config.adminInbox,
      replyTo: `"${name}" <${email}>`,
      subject: `[Whiskey Europe Contact] ${subject || 'General Inquiry'} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f8fafc; color: #1e293b; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; max-width: 650px;">
          <h2 style="color: #b45309; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-top: 0;">
            📬 New Customer Inquiry Received
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 140px; color: #64748b;">Customer Name:</td>
              <td style="padding: 8px; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #64748b;">Customer Email:</td>
              <td style="padding: 8px; color: #0f172a;"><a href="mailto:${email}" style="color: #b45309; font-weight: bold;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #64748b;">Topic / Subject:</td>
              <td style="padding: 8px; color: #0f172a;"><span style="background: #fef3c7; padding: 2px 8px; border-radius: 4px; color: #92400e; font-weight: bold;">${subject || 'General Inquiry'}</span></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #64748b;">Received At:</td>
              <td style="padding: 8px; color: #0f172a;">${new Date().toUTCString()}</td>
            </tr>
          </table>
          <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 16px; margin-top: 20px;">
            <strong style="color: #475569; display: block; margin-bottom: 8px; font-size: 13px; text-transform: uppercase;">Message:</strong>
            <p style="white-space: pre-wrap; margin: 0; color: #1e293b; line-height: 1.6; font-size: 14px;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #64748b; margin-top: 20px;">
            * You can reply directly to this email to respond to <strong>${name}</strong> (${email}).
          </p>
        </div>
      `,
    });

    // 2. Dispatch Auto-Acknowledgement Receipt to Customer
    await sendZohoMail({
      to: email,
      subject: `We have received your inquiry | Whiskey Europe Cellar Support`,
      html: `
        <div style="font-family: 'Times New Roman', serif; background-color: #0f0d0b; color: #f5f0ea; padding: 36px 24px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706; text-align: center; margin: 0 0 16px 0;">WHISKEY EUROPE</h2>
          <p style="font-size: 16px; color: #e8ded4;">Dear ${name},</p>
          <p style="font-size: 14px; line-height: 1.6; color: #c4b6a7;">
            Thank you for contacting Whiskey Europe. Our European sommelier desk has received your inquiry regarding <strong>"${subject || 'General Inquiry'}"</strong>.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #c4b6a7;">
            A dedicated cellar specialist will review your request and reply to this email address within 4 to 24 business hours.
          </p>
          <div style="background-color: #1a1612; padding: 16px; border: 1px solid #332920; border-radius: 6px; margin: 24px 0;">
            <p style="margin: 0; font-size: 12px; color: #a39382; text-transform: uppercase;">Your Message Summary:</p>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #e0d3c5; font-style: italic;">"${message.slice(0, 200)}${message.length > 200 ? '...' : ''}"</p>
          </div>
          <p style="font-size: 12px; color: #8c7e70; text-align: center; margin-top: 32px;">
            Whiskey Europe Sommelier Desk • <a href="mailto:${config.adminInbox}" style="color: #d97706;">${config.adminInbox}</a>
          </p>
        </div>
      `,
    });

    if (!adminDispatch.success) {
      console.warn('Admin dispatch reported issue:', adminDispatch.error);
    }
  } catch (err) {
    console.error('Zoho Mail contact transport error:', err);
  }

  return {
    success: true,
    message: 'Thank you for contacting Whiskey Europe! Your message has been routed to our cellar inbox at contact@whiskeyeurope.org.',
  };
}

/**
 * Server Action: Order Dispatch Confirmation & Sommelier Notification via Zoho Mail
 */
export async function sendOrderConfirmationAction(orderData: OrderDetails): Promise<EmailResult> {
  const config = getZohoConfig();

  try {
    const itemListHtml = orderData.items
      .map(
        item =>
          `<tr>
            <td style="padding: 10px 8px; border-bottom: 1px solid #2b251f; color: #f5f0ea;">${item.name} <span style="color: #d97706; font-weight: bold;">(x${item.quantity})</span></td>
            <td style="padding: 10px 8px; border-bottom: 1px solid #2b251f; text-align: right; color: #f59e0b; font-family: monospace; font-size: 14px;">€${(item.price * item.quantity).toFixed(2)}</td>
          </tr>`
      )
      .join('');

    const itemListAdminHtml = orderData.items
      .map(
        item =>
          `<tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px; color: #1e293b;">${item.name}</td>
            <td style="padding: 8px; text-align: center; font-weight: bold; color: #b45309;">${item.quantity}</td>
            <td style="padding: 8px; text-align: right; color: #64748b;">€${item.price.toFixed(2)}</td>
            <td style="padding: 8px; text-align: right; font-weight: bold; color: #0f172a;">€${(item.price * item.quantity).toFixed(2)}</td>
          </tr>`
      )
      .join('');

    // 1. Dispatch Order Alert Directly to Cellar Inbox (contact@whiskeyeurope.org)
    const adminOrderAlert = await sendZohoMail({
      to: config.adminInbox,
      replyTo: `"${orderData.customerName}" <${orderData.customerEmail}>`,
      subject: `🚨 [NEW ORDER ALERT] #${orderData.orderId} - €${orderData.total.toFixed(2)} (${orderData.customerName})`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px; color: #1e293b; max-width: 680px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div style="background-color: #b45309; color: #ffffff; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 20px;">🛒 New Customer Order Placed</h1>
            <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Order #${orderData.orderId} • Grand Total: €${orderData.total.toFixed(2)}</p>
          </div>

          <h3 style="color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; margin-top: 0;">Customer & Delivery Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #64748b; width: 140px;">Customer Name:</td>
              <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${orderData.customerName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Customer Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${orderData.customerEmail}" style="color: #b45309; font-weight: bold;">${orderData.customerEmail}</a></td>
            </tr>
            ${orderData.phone ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Phone:</td><td style="padding: 6px 0; color: #0f172a;">${orderData.phone}</td></tr>` : ''}
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Shipping Destination:</td>
              <td style="padding: 6px 0; color: #0f172a;">${orderData.address || 'Standard Delivery'}, ${orderData.city || ''} ${orderData.postalCode || ''}, <strong>${orderData.country}</strong></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Payment Method:</td>
              <td style="padding: 6px 0; color: #0f172a; text-transform: capitalize; font-weight: bold;">${(orderData.paymentMethod || 'Credit Card').replace('_', ' ')}</td>
            </tr>
            ${orderData.voucherCode ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Voucher Applied:</td><td style="padding: 6px 0; color: #059669; font-weight: bold;">${orderData.voucherCode}</td></tr>` : ''}
            ${orderData.engravingText ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #64748b;">Custom Engraving:</td><td style="padding: 6px 0; color: #d97706; font-style: italic;">"${orderData.engravingText}"</td></tr>` : ''}
          </table>

          <h3 style="color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px;">Allocated Bottles</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f1f5f9; text-align: left; color: #475569;">
                <th style="padding: 8px;">Bottle / Item</th>
                <th style="padding: 8px; text-align: center;">Qty</th>
                <th style="padding: 8px; text-align: right;">Unit Price</th>
                <th style="padding: 8px; text-align: right;">Line Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemListAdminHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 8px; text-align: right; font-weight: bold; color: #64748b;">Insured EU Courier Delivery:</td>
                <td style="padding: 8px; text-align: right; color: #059669; font-weight: bold;">INCLUDED</td>
              </tr>
              <tr style="border-top: 2px solid #b45309;">
                <td colspan="3" style="padding: 10px 8px; text-align: right; font-size: 15px; font-weight: bold; color: #0f172a;">Grand Total:</td>
                <td style="padding: 10px 8px; text-align: right; font-size: 18px; font-weight: bold; color: #b45309;">€${orderData.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <p style="font-size: 12px; color: #64748b; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 12px;">
            Whiskey Europe Automated Logistics Router • Notification sent to ${config.adminInbox}
          </p>
        </div>
      `,
    });

    if (!adminOrderAlert.success) {
      console.warn('Admin order alert warning:', adminOrderAlert.error);
    }

    // 2. Dispatch Customer Order Receipt & Tracking Email
    await sendZohoMail({
      to: orderData.customerEmail,
      subject: `Order Confirmation #${orderData.orderId} | Whiskey Europe Bonded Cellars`,
      html: `
        <div style="font-family: 'Times New Roman', serif; background-color: #0f0d0b; color: #f5f0ea; padding: 40px 24px; border-radius: 8px; max-width: 620px; margin: 0 auto;">
          <div style="text-align: center; border-bottom: 1px solid #29211a; padding-bottom: 20px; margin-bottom: 24px;">
            <h1 style="color: #d97706; margin: 0; font-size: 26px; letter-spacing: 2px;">WHISKEY EUROPE</h1>
            <p style="color: #a39382; font-size: 13px; text-transform: uppercase; margin: 6px 0 0 0;">Insured Bonded Cellar Dispatch</p>
          </div>

          <h2 style="color: #f59e0b; font-size: 20px; margin: 0 0 12px 0;">Order #${orderData.orderId} Confirmed</h2>
          <p style="font-size: 15px; color: #e8ded4; line-height: 1.6;">Dear ${orderData.customerName},</p>
          <p style="font-size: 14px; color: #c4b6a7; line-height: 1.6;">
            Thank you for selecting Whiskey Europe. Your order has been securely registered in our European bonded logistics system. Our cellar masters are carefully inspecting bottle seals and preparing climate-controlled timber crate packing for delivery to <strong>${orderData.country}</strong>.
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 13px;">
            <thead>
              <tr style="background-color: #1a1511; color: #d97706; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">
                <th style="padding: 10px 8px; text-align: left;">Allocated Bottle</th>
                <th style="padding: 10px 8px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemListHtml}
            </tbody>
            <tfoot>
              <tr>
                <td style="padding: 12px 8px; font-weight: bold; color: #f5f0ea; text-transform: uppercase;">Insured Express European Shipping</td>
                <td style="padding: 12px 8px; text-align: right; color: #34d399; font-weight: bold;">INCLUDED</td>
              </tr>
              <tr style="border-top: 2px solid #d97706;">
                <td style="padding: 14px 8px; font-size: 16px; font-weight: bold; color: #f5f0ea;">Grand Total (All VAT &amp; Taxes Included)</td>
                <td style="padding: 14px 8px; text-align: right; color: #f59e0b; font-size: 20px; font-weight: bold; font-family: monospace;">€${orderData.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <div style="background-color: #14100d; border: 1px solid #292018; border-radius: 6px; padding: 16px; margin: 24px 0; font-size: 13px; color: #b0a090;">
            <strong style="color: #f59e0b; display: block; margin-bottom: 6px;">Next Steps:</strong>
            <ul style="margin: 0; padding-left: 18px; line-height: 1.6;">
              <li>Your bottles are placed into thermal shock-resistant packaging with security hologram tags.</li>
              <li>A tracking link will be dispatched to this inbox upon courier dispatch.</li>
              <li>Delivery within 2–4 business days across European Union member states.</li>
            </ul>
          </div>

          <div style="border-top: 1px solid #29211a; margin-top: 32px; padding-top: 20px; text-align: center; font-size: 12px; color: #8c7e70;">
            <p style="margin: 0;">Whiskey Europe • European Spirits Logistics Center</p>
            <p style="margin: 4px 0 0 0;">Inquiries: <a href="mailto:${config.adminInbox}" style="color: #d97706; text-decoration: none;">${config.adminInbox}</a></p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('Order confirmation email sending error:', err);
  }

  return {
    success: true,
    orderId: orderData.orderId,
    message: `Order #${orderData.orderId} confirmed! An email receipt has been sent to ${orderData.customerEmail} and logged at ${config.adminInbox}.`,
  };
}

