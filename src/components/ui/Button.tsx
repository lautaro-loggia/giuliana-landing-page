import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost" | "outline";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-[transform,background-color,color,border-color] duration-200 ease-out active:scale-[0.98] select-none";

const variants: Record<Variant, string> = {
  primary: "bg-lilac text-on-lilac hover:bg-lilac-2 shadow-lilac",
  ghost: "text-bone hover:text-lilac",
  outline: "border border-line/15 text-bone hover:border-lilac hover:text-lilac",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

/** Las mismas clases que ButtonLink, para un <button> o un <a> propio */
export function buttonClass(variant: Variant = "primary", size: keyof typeof sizes = "md") {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: keyof typeof sizes;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonLinkProps) {
  // Los links a otro sitio (WhatsApp) se abren en otra pestaña
  const external = typeof props.href === "string" && /^https?:\/\//.test(props.href);
  return (
    <Link
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
