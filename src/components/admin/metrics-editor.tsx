"use client";

import { Plus, Trash2 } from "lucide-react";
import type { Metric } from "@/lib/supabase/types";
import { Input } from "@/components/ui/input";

type Props = {
  metrics: Metric[];
  onChange: (metrics: Metric[]) => void;
};

/** Editor das métricas do hero (valor + rótulo, sem ícone). */
export function MetricsEditor({ metrics, onChange }: Props) {
  function update(index: number, patch: Partial<Metric>) {
    onChange(metrics.map((m, i) => (i === index ? { ...m, ...patch } : m)));
  }

  function remove(index: number) {
    onChange(metrics.filter((_, i) => i !== index));
  }

  function add() {
    onChange([...metrics, { value: "", label: "" }]);
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-mist-300">
        Métricas
      </span>

      <div className="space-y-3">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="flex items-end gap-3 rounded-xl border border-ink-700 bg-ink-900/50 p-4"
          >
            <label className="block w-28 shrink-0">
              <span className="mb-1 block text-xs text-mist-500">Valor</span>
              <Input
                value={metric.value}
                onChange={(e) => update(i, { value: e.target.value })}
                placeholder="+120"
              />
            </label>
            <label className="block flex-1">
              <span className="mb-1 block text-xs text-mist-500">Rótulo</span>
              <Input
                value={metric.label}
                onChange={(e) => update(i, { label: e.target.value })}
                placeholder="Projetos entregues"
              />
            </label>
            <button
              type="button"
              aria-label="Remover métrica"
              onClick={() => remove(i)}
              className="rounded-lg border border-ink-600 p-2 text-mist-300 transition-colors hover:border-red-500/50 hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {metrics.length === 0 && (
          <p className="rounded-lg border border-dashed border-ink-600 bg-ink-900/40 px-4 py-6 text-center text-sm text-mist-500">
            Nenhuma métrica.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-3 flex items-center gap-1.5 rounded-lg border border-ink-600 px-3 py-2 text-sm text-mist-300 transition-colors hover:border-sky-glow hover:text-sky-bright"
      >
        <Plus size={16} />
        Adicionar métrica
      </button>
    </div>
  );
}
