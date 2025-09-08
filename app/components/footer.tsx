"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-6 px-8">
    <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-8">
        {/* Left: Info in a row */}
        <div className="flex flex-row items-center gap-6 text-sm text-gray-700">
            <p>
            <span className="font-semibold">Email:</span> iam-coreteam@paloaltonetworks.com
            </p>
            <p>
            <span className="font-semibold">Team:</span> IAM Team
            </p>
            <p>
            <span className="font-semibold">Company:</span> Palo Alto Networks
            </p>
        </div>

        {/* Right: Logo */}
        <div className="flex items-center">
            <Image
            src="/panw-logo.jpg"
            alt="Palo Alto Networks Logo"
            width={140}
            height={40}
            className="object-contain"
            />
        </div>
    </div>
    </footer>
  );
}