/**
 * src/app/api/contact/route.ts
 * POST /api/contact — receives contact form submissions and sends an email via Resend.
 *
 * Prerequisites:
 *   bun add resend zod
 *   Set RESEND_API_KEY, CONTACT_RECEIVER_EMAIL, CONTACT_FROM_EMAIL in .env
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/resend";

// ── Validation schema ──────────────────────────────────────────────────────────
const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z
    .string()
    .email("Invalid email address")
    .max(254, "Email is too long"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject is too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long (max 5000 characters)"),
});

// ── Simple in-memory rate limiting (resets on server restart) ─────────────────
// For production, replace with Redis + @upstash/ratelimit
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;          // max submissions per window
const RATE_WINDOW_MS = 60_000; // 1 minute window

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true; // allowed
  }

  if (entry.count >= RATE_LIMIT) return false; // blocked

  entry.count++;
  return true; // allowed
}

// ── Handler ────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    // Parse + validate body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Invalid form data." },
        { status: 422 }
      );
    }

    // Send email
    await sendContactEmail(parsed.data);

    return NextResponse.json(
      { message: "Message sent successfully! I'll get back to you soon." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[contact/route] Error sending email:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

// Disable GET for this route
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
