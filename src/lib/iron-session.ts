import { SessionOptions } from "iron-session";

export interface SessionData {
  captchaValue: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || "",
  cookieName: "captcha",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
