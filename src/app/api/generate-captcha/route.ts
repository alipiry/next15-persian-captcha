import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { persianCaptchaGenerator } from "persian-captcha-generator";
import { SessionData, sessionOptions } from "@/lib/iron-session";

export async function GET() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  const captcha = await persianCaptchaGenerator({ characterSet: "numbers" });

  session.captchaValue = captcha.text;
  await session.save();

  const imageBuffer = Buffer.from(captcha.imageBuffer);

  return new NextResponse(imageBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Content-Length": imageBuffer.length.toString(),
    },
  });
}
