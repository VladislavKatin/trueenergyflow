import Link from "next/link";
import type { ContentItem, ServiceFrontmatter } from "@/lib/types";

type ServiceCardProps = {
  service: ContentItem<ServiceFrontmatter>;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Service</p>
      <h3 className="mt-2 text-2xl font-bold text-slate-900">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
      <Link
        href={`/services/${service.slug}`}
        className="mt-5 inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition group-hover:border-slate-500 group-hover:text-slate-900"
      >
        Learn more
      </Link>
    </article>
  );
}
