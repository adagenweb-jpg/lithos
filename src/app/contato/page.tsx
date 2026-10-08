import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contato" };

export default function ContatoPage() {
  return (
    <section className="grid gap-x-[3%] gap-y-12 px-gutter pt-12 pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,868px)] lg:pr-[10%] lg:pl-[18%] lg:pt-[120px] lg:pb-[100px]">
      {/* Linha 1: contatos + foto do escritório */}
      <div className="lg:pt-[23px]">
        <h1 className="text-[24px] leading-[32px] tracking-xd-100">Contato</h1>
        <ul className="mt-3 text-[14px] leading-[26px] tracking-xd-50">
          <li><a href={site.telefoneLink} className="hover:opacity-60">{site.telefone}</a></li>
          <li><a href={`mailto:${site.email}`} className="hover:opacity-60">{site.email}</a></li>
          <li>{site.endereco}</li>
        </ul>
      </div>
      <div className="relative aspect-[896/404] overflow-hidden bg-cinza-fundo">
        <Image
          src="/images/escritorio/escritorio-1.jpg"
          alt="Escritório Lithos"
          fill
          sizes="(min-width: 1024px) 896px, 100vw"
          className="object-cover"
        />
      </div>

      {/* Linha 2: chamada + formulário */}
      <p className="text-[24px] leading-[32px] lg:mt-[129px] lg:pr-8">
        Se você preferir, entre em contato através do formulário ao lado
      </p>
      <div className="lg:mt-[129px]">
        <ContactForm />
      </div>
    </section>
  );
}
