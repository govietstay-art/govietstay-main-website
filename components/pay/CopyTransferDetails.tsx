"use client";

import { useState } from "react";

type Props = {
  beneficiary: string;
  accountNumber: string;
  amountVnd: number;
  reference: string;
};

export default function CopyTransferDetails({ beneficiary, accountNumber, amountVnd, reference }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyDetails() {
    const details = [
      "GoVietStay – Revolut / International bank transfer",
      "Recipient name: " + beneficiary,
      "Bank: MB Bank (Military Commercial Joint Stock Bank)",
      "Account number: " + accountNumber,
      "SWIFT/BIC: MSCBVNVX",
      "Address line 1: 01 Le Thanh Nghi Street",
      "Address line 2: (leave blank)",
      "Postcode: 50000",
      "City: Da Nang",
      "Region: Da Nang",
      "Country: Vietnam",
      "Currency: VND",
      "Amount: " + new Intl.NumberFormat("en-US").format(amountVnd) + " VND",
      "Transfer reference: " + reference,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(details);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="transferCopy">
      <button type="button" className="copyTransferButton" onClick={copyDetails}>
        {copied ? "Transfer details copied" : "Copy Revolut transfer details"}
      </button>
      <span className="copyNotice" role="status" aria-live="polite">
        {copied ? "Paste these details into your Revolut bank transfer." : ""}
      </span>
    </div>
  );
}
