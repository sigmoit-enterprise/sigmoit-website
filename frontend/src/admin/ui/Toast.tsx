import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";
import { clsx } from "clsx";

type Tone = "success" | "error" | "info";

interface Toast {
  id: number;
  tone: Tone;
  message: string;
}

interface ToastValue {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastValue | null>(null);

const TONE_STYLES: Record<Tone, string> = {
  success: "bg-emerald-600 text-white",
  error: "bg-rose-600 text-white",
  info: "bg-slate-800 text-white",
};

const TONE_ICONS: Record<Tone, typeof Info> = {
  success: CheckCircle2,
  error: CircleAlert,
  info: Info,
};

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (tone: Tone, message: string) => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, tone, message }]);
      setTimeout(() => dismiss(id), 5000);
    },
    [dismiss],
  );

  const value = useMemo<ToastValue>(
    () => ({
      success: (m) => push("success", m),
      error: (m) => push("error", m),
      info: (m) => push("info", m),
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed bottom-5 right-5 z-200 flex w-full max-w-sm flex-col gap-2">
          {toasts.map((toast) => {
            const Icon = TONE_ICONS[toast.tone];
            return (
              <div
                key={toast.id}
                role="status"
                className={clsx(
                  "pointer-events-auto flex animate-[card-open_160ms_ease-out] items-start gap-3 rounded-xl px-4 py-3 shadow-lg",
                  TONE_STYLES[toast.tone],
                )}
              >
                <Icon className="mt-0.5 size-4 shrink-0" />
                <p className="flex-1 text-sm font-medium">{toast.message}</p>
                <button
                  onClick={() => dismiss(toast.id)}
                  aria-label="Dismiss"
                  className="shrink-0 rounded p-0.5 opacity-70 transition-opacity hover:opacity-100"
                >
                  <X className="size-4" />
                </button>
              </div>
            );
          })}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
