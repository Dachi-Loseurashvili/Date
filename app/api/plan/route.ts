import { NextResponse } from "next/server";
import { validatePlanPayload } from "@/lib/plan";

const WEBHOOK_TIMEOUT_MS = 8000;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        configured: Boolean(process.env.DATE_PLAN_WEBHOOK_URL),
        error: "Invalid JSON body.",
        ok: false,
      },
      { status: 400 },
    );
  }

  const validation = validatePlanPayload(body);

  if (!validation.ok) {
    return NextResponse.json(
      {
        configured: Boolean(process.env.DATE_PLAN_WEBHOOK_URL),
        error: validation.error,
        ok: false,
      },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.DATE_PLAN_WEBHOOK_URL;

  if (!webhookUrl) {
    if (process.env.NODE_ENV === "development") {
      console.log("Date plan submitted:", validation.plan);
    }

    return NextResponse.json({
      configured: false,
      ok: true,
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      body: JSON.stringify(validation.plan),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      signal: controller.signal,
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          configured: true,
          error: `Webhook responded with ${response.status}.`,
          ok: false,
          status: response.status,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      configured: true,
      ok: true,
    });
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "Webhook request timed out."
        : "Webhook request failed.";

    return NextResponse.json(
      {
        configured: true,
        error: message,
        ok: false,
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
