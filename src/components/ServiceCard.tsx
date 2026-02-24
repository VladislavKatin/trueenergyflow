import Link from "next/link";
import type { ContentItem, ServiceFrontmatter } from "@/lib/types";

type ServiceCardProps = {
  service: ContentItem<ServiceFrontmatter>;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
      <Link
        href={`/services/${service.slug}`}
        className="mt-5 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-900"
      >
        Learn more
      </Link>
    </article>
  );
}

