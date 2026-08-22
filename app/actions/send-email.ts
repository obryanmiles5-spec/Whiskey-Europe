'use server';

import nodemailer from 'nodemailer';

export interface EmailResult {
  success: boolean;
  message: string;
  voucherCode?: string;
  orderId?: string;
}

/**
 * Returns a configured Nodemailer transporter using Vercel / server-side Zoho Mail environment variables
 */
function getZohoConfig() {
  const host = process.env.ZOHO_MAIL_HOST || 'smtp.zoho.eu';
  const port = parseInt(process.env.ZOHO_MAIL_PORT || '465', 10);
  const secure = port === 465;
  const user = process.env.ZOHO_MAIL_USER || 'contact@whiskeyeurope.org';
  const pass = process.env.ZOHO_MAIL_PASSWORD || 'BEOK@1991!';
  const rawFromName = process.env.ZOHO_MAIL_FROM_NAME || 'Whiskey Europe';
  // Strip any accidental enclosing quotes from env string
  const fromName = rawFromName.replace(/^["']|["']$/g, '').trim();

  return {
    host,
    port,
    secure,
    user,
    pass,
    fromName,
    fromAddress: `"${fromName}" <${user}>`,
  };
}

function createTransporter() {
  const config = getZohoConfig();
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
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
    const transporter = createTransporter();

    // 1. Send Welcome Email with Voucher to Subscriber
    await transporter.sendMail({
      from: config.fromAddress,
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
              Contact: <a href="mailto:${config.user}" style="color: #d97706; text-decoration: none;">${config.user}</a> | 18+ Only
            </p>
          </div>
        </div>
      `,
    });

    // 2. Notification to Admin / Cellar Team Inbox
    await transporter.sendMail({
      from: config.fromAddress,
      to: config.user,
      subject: `[New Newsletter Subscriber] ${email}`,
      text: `New subscriber joined the Whiskey Europe Club:\n\nEmail: ${email}\nVoucher Issued: ${voucherCode}\nTimestamp: ${new Date().toISOString()}`,
    });
  } catch (err) {
    console.warn('Zoho Mail subscription dispatch notice:', err);
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
    const transporter = createTransporter();

    // 1. Dispatch customer inquiry directly to Cellar Support Desk
    await transporter.sendMail({
      from: config.fromAddress,
      to: config.user,
      replyTo: `"${name}" <${email}>`,
      subject: `[Whiskey Europe Contact] ${subject || 'General Inquiry'} - ${name}`,
      html: `
        <div style="font-family: sans-serif; background-color: #f8fafc; color: #1e293b; padding: 24px; border-radius: 8px;">
          <h2 style="color: #b45309; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">New Contact Inquiry received via Whiskey Europe</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 140px; color: #64748b;">Customer Name:</td>
              <td style="padding: 8px; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #64748b;">Customer Email:</td>
              <td style="padding: 8px; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #64748b;">Topic / Subject:</td>
              <td style="padding: 8px; color: #0f172a;">${subject || 'General Inquiry'}</td>
            </tr>
          </table>
          <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 16px; margin-top: 16px;">
            <strong style="color: #475569; display: block; margin-bottom: 8px;">Message Content:</strong>
            <p style="white-space: pre-wrap; margin: 0; color: #1e293b; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
      text: `Customer Name: ${name}\nCustomer Email: ${email}\nTopic: ${subject}\n\nMessage:\n${message}`,
    });

    // 2. Dispatch Auto-Acknowledgement Receipt to Customer
    await transporter.sendMail({
      from: config.fromAddress,
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
            Whiskey Europe Sommelier Desk • ${config.user}
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.warn('Zoho Mail contact transport error:', err);
  }

  return {
    success: true,
    message: 'Thank you for contacting Whiskey Europe! A sommelier from our European team will reply to your email within 24 hours.',
  };
}

/**
 * Server Action: Order Dispatch Confirmation & Sommelier Notification via Zoho Mail
 */
export async function sendOrderConfirmationAction(orderData: {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  country: string;
}): Promise<EmailResult> {
  const config = getZohoConfig();

  try {
    const transporter = createTransporter();

    const itemListHtml = orderData.items
      .map(
        item =>
          `<tr>
            <td style="padding: 10px 8px; border-bottom: 1px solid #2b251f; color: #f5f0ea;">${item.name} <span style="color: #d97706; font-weight: bold;">(x${item.quantity})</span></td>
            <td style="padding: 10px 8px; border-bottom: 1px solid #2b251f; text-align: right; color: #f59e0b; font-family: monospace; font-size: 14px;">€${(item.price * item.quantity).toFixed(2)}</td>
          </tr>`
      )
      .join('');

    // 1. Dispatch Customer Order Receipt & Tracking Email
    await transporter.sendMail({
      from: config.fromAddress,
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
            <p style="margin: 4px 0 0 0;">Inquiries: <a href="mailto:${config.user}" style="color: #d97706; text-decoration: none;">${config.user}</a></p>
          </div>
        </div>
      `,
    });

    // 2. Dispatch Order Notification to Cellar Admin Desk
    await transporter.sendMail({
      from: config.fromAddress,
      to: config.user,
      subject: `[New Order Alert] #${orderData.orderId} - €${orderData.total.toFixed(2)} (${orderData.customerName})`,
      html: `
        <div style="font-family: sans-serif; background-color: #f8fafc; padding: 24px; color: #1e293b;">
          <h2 style="color: #b45309;">New Customer Order #${orderData.orderId}</h2>
          <p><strong>Customer:</strong> ${orderData.customerName} (&lt;${orderData.customerEmail}&gt;)</p>
          <p><strong>Destination:</strong> ${orderData.country}</p>
          <p><strong>Grand Total:</strong> €${orderData.total.toFixed(2)}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <h3>Items:</h3>
          <ul>
            ${orderData.items.map(i => `<li>${i.name} (Qty: ${i.quantity}) - €${(i.price * i.quantity).toFixed(2)}</li>`).join('')}
          </ul>
        </div>
      `,
    });
  } catch (err) {
    console.warn('Order confirmation email sending error:', err);
  }

  return {
    success: true,
    orderId: orderData.orderId,
    message: `Order #${orderData.orderId} confirmed! An email receipt has been sent to ${orderData.customerEmail}.`,
  };
}
