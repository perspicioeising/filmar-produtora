"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import {
  saveSiteContent,
  type SiteContentActionState,
} from "@/lib/actions/site-content";
import type {
  AboutContent,
  ContactContent,
  HeroContent,
  IconItem,
  Metric,
  ServicesContent,
} from "@/lib/supabase/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconListEditor } from "./icon-list-editor";
import { MetricsEditor } from "./metrics-editor";

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
  const [metrics, setMetrics] = useState<Metric[]>(content.metrics);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="key" value="hero" />
      <input type="hidden" name="metrics" value={JSON.stringify(metrics)} />

      <Labeled label="Badge (etiqueta acima do título)">
        <Input name="badge" defaultValue={content.badge} />
      </Labeled>

      <div className="grid gap-4 sm:grid-cols-3">
        <Labeled label="Título — início">
          <Input name="titlePrefix" defaultValue={content.titlePrefix} />
        </Labeled>
        <Labeled label="Título — destaque">
          <Input name="titleHighlight" defaultValue={content.titleHighlight} />
        </Labeled>
        <Labeled label="Título — fim">
          <Input name="titleSuffix" defaultValue={content.titleSuffix} />
        </Labeled>
      </div>

      <Labeled label="Parágrafo">
        <Textarea name="paragraph" defaultValue={content.paragraph} />
      </Labeled>

      <div className="grid gap-4 sm:grid-cols-2">
        <Labeled label="Botão principal">
          <Input name="primaryCta" defaultValue={content.primaryCta} required />
        </Labeled>
        <Labeled label="Botão secundário">
          <Input
            name="secondaryCta"
            defaultValue={content.secondaryCta}
            required
          />
        </Labeled>
      </div>

      <MetricsEditor metrics={metrics} onChange={setMetrics} />

      <StatusBar state={state} pending={pending} />
    </form>
  );
}

// ─── About ───────────────────────────────────────────────────────

export function AboutForm({ content }: { content: AboutContent }) {
  const [state, formAction, pending] = useActionState(
    saveSiteContent,
    initialState,
  );
  const [pillars, setPillars] = useState<IconItem[]>(content.pillars);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="key" value="about" />
      <input type="hidden" name="pillars" value={JSON.stringify(pillars)} />

      <div className="grid gap-4 sm:grid-cols-[12rem_1fr]">
        <Labeled label="Eyebrow (texto pequeno)">
          <Input name="eyebrow" defaultValue={content.eyebrow} />
        </Labeled>
        <Labeled label="Título">
          <Input name="title" defaultValue={content.title} required />
        </Labeled>
      </div>

      <Labeled label="Parágrafo 1">
        <Textarea name="paragraph1" defaultValue={content.paragraph1} />
      </Labeled>
      <Labeled label="Parágrafo 2">
        <Textarea name="paragraph2" defaultValue={content.paragraph2} />
      </Labeled>

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

// ─── Services ────────────────────────────────────────────────────

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
        label="Serviços"
        items={items}
        onChange={setItems}
        addLabel="Adicionar serviço"
      />

      <StatusBar state={state} pending={pending} />
    </form>
  );
}

// ─── Contact ─────────────────────────────────────────────────────

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

      <Labeled label="Parágrafo">
        <Textarea name="paragraph" defaultValue={content.paragraph} />
      </Labeled>

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
