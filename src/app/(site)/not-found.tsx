import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70svh] flex-col items-start justify-center py-32">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-glow">
        Erro 404
      </p>
      <h1 className="mt-5 max-w-2xl text-5xl leading-[1.05] text-balance sm:text-7xl">
        Essa cena não está no roteiro.
      </h1>
      <p className="mt-6 max-w-md text-mist-400">
        A página que você procura não existe ou foi retirada do ar.
      </p>
      <Button href="/" size="lg" className="mt-10">
        Voltar ao início
      </Button>
    </section>
  );
}
