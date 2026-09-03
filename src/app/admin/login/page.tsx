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
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <Logo size="md" />
          <div className="flex items-center gap-2 text-sm text-mist-400">
            <Lock size={14} className="text-sky-glow" />
            Painel administrativo
          </div>
        </div>

        <form
          action={formAction}
          className="space-y-4 rounded-2xl border border-ink-700 bg-ink-850/50 p-6"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-mist-300"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@filmarprodutora.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-mist-300"
            >
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
            <p
              role="alert"
              className="flex items-center gap-2 text-sm text-red-400"
            >
              <AlertCircle size={16} />
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
