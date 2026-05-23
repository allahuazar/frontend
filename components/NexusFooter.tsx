"use client";

const productLinks = ["Platform", "Documentation", "Pricing", "Changelog"];
const companyLinks = ["About", "Blog", "Careers", "Contact"];
const legalLinks = ["Privacy", "Terms", "Cookies"];

export default function NexusFooter() {
  return (
    <footer className="w-full border-t border-white/5 py-12 px-8">
      <div className="mx-auto max-w-6xl">
        {/* Top row */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:items-start">
          {/* Column 1 — Brand */}
          <div>
            <span className="text-lg font-semibold bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] bg-clip-text text-transparent">
              Nexus AI
            </span>
            <p className="mt-2 max-w-xs text-sm text-zinc-500">
              Pioneering the future of artificial intelligence.
            </p>
          </div>

          {/* Column 2 — Product */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-300">
              Product
            </h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-zinc-500 transition hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-300">
              Company
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-zinc-500 transition hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-600">
            © 2024 Nexus AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-zinc-600 transition hover:text-zinc-400"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
