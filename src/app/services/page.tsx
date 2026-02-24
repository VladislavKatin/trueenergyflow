import Image from "next/image";
import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts, getAllServices } from "@/lib/content";
import { siteConfig, toAbsoluteUrl } from "@/config/siteConfig";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Explore Energy Healing, Remote Healing, Intuitive Readings, Craniosacral Therapy, and Spiritual Coaching across the USA.",
  path: "/services"
});

export default function ServicesPage() {
  const services = getAllServices();
  const posts = getAllPosts().slice(0, 5);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: toAbsoluteUrl(`/services/${service.slug}`)
    }))
  };

  return (
    <section className="space-y-10">
      <JsonLd data={itemListLd} />

      <header className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-8 p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Services in the USA</p>
            <h1 className="mt-3 font-[family-name:var(--font-serif)] text-4xl font-black leading-tight text-slate-900 md:text-5xl">
              Spiritual wellness services with practical structure and clear boundaries
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              We offer educational and spiritual support through Energy Healing, Remote Healing, Intuitive Guidance,
              Craniosacral-informed sessions, and Spiritual Coaching. Every session is designed for clarity,
              grounded integration, and responsible scope.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={siteConfig.bookingUrl} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                Book a session
              </Link>
              <Link href="/disclaimer" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700">
                Read scope disclaimer
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src="/images/posts/what-to-expect-in-an-energy-healing-session-1.png"
              alt="Spiritual wellness services"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>

      <section>
        <h2 className="font-[family-name:var(--font-serif)] text-3xl font-black text-slate-900">All Services</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Choose the service that matches your current goal. If you are new, start with{" "}
          <Link href="/services/energy-healing" className="font-semibold text-slate-900 underline">
            Energy Healing
          </Link>{" "}
          or{" "}
          <Link href="/services/spiritual-coaching" className="font-semibold text-slate-900 underline">
            Spiritual Coaching
          </Link>
          .
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl font-black text-slate-900">Helpful Reading Before Booking</h2>
        <p className="mt-3 text-slate-600">
          These guides answer common questions and improve session outcomes by setting realistic expectations.
        </p>
        <ul className="mt-5 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="underline hover:text-slate-900">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
