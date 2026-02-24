import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const postsDir = path.join(root, "content", "posts");
fs.mkdirSync(postsDir, { recursive: true });

const categoryImage = {
  "Energy Healing": {
    og: "/images/posts/energy-healing-for-beginners-complete-guide-1.png",
    inPost: "/images/posts/energy-healing-for-beginners-complete-guide-2.png"
  },
  "Remote Healing": {
    og: "/images/posts/remote-energy-healing-how-distance-sessions-work-1.png",
    inPost: "/images/posts/remote-energy-healing-how-distance-sessions-work-2.png"
  },
  "Intuitive Guidance": {
    og: "/images/posts/intuitive-reading-vs-psychic-reading-1.png",
    inPost: "/images/posts/intuitive-reading-vs-psychic-reading-2.png"
  },
  Craniosacral: {
    og: "/images/posts/craniosacral-therapy-what-it-is-and-what-to-expect-1.png",
    inPost: "/images/posts/craniosacral-therapy-what-it-is-and-what-to-expect-2.png"
  },
  "Spiritual Coaching": {
    og: "/images/posts/spiritual-coaching-how-sessions-are-structured-1.png",
    inPost: "/images/posts/spiritual-coaching-how-sessions-are-structured-2.png"
  }
};

const posts = [
  {
    title: "Energy Healing for Anxiety Support: A Safe, Grounded Approach",
    slug: "energy-healing-for-anxiety-support-with-boundaries",
    date: "2026-02-20",
    category: "Energy Healing",
    tags: ["energy healing", "anxiety support", "nervous system", "safe practices"]
  },
  {
    title: "How Many Energy Healing Sessions Do You Actually Need?",
    slug: "how-many-energy-healing-sessions-do-you-need",
    date: "2026-02-19",
    category: "Energy Healing",
    tags: ["energy healing", "session planning", "wellness", "expectations"]
  },
  {
    title: "A 15-Minute Energy Clearing Routine for Busy Professionals",
    slug: "energy-clearing-routine-for-busy-professionals",
    date: "2026-02-18",
    category: "Energy Healing",
    tags: ["energy clearing", "daily routine", "stress", "burnout"]
  },
  {
    title: "Remote Healing Checklist: Before and After Your Session",
    slug: "remote-healing-checklist-before-and-after-session",
    date: "2026-02-17",
    category: "Remote Healing",
    tags: ["remote healing", "checklist", "session prep", "aftercare"]
  },
  {
    title: "Remote Healing vs In-Person Sessions: What Should You Choose?",
    slug: "remote-healing-vs-in-person-what-to-choose",
    date: "2026-02-16",
    category: "Remote Healing",
    tags: ["remote healing", "in-person", "comparison", "session choice"]
  },
  {
    title: "Best Time of Day for a Remote Energy Healing Session",
    slug: "best-time-of-day-for-remote-energy-healing",
    date: "2026-02-15",
    category: "Remote Healing",
    tags: ["remote healing", "timing", "sleep", "routine"]
  },
  {
    title: "How to Use an Intuitive Reading for Career Decisions",
    slug: "intuitive-reading-for-career-decisions",
    date: "2026-02-14",
    category: "Intuitive Guidance",
    tags: ["intuitive reading", "career", "clarity", "decision-making"]
  },
  {
    title: "Intuitive Reading for Relationship Clarity: Practical Questions to Ask",
    slug: "intuitive-reading-for-relationship-clarity",
    date: "2026-02-13",
    category: "Intuitive Guidance",
    tags: ["intuitive guidance", "relationships", "questions", "clarity"]
  },
  {
    title: "How to Journal After an Intuitive Reading So Insights Stick",
    slug: "how-to-journal-after-an-intuitive-reading",
    date: "2026-02-12",
    category: "Intuitive Guidance",
    tags: ["intuitive reading", "journaling", "integration", "personal growth"]
  },
  {
    title: "The Safe Way to Use Medical-Intuitive Style Insights",
    slug: "safe-way-to-use-medical-intuitive-insights",
    date: "2026-02-11",
    category: "Intuitive Guidance",
    tags: ["medical intuitive", "safety", "scope", "health questions"]
  },
  {
    title: "Craniosacral Therapy for Stress Recovery: Beginner Basics",
    slug: "craniosacral-for-stress-recovery-basics",
    date: "2026-02-10",
    category: "Craniosacral",
    tags: ["craniosacral", "stress recovery", "beginners", "body awareness"]
  },
  {
    title: "7 Signs Your Nervous System Needs Regulation Support",
    slug: "signs-your-nervous-system-needs-regulation",
    date: "2026-02-09",
    category: "Craniosacral",
    tags: ["nervous system", "regulation", "stress", "wellbeing"]
  },
  {
    title: "Craniosacral Aftercare: What to Do in the First 48 Hours",
    slug: "craniosacral-aftercare-what-to-do-after-session",
    date: "2026-02-08",
    category: "Craniosacral",
    tags: ["craniosacral", "aftercare", "integration", "recovery"]
  },
  {
    title: "Spiritual Coaching vs Therapy: Key Differences and Boundaries",
    slug: "spiritual-coaching-vs-therapy-key-differences",
    date: "2026-02-07",
    category: "Spiritual Coaching",
    tags: ["spiritual coaching", "therapy", "boundaries", "support options"]
  },
  {
    title: "A Weekly Spiritual Coaching Planner That Actually Works",
    slug: "weekly-spiritual-coaching-planner",
    date: "2026-02-06",
    category: "Spiritual Coaching",
    tags: ["spiritual coaching", "planner", "accountability", "execution"]
  },
  {
    title: "How Spiritual Coaching Helps You Set Better Boundaries",
    slug: "how-to-set-boundaries-with-spiritual-coaching",
    date: "2026-02-05",
    category: "Spiritual Coaching",
    tags: ["spiritual coaching", "boundaries", "self-leadership", "communication"]
  },
  {
    title: "A Realistic Chakra Balance Practice You Can Do at Home",
    slug: "chakra-balance-daily-practice-at-home",
    date: "2026-02-04",
    category: "Energy Healing",
    tags: ["chakra healing", "home practice", "energy hygiene", "daily routine"]
  },
  {
    title: "Grounding Practices After Energy Work: What Helps Most",
    slug: "grounding-practices-after-energy-work",
    date: "2026-02-03",
    category: "Energy Healing",
    tags: ["grounding", "aftercare", "energy work", "integration"]
  },
  {
    title: "Energy Healing or Spiritual Coaching: How to Choose",
    slug: "how-to-choose-between-energy-healing-and-coaching",
    date: "2026-02-02",
    category: "Spiritual Coaching",
    tags: ["energy healing", "spiritual coaching", "service choice", "clarity"]
  },
  {
    title: "Your First 30 Days in Spiritual Practice: A Practical Roadmap",
    slug: "first-30-days-after-starting-spiritual-practice",
    date: "2026-02-01",
    category: "Spiritual Coaching",
    tags: ["spiritual practice", "beginner roadmap", "consistency", "self-trust"]
  }
];

