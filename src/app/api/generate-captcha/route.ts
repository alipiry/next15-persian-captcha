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
  const captcha = await persianCaptchaGenerator({
    length: 6,
    characterSet: "numbers",
    width: 300,
    height: 100,
    fontSize: 50,
    lineCount: 10,
    dotCount: 100,
    textColor: "#000000",
    backgroundColor: "#f8f9fa",
  });

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
