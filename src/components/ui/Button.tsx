import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "subtle";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

type ButtonAsButton = BaseProps & {
  as?: "button";
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = BaseProps & {
  as: "link";
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] font-semibold tracking-wide transition-[color,background-color,box-shadow,transform] duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary shadow-[var(--shadow-primary-button)] hover:bg-primary-hover hover:shadow-[var(--shadow-primary-button-hover)] hover:-translate-y-px active:translate-y-0 active:bg-primary-pressed",
  secondary:
    "bg-brand-50 text-brand-800 hover:bg-brand-100 active:bg-brand-200",
  outline:
    "border border-border-strong bg-background text-text hover:bg-surface",
  ghost: "text-brand-700 hover:bg-brand-50",
  subtle:
    "bg-surface text-text-secondary hover:bg-surface-muted active:bg-brand-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    leadingIcon,
    trailingIcon,
    fullWidth,
    className,
    children,
  } = props;

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className
  );

  if (props.as === "link") {
    const { href, ...rest } = stripBaseProps(props);
    return (
      <Link href={href} className={classes} {...rest}>
        {leadingIcon}
        <span>{children}</span>
        {trailingIcon}
      </Link>
    );
  }

  const rest = stripBaseProps(props as ButtonAsButton);
  return (
    <button className={classes} {...rest}>
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </button>
  );
}

type BasePropKeys =
  | "variant"
  | "size"
  | "leadingIcon"
  | "trailingIcon"
  | "fullWidth"
  | "className"
  | "children"
  | "as";

function stripBaseProps<T extends ButtonProps>(props: T): Omit<T, BasePropKeys> {
  const {
    variant: _variant,
    size: _size,
    leadingIcon: _leadingIcon,
    trailingIcon: _trailingIcon,
    fullWidth: _fullWidth,
    className: _className,
    children: _children,
    as: _as,
    ...rest
  } = props;
  void _variant;
  void _size;
  void _leadingIcon;
  void _trailingIcon;
  void _fullWidth;
  void _className;
  void _children;
  void _as;
  return rest;
}