function buildBody(title, slug, category) {
  const linksByCategory = {
    "Energy Healing": ["/services/energy-healing", "/blog/energy-healing-vs-reiki"],
    "Remote Healing": ["/services/remote-healing", "/blog/how-to-prepare-for-a-remote-reiki-session"],
    "Intuitive Guidance": ["/services/intuitive-readings", "/blog/intuitive-reading-vs-psychic-reading"],
    Craniosacral: ["/services/craniosacral-therapy", "/blog/how-to-choose-a-craniosacral-therapist"],
    "Spiritual Coaching": ["/services/spiritual-coaching", "/blog/spiritual-coaching-how-sessions-are-structured"]
  };
  const [serviceLink, articleLink] = linksByCategory[category];

  return `
## Why this topic matters

${title} is one of the most searched topics for people who want spiritual support without exaggerated language. The core issue is usually not information overload, but implementation overload. People often know what they should do, but they need a process that fits normal life.

At True Energy Flow, we use a practical model: intention, session structure, and post-session integration. That model helps readers move from analysis to action and from temporary relief to repeatable patterns.

## What to do first

Start with one question you can answer honestly: what is currently draining your energy the most? Keep this specific. A useful answer sounds like "I cannot switch off after work" or "I delay difficult conversations until I feel depleted."

Next, choose one support path and one metric. For support, compare [service details](${serviceLink}) with your current goal. For a metric, track one signal daily for two weeks: emotional reactivity, sleep quality, boundary follow-through, or recovery speed after stress.

## Common mistakes

The first mistake is expecting one session to solve a long-standing pattern. The second is collecting insight without changing behavior. The third is using spiritual language to avoid practical responsibilities.

A better approach is simple:

1. one session intention in plain language
2. one integration task within 24 hours
3. one weekly review at the same time each week

This creates momentum while keeping expectations realistic.

## A practical 7-day protocol

Use this structure after your session or reading:

- Day 1: write three insights in concrete language
- Day 2: remove one recurring energy drain
- Day 3: complete one delayed decision
- Day 4: observe stress recovery patterns
- Day 5: adjust one boundary in schedule or communication
- Day 6: review results and refine your plan
- Day 7: choose one next action for the coming week

This protocol keeps insight connected to action and helps prevent regressions.

## Safety and scope

This content is spiritual and educational. It is not medical advice and not a substitute for diagnosis or treatment. If symptoms are urgent, persistent, or severe, licensed care should remain central.

When "medical intuitive" language appears in this space, it is used only as reflective guidance and never as clinical conclusion.

## Related reading

- Service page: [${category}](${serviceLink})
- Deep dive article: [continue reading](${articleLink})
- Contact for booking: [Book a session](/contact)
- Full scope language: [Disclaimer](/disclaimer)
`;
}

for (const post of posts) {
  const img = categoryImage[post.category];
  const frontmatter = {
    title: post.title,
    description: `${post.title}. Practical guidance, safe framing, and clear next steps for readers in the United States.`,
    date: post.date,
    category: post.category,
    tags: post.tags,
    slug: post.slug,
    canonical: `https://trueenergyflow.com/blog/${post.slug}`,
    ogImage: img.og
  };

  const body = `${buildBody(post.title, post.slug, post.category)}

![${post.title} image 2](${img.inPost})
`;

  const filePath = path.join(postsDir, `${post.slug}.mdx`);
  fs.writeFileSync(filePath, matter.stringify(body.trimStart(), frontmatter));
}

console.log(`Created ${posts.length} posts in ${postsDir}`);
