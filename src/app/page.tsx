import Image from "next/image";
import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { PostCard } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts, getAllServices } from "@/lib/content";
import { siteConfig } from "@/config/siteConfig";
import { ParticleSupportBanner } from "@/components/ParticleSupportBanner";

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
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <div className="space-y-20">
      <JsonLd data={faqLd} />
      <ParticleSupportBanner />
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 shadow-sm">
        <div className="grid items-center gap-8 p-6 md:grid-cols-[1.25fr_1fr] md:p-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Nationwide spiritual wellness</p>
            <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-serif)] text-4xl font-black leading-tight text-slate-900 md:text-6xl">
              Practical energy healing guidance for modern life in the U.S.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              True Energy Flow offers energy healing education, remote healing sessions, intuitive/spiritual guidance,
              craniosacral resources, and spiritual coaching for people across the United States.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={siteConfig.bookingUrl}
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Book a session
              </Link>
              <Link
                href="/services/energy-healing"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Explore services
              </Link>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-1 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid-cols-3">
              <span className="rounded-full bg-slate-100 px-3 py-2">Safe scope</span>
              <span className="rounded-full bg-slate-100 px-3 py-2">Remote USA</span>
              <span className="rounded-full bg-slate-100 px-3 py-2">Editorial blog</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <Image
              src="/images/posts/chakra-balance-daily-practice-at-home-1.png"
              alt="True Energy Flow spiritual wellness"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="grid gap-4 border-t border-slate-200 bg-slate-50/80 px-8 py-4 text-sm text-slate-600 md:grid-cols-3 md:px-12">
          <p>Energy Healing</p>
          <p>Remote Healing</p>
          <p>Intuitive and Craniosacral Support</p>
        </div>
      </section>

      <section>
        <div className="mb-7 flex items-end justify-between">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl font-black text-slate-900 md:text-4xl">Services</h2>
          <Link href="/contact" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            Book a session
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.1fr_1fr] md:p-10">
        <div>
          <h2 className="font-[family-name:var(--font-serif)] text-3xl font-black text-slate-900 md:text-4xl">
            Energy healing and intuitive support for real-life decisions
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            If you are searching for grounded spiritual support in the United States, this site is designed to help you
            choose the right path. We publish practical guidance on energy healing sessions, remote session preparation,
            intuitive reading boundaries, craniosacral expectations, and coaching frameworks that help with follow-through.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Start with{" "}
            <Link href="/services" className="font-semibold text-slate-900 underline">
              Services
            </Link>{" "}
            to compare options, then use the{" "}
            <Link href="/blog" className="font-semibold text-slate-900 underline">
              Blog
            </Link>{" "}
            for detailed how-to articles and preparation checklists.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <Image
            src="/images/posts/remote-energy-healing-how-distance-sessions-work-2.png"
            alt="Remote healing and spiritual wellness guidance"
            width={1600}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section>
        <div className="mb-7 flex items-end justify-between">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl font-black text-slate-900 md:text-4xl">Latest Articles</h2>
          <Link href="/blog" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl font-black text-slate-900 md:text-4xl">FAQ</h2>
        <div className="mt-6 space-y-6">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <h3 className="text-lg font-bold text-slate-900">{faq.question}</h3>
              <p className="mt-2 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
