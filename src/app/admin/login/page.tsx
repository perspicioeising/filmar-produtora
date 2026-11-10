"use client";

import { useActionState } from "react";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import { login, type AuthState } from "@/lib/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const initialState: AuthState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-5 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-glow/15 blur-3xl"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <Logo size="lg" />
          <div className="flex items-center gap-2 text-sm text-mist-400">
            <Lock size={14} className="text-sky-glow" />
            Painel administrativo
          </div>
        </div>

        <form
          action={formAction}
          className="space-y-5 rounded-3xl border border-ink-700 bg-ink-900/80 p-6 backdrop-blur sm:p-8"
        >
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-mist-300">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder="voce@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm text-mist-300">
              Senha
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
            />
          </div>

          {state.error && (
            <p role="alert" className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle size={16} className="shrink-0" />
              {state.error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={pending}>
            {pending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
