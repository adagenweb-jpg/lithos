"use server";

export type ContatoState = { ok: boolean; mensagem: string } | null;

export async function enviarContato(_prev: ContatoState, formData: FormData): Promise<ContatoState> {
  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const assunto = String(formData.get("assunto") ?? "").trim();
  const mensagem = String(formData.get("mensagem") ?? "").trim();

  if (!nome || !email || !mensagem) {
    return { ok: false, mensagem: "Preencha nome, e-mail e mensagem." };
  }

  // TODO: enviar por e-mail (ex.: Resend/SMTP) ou salvar no banco do painel.
  console.info("[contato]", { nome, email, assunto, mensagem });

  return { ok: true, mensagem: "Mensagem enviada! Em breve entraremos em contato." };
}
