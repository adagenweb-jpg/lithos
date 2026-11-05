// Camada de dados do site.
// Hoje lê mocks locais; quando o painel (CRUD) existir, só estas funções
// passam a consultar o banco — as páginas não precisam mudar.

import projetosJson from "@/data/projetos.json";
import type { CategoriaSlug, Parceiro, Projeto, Servico } from "./types";

// ---------------------------------------------------------------------------
// Textos institucionais (copy em PT-BR). Os textos de projetos são genéricos por
// categoria e serão substituídos pela descrição real cadastrada no painel.
// ---------------------------------------------------------------------------

const DESCRICAO_POR_CATEGORIA: Record<CategoriaSlug, (titulo: string) => string[]> = {
  residenciais: (t) => [
    `O projeto da residência ${t} parte da leitura atenta do terreno e da rotina da família. A implantação aproveita a melhor orientação solar e as vistas, criando uma casa aberta para a paisagem e, ao mesmo tempo, protegida onde é preciso.`,
    "Os espaços sociais se integram em um grande ambiente contínuo, que se estende para as varandas e a área externa. Os dormitórios ficam reservados em uma ala mais íntima, garantindo privacidade e conforto.",
    "Materiais naturais, grandes aberturas e uma volumetria limpa traduzem uma arquitetura contemporânea e atemporal, pensada para envelhecer bem no clima do litoral.",
  ],
  edificios: (t) => [
    `O edifício ${t} foi concebido para dialogar com a cidade e valorizar a vista de cada unidade. A volumetria e o ritmo das fachadas conferem leveza a um conjunto de presença marcante.`,
    "As plantas foram estudadas para oferecer ambientes amplos, bem iluminados e ventilados naturalmente, com varandas generosas que funcionam como extensão das salas.",
    "As áreas comuns foram pensadas como espaços de convivência de verdade, e o desenvolvimento integrado de arquitetura e engenharia garantiu uma obra eficiente, do estudo inicial à entrega.",
  ],
  condominios: (t) => [
    `O condomínio ${t} nasce de um masterplan que organiza lotes, vias e áreas verdes em harmonia com a topografia e a vegetação existentes.`,
    "A infraestrutura de lazer e convivência foi distribuída de forma a criar pontos de encontro ao longo de todo o empreendimento, aproximando moradores e paisagem.",
    "Diretrizes de projeto orientam a construção das residências, preservando a unidade do conjunto e a valorização do empreendimento ao longo do tempo.",
  ],
  comerciais: (t) => [
    `O projeto ${t} foi desenvolvido para fortalecer a identidade da marca e oferecer a melhor experiência para clientes e colaboradores.`,
    "A fachada ganha destaque na paisagem urbana, enquanto o interior prioriza fluxos claros, flexibilidade de uso e conforto térmico e acústico.",
    "Soluções construtivas racionais e a compatibilização entre todas as disciplinas permitiram uma obra ágil, com controle de prazos e de custos.",
  ],
  interiores: (t) => [
    `O projeto de interiores ${t} buscou traduzir a personalidade dos moradores em ambientes acolhedores, funcionais e cheios de luz natural.`,
    "Marcenaria sob medida, iluminação cuidadosamente planejada e uma paleta de materiais naturais criam unidade entre os espaços, do living aos dormitórios.",
    "Cada peça foi pensada para o uso cotidiano, equilibrando estética e praticidade em um resultado sofisticado e atemporal.",
  ],
};

/** Texto de abertura da página A Lithos. */
export const sobreIntro = [
  "A Lithos é um escritório de arquitetura e engenharia com sede em Torres, no litoral norte gaúcho. Desenvolvemos projetos residenciais, edifícios, condomínios, espaços comerciais e interiores — do primeiro estudo de viabilidade ao acompanhamento da obra.",
  "Acreditamos que a boa arquitetura nasce do diálogo entre o lugar, quem vai habitá-lo e quem vai construí-lo. Por isso, cada projeto começa pela escuta: entender o terreno, o clima, a legislação e, principalmente, as pessoas e os objetivos por trás de cada empreendimento.",
  "Reunir arquitetura e engenharia sob o mesmo teto nos permite pensar forma, técnica e custo ao mesmo tempo. O resultado são projetos bem resolvidos, que saem do papel com segurança e envelhecem bem.",
];

