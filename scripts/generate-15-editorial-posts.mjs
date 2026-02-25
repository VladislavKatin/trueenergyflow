import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sharp from "sharp";

const root = process.cwd();
const postsDir = path.join(root, "content", "posts");
const imagesDir = path.join(root, "public", "images", "posts");
fs.mkdirSync(postsDir, { recursive: true });
fs.mkdirSync(imagesDir, { recursive: true });

const date = "2026-02-25";

const posts = [
  {
    title: "San Diego Medium Psychic: How to Book a Safe, Grounded Session",
    slug: "san-diego-medium-psychic-safe-grounded-session",
    description:
      "A practical guide for booking a San Diego medium psychic session with clear expectations, ethical boundaries, and realistic outcomes.",
    category: "Intuitive Guidance",
    tags: ["san diego medium psychic", "medium near me", "intuitive readings", "session safety"],
    keyword: "San Diego Medium Psychic",
    services: ["/services/intuitive-readings", "/services/spiritual-coaching"],
    related: ["/blog/intuitive-reading-vs-psychic-reading", "/blog/how-to-journal-after-an-intuitive-reading"]
  },
  {
    title: "Medical Medium Readings vs Intuitive Medical Reading: What Is the Difference?",
    slug: "medical-medium-readings-vs-intuitive-medical-reading",
    description:
      "Understand the difference between medical medium language and intuitive medical reading practices with safe, non-medical framing.",
    category: "Intuitive Guidance",
    tags: ["medical medium readings", "intuitive medical reading", "medical intuitive session", "safe scope"],
    keyword: "medical medium readings",
    services: ["/services/intuitive-readings"],
    related: ["/blog/what-is-an-intuitive-medical-reading", "/blog/safe-way-to-use-medical-intuitive-insights"]
  },
  {
    title: "Medical Intuitive Session: Questions, Boundaries, and Next Steps",
    slug: "medical-intuitive-session-questions-boundaries-next-steps",
    description:
      "A client-first framework for a medical intuitive session, including safe questions, integration steps, and when to involve licensed care.",
    category: "Intuitive Guidance",
    tags: ["medical intuitive session", "intuitive medical reading", "medical intuitive healer", "session prep"],
    keyword: "medical intuitive session",
    services: ["/services/intuitive-readings", "/services/spiritual-coaching"],
    related: ["/blog/questions-to-ask-in-a-medical-intuitive-session", "/blog/what-is-an-intuitive-medical-reading"]
  },
  {
    title: "Medical Medium Near Me: How to Vet a Practitioner Without Hype",
    slug: "medical-medium-near-me-how-to-vet-practitioner",
    description:
      "If you are searching medical medium near me, use this ethical checklist to choose a practitioner with clear language and healthy boundaries.",
    category: "Intuitive Guidance",
    tags: ["medical medium near me", "medical medium", "medium near me", "ethical practitioner"],
    keyword: "medical medium near me",
    services: ["/services/intuitive-readings"],
    related: ["/blog/intuitive-reading-vs-psychic-reading", "/blog/remote-healing-vs-in-person-what-to-choose"]
  },
  {
    title: "Mediumship Mentor Teacher: How Training Actually Works in Real Life",
    slug: "mediumship-mentor-teacher-how-training-works",
    description:
      "A realistic guide to working with a mediumship mentor or teacher, including structure, practice routines, and progress markers.",
    category: "Intuitive Guidance",
    tags: ["mediumship mentor", "mediumship teacher", "medium near me", "spiritual development"],
    keyword: "mediumship mentor/teacher",
    services: ["/services/intuitive-readings", "/services/spiritual-coaching"],
    related: ["/blog/intuitive-guidance-questions-that-create-clarity", "/blog/how-to-set-boundaries-with-spiritual-coaching"]
  },
  {
    title: "Energy Healing Sessions: What Happens from Intake to Integration",
    slug: "energy-healing-sessions-intake-to-integration",
    description:
      "A transparent look at modern energy healing sessions, from intake and intention setting to aftercare and integration.",
    category: "Energy Healing",
    tags: ["energy healing sessions", "energy healing", "spiritual energy healing", "energy balance healing"],
    keyword: "Energy Healing Sessions",
    services: ["/services/energy-healing"],
    related: ["/blog/what-to-expect-in-an-energy-healing-session", "/blog/how-many-energy-healing-sessions-do-you-need"]
  },
  {
    title: "Energy Healer Online: How Virtual Spiritual Energy Healing Works",
    slug: "energy-healer-online-virtual-spiritual-energy-healing",
    description:
      "Learn how an energy healer online typically works, what to prepare, and how to measure progress after virtual sessions.",
    category: "Remote Healing",
    tags: ["energy healer online", "spiritual energy healing", "energy healing", "remote support"],
    keyword: "energy healer online",
    services: ["/services/remote-healing", "/services/energy-healing"],
    related: ["/blog/remote-energy-healing-how-distance-sessions-work", "/blog/how-to-prepare-for-a-remote-reiki-session"]
  },
  {
    title: "Energy Balance Healing: A Practical Weekly Plan for Busy Adults",
    slug: "energy-balance-healing-weekly-plan",
    description:
      "Build a realistic weekly rhythm for energy balance healing with simple habits, boundaries, and tracking methods.",
    category: "Energy Healing",
    tags: ["energy balance healing", "energy healing", "spiritual energy healing", "weekly plan"],
    keyword: "energy balance healing",
    services: ["/services/energy-healing", "/services/spiritual-coaching"],
    related: ["/blog/energy-clearing-routine-for-busy-professionals", "/blog/grounding-practices-after-energy-work"]
  },
  {
    title: "Chakra Healing Session: A Clear Step-by-Step Walkthrough",
    slug: "chakra-healing-session-step-by-step-walkthrough",
    description:
      "A practical chakra healing session guide with session flow, expectation setting, and grounded aftercare.",
    category: "Energy Healing",
    tags: ["chakra healing session", "energy healing sessions", "energy healing", "chakra balance"],
    keyword: "chakra healing session",
    services: ["/services/energy-healing"],
    related: ["/blog/chakra-healing-session-how-it-works", "/blog/chakra-balance-daily-practice-at-home"]
  },
  {
    title: "Remote Reiki and Long-Distance Healing Session: What Clients Should Expect",
    slug: "remote-reiki-long-distance-healing-session-guide",
    description:
      "Everything you need to know about remote reiki and long-distance healing sessions, from preparation to follow-up.",
    category: "Remote Healing",
    tags: ["remote reiki", "remote energy healing", "long-distance healing session", "distance sessions"],
    keyword: "long-distance healing session",
    services: ["/services/remote-healing"],
    related: ["/blog/remote-energy-healing-how-distance-sessions-work", "/blog/remote-healing-aftercare-and-integration-plan"]
  },
  {
    title: "Craniosacral Therapy: What a Full Session Really Feels Like",
    slug: "craniosacral-therapy-full-session-experience",
    description:
      "A grounded guide to craniosacral therapy session flow, sensation patterns, and realistic integration after care.",
    category: "Craniosacral",
    tags: ["craniosacral therapy", "craniosacral session near me", "nervous system regulation", "body awareness"],
    keyword: "craniosacral therapy",
    services: ["/services/craniosacral-therapy"],
    related: ["/blog/craniosacral-therapy-what-it-is-and-what-to-expect", "/blog/craniosacral-therapy-and-nervous-system-regulation"]
  },
  {
    title: "Craniosacral Therapist Near Me: Interview Questions Before You Book",
    slug: "craniosacral-therapist-near-me-interview-questions",
    description:
      "Use these practical interview questions to choose a craniosacral therapist near you with clarity and confidence.",
    category: "Craniosacral",
    tags: ["craniosacral therapist", "craniosacral therapist near me", "craniosacral session near me", "booking checklist"],
    keyword: "craniosacral therapist",
    services: ["/services/craniosacral-therapy"],
    related: ["/blog/how-to-choose-a-craniosacral-therapist", "/blog/craniosacral-aftercare-what-to-do-after-session"]
  },
  {
    title: "Awareness and Consciousness Classes: A Beginner Curriculum That Works",
    slug: "awareness-and-consciousness-classes-beginner-curriculum",
    description:
      "A practical roadmap for awareness and consciousness classes with weekly structure, integration, and accountability.",
    category: "Spiritual Coaching",
    tags: ["awareness and consciousness classes", "spiritual coaching", "mindset coach", "personal growth"],
    keyword: "Awareness and Consciousness Classes",
    services: ["/services/spiritual-coaching"],
    related: ["/blog/spiritual-coaching-how-sessions-are-structured", "/blog/weekly-spiritual-coaching-planner"]
  },
  {
    title: "Spiritual Coaching vs Intuitive Coach vs Mindset Coach: How to Choose",
    slug: "spiritual-coaching-vs-intuitive-coach-vs-mindset-coach",
    description:
      "Compare spiritual coaching, intuitive coaching, and mindset coaching so you can choose the right path for your current goal.",
    category: "Spiritual Coaching",
    tags: ["spiritual coaching", "intuitive coach", "mindset coach", "coaching comparison"],
    keyword: "spiritual coaching",
    services: ["/services/spiritual-coaching", "/services/intuitive-readings"],
    related: ["/blog/spiritual-coaching-vs-therapy-key-differences", "/blog/how-to-choose-between-energy-healing-and-coaching"]
  },
  {
    title: "Emotional Healing Coaching: A Session Structure for Lasting Change",
    slug: "emotional-healing-coaching-session-structure",
    description:
      "A practical emotional healing coaching structure that supports behavior change, self-regulation, and consistent follow-through.",
    category: "Spiritual Coaching",
    tags: ["emotional healing coaching", "spiritual coaching", "intuitive coach", "integration"],
    keyword: "emotional healing coaching",
    services: ["/services/spiritual-coaching", "/services/energy-healing"],
    related: ["/blog/spiritual-coaching-goal-setting-that-actually-works", "/blog/how-to-set-boundaries-with-spiritual-coaching"]
  }
];

