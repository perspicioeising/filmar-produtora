"use client";

import { Trash2 } from "lucide-react";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  /** texto exibido na confirmação */
  confirmText: string;
  label?: string;
};

/** Botão de exclusão com confirmação nativa antes de enviar a Server Action. */
export function ConfirmDeleteButton({ action, id, confirmText, label = "Excluir" }: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label={label}
        title={label}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-600 text-mist-300 transition-colors hover:border-red-500/50 hover:text-red-400"
      >
        <Trash2 size={16} />
      </button>
    </form>
  );
}
