import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { Button } from "./primitives";
import type { Pagination as PaginationMeta } from "../lib/types";

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  );
}

export function Th({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={clsx(
        "sticky top-0 z-10 whitespace-nowrap border-b border-slate-200 bg-slate-50/95 px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase backdrop-blur",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <td className={clsx("border-b border-slate-100 px-4 py-3 align-middle", className)}>
      {children}
    </td>
  );
}

export function Tr({
  children,
  onDoubleClick,
  interactive = false,
  title,
}: {
  children: ReactNode;
  onDoubleClick?: () => void;
  interactive?: boolean;
  title?: string;
}) {
  return (
    <tr
      onDoubleClick={onDoubleClick}
      title={title}
      className={clsx(
        "transition-colors",
        interactive && "cursor-pointer select-none hover:bg-sigmo-green/5",
      )}
    >
      {children}
    </tr>
  );
}

export function Pagination({
  pagination,
  onPageChange,
}: {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}) {
  const { page, limit, total, totalPages } = pagination;
  if (total === 0) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3">
      <p className="text-xs text-slate-500">
        Showing <span className="font-semibold text-slate-700">{from}</span>–
        <span className="font-semibold text-slate-700">{to}</span> of{" "}
        <span className="font-semibold text-slate-700">{total}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="size-3.5" />
          Prev
        </Button>
        <span className="text-xs font-medium text-slate-600">
          Page {page} of {Math.max(totalPages, 1)}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <ChevronRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