function h(input) {
  let acc = 0;
  for (let i = 0; i < input.length; i += 1) acc = (acc * 31 + input.charCodeAt(i)) >>> 0;
  return acc;
}

function xml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function splitTitle(title) {
  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

function svgFromTitle(title, variant) {
  const seed = h(`${title}-${variant}`);
  const palettes = [
    ["#f8fafc", "#dbeafe", "#0f172a"],
    ["#f0f9ff", "#c7f9cc", "#1d3557"],
    ["#fff7ed", "#fde68a", "#7c2d12"],
    ["#f5f3ff", "#ddd6fe", "#312e81"],
    ["#ecfeff", "#cffafe", "#155e75"]
  ];
  const [bg1, bg2, accent] = palettes[seed % palettes.length];
  const [line1, line2] = splitTitle(title);
  const c1 = 180 + (seed % 320);
  const c2 = 760 + (seed % 420);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg1}"/>
      <stop offset="100%" stop-color="${bg2}"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#g)"/>
  <circle cx="${c1}" cy="250" r="170" fill="${accent}" opacity="0.12"/>
  <circle cx="${c2}" cy="570" r="210" fill="${accent}" opacity="0.1"/>
  <path d="M0 710 C260 640 550 830 860 710 C1160 600 1400 760 1600 700 L1600 900 L0 900 Z" fill="${accent}" opacity="0.22"/>
  <text x="90" y="120" font-size="48" font-family="Georgia, serif" fill="${accent}">${xml(line1)}</text>
  <text x="90" y="180" font-size="48" font-family="Georgia, serif" fill="${accent}">${xml(line2)}</text>
</svg>`;
}

function bodyFor(post) {
  const servicesLine = post.services.map((s) => `[${s.replace("/services/", "").replaceAll("-", " ")}](${s})`).join(", ");
  const relatedLine = post.related.map((r) => `[${r.replace("/blog/", "").replaceAll("-", " ")}](${r})`).join(", ");

  let content = `
![${post.title} main image](/images/posts/${post.slug}-1.webp)

${post.keyword} is often searched by people who want clarity, not drama. Most readers are not looking for extreme claims. They are looking for grounded guidance, practical structure, and language that respects personal responsibility. This editorial guide is written for that exact purpose: help you make a better decision with less noise.

## What this service should look like in real life

A useful session starts with intention and context. Before the session begins, define one concrete goal: a relationship decision, work transition, stress recovery pattern, or emotional regulation focus. During the session, guidance should stay clear and specific. After the session, you should leave with one to three realistic actions, not twenty vague ideas.

If your practitioner cannot explain session structure in plain language, that is usually a quality signal to pause. Clear structure matters because it protects your energy, your time, and your expectations.

## Session flow that usually works best

1. Intake and scope check: what you want help with and what is out of scope.
2. Guided session: insight, reflection, and practical interpretation.
3. Integration plan: one weekly action, one boundary, one check-in marker.
4. Follow-up: what changed, what stayed difficult, what to refine next.

This pattern is simple by design. Most people do better with a repeatable process than with intense one-off experiences.

## How to evaluate quality before you book

Use a short pre-booking checklist:

- Are claims realistic and non-medical?
- Are fees, duration, and cancellation terms clear?
- Are boundaries explained up front?
- Is there a clear follow-up process?
- Do you feel more grounded after the call, not more dependent?

Good practitioners support your agency. They do not ask you to outsource your judgment.

## Red flags to avoid

Avoid providers who guarantee exact outcomes, promise cure language, or discourage licensed care when symptoms are clinical. Also avoid sessions that push fear as a sales tactic. Ethical guidance should increase clarity, not urgency panic.

## Practical integration after your session

For seven days, track one measurable signal: reactivity in conflict, quality of sleep, completion of difficult conversations, or consistency of boundaries. Use short notes. This is how you separate meaningful change from temporary emotional intensity.

If you want structured support across multiple sessions, compare: ${servicesLine}.

If you want deeper educational context first, start here: ${relatedLine}.

## Safety and scope

This article is spiritual and educational. It is not medical advice and not a substitute for professional diagnosis or treatment. If you have urgent or persistent symptoms, work directly with licensed healthcare professionals.

## FAQ

### How many sessions should I start with?

Most people begin with one session plus a two-week review. If there is clear value and follow-through, then a short 3-session plan can help create momentum without overcommitting.

### Can this replace therapy or medical care?

No. Spiritual guidance can complement licensed care, not replace it. Keep clinical decisions with qualified medical and mental health professionals.

### What is the best way to prepare?

Bring one goal, one current challenge, and one concrete question. You will get better outcomes when your intention is specific.

![${post.title} secondary image](/images/posts/${post.slug}-2.webp)
`.trim();

  const noSpaces = content.replace(/\s/g, "").length;
  if (noSpaces < 2200) {
    content += `\n\n## Editorial note\n\nThe most reliable progress comes from repetition, not intensity. Keep your plan visible, review weekly, and adjust based on evidence from your daily life.`;
  }

  return content;
}

async function writeImageSet(title, slug) {
  for (const variant of [1, 2]) {
    const svg = svgFromTitle(title, variant);
    const base = path.join(imagesDir, `${slug}-${variant}`);
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(`${base}.png`);
    await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(`${base}.webp`);
    await sharp(Buffer.from(svg)).avif({ quality: 50 }).toFile(`${base}.avif`);
  }
}

async function run() {
  for (const post of posts) {
    const filePath = path.join(postsDir, `${post.slug}.mdx`);
    const frontmatter = {
      title: post.title,
      description: post.description,
      date,
      category: post.category,
      tags: post.tags,
      slug: post.slug,
      canonical: `https://www.trueenergyflow.com/blog/${post.slug}`,
      ogImage: `/images/posts/${post.slug}-1.png`
    };

    const file = matter.stringify(bodyFor(post), frontmatter);
    fs.writeFileSync(filePath, file, "utf8");
    await writeImageSet(post.title, post.slug);
    const countNoSpace = bodyFor(post).replace(/\s/g, "").length;
    console.log(`${post.slug}: ${countNoSpace} chars(no-space)`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
