import { site } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-preto text-cinza-claro">
      <div className="px-gutter-lg pt-20 pb-16 md:pt-[145px] md:pb-[120px]">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[560px]">
            <Image
              src="/brand/logo-branco.png"
              alt="Lithos"
              width={828}
              height={265}
              className="h-[39px] w-auto"
            />
            <p className="mt-14 text-[14px] leading-[26px]">{site.rodapeTexto}</p>
          </div>

          <address className="not-italic md:text-right">
            <p className="text-[14px] font-medium uppercase leading-[26px] tracking-xd-200">
              Entre em contato
            </p>
            <ul className="mt-8 text-[14px] leading-[26px] tracking-xd-50">
              <li>
                <a href={site.telefoneLink} className="hover:text-branco">
                  {site.telefone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-branco">
                  {site.email}
                </a>
              </li>
              <li>{site.endereco}</li>
            </ul>
          </address>
        </div>

        <hr className="mt-12 border-cinza-claro" />

        <p className="mt-12 text-[14px] font-medium leading-[26px] text-branco">
          Desenvolvido por{" "}
          <Link href={site.credito.url} target="_blank" className="hover:underline">
            {site.credito.nome}
          </Link>
        </p>
      </div>
    </footer>
  );
}
