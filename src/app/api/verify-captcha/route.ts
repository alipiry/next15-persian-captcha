import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/iron-session";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const { input } = req;

  if (!input || !input.length) {
    return NextResponse.json(
      { message: "input is required" },
      {
        status: 400,
      }
    );
  }

  const { captchaValue } = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (captchaValue && captchaValue === input) {
    return NextResponse.json(
      {
        success: true,
        message: "verified",
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        success: false,
        message: "invalid",
      },
      { status: 400 }
    );
  }
}
