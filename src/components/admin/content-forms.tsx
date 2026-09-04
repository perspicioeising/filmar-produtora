"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import {
  saveSiteContent,
  type SiteContentActionState,
} from "@/lib/actions/site-content";
import type {
  AboutContent,
  BeliefsContent,
  ContactContent,
  HeroContent,
  IconItem,
  PortfolioContent,
  ProcessContent,
  ProcessStep,
  ServicesContent,
  StudioContent,
  TransitionContent,
} from "@/lib/supabase/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconListEditor } from "./icon-list-editor";
import { ParagraphsEditor } from "./paragraphs-editor";
import { StepsEditor } from "./steps-editor";

const initialState: SiteContentActionState = { status: "idle" };

// ─── Helpers de layout ───────────────────────────────────────────

function Labeled({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-mist-300">
        {label}
      </span>
      {children}
    </div>
  );
}

function StatusBar({
  state,
  pending,
}: {
  state: SiteContentActionState;
  pending: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <Button type="submit" disabled={pending}>
        {pending ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Salvando...
          </>
        ) : (
          "Salvar seção"
        )}
      </Button>

      {state.status !== "idle" && (
        <span
          className={cn(
            "flex items-center gap-1.5 text-sm",
            state.status === "success" ? "text-emerald-400" : "text-red-400",
          )}
        >
          {state.status === "success" ? (
            <CheckCircle2 size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          {state.message}
        </span>
      )}
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────

export function HeroForm({ content }: { content: HeroContent }) {
  const [state, formAction, pending] = useActionState(
    saveSiteContent,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="key" value="hero" />

      <Labeled label="Título">
        <Textarea name="title" defaultValue={content.title} required />
      </Labeled>

      <Labeled label="Descrição">
        <Textarea name="description" defaultValue={content.description} />
      </Labeled>

      <div className="grid gap-4 sm:grid-cols-2">
        <Labeled label="Botão (CTA)">
          <Input name="cta" defaultValue={content.cta} required />
        </Labeled>
        <Labeled label="Mídia de fundo — URL (imagem ou vídeo, opcional)">
          <Input
            name="mediaUrl"
            defaultValue={content.mediaUrl}
            placeholder="https://... .mp4 ou .jpg"
          />
        </Labeled>
      </div>

      <StatusBar state={state} pending={pending} />
    </form>
  );
}

// ─── Transição ───────────────────────────────────────────────────

export function TransitionForm({ content }: { content: TransitionContent }) {
  const [state, formAction, pending] = useActionState(
    saveSiteContent,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="key" value="transition" />

      <Labeled label="Texto">
        <Textarea name="text" defaultValue={content.text} required rows={3} />
      </Labeled>

      <StatusBar state={state} pending={pending} />
    </form>
  );
}

// ─── Sobre mim ───────────────────────────────────────────────────

export function AboutForm({ content }: { content: AboutContent }) {
  const [state, formAction, pending] = useActionState(
    saveSiteContent,
    initialState,
  );
  const [paragraphs, setParagraphs] = useState<string[]>(content.paragraphs);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="key" value="about" />
      <input
        type="hidden"
        name="paragraphs"
        value={JSON.stringify(paragraphs)}
      />

      <Labeled label="Título">
        <Input name="title" defaultValue={content.title} required />
      </Labeled>

      <Labeled label="Frase de abertura">
        <Textarea name="openingLine" defaultValue={content.openingLine} rows={2} />
      </Labeled>

      <ParagraphsEditor
        label="Parágrafos"
        paragraphs={paragraphs}
        onChange={setParagraphs}
      />

      <Labeled label="Foto — URL (opcional, para o futuro)">
        <Input
          name="photoUrl"
          defaultValue={content.photoUrl}
          placeholder="https://..."
        />
      </Labeled>

      <StatusBar state={state} pending={pending} />
    </form>
  );
}

// ─── Quem é a Filmar ─────────────────────────────────────────────

export function StudioForm({ content }: { content: StudioContent }) {
  const [state, formAction, pending] = useActionState(
    saveSiteContent,
    initialState,
  );
  const [paragraphs, setParagraphs] = useState<string[]>(content.paragraphs);
  const [pillars, setPillars] = useState<IconItem[]>(content.pillars);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="key" value="studio" />
      <input
        type="hidden"
        name="paragraphs"
        value={JSON.stringify(paragraphs)}
      />
      <input type="hidden" name="pillars" value={JSON.stringify(pillars)} />

      <div className="grid gap-4 sm:grid-cols-[12rem_1fr]">
        <Labeled label="Título">
          <Input name="title" defaultValue={content.title} required />
        </Labeled>
        <Labeled label="Frase (tagline)">
          <Input name="tagline" defaultValue={content.tagline} />
        </Labeled>
      </div>

      <ParagraphsEditor
        label="Parágrafos"
        paragraphs={paragraphs}
        onChange={setParagraphs}
      />

      <IconListEditor
        label="Pilares"
        items={pillars}
        onChange={setPillars}
        addLabel="Adicionar pilar"
      />

      <StatusBar state={state} pending={pending} />
    </form>
  );
}

// ─── Serviços ────────────────────────────────────────────────────

export function ServicesForm({ content }: { content: ServicesContent }) {
  const [state, formAction, pending] = useActionState(
    saveSiteContent,
    initialState,
  );
  const [items, setItems] = useState<IconItem[]>(content.items);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="key" value="services" />
      <input type="hidden" name="items" value={JSON.stringify(items)} />

      <div className="grid gap-4 sm:grid-cols-[12rem_1fr]">
        <Labeled label="Eyebrow (texto pequeno)">
          <Input name="eyebrow" defaultValue={content.eyebrow} />
        </Labeled>
        <Labeled label="Título">
          <Input name="title" defaultValue={content.title} required />
        </Labeled>
      </div>

      <Labeled label="Parágrafo">
        <Textarea name="paragraph" defaultValue={content.paragraph} />
      </Labeled>

      <IconListEditor
        label="Categorias"
        items={items}
        onChange={setItems}
        addLabel="Adicionar categoria"
      />

      <StatusBar state={state} pending={pending} />
    </form>
  );
}

