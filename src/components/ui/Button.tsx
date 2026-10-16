import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[transform,background-color,color,border-color] duration-200 ease-out active:scale-[0.98] select-none";

const variants: Record<Variant, string> = {
  primary: "bg-lilac text-ink hover:bg-lilac-2 shadow-lilac",
  ghost: "text-bone hover:text-lilac",
  outline: "border border-white/15 text-bone hover:border-lilac hover:text-lilac",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

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
  return (
    <Link
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
