/**
 * lib/resend.ts
 * Thin wrapper around Resend for sending emails.
 * Install: bun add resend
 */

import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY in environment variables.");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const { name, email, subject, message } = payload;

  const receiver = process.env.CONTACT_RECEIVER_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <noreply@yourdomain.com>";

  if (!receiver) {
    throw new Error("Missing CONTACT_RECEIVER_EMAIL in environment variables.");
  }

  return resend.emails.send({
    from,
    to: receiver,
    replyTo: email,
    subject: `[Portfolio Contact] ${subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">New message from your portfolio</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 80px; color: #555;">Name</td>
            <td style="padding: 8px 0;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject</td>
            <td style="padding: 8px 0;">${escapeHtml(subject)}</td>
          </tr>
        </table>
        <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e5e5;" />
        <p style="white-space: pre-wrap; line-height: 1.6; color: #333;">${escapeHtml(message)}</p>
      </div>
    `,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
  });
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
