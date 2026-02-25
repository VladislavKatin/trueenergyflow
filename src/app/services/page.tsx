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

const serviceFaqs = [
  {
    question: "Which service is best if I am new?",
    answer:
      "Most first-time clients start with Energy Healing or Spiritual Coaching, then adjust based on goals and integration pace."
  },
  {
    question: "Are sessions available remotely in every U.S. state?",
    answer:
      "Yes. Remote sessions are available across the United States with preparation and aftercare guidance."
  },
  {
    question: "Do these services replace medical or mental health care?",
    answer:
      "No. Services are spiritual and educational and do not replace licensed diagnosis or treatment."
  }
];

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

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <section className="space-y-10">
      <JsonLd data={itemListLd} />
      <JsonLd data={faqLd} />

      <header className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-8 p-6 md:grid-cols-[1.2fr_1fr] md:p-12">
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
              src="/images/posts/what-to-expect-in-an-energy-healing-session-1.webp"
              alt="Spiritual wellness services"
              width={1600}
              height={900}
              sizes="(max-width: 768px) 100vw, 42vw"
              priority
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

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
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

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl font-black text-slate-900">Services FAQ</h2>
        <div className="mt-6 space-y-4">
          {serviceFaqs.map((faq) => (
            <article key={faq.question} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <h3 className="text-lg font-bold text-slate-900">{faq.question}</h3>
              <p className="mt-2 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