/** Texto após as fotos do escritório. */
export const sobreFechamento = [
  "Nosso trabalho é coletivo. Arquitetos, engenheiros e parceiros trocam ideias desde o início, e é desse cruzamento de olhares que surgem as soluções mais inteligentes para cada desafio.",
  "Mais do que entregar desenhos, buscamos ser parceiros de quem constrói: clientes, incorporadoras e construtoras que confiam à Lithos a tarefa de transformar uma ideia em lugar.",
];

export const sociosTexto =
  "À frente da Lithos, os sócios acompanham de perto cada projeto, unindo a visão do arquiteto ao rigor do engenheiro. É essa presença em todas as etapas que garante coerência entre a ideia inicial e a obra entregue.";

export const equipeTexto =
  "Nossa equipe reúne arquitetos, engenheiros e projetistas que trabalham lado a lado no mesmo estúdio. A proximidade entre as disciplinas torna o processo mais ágil, antecipa problemas e eleva a qualidade de cada entrega.";

const projetos: Projeto[] = (projetosJson as Omit<Projeto, "descricao">[]).map(
  (p) => {
    const categoria = p.categoria as CategoriaSlug;
    return { ...p, categoria, descricao: DESCRICAO_POR_CATEGORIA[categoria](p.titulo) };
  },
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
  {
    slug: "masterplan",
    titulo: "Masterplan",
    descricao: [
      "O masterplan é o plano que organiza um empreendimento como um todo, antes que qualquer edificação seja projetada em detalhe.",
      "Definimos a ocupação do terreno, os acessos, o sistema viário interno, as áreas verdes e de lazer e as etapas de implantação, garantindo que o conjunto cresça de forma coerente e valorizada ao longo do tempo.",
    ],
  },
  {
    slug: "urbanismo",
    titulo: "Urbanismo",
    descricao: [
      "Projetamos loteamentos e condomínios horizontais pensando na relação entre as pessoas, o espaço público e a paisagem.",
      "Desenvolvemos o parcelamento do solo, o desenho de vias e quadras, a infraestrutura e as áreas comuns, sempre de acordo com a legislação municipal e ambiental e com foco na qualidade de vida de quem vai morar ali.",
    ],
  },
  {
    slug: "arquitetura",
    titulo: "Arquitetura",
    descricao: [
      "Do anteprojeto ao projeto executivo, desenvolvemos residências, edifícios e espaços comerciais com atenção ao terreno, à orientação solar, à ventilação e ao modo de vida de cada cliente.",
      "Cada decisão de forma e de material é tomada pensando em conforto, durabilidade e viabilidade de execução, para que o projeto seja tão bom de construir quanto de habitar.",
    ],
  },
  {
    slug: "interiores-paisagismo-sinaletica",
    titulo: "Arquitetura de Interiores, Paisagismo e Sinalética",
    descricao: [
      "Os ambientes internos, os jardins e a comunicação visual completam a experiência de um projeto e precisam conversar com a arquitetura.",
      "Projetamos layouts, marcenaria, iluminação e acabamentos, desenhamos áreas externas com espécies adequadas ao clima do litoral e criamos a sinalização dos empreendimentos, garantindo uma identidade única do acesso ao último detalhe.",
    ],
  },
  {
    slug: "compatibilizacao",
    titulo: "Compatibilização de Projetos",
    descricao: [
      "Uma obra envolve diversas disciplinas — arquitetura, estrutura, instalações elétricas e hidrossanitárias, climatização — e todas precisam funcionar juntas.",
      "Na compatibilização, sobrepomos e analisamos todos os projetos para identificar e resolver conflitos ainda no papel. Isso evita retrabalho, reduz custos e imprevistos e torna a execução muito mais previsível.",
    ],
  },
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

export type Premio = { ano: number; titulo: string; descricao: string };

/**
 * Prêmios e reconhecimentos. Vazio até a Lithos enviar a lista real —
 * a seção "Prêmios" só aparece no site quando houver itens aqui.
 * Exemplo: { ano: 2023, titulo: "Nome do prêmio", descricao: "Categoria / resultado" }
 */
export const premios: Premio[] = [];
