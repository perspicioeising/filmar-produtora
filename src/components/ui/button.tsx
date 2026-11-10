import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "light" | "outline" | "outline-dark" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  /** Azul da marca — ação principal */
  primary: "bg-sky-glow text-ink-950 hover:bg-sky-bright",
  /** Branco — sobre fundos escuros/azuis */
  light: "bg-mist-100 text-ink-950 hover:bg-white",
  /** Contorno — sobre fundos escuros */
  outline:
    "border border-mist-100/25 text-mist-100 hover:border-mist-100 hover:bg-mist-100/5",
  /** Contorno — sobre fundos claros/azuis */
  "outline-dark":
    "border border-ink-950/30 text-ink-950 hover:border-ink-950 hover:bg-ink-950/5",
  ghost: "text-mist-300 hover:text-sky-glow",
  danger:
    "border border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-400",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.ComponentProps<typeof Link>, "className" | "children"> & {
    href: string;
  };

/* eslint-disable @typescript-eslint/no-unused-vars -- desestruturação para remover props de estilo do spread */
export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const {
      variant: _v,
      size: _s,
      className: _c,
      children: _ch,
      ...rest
    } = props;
    return (
      <Link className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    ...rest
  } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
