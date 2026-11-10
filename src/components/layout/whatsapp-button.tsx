import { MessageCircle } from "lucide-react";

/** Botão flutuante de WhatsApp — atalho de contato rápido, sobretudo no mobile. */
export function WhatsAppButton({ number }: { number: string }) {
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;

  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-sky-glow px-5 text-sm font-medium text-ink-950 shadow-lg shadow-black/40 transition-all duration-300 hover:bg-sky-bright active:scale-95 sm:bottom-8 sm:right-8"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <MessageCircle size={22} />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