// ─── Portfólio (cabeçalho) ───────────────────────────────────────

export function PortfolioForm({ content }: { content: PortfolioContent }) {
  const [state, formAction, pending] = useActionState(
    saveSiteContent,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="key" value="portfolio" />

      <Labeled label="Título">
        <Input name="title" defaultValue={content.title} required />
      </Labeled>

      <Labeled label="Descrição">
        <Textarea name="description" defaultValue={content.description} rows={2} />
      </Labeled>

      <p className="text-sm text-mist-500">
        Os projetos (vídeos, thumbnails e categorias) são gerenciados na seção
        “Projetos” abaixo.
      </p>

      <StatusBar state={state} pending={pending} />
    </form>
  );
}

// ─── Processo ────────────────────────────────────────────────────

export function ProcessForm({ content }: { content: ProcessContent }) {
  const [state, formAction, pending] = useActionState(
    saveSiteContent,
    initialState,
  );
  const [steps, setSteps] = useState<ProcessStep[]>(content.steps);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="key" value="process" />
      <input type="hidden" name="steps" value={JSON.stringify(steps)} />

      <Labeled label="Título">
        <Input name="title" defaultValue={content.title} required />
      </Labeled>

      <Labeled label="Descrição">
        <Textarea name="description" defaultValue={content.description} />
      </Labeled>

      <StepsEditor steps={steps} onChange={setSteps} />

      <StatusBar state={state} pending={pending} />
    </form>
  );
}

// ─── O que acreditamos ───────────────────────────────────────────

export function BeliefsForm({ content }: { content: BeliefsContent }) {
  const [state, formAction, pending] = useActionState(
    saveSiteContent,
    initialState,
  );
  const [paragraphs, setParagraphs] = useState<string[]>(content.paragraphs);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="key" value="beliefs" />
      <input
        type="hidden"
        name="paragraphs"
        value={JSON.stringify(paragraphs)}
      />

      <Labeled label="Título">
        <Input name="title" defaultValue={content.title} required />
      </Labeled>

      <ParagraphsEditor
        label="Parágrafos"
        paragraphs={paragraphs}
        onChange={setParagraphs}
      />

      <StatusBar state={state} pending={pending} />
    </form>
  );
}

// ─── Contato ─────────────────────────────────────────────────────

export function ContactForm({ content }: { content: ContactContent }) {
  const [state, formAction, pending] = useActionState(
    saveSiteContent,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="key" value="contact" />

      <div className="grid gap-4 sm:grid-cols-[12rem_1fr]">
        <Labeled label="Eyebrow (texto pequeno)">
          <Input name="eyebrow" defaultValue={content.eyebrow} />
        </Labeled>
        <Labeled label="Título">
          <Input name="title" defaultValue={content.title} required />
        </Labeled>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Labeled label="Texto">
          <Input name="paragraph" defaultValue={content.paragraph} />
        </Labeled>
        <Labeled label="Botão (CTA)">
          <Input name="cta" defaultValue={content.cta} required />
        </Labeled>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Labeled label="E-mail">
          <Input name="email" type="email" defaultValue={content.email} required />
        </Labeled>
        <Labeled label="Telefone">
          <Input name="phone" defaultValue={content.phone} />
        </Labeled>
        <Labeled label="WhatsApp (só números, com DDI)">
          <Input name="whatsapp" defaultValue={content.whatsapp} />
        </Labeled>
        <Labeled label="Localização">
          <Input name="location" defaultValue={content.location} />
        </Labeled>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Labeled label="Instagram (URL)">
          <Input name="instagram" defaultValue={content.instagram} />
        </Labeled>
        <Labeled label="YouTube (URL)">
          <Input name="youtube" defaultValue={content.youtube} />
        </Labeled>
        <Labeled label="Vimeo (URL)">
          <Input name="vimeo" defaultValue={content.vimeo} />
        </Labeled>
      </div>

      <Labeled label="Descrição (usada no rodapé e SEO)">
        <Textarea name="description" defaultValue={content.description} />
      </Labeled>

      <StatusBar state={state} pending={pending} />
    </form>
  );
}
