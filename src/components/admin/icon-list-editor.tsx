"use client";

import { Plus, Trash2 } from "lucide-react";
import { iconNames, resolveIcon } from "@/lib/content/icons";
import type { IconItem } from "@/lib/supabase/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  label: string;
  items: IconItem[];
  onChange: (items: IconItem[]) => void;
  /** rótulo do botão de adicionar (ex.: "Adicionar serviço") */
  addLabel: string;
};

/**
 * Editor de lista com ícone selecionável (pilares do "Sobre", serviços).
 * A quantidade é variável; o ícone é escolhido de uma lista fixa (dropdown).
 * O estado é controlado pelo componente-pai, que serializa o array no submit.
 */
export function IconListEditor({ label, items, onChange, addLabel }: Props) {
  function update(index: number, patch: Partial<IconItem>) {
    onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function add() {
    onChange([...items, { icon: iconNames[0], title: "", text: "" }]);
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-mist-300">
        {label}
      </span>

      <div className="space-y-3">
        {items.map((item, i) => {
          const Icon = resolveIcon(item.icon);
          return (
            <div
              key={i}
              className="rounded-xl border border-ink-700 bg-ink-900/50 p-4"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-800 text-sky-glow">
                  <Icon size={18} />
                </span>

                <div className="min-w-0 flex-1 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-[10rem_1fr]">
                    <label className="block">
                      <span className="mb-1 block text-xs text-mist-500">
                        Ícone
                      </span>
                      <select
                        value={item.icon}
                        onChange={(e) => update(i, { icon: e.target.value })}
                        className="w-full rounded-lg border border-ink-600 bg-ink-850 px-3 py-2 text-sm text-mist-100 outline-none focus:border-sky-glow"
                      >
                        {iconNames.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-1 block text-xs text-mist-500">
                        Título
                      </span>
                      <Input
                        value={item.title}
                        onChange={(e) => update(i, { title: e.target.value })}
                        placeholder="Título do item"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1 block text-xs text-mist-500">
                      Texto
                    </span>
                    <Textarea
                      value={item.text}
                      onChange={(e) => update(i, { text: e.target.value })}
                      placeholder="Descrição do item"
                      rows={2}
                    />
                  </label>
                </div>

                <button
                  type="button"
                  aria-label="Remover item"
                  onClick={() => remove(i)}
                  className="rounded-lg border border-ink-600 p-2 text-mist-300 transition-colors hover:border-red-500/50 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <p className="rounded-lg border border-dashed border-ink-600 bg-ink-900/40 px-4 py-6 text-center text-sm text-mist-500">
            Nenhum item. Clique em “{addLabel}”.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-3 flex items-center gap-1.5 rounded-lg border border-ink-600 px-3 py-2 text-sm text-mist-300 transition-colors hover:border-sky-glow hover:text-sky-bright"
      >
        <Plus size={16} />
        {addLabel}
      </button>
    </div>
  );
}
