"use client";
import { TOTP } from "otpauth";
import React, { useEffect, useState } from "react";
import { OtpData } from "@/lib/otp-parser";

interface AccountCardProps {
  account: OtpData;
}
const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const [token, setToken] = useState("----");
  const [timeLeft, setTimeLeft] = useState(30);
  const [buttonText, setButtonText] = useState("copy");
  useEffect(() => {
    const totp = new TOTP({
      issuer: account.issuer,
      label: account.label,
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: account.secret,
    });

    const updateToken = () => {
      setToken(totp.generate());
      const remaining =
        totp.period - (Math.floor(Date.now() / 1000) % totp.period);
      setTimeLeft;
      remaining;
    };
    updateToken(); // we call this now as to generate the first token
    const interval = setInterval(updateToken, 1000);
    return () => clearInterval(interval);
  }, [account]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setButtonText("Copied");
      setTimeout(() => setButtonText("Copy"), 2000);
    } catch (err) {
      console.error("failed to copy otp", err);
      setButtonText("failed");
      setTimeout(() => setButtonText("copy"), 2000);
    }
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shadow-xl mx-auto">
      <div className="flex justify-center items-center py-8 bg-base-200">
        <h1 className="text-5xl font-mono tracking-widest text-center">
          {token}
        </h1>
      </div>

      <div className="card-body">
        <h2 className="card-title">{account.issuer}</h2>
        <p>{account.label}</p>
        <div className="card-actions justify-end items-center mt-4">
          <div
            className="radial-progress text-primary"
            style={
              {
                "--value": (timeLeft / 30) * 100,
                "--size": "3rem",
              } as React.CSSProperties
            }
          >
            {timeLeft}
          </div>

          <button className="btn btn-primary" onClick={handleCopy}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
