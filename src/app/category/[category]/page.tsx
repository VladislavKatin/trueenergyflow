import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { buildMetadata } from "@/lib/seo";
import { getAllCategories, getPostsByCategory } from "@/lib/content";

type Props = {
  params: Promise<{ category: string }>;
};

const categoryStarts: Record<string, Array<{ title: string; href: string }>> = {
  "Energy Healing": [
    { title: "What to Expect in an Energy Healing Session", href: "/blog/what-to-expect-in-an-energy-healing-session" },
    { title: "Energy Healing vs Reiki", href: "/blog/energy-healing-vs-reiki" },
    { title: "Energy Healing for Beginners: Complete Guide", href: "/blog/energy-healing-for-beginners-complete-guide" }
  ],
  "Remote Healing": [
    { title: "Remote Energy Healing: How Distance Sessions Work", href: "/blog/remote-energy-healing-how-distance-sessions-work" },
    { title: "How to Prepare for a Remote Reiki Session", href: "/blog/how-to-prepare-for-a-remote-reiki-session" },
    { title: "Remote Healing Aftercare and Integration Plan", href: "/blog/remote-healing-aftercare-and-integration-plan" }
  ],
  Craniosacral: [
    { title: "Craniosacral Therapy: What It Is and What to Expect", href: "/blog/craniosacral-therapy-what-it-is-and-what-to-expect" },
    { title: "Craniosacral Therapy and Nervous System Regulation", href: "/blog/craniosacral-therapy-and-nervous-system-regulation" },
    { title: "How to Choose a Craniosacral Therapist", href: "/blog/how-to-choose-a-craniosacral-therapist" }
  ],
  "Intuitive Readings": [
    { title: "Intuitive Reading vs Psychic Reading", href: "/blog/intuitive-reading-vs-psychic-reading" },
    { title: "What Is an Intuitive Medical Reading?", href: "/blog/what-is-an-intuitive-medical-reading" },
    { title: "Questions to Ask in a Medical Intuitive Session", href: "/blog/questions-to-ask-in-a-medical-intuitive-session" }
  ],
  "Spiritual Coaching": [
    { title: "Spiritual Coaching: How Sessions Are Structured", href: "/blog/spiritual-coaching-how-sessions-are-structured" },
    { title: "Spiritual Coaching Goal Setting That Actually Works", href: "/blog/spiritual-coaching-goal-setting-that-actually-works" },
    { title: "Spiritual Coaching vs Intuitive Coach vs Mindset Coach", href: "/blog/spiritual-coaching-vs-intuitive-coach-vs-mindset-coach" }
  ]
};

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  return buildMetadata({
    title: `${decoded} Articles`,
    description: `Browse ${decoded} resources and educational articles.`,
    path: `/category/${encodeURIComponent(decoded)}`
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const posts = getPostsByCategory(decoded);
  if (posts.length === 0) notFound();
  const heroImage = posts[0]?.ogImage ?? "/images/posts/what-to-expect-in-an-energy-healing-session-1.webp";
  const featured = categoryStarts[decoded] ?? [];

  return (
    <section className="space-y-8">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Category archive</p>
            <h1 className="mt-2 font-[family-name:var(--font-serif)] text-4xl font-black text-slate-900 md:text-5xl">{decoded}</h1>
            <p className="mt-3 text-slate-600">{posts.length} articles in this topic.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Image src={heroImage} alt={`${decoded} category`} width={1600} height={900} className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      {featured.length > 0 && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Start Here</p>
          <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl font-black text-slate-900">Core Guides in {decoded}</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            These are the strongest evergreen articles in this category and the best starting points for new readers.
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {featured.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-medium text-sky-700 hover:text-sky-800">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
