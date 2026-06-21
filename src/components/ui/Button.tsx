import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "subtle" | "inverse" | "text";
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
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] font-bold tracking-wide transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary shadow-sm hover:bg-primary-pressed hover:shadow-md hover:-translate-y-px active:translate-y-px active:bg-primary-pressed",
  secondary:
    "bg-surface text-primary border-[1.5px] border-outline-variant hover:border-primary hover:bg-surface-container-low active:bg-primary-fixed/40",
  outline:
    "border-[1.5px] border-outline bg-background text-on-surface hover:bg-surface-container-low active:bg-surface-container-high",
  inverse:
    "bg-on-primary text-primary hover:bg-primary-fixed hover:-translate-y-px active:translate-y-px",
  ghost:
    "text-primary hover:bg-primary-fixed/30 active:bg-primary-fixed/50",
  subtle:
    "bg-surface text-on-surface-variant hover:bg-surface-container-low active:bg-primary-fixed",
  text:
    "text-primary hover:text-primary-hover shadow-none bg-transparent hover:translate-y-0 active:translate-y-0",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-xs",
  md: "h-12 px-7 text-[15px]",
  lg: "h-14 px-8 text-base",
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
    variant !== "text" && sizeClasses[size],
    variant === "text" && "p-0 h-auto min-h-0 inline-flex items-center gap-1.5 hover:gap-2.5",
    fullWidth && "w-full",
    className
  );

  if (props.as === "link") {
    const { href, ...rest } = stripBaseProps(props);
    return (
      <Link href={href} className={classes} {...rest}>
        {leadingIcon ? (
          <span className="inline-flex shrink-0 items-center">{leadingIcon}</span>
        ) : null}
        {children ? <span className="inline-flex items-center">{children}</span> : null}
        {trailingIcon ? (
          <span className="inline-flex shrink-0 items-center transition-transform duration-200 group-hover:translate-x-1">{trailingIcon}</span>
        ) : null}
      </Link>
    );
  }

  const rest = stripBaseProps(props as ButtonAsButton);
  return (
    <button className={classes} {...rest}>
      {leadingIcon ? (
        <span className="inline-flex shrink-0 items-center">{leadingIcon}</span>
      ) : null}
      {children ? <span className="inline-flex items-center">{children}</span> : null}
      {trailingIcon ? (
        <span className="inline-flex shrink-0 items-center transition-transform duration-200 group-hover:translate-x-1">{trailingIcon}</span>
      ) : null}
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
