"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navegacao } from "@/lib/site";

function isAtivo(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-branco">
      <div className="flex h-[94px] items-center justify-between px-gutter">
        <Link href="/" aria-label="Lithos - página inicial" className="shrink-0">
          <Image
            src="/brand/logo-preto.png"
            alt="Lithos Arquitetura & Engenharia"
            width={828}
            height={265}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {navegacao.map((item) => {
              const ativo = isAtivo(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={ativo ? "page" : undefined}
                    className={`nav-link transition-opacity hover:opacity-60 ${ativo ? "font-bold" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
        >
          <span className="block h-px w-6 bg-preto" />
          <span className="mt-1.5 block h-px w-6 bg-preto" />
          <span className="mt-1.5 block h-px w-6 bg-preto" />
        </button>
      </div>

      {aberto && (
        <nav aria-label="Principal (mobile)" className="border-t border-cinza-fundo md:hidden">
          <ul className="flex flex-col px-gutter py-4">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className={`nav-link block py-3 ${isAtivo(pathname, item.href) ? "font-bold" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
