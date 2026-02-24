import Image from "next/image";
import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { PostCard } from "@/components/PostCard";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts, getAllServices } from "@/lib/content";
import { siteConfig } from "@/config/siteConfig";

export const metadata = buildMetadata({
  title: "Energy Healing and Spiritual Guidance in the USA",
  description:
    "Explore energy healing, remote sessions, intuitive guidance, craniosacral support, and spiritual coaching with practical, safe education.",
  path: "/"
});

const faqs = [
  {
    question: "Can these services replace medical treatment?",
    answer:
      "No. Sessions and educational resources are spiritual in nature and are not a substitute for diagnosis or treatment from licensed medical professionals."
  },
  {
    question: "Do you offer remote sessions across the USA?",
    answer:
      "Yes. Remote sessions are available and designed with clear preparation and grounding practices."
  },
  {
    question: "How do I book a session?",
    answer: "Use the Book a session button or contact page with your goals and preferred session type."
  }
];

export default function HomePage() {
  const services = getAllServices();
  const latestPosts = getAllPosts().slice(0, 6);

  return (
    <div className="space-y-16">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">True Energy Flow</p>
            <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-serif)] text-4xl font-semibold text-slate-900 md:text-5xl">
              Grounded spiritual support for clarity, balance, and next steps.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              True Energy Flow offers energy healing education, remote healing sessions, intuitive/spiritual guidance,
              craniosacral resources, and spiritual coaching for people across the United States.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={siteConfig.bookingUrl}
                className="rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
              >
                Book a session
              </Link>
              <Link
                href="/services/energy-healing"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Explore services
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Image src="/og.png" alt="True Energy Flow" width={1200} height={630} className="h-full w-full object-cover" priority />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-slate-900">Services</h2>
          <Link href="/contact" className="text-sm font-semibold text-sky-700 hover:text-sky-900">
            Book a session
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-slate-900">Latest Articles</h2>
          <Link href="/blog" className="text-sm font-semibold text-sky-700 hover:text-sky-900">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl font-semibold text-slate-900">FAQ</h2>
        <div className="mt-6 space-y-6">
          {faqs.map((faq) => (
            <article key={faq.question}>
              <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
              <p className="mt-2 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
