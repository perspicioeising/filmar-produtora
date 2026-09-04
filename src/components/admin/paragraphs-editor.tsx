"use client";

import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  label: string;
  paragraphs: string[];
  onChange: (paragraphs: string[]) => void;
};

/** Editor de lista de parágrafos (ordem importa). Sem ícone. */
export function ParagraphsEditor({ label, paragraphs, onChange }: Props) {
  function update(index: number, value: string) {
    onChange(paragraphs.map((p, i) => (i === index ? value : p)));
  }

  function remove(index: number) {
    onChange(paragraphs.filter((_, i) => i !== index));
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= paragraphs.length) return;
    const next = [...paragraphs];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function add() {
    onChange([...paragraphs, ""]);
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-mist-300">
        {label}
      </span>

      <div className="space-y-3">
        {paragraphs.map((paragraph, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-ink-700 bg-ink-900/50 p-4"
          >
            <span className="mt-2 text-xs text-mist-500">{i + 1}</span>
            <div className="min-w-0 flex-1">
              <Textarea
                value={paragraph}
                onChange={(e) => update(i, e.target.value)}
                placeholder="Texto do parágrafo"
                rows={3}
              />
            </div>
            <div className="flex flex-col gap-1">
              <button
                type="button"
                aria-label="Mover para cima"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="rounded-lg border border-ink-600 p-1.5 text-mist-300 transition-colors hover:border-mist-400 disabled:opacity-30"
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                aria-label="Mover para baixo"
                onClick={() => move(i, 1)}
                disabled={i === paragraphs.length - 1}
                className="rounded-lg border border-ink-600 p-1.5 text-mist-300 transition-colors hover:border-mist-400 disabled:opacity-30"
              >
                <ArrowDown size={14} />
              </button>
              <button
                type="button"
                aria-label="Remover parágrafo"
                onClick={() => remove(i)}
                className="rounded-lg border border-ink-600 p-1.5 text-mist-300 transition-colors hover:border-red-500/50 hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {paragraphs.length === 0 && (
          <p className="rounded-lg border border-dashed border-ink-600 bg-ink-900/40 px-4 py-6 text-center text-sm text-mist-500">
            Nenhum parágrafo.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-3 flex items-center gap-1.5 rounded-lg border border-ink-600 px-3 py-2 text-sm text-mist-300 transition-colors hover:border-mist-400 hover:text-mist-100"
      >
        <Plus size={16} />
        Adicionar parágrafo
      </button>
    </div>
  );
}
