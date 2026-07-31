import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError } from "./api";

export function errorMessage(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Something went wrong.";
}

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Runs `fn` on mount and whenever `deps` change. `reload` re-runs it on demand.
 * Stale responses are dropped so fast filter changes can't render out of order.
 */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fnRef = useRef(fn);
  fnRef.current = fn;
  const runId = useRef(0);

  const run = useCallback(async () => {
    const id = ++runId.current;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await fnRef.current();
      if (id === runId.current) setState({ data, loading: false, error: null });
    } catch (err) {
      if (id === runId.current) {
        setState({ data: null, loading: false, error: errorMessage(err) });
      }
    }
  }, []);

  useEffect(() => {
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ...state, reload: run, setData: (data: T) => setState({ data, loading: false, error: null }) };
}

/** Debounces a rapidly-changing value (search inputs). */
export function useDebounced<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
