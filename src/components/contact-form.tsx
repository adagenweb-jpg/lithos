"use client";

import { useActionState } from "react";
import { enviarContato, type ContatoState } from "@/app/contato/actions";

const campo =
  "w-full border border-preto bg-branco px-3 text-[18px] leading-[32px] placeholder:text-preto focus:outline-none focus:ring-1 focus:ring-preto";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContatoState, FormData>(enviarContato, null);

  return (
    <form action={action} className="flex flex-col gap-[43px]">
      <label className="sr-only" htmlFor="nome">Nome</label>
      <input id="nome" name="nome" placeholder="Nome" required className={`${campo} h-[35px]`} />

      <label className="sr-only" htmlFor="email">E-mail</label>
      <input id="email" name="email" type="email" placeholder="E-mail" required className={`${campo} h-[35px]`} />

      <label className="sr-only" htmlFor="assunto">Assunto</label>
      <input id="assunto" name="assunto" placeholder="Assunto" className={`${campo} h-[35px]`} />

      <label className="sr-only" htmlFor="mensagem">Mensagem</label>
      <textarea id="mensagem" name="mensagem" placeholder="Mensagem" required rows={4} className={`${campo} h-[137px] resize-none py-1`} />

      <div className="-mt-[29px] flex items-center justify-end gap-6">
        {state && (
          <p role="status" className={`text-[14px] ${state.ok ? "text-preto" : "text-red-700"}`}>
            {state.mensagem}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="h-[31px] w-[107px] bg-preto text-[18px] leading-none text-branco transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {pending ? "Enviando…" : "Enviar"}
        </button>
      </div>
    </form>
  );
}
