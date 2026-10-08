// Camada de dados do site.
// Hoje lê mocks locais; quando o painel (CRUD) existir, só estas funções
// passam a consultar o banco — as páginas não precisam mudar.

import projetosJson from "@/data/projetos.json";
import type { CategoriaSlug, Parceiro, Projeto, Servico } from "./types";

const LOREM = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam est justo, cursus ac commodo rhoncus, bibendum ut nunc. Pellentesque sagittis fermentum dui, et convallis diam mattis vitae. Vivamus ac ultricies velit. Vestibulum et diam euismod, rhoncus lacus sed, vehicula arcu.",
  "Sed volutpat nisi non augue luctus, at vestibulum eros vestibulum. Sed finibus tortor vitae mollis rutrum. Nam dignissim eros justo, sit amet egestas erat consequat laoreet. Donec condimentum, magna molestie sollicitudin pretium, odio augue egestas metus, id pretium magna lorem ut massa.",
  "Morbi a aliquet diam, vitae bibendum lacus. Ut vel dapibus dui. Maecenas vestibulum mi ante, eu placerat nulla imperdiet quis. Nam at blandit purus. Proin tincidunt malesuada magna, id efficitur tellus iaculis nec. Maecenas ornare mi in enim vulputate ornare.",
];

const projetos: Projeto[] = (projetosJson as Omit<Projeto, "descricao">[]).map(
  (p) => ({ ...p, categoria: p.categoria as CategoriaSlug, descricao: LOREM }),
);

const parceiros: Parceiro[] = [
  { slug: "r-dimer", nome: "R Dimer" },
  { slug: "construtora-mar", nome: "Construtora Mar" },
  { slug: "incorporadora-sul", nome: "Incorporadora Sul" },
  { slug: "parceiro-4", nome: "Parceiro 4" },
  { slug: "parceiro-5", nome: "Parceiro 5" },
  { slug: "parceiro-6", nome: "Parceiro 6" },
  { slug: "parceiro-7", nome: "Parceiro 7" },
  { slug: "parceiro-8", nome: "Parceiro 8" },
].map((p, i) => ({
  ...p,
  logo: { src: `/images/parceiros/parceiro-${String(i + 1).padStart(2, "0")}.png`, width: 180, height: 180 },
  capa: projetos[(i * 3) % projetos.length].capa,
}));

const servicos: Servico[] = [
  {
    slug: "estudo-e-viabilidade",
    titulo: "Estudos de Viabilidade",
    descricao: [
      "Estudos de Viabilidade, ou Feasibility Studies, são o primeiro passo para o desenvolvimento do projeto de edificações.",
      "Analisamos a legislação pertinente para a concepção do produto imobiliário a ser desenvolvido, demonstrando o resultado pretendido através de estudo de massas, zoneamento e áreas, trazendo os primeiros indicadores financeiros do negócio.",
    ],
  },
  { slug: "masterplan", titulo: "Masterplan", descricao: LOREM.slice(0, 2) },
  { slug: "urbanismo", titulo: "Urbanismo", descricao: LOREM.slice(0, 2) },
  { slug: "arquitetura", titulo: "Arquitetura", descricao: LOREM.slice(0, 2) },
  {
    slug: "interiores-paisagismo-sinaletica",
    titulo: "Arquitetura de Interiores, Paisagismo e Sinalética",
    descricao: LOREM.slice(0, 2),
  },
  { slug: "compatibilizacao", titulo: "Compatibilização de Projetos", descricao: LOREM.slice(0, 2) },
].map((s, i) => ({
  ...s,
  imagem: { src: `/images/servicos/servico-${i + 1}.jpg`, width: 800, height: 800 },
}));

export async function getProjetos(categoria?: CategoriaSlug) {
  return categoria ? projetos.filter((p) => p.categoria === categoria) : projetos;
}

export async function getProjeto(slug: string) {
  return projetos.find((p) => p.slug === slug) ?? null;
}

export async function getProjetosDoParceiro(parceiroSlug: string) {
  return projetos.filter((p) => p.parceiroSlug === parceiroSlug);
}

export async function getParceiros() {
  return parceiros;
}

export async function getParceiro(slug: string) {
  return parceiros.find((p) => p.slug === slug) ?? null;
}

export async function getServicos() {
  return servicos;
}

export async function getServico(slug: string) {
  return servicos.find((s) => s.slug === slug) ?? null;
}

export const sobreTexto = LOREM;

export const premios = Array.from({ length: 6 }, () => ({
  ano: 2016,
  titulo: "University of Australia Innovation Quarter",
  descricao: "Shortlist (3 Finalist among 400 entries)",
}));
