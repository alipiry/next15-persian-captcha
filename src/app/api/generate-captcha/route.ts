import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { persianCaptchaGenerator } from "persian-captcha-generator";
import { SessionData, sessionOptions } from "@/lib/iron-session";

const colorThemes = [
  { backgroundColor: "#FFFFFF", textColor: "#000000" },
  { backgroundColor: "#FFA500", textColor: "#000000" },
  { backgroundColor: "#FFF000", textColor: "#000000" },
  { backgroundColor: "#0000FF", textColor: "#FFFFFF" },
  { backgroundColor: "#228B22", textColor: "#FFFFFF" },
  { backgroundColor: "#8B008B", textColor: "#FFFFFF" },
  { backgroundColor: "#FF0000", textColor: "#FFFFFF" },
];

function getRandomColorTheme() {
  return colorThemes[Math.floor(Math.random() * colorThemes.length)];
}

export async function GET() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  const { backgroundColor, textColor } = getRandomColorTheme();

  const captcha = await persianCaptchaGenerator({
    length: 6,
    characterSet: "numbers",
    width: 300,
    height: 100,
    fontSize: 50,
    lineCount: 10,
    dotCount: 100,
    backgroundColor,
    textColor,
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
