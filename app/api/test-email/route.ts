import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

/**
 * Diagnostic test route to verify Zoho SMTP credentials on Vercel
 * Access via: GET /api/test-email
 */
export async function GET() {
  const hostEnv = process.env.ZOHO_MAIL_HOST || 'smtp.zoho.eu';
  const portEnv = parseInt(process.env.ZOHO_MAIL_PORT || '587', 10);
  const user = (process.env.ZOHO_MAIL_USER || 'contact@whiskeyeurope.org').trim();
  const pass = (process.env.ZOHO_MAIL_PASSWORD || 'BEOK@1991!').trim();
  const fromName = (process.env.ZOHO_MAIL_FROM_NAME || 'Whiskey Europe').replace(/^["']|["']$/g, '').trim();

  const candidateConfigs = [
    { host: hostEnv.trim(), port: 587, secure: false },
    { host: hostEnv.trim(), port: 465, secure: true },
    { host: 'smtppro.zoho.eu', port: 587, secure: false },
    { host: 'smtppro.zoho.eu', port: 465, secure: true },
    { host: 'smtp.zoho.eu', port: 587, secure: false },
    { host: 'smtp.zoho.eu', port: 465, secure: true },
    { host: 'smtppro.zoho.com', port: 587, secure: false },
    { host: 'smtp.zoho.com', port: 587, secure: false },
  ];

  // De-duplicate candidate configurations
  const uniqueConfigs = candidateConfigs.filter(
    (c, idx, arr) => arr.findIndex(x => x.host === c.host && x.port === c.port) === idx
  );

  const results: Array<{
    host: string;
    port: number;
    secure: boolean;
    verified: boolean;
    sentMail?: boolean;
    error?: string;
  }> = [];

  let successfullySent = false;
  let workingConfig = null;

  for (const cfg of uniqueConfigs) {
    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      requireTLS: !cfg.secure,
      auth: {
        user,
        pass,
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 12000,
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2',
      },
    });

    try {
      // 1. Test SMTP Handshake & Authentication
      await transporter.verify();

      // 2. Test sending actual ping email to contact@whiskeyeurope.org
      const info = await transporter.sendMail({
        from: {
          name: fromName,
          address: user,
        },
        to: user,
        subject: `[Vercel SMTP Test] Zoho Mail Connected successfully on ${cfg.host}:${cfg.port}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 8px;">
            <h2 style="color: #f59e0b; margin-top: 0;">Zoho Mail SMTP Verification Succeeded</h2>
            <p>Your Next.js store on Vercel is connected to Zoho Mail.</p>
            <table style="font-size: 14px; color: #cbd5e1; border-collapse: collapse; margin-top: 12px;">
              <tr><td style="padding: 4px 8px; font-weight: bold;">Host:</td><td>${cfg.host}</td></tr>
              <tr><td style="padding: 4px 8px; font-weight: bold;">Port:</td><td>${cfg.port} (${cfg.secure ? 'SSL' : 'STARTTLS'})</td></tr>
              <tr><td style="padding: 4px 8px; font-weight: bold;">User:</td><td>${user}</td></tr>
              <tr><td style="padding: 4px 8px; font-weight: bold;">Timestamp:</td><td>${new Date().toISOString()}</td></tr>
            </table>
          </div>
        `,
      });

      results.push({
        host: cfg.host,
        port: cfg.port,
        secure: cfg.secure,
        verified: true,
        sentMail: true,
      });

      successfullySent = true;
      workingConfig = cfg;
      break; // Stop after first successful send
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      results.push({
        host: cfg.host,
        port: cfg.port,
        secure: cfg.secure,
        verified: false,
        sentMail: false,
        error: errMsg,
      });
    }
  }

  return NextResponse.json({
    status: successfullySent ? 'SUCCESS' : 'FAILED',
    message: successfullySent
      ? `Successfully authenticated and dispatched test email to ${user} via ${workingConfig?.host}:${workingConfig?.port}`
      : 'All Zoho SMTP connection attempts failed. Check credentials and App Password in Zoho.',
    user,
    configuredHost: hostEnv,
    configuredPort: portEnv,
    attempts: results,
    troubleshooting: !successfullySent
      ? [
          'If you see "535 Authentication Failed", Zoho requires an Application-Specific Password if 2-Factor Authentication is enabled on contact@whiskeyeurope.org.',
          'To generate a Zoho App Password: Log into Zoho -> My Account -> Security -> App Passwords -> Generate New (Name: "Vercel Next.js") -> Copy the 16-character code into ZOHO_MAIL_PASSWORD in Vercel.',
          'Ensure SMTP Access is enabled: In Zoho Mail -> Settings -> Mail Accounts -> check that "SMTP Access" is toggled ON for contact@whiskeyeurope.org.',
        ]
      : [],
  });
}
