"use client";

import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import type { ProcessStep } from "@/lib/supabase/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  steps: ProcessStep[];
  onChange: (steps: ProcessStep[]) => void;
};

/** Editor das etapas do processo (título + texto). A numeração 01–05 é
 * gerada automaticamente pela ordem na landing page. */
export function StepsEditor({ steps, onChange }: Props) {
  function update(index: number, patch: Partial<ProcessStep>) {
    onChange(steps.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  function remove(index: number) {
    onChange(steps.filter((_, i) => i !== index));
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= steps.length) return;
    const next = [...steps];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function add() {
    onChange([...steps, { title: "", text: "" }]);
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-mist-300">
        Etapas
      </span>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-ink-700 bg-ink-900/50 p-4"
          >
            <span className="mt-2 w-6 shrink-0 text-sm text-mist-500">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1 space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs text-mist-500">Título</span>
                <Input
                  value={step.title}
                  onChange={(e) => update(i, { title: e.target.value })}
                  placeholder="Ex.: Conversa"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-mist-500">Texto</span>
                <Textarea
                  value={step.text}
                  onChange={(e) => update(i, { text: e.target.value })}
                  placeholder="Descrição da etapa"
                  rows={2}
                />
              </label>
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
                disabled={i === steps.length - 1}
                className="rounded-lg border border-ink-600 p-1.5 text-mist-300 transition-colors hover:border-mist-400 disabled:opacity-30"
              >
                <ArrowDown size={14} />
              </button>
              <button
                type="button"
                aria-label="Remover etapa"
                onClick={() => remove(i)}
                className="rounded-lg border border-ink-600 p-1.5 text-mist-300 transition-colors hover:border-red-500/50 hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {steps.length === 0 && (
          <p className="rounded-lg border border-dashed border-ink-600 bg-ink-900/40 px-4 py-6 text-center text-sm text-mist-500">
            Nenhuma etapa.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-3 flex items-center gap-1.5 rounded-lg border border-ink-600 px-3 py-2 text-sm text-mist-300 transition-colors hover:border-mist-400 hover:text-mist-100"
      >
        <Plus size={16} />
        Adicionar etapa
      </button>
    </div>
  );
}
