"use client";

import { useState } from "react";

export default function Captcha() {
  const [captchaSrc, setCaptchaSrc] = useState("/api/generate-captcha");
  const [captchaValue, setCaptchaValue] = useState("");

  const [validated, setValidated] = useState("");

  const refreshCaptcha = () => {
    setCaptchaSrc(`/api/generate-captcha?timestamp=${Date.now()}`);
  };

  const handleCaptcha = async () => {
    const response = await fetch("/api/verify-captcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: convertToPersianDigits(captchaValue) }),
    });

    const data = await response.json();

    if (data.success) {
      setValidated(data.message);
    } else {
      setValidated(data.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <img src={captchaSrc} alt="captcha image" className="rounded-md" />
        <button
          type="button"
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          onClick={refreshCaptcha}
        >
          Refresh captcha
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors text-center bg-[#f2f2f2] dark:bg-[#1a1a1a] hover:bg-[#e6e6e6] dark:hover:bg-[#333] text-black dark:text-white placeholder-gray-500 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          value={captchaValue}
          onChange={(e) => {
            const value = e.target.value;
            setCaptchaValue(value);
          }}
        />

        <button
          type="button"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          onClick={handleCaptcha}
        >
          Validate
        </button>
      </div>
      {validated && (
        <span className="bg-gray-700 p-5 font-bold text-2xl rounded-md">
          {validated}
        </span>
      )}
    </div>
  );
}

const convertToPersianDigits = (input: string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return input.replace(/[0-9]/g, (char) => {
    const index = englishDigits.indexOf(char);
    return index > -1 ? persianDigits[index] : char;
  });
};
