import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Button, Card, Field, Input } from "../ui/primitives";
import { SigmoMark } from "../../components/SigmoMark";
import { errorMessage } from "../lib/useAsync";

export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  const from = (location.state as { from?: string } | null)?.from ?? "/admin";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const signedIn = await login(email.trim(), password);
      navigate(signedIn.role === "admin" ? from : "/admin/my-clusters", { replace: true });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-sigmo-light px-4 py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-96 rounded-full bg-sigmo-green/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 size-96 rounded-full bg-sigmo-green/10 blur-3xl"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-6 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-sigmo-green text-white shadow-lg shadow-sigmo-green/30">
            <SigmoMark className="size-8" />
          </span>
          <h1 className="font-rajdhani mt-4 text-3xl font-bold tracking-tight text-sigmo-dark">
            Sigmo<span className="text-sigmo-green">IT</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to the Admin Console</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Email address" htmlFor="email">
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                autoFocus
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            <Field label="Password" htmlFor="password">
              <Input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 ring-1 ring-rose-200"
              >
                {error}
              </p>
            )}

            <Button type="submit" loading={loading} className="w-full">
              Sign in
            </Button>
          </form>
        </Card>

        <p className="mt-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} SigmoIT. All rights reserved.
        </p>
      </div>
    </div>
  );
}
