"use client";

import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";
import { submitContact, type ContactState } from "@/lib/actions/contact";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

export function ContactForm({
  submitLabel = "Enviar mensagem",
}: {
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (state.status === "success") {
      reset();
      formRef.current?.reset();
    }
  }, [state.status, reset]);

  // Valida no client antes de deixar a Server Action rodar.
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const valid = await trigger();
    if (!valid) e.preventDefault();
  }

  const fieldError = (name: keyof ContactFormValues) =>
    errors[name]?.message ?? state.errors?.[name];

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      {/* Honeypot anti-spam: invisível para pessoas */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Não preencha
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome" htmlFor="name" error={fieldError("name")}>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Seu nome"
            aria-invalid={!!fieldError("name")}
            {...register("name")}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={fieldError("email")}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="voce@email.com"
            aria-invalid={!!fieldError("email")}
            {...register("email")}
          />
        </Field>
      </div>

      <Field
        label="WhatsApp / telefone"
        htmlFor="phone"
        optional
        error={fieldError("phone")}
      >
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="(11) 90000-0000"
          aria-invalid={!!fieldError("phone")}
          {...register("phone")}
        />
      </Field>

      <Field label="Sobre o projeto" htmlFor="message" error={fieldError("message")}>
        <Textarea
          id="message"
          rows={5}
          placeholder="Conte o que você quer filmar: formato, prazo, referências..."
          aria-invalid={!!fieldError("message")}
          {...register("message")}
        />
      </Field>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
          {pending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send size={18} />
              {submitLabel}
            </>
          )}
        </Button>

        <p
          role="status"
          aria-live="polite"
          className={cn(
            "flex items-center gap-2 text-sm",
            state.status === "success" ? "text-emerald-400" : "text-red-400",
          )}
        >
          {state.status !== "idle" && (
            <>
              {state.status === "success" ? (
                <CheckCircle2 size={16} className="shrink-0" />
              ) : (
                <AlertCircle size={16} className="shrink-0" />
              )}
              {state.message}
            </>
          )}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm text-mist-300">
        {label}
        {optional && <span className="ml-1.5 text-xs text-mist-500">(opcional)</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
