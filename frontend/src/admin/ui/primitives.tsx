import {
  forwardRef,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { clsx } from "clsx";
import { avatarTone, initials } from "../lib/format";

// ─── Button ──────────────────────────────────────────────────────────────────

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-sigmo-green text-white hover:bg-emerald-600 focus-visible:outline-sigmo-green disabled:bg-sigmo-green/40",
  secondary:
    "bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50 focus-visible:outline-slate-400 disabled:text-slate-400",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:outline-slate-400 disabled:text-slate-300",
  danger:
    "bg-rose-600 text-white hover:bg-rose-700 focus-visible:outline-rose-600 disabled:bg-rose-300",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
    >
      {loading && <Spinner className="size-3.5 border-2" />}
      {children}
    </button>
  );
}

// ─── Field wrappers ──────────────────────────────────────────────────────────

const CONTROL =
  "w-full rounded-lg bg-white px-3 py-2 text-sm text-slate-900 ring-1 ring-slate-300 transition-shadow placeholder:text-slate-400 focus:ring-2 focus:ring-sigmo-green focus:outline-none disabled:bg-slate-100 disabled:text-slate-500";

export function Label({
  children,
  htmlFor,
  hint,
}: {
  children: ReactNode;
  htmlFor?: string;
  hint?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-baseline gap-1.5 text-xs font-medium text-slate-600"
    >
      {children}
      {hint && <span className="text-[11px] font-normal text-slate-400">{hint}</span>}
    </label>
  );
}

export function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
  className,
}: {
  label?: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={htmlFor} hint={hint}>
          {label}
        </Label>
      )}
      {children}
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...rest }, ref) {
    return <input ref={ref} {...rest} className={clsx(CONTROL, className)} />;
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...rest }, ref) {
  return <textarea ref={ref} {...rest} className={clsx(CONTROL, "resize-y", className)} />;
});

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, placeholder, options, ...rest },
  ref,
) {
  return (
    <select ref={ref} {...rest} className={clsx(CONTROL, "pr-8", className)}>
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
});

// ─── Feedback ────────────────────────────────────────────────────────────────

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={clsx(
        "inline-block animate-spin rounded-full border-2 border-current border-t-transparent",
        className ?? "size-5",
      )}
    />
  );
}

export function LoadingBlock({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-500">
      <Spinner className="size-4 text-sigmo-green" />
      {label}
    </div>
  );
}

export function ErrorBlock({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="mx-auto max-w-md rounded-xl bg-rose-50 px-5 py-6 text-center ring-1 ring-rose-200">
      <p className="text-sm font-medium text-rose-800">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-3" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="py-16 text-center">
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      {description && <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}

// ─── Badge & Avatar ──────────────────────────────────────────────────────────

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 whitespace-nowrap",
        className ?? "bg-slate-100 text-slate-700 ring-slate-200",
      )}
    >
      {children}
    </span>
  );
}

export function Avatar({
  name,
  className,
}: {
  name: string | null | undefined;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "inline-flex shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white",
        avatarTone(name),
        className ?? "size-8",
      )}
    >
      {initials(name)}
    </span>
  );
}

// ─── Layout helpers ──────────────────────────────────────────────────────────

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-xl bg-white ring-1 ring-slate-200/80 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-rajdhani text-2xl font-bold tracking-tight text-sigmo-dark">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-rajdhani text-lg font-bold tracking-tight text-sigmo-dark">{children}</h2>
  );
}

/** Read-only label/value pair used across the detail views. */
export function DetailItem({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-[13px] text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold break-words text-slate-900">{value}</dd>
    </div>
  );
}
