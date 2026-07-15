import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, ShieldCheck, Clock, MessageCircle, Sparkles, Star, ShoppingBag, X } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Método Fita Premium — Confeccione Mega Hair de Fita" },
      { name: "description", content: "Aprenda a confeccionar mega hair de fita com acabamento de salão. Sem aplicar em ninguém. R$37,90 hoje." },
      { property: "og:title", content: "Método Fita Premium — Mega Hair de Fita" },
      { property: "og:description", content: "Confeccione com fixação forte e acabamento profissional. Método + 2 bônus." },
      { property: "og:image", content: "https://i.postimg.cc/R0NsqjS7/img-produto.png" },
    ],
  }),
  component: Index,
});

const CHECKOUT = "https://pay.wiapy.com/5nLlQXOSsjui";
const BASIC_CHECKOUT = "https://pay.wiapy.com/PjXIN-5dNVg";
const UPSELL_CHECKOUT = "https://pay.wiapy.com/RfJk3OjtB3f";

function scrollToOferta(e: React.MouseEvent) {
  e.preventDefault();
  const el = typeof document !== "undefined" ? document.getElementById("oferta") : null;
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CTA({
  children = "Quero adquirir com valor promocional",
  className = "",
  checkout = false,
}: {
  children?: React.ReactNode;
  className?: string;
  checkout?: boolean;
}) {
  return (
    <a
      href={checkout ? CHECKOUT : "#oferta"}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-green px-6 py-4 text-base font-bold uppercase tracking-wide text-primary-foreground shadow-green animate-pulse-green transition hover:brightness-110 sm:text-lg ${className}`}
      onClick={(e) => {
        if (checkout) {
          if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq("track", "InitiateCheckout");
          }
        } else {
          scrollToOferta(e);
        }
      }}
    >
      <Sparkles className="h-5 w-5 shrink-0" />
      <span>{children}</span>
    </a>
  );
}

const BUYER_NAMES = [
  "Mariana", "Juliana", "Patrícia", "Camila", "Beatriz", "Larissa", "Fernanda", "Aline",
  "Carolina", "Bruna", "Renata", "Tatiane", "Vanessa", "Letícia", "Gabriela", "Amanda",
  "Priscila", "Daniele", "Sabrina", "Roberta", "Eliane", "Jéssica", "Natália", "Luana",
];
const BR_STATES = [
  "SP", "RJ", "MG", "BA", "RS", "PR", "PE", "CE", "SC", "GO", "PA", "MA", "ES", "PB",
  "DF", "AM", "MT", "MS", "RN", "AL", "PI", "SE", "TO", "RO", "AC", "AP", "RR",
];
const STATE_CITIES: Record<string, string[]> = {
  SP: ["São Paulo", "Campinas", "Santos", "Guarulhos"],
  RJ: ["Rio de Janeiro", "Niterói", "Petrópolis"],
  MG: ["Belo Horizonte", "Uberlândia", "Juiz de Fora"],
  BA: ["Salvador", "Feira de Santana", "Ilhéus"],
  RS: ["Porto Alegre", "Caxias do Sul"],
  PR: ["Curitiba", "Londrina", "Maringá"],
  PE: ["Recife", "Olinda", "Caruaru"],
  CE: ["Fortaleza", "Sobral"],
  SC: ["Florianópolis", "Joinville", "Blumenau"],
  GO: ["Goiânia", "Anápolis"],
  PA: ["Belém", "Santarém"],
  MA: ["São Luís"],
  ES: ["Vitória", "Vila Velha"],
  PB: ["João Pessoa", "Campina Grande"],
  DF: ["Brasília"],
  AM: ["Manaus"],
  MT: ["Cuiabá"],
  MS: ["Campo Grande"],
  RN: ["Natal"],
  AL: ["Maceió"],
  PI: ["Teresina"],
  SE: ["Aracaju"],
  TO: ["Palmas"],
  RO: ["Porto Velho"],
  AC: ["Rio Branco"],
  AP: ["Macapá"],
  RR: ["Boa Vista"],
};

function PurchaseNotifications() {
  const [notif, setNotif] = useState<{ id: number; name: string; city: string; uf: string; mins: number } | null>(null);

  useEffect(() => {
    let id = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const show = () => {
      const name = BUYER_NAMES[Math.floor(Math.random() * BUYER_NAMES.length)];
      const uf = BR_STATES[Math.floor(Math.random() * BR_STATES.length)];
      const cities = STATE_CITIES[uf] || [uf];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const mins = Math.floor(Math.random() * 14) + 1;
      id += 1;
      setNotif({ id, name, city, uf, mins });
      timeoutId = setTimeout(() => {
        setNotif(null);
        timeoutId = setTimeout(show, 4000 + Math.random() * 4000);
      }, 5000);
    };

    const initial = setTimeout(show, 3500);
    return () => {
      clearTimeout(initial);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!notif) return null;
  return (
    <div className="fixed bottom-6 left-3 z-50 md:bottom-6 md:left-6 animate-fade-in">
      <div className="flex max-w-xs items-center gap-3 rounded-2xl border border-border bg-card/95 p-3 pr-4 shadow-soft backdrop-blur">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-green text-primary-foreground">
          <ShoppingBag className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-tight">
            {notif.name} de {notif.city}/{notif.uf}
          </p>
          <p className="text-xs text-muted-foreground">
            acabou de garantir o Método · há {notif.mins} min
          </p>
        </div>
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => setNotif(null)}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Index() {
  const [upsellOpen, setUpsellOpen] = useState(false);

  const trackCheckout = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <p className="mx-auto max-w-5xl px-4 py-2 text-center text-xs font-medium sm:text-sm">
          🔥 OFERTA RELÂMPAGO — 85% OFF + 2 bônus exclusivos
        </p>
      </div>

      {/* HERO */}
      <header className="bg-gradient-warm">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              <Sparkles className="h-3.5 w-3.5" /> Método Fita Premium
            </span>
            <h1 className="mt-4 font-display text-3xl font-black leading-[1.05] text-balance text-ink sm:text-5xl">
              APRENDA A CONFECCIONAR MEGA HAIR DE FITA E COMECE A LUCRAR EM CASA
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Tenha acesso ao método que ensina como produzir mega hair de fita com acabamento profissional e transformar isso em uma fonte de renda real!
            </p>
            <div className="relative mx-auto mt-8 max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-green opacity-20 blur-2xl" />
              <img
                src="https://i.postimg.cc/R0NsqjS7/img-produto.png"
                alt="Método Fita Premium — produto digital"
                className="relative w-full rounded-2xl shadow-soft"
                loading="eager"
              />
            </div>
            <div className="mt-6">
              <CTA>Quero adquirir com valor promocional</CTA>
            </div>
          </div>
        </div>
      </header>

      {/* 4 perguntas */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <img
            src="https://i.postimg.cc/rpSDMkpz/Gemini-Generated-Image-mj8sdbmj8sdbmj8s-1024x1024.png"
            alt="Confecção de mega hair"
            className="w-full rounded-2xl shadow-soft"
            loading="lazy"
          />
          <div>
            <h2 className="font-display text-2xl font-bold text-balance sm:text-4xl">
              As 4 perguntas que travam quem quer confeccionar mega hair de fita
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                "Como vender confecção sem precisar aplicar?",
                "Qual material entra na lista e qual é desperdício de dinheiro?",
                "Qual cola realmente fixa — e qual descola em 2 semanas?",
                "Como deixar o resultado leve, padronizado e digno de cobrar caro?",
              ].map((q, i) => (
                <li key={i} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">{i + 1}</span>
                  <p className="text-sm font-medium sm:text-base">{q}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base text-muted-foreground">
              Você não precisa testar isso no erro. Existe uma sequência certa — e ela é simples de seguir.
            </p>
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:py-20">
          <h2 className="font-display text-3xl font-bold text-balance sm:text-4xl">
            E se você pudesse pular direto para o resultado?
          </h2>
          <p className="mt-4 text-base opacity-90 sm:text-lg">Imagina já saber, com clareza total:</p>
          <ul className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:gap-4">
            {[
              "Como produzir sua primeira peça vendável, sem adivinhação.",
              "Como confeccionar com segurança, sem medo de errar a fixação.",
              "Como repetir esse padrão toda vez — e cobrar por isso.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm sm:text-base">{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base font-semibold sm:text-lg">Foi exatamente isso que eu construí.</p>
        </div>
      </section>

      {/* Método */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">O método</span>
            <h2 className="mt-3 font-display text-3xl font-black text-balance sm:text-4xl">O Método Fita Premium</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Um processo direto, sem teoria de sobra, para confeccionar mega hair de fita com fixação forte e acabamento natural — mesmo que você nunca tenha feito uma peça antes.
            </p>
            <div className="mt-6 rounded-2xl border-l-4 border-accent bg-card p-5 shadow-soft">
              <p className="text-sm font-semibold sm:text-base">
                Seguindo certo, em até <span className="text-accent">7 dias</span> você já produz peças prontas para usar ou vender.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Sem volta: o foco é produção correta → estrutura profissional → resultado vendável.
              </p>
            </div>
          </div>
          <img
            src="https://i.postimg.cc/MZCTYW2D/1.png"
            alt="Peça de mega hair confeccionada"
            className="w-full rounded-2xl shadow-soft"
            loading="lazy"
          />
        </div>
      </section>

      {/* O que recebe */}
      <section className="bg-cream">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <h2 className="text-center font-display text-3xl font-bold text-balance sm:text-4xl">O que você recebe no método</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {[
              { t: "Confecção do zero", d: "Passo a passo completo para produzir sua primeira unidade com segurança, mesmo começando sem experiência." },
              { t: "Fita que não descola", d: "A estrutura exata de montagem para fixação forte e durabilidade — o que separa peça amadora de peça vendável." },
              { t: "Lista de materiais sem desperdício", d: "O que comprar, o que evitar, e onde a maioria perde dinheiro sem saber." },
              { t: "Padronização para vender", d: "Como repetir o mesmo padrão de qualidade peça após peça, pronto para comercializar." },
            ].map((it) => (
              <div key={it.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-green text-primary-foreground">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">{it.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bônus */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <h2 className="text-center font-display text-3xl font-bold text-balance sm:text-4xl">
          Bônus exclusivos — <span className="text-accent">grátis hoje</span>
        </h2>
        <div className="mt-10 space-y-8">
          {[
            {
              tag: "Bônus #1",
              t: "Guia Completo de Materiais",
              sub: "A lista exata do que comprar — sem chutar",
              old: "R$97", now: "R$0",
              d: "Tipos de cola recomendados, materiais essenciais, alternativas mais baratas e o que nunca comprar. A mesma base que eu uso em toda peça nova.",
              img: "https://i.postimg.cc/R0yG03y7/bonus-1.png",
            },
            {
              tag: "Bônus #2",
              t: "Mapa da Produção Perfeita",
              sub: "O guia visual que elimina o achismo",
              old: "R$197", now: "R$0",
              d: "Quantidade ideal de cabelo, ponto correto de aplicação, pressão e alinhamento exatos. Sem adivinhação na execução.",
              img: "https://i.postimg.cc/d1n1BdFf/bonus-2.png",
            },
          ].map((b, i) => (
            <div key={b.t} className={`grid gap-6 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-8 md:grid-cols-2 md:items-center ${i % 2 ? "md:[&>img]:order-last" : ""}`}>
              <img src={b.img} alt={b.t} className="w-full rounded-2xl" loading="lazy" />
              <div>
                <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">{b.tag}</span>
                <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{b.t}</h3>
                <p className="mt-1 italic text-muted-foreground">"{b.sub}"</p>
                <p className="mt-4 text-sm leading-relaxed sm:text-base">{b.d}</p>
                <p className="mt-4 text-sm">
                  De <s className="text-muted-foreground">{b.old}</s> por <span className="font-bold text-accent">{b.now}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-gradient-warm">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <h2 className="text-center font-display text-3xl font-bold text-balance sm:text-4xl">O que dizem nossas alunas</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { n: "Mariana Silva", img: "https://i.postimg.cc/vH5cwB5d/Imagem-do-Whats-App-de-2024-12-04-a(s)-20-55-26-1819ea0c.jpg", t: "Eu tinha muita dúvida sobre quais materiais comprar e morria de medo de fazer a fita descolar. O método explicou tudo de forma simples, principalmente a parte da montagem e da fixação. Consegui fazer minha primeira peça com acabamento bem mais bonito do que eu imaginava." },
              { n: "Juliane Pereira", img: "https://i.postimg.cc/T199QWn0/710889587-18097991405023434-7852760872928750389-n.jpg", t: "Comprei achando que seria complicado, mas o passo a passo é bem direto. O que mais me ajudou foi entender a quantidade certa de cabelo, o alinhamento e como deixar as fitas padronizadas. Já estou treinando para vender minhas primeiras peças." },
              { n: "Patrícia Amorim", img: "https://i.postimg.cc/Qx8SC0rn/unnamed-(1).jpg", t: "Eu já tinha perdido dinheiro comprando material errado, então o guia de materiais foi perfeito pra mim. O método mostra exatamente o que usar e como montar sem ficar testando no erro. Dá segurança até pra quem está começando do zero." },
            ].map((d) => (
              <figure key={d.n} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <img src={d.img} alt={d.n} className="h-14 w-14 shrink-0 rounded-full object-cover" loading="lazy" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{d.n}</p>
                    <div className="flex text-accent">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                    </div>
                  </div>
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">"{d.t}"</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Oferta */}
      <section id="oferta" className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
        <div className="rounded-3xl border-2 border-accent bg-card p-6 shadow-soft sm:p-10">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-accent">Oferta especial — só nesta página</p>
          <img
            src="https://i.postimg.cc/R0NsqjS7/img-produto.png"
            alt="Método Fita Premium"
            className="mx-auto mt-6 w-full max-w-xs"
            loading="lazy"
          />
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">De <s>R$97,00</s> por apenas</p>
            <p className="mt-1 font-display text-5xl font-black text-primary sm:text-6xl">R$ 37,90</p>
            <p className="mt-2 text-sm text-muted-foreground">Pagamento único · acesso imediato</p>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-muted p-4 sm:p-6">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-accent">Você leva tudo isso</p>
            <ul className="mt-4 space-y-3">
              {[
                { t: "Método Fita Premium", v: "R$97" },
                { t: "Bônus: Guia Completo de Materiais", v: "R$97" },
                { t: "Bônus: Mapa da Produção Perfeita", v: "R$197" },
                { t: "Grupo de suporte no WhatsApp", v: "R$47" },
              ].map((it) => (
                <li key={it.t} className="flex items-center justify-between gap-3 border-b border-border/50 pb-2 text-sm">
                  <span className="font-medium">{it.t}</span>
                  <span className="font-bold text-muted-foreground">{it.v}</span>
                </li>
              ))}
              <li className="flex items-center justify-between gap-3 pt-1 text-sm font-bold">
                <span className="text-accent">Total de valor real</span>
                <span className="text-accent">R$ 438</span>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <CTA checkout>Quero adquirir com valor promocional</CTA>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { i: MessageCircle, t: "Suporte WhatsApp" },
              { i: ShieldCheck, t: "Garantia 30 dias" },
              { i: Clock, t: "Entrega imediata" },
            ].map(({ i: Icon, t }) => (
              <div key={t} className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2">
                <Icon className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-xs font-medium sm:text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plano Básico */}
      <section className="mx-auto max-w-3xl px-4 pb-14 sm:pb-20">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Não pode investir agora?
          </p>
          <h3 className="mt-2 text-center font-display text-2xl font-bold sm:text-3xl">
            Plano Básico
          </h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Só o método essencial · sem bônus · sem suporte no WhatsApp
          </p>
          <p className="mt-4 text-center font-display text-4xl font-black text-foreground sm:text-5xl">
            R$ 10,00
          </p>
          <ul className="mx-auto mt-6 max-w-md space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-accent" />
              <span>Acesso ao Método Fita Premium</span>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground line-through">
              <X className="h-4 w-4 shrink-0" />
              <span>Guia Completo de Materiais</span>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground line-through">
              <X className="h-4 w-4 shrink-0" />
              <span>Mapa da Produção Perfeita</span>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground line-through">
              <X className="h-4 w-4 shrink-0" />
              <span>Grupo de suporte no WhatsApp</span>
            </li>
          </ul>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setUpsellOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-foreground bg-background px-6 py-4 text-base font-bold uppercase tracking-wide text-foreground transition hover:bg-foreground hover:text-background sm:text-lg"
            >
              Continuar com o plano básico
            </button>
          </div>
        </div>
      </section>


      {/* Sem rodeio */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
          <h2 className="text-center font-display text-3xl font-bold text-balance sm:text-4xl">Sem rodeio</h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              A proposta é simples e clara: Estou apresentando uma oportunidade de aprender a confeccionar mega hair sem gastar valores altos em cursos com passo a passo detalhado e validado.
            </p>
            <p>
              Estou falando de um modelo que você pode simplesmente replicar várias vezes, para confeccionar qualquer mega hair de qualquer tipo de cabelo.
            </p>
            <p>
              Estou falando de um método que servirá como o seu guia oficial para confeccionar qualquer cabelo na fita adesirva.
            </p>
            <p>
              Felizmente, adquirindo seu acesso hoje você garante 85% de desconto e + 2 bônus exclusivos.
            </p>
            <p className="font-semibold text-foreground">
              Pagamento único, sem pegadinhas e 30 dias de garantia.
            </p>
            <p>
              Legal... mas se é tão bom, por que está tão barato?
            </p>
            <p>
              Ahhh, eu sei que isso passou pela sua cabeça.
            </p>
            <p>
              Se você prestar atenção, o valor de R$37,90 não parece ser um valor aleatório para cobrar em um produto (e de fato não é).
            </p>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="font-semibold text-foreground">Razão número 01: O valor não se torna um obstáculo para ninguém.</p>
              <p className="mt-4 font-semibold text-foreground">Razão número 02: Proteção contra curiosos.</p>
              <p className="mt-2">
                Mesmo que o investimento seja baixo, o simples fato de cobrar já afasta curiosos em busca de “soluções gratuitas” na internet.
              </p>
              <p className="mt-2">
                E quem gosta do produto, fica com vontade comprar outros treinamentos no futuro (essa é a “jogada”).
              </p>
            </div>
            <p className="font-semibold text-foreground">
              Sem pegadinhas, sem letras miúdas ou nada do tipo.
            </p>
          </div>
        </div>
      </section>

      {/* Garantias detalhe */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:py-16">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <ShieldCheck className="h-8 w-8 text-accent" />
              <h3 className="mt-3 font-display text-xl font-bold">Garantia de 30 dias</h3>
              <p className="mt-2 text-sm text-muted-foreground">Você testa o método com calma. Se em 30 dias sentir que não é pra você, devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <Clock className="h-8 w-8 text-accent" />
              <h3 className="mt-3 font-display text-xl font-bold">Entrega imediata</h3>
              <p className="mt-2 text-sm text-muted-foreground">Pagamento aprovado, acesso liberado na hora — direto no seu e-mail. Você pode começar a confeccionar ainda hoje.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
          <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">Perguntas frequentes</h2>
          <div className="mt-8 space-y-4">
            {[
              { q: "Por que está tão barato, sendo tão completo?", a: "Duas razões, sem letra miúda: o preço não é obstáculo pra ninguém entrar; e cobrar filtra curiosa de quem está pronta pra produzir. Quem aplica o método e vê resultado, volta para os próximos treinamentos." },
              { q: "Quando recebo o acesso?", a: "Na hora. Pagamento aprovado, os dados chegam no seu e-mail — acesso direto na área de membros." },
              { q: "É pagamento único? Tem reembolso?", a: "Sim, único — nada de mensalidade. E se não for pra você, reembolso garantido em 30 dias. Risco zero." },
            ].map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 shadow-soft">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
                  <span>{f.q}</span>
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <img
            src="https://i.postimg.cc/pXTT6Zqv/professora-medice1.jpg"
            alt="Fernanda Santos"
            className="mx-auto h-48 w-48 rounded-full object-cover shadow-soft ring-4 ring-accent/30 md:h-56 md:w-56"
            loading="lazy"
          />
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Quem te ensina</span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Fernanda Santos</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Já fiz centenas de transformações em mega hair na fita adesiva — a técnica mais procurada pelas clientes hoje, com foco em saúde capilar e zero acabamento aparente.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Hoje, além de ter a agenda lotada com esse serviço, ensino o passo a passo completo pra quem quer dominar confecção e aplicação. Centenas de alunas já saíram do zero e hoje entregam acabamento de luxo que fideliza cliente.
            </p>
            <p className="mt-4 font-display text-lg italic text-primary">Te vejo na primeira aula.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Método Fita Premium · Todos os direitos reservados.</p>
          <p className="mt-2">Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook.</p>
        </div>
      </footer>

      <PurchaseNotifications />

      <noscript>
        <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=2085744399005789&ev=PageView&noscript=1" alt="" />
      </noscript>
    </div>
  );
}
