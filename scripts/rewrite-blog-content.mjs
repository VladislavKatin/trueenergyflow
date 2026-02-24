import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const postsDir = path.join(root, "content", "posts");
const imagesDir = path.join(root, "public", "images", "posts");
fs.mkdirSync(imagesDir, { recursive: true });

const editorialBySlug = {
  "what-to-expect-in-an-energy-healing-session": {
    lead:
      "A first session usually feels more practical than people expect: short check-in, guided stillness, and one grounded next step.",
    core:
      "Instead of chasing intensity, focus on useful markers: calmer breathing, clearer communication, and faster recovery from stress.",
    week:
      "Keep your schedule lighter after the session, write one integration note, and complete one small action within 24 hours."
  },
  "signs-your-energy-is-out-of-balance": {
    lead:
      "Imbalance often shows up in everyday life first: low patience, poor recovery, scattered attention, and weak boundaries.",
    core:
      "You do not need a dramatic reset. A three-day reduction in noise, consistent sleep timing, and cleaner commitments can shift your baseline.",
    week:
      "Track one indicator morning and evening: reactivity, clarity, or tension level."
  },
  "chakra-healing-session-how-it-works": {
    lead:
      "A chakra session can be understood as themed reflection around safety, expression, boundaries, and meaning.",
    core:
      "The useful part is translation: what does this insight change in how you speak, decide, or protect your energy this week?",
    week:
      "Leave each session with one concrete conversation or boundary adjustment."
  },
  "energy-healing-vs-reiki": {
    lead:
      "Reiki is a specific method. Energy healing is a broader category that may include dialogue, customization, and coaching-style integration.",
    core:
      "Choose by session style, not by label. Some people need quiet consistency; others need structured reflection and action planning.",
    week:
      "After two sessions, assess fit by outcomes, not by expectations."
  },
  "remote-energy-healing-how-distance-sessions-work": {
    lead:
      "Remote sessions work best when they are structured: clear intention, focused quiet phase, and practical debrief.",
    core:
      "Distance is less important than attention quality, boundaries, and follow-through after the session.",
    week:
      "Use a two-week scorecard for sleep quality, stress recovery speed, and decision clarity."
  },
  "how-to-prepare-for-a-remote-reiki-session": {
    lead:
      "Preparation is not elaborate. It is mostly about reducing friction: quiet room, clear intention, and breathing space before/after.",
    core:
      "People who prepare simply and integrate quickly usually report better outcomes than those who over-ritualize.",
    week:
      "Treat your first remote session like a focused appointment with yourself, not a passive experience."
  },
  "intuitive-reading-vs-psychic-reading": {
    lead:
      "The key difference is often agency. Intuitive sessions usually emphasize your choices; predictive styles can feel more directive.",
    core:
      "A useful reading should increase responsibility and clarity, not dependency or certainty-seeking.",
    week:
      "Bring one real decision to your session and leave with one action you can complete in 24 hours."
  },
  "what-is-an-intuitive-medical-reading": {
    lead:
      "Safe framing matters: intuitive medical work should be treated as reflective guidance, never diagnosis.",
    core:
      "The healthiest use case is question-building for clinical conversations, not replacing licensed evaluation.",
    week:
      "If health themes arise, turn them into questions for your physician and track symptom context responsibly."
  },
  "questions-to-ask-in-a-medical-intuitive-session": {
    lead:
      "In sensitive sessions, your question quality directly affects safety and usefulness.",
    core:
      "Ask scope-first questions, ask for integration steps, and ask how to bring insights into licensed care conversations.",
    week:
      "Keep a short written list: what is reflection, what is action, and what belongs to clinical follow-up."
  },
  "craniosacral-therapy-what-it-is-and-what-to-expect": {
    lead:
      "Craniosacral sessions are often subtle and gentle. The best outcomes are usually cumulative, not dramatic.",
    core:
      "Focus on function markers: easier breathing, lower body guarding, and improved stress recovery.",
    week:
      "Pair each session with one regulation habit to extend the effect."
  },
  "how-to-choose-a-craniosacral-therapist": {
    lead:
      "Provider fit is the deciding factor. Clear communication and boundaries matter more than marketing language.",
    core:
      "A good therapist can explain process, limits, and follow-up in plain language without certainty claims.",
    week:
      "Use one trial session and evaluate based on clarity, safety, and practical next steps."
  },
  "spiritual-coaching-how-sessions-are-structured": {
    lead:
      "Strong spiritual coaching is structured: review, clarify, commit, and measure.",
    core:
      "Inspiration helps, but progress comes from weekly execution and honest accountability.",
    week:
      "End every session with one non-negotiable action and one review date."
  },
  "energy-healing-for-beginners-complete-guide": {
    lead:
      "Beginners do best with simple expectations: one clear intention, one clear session, one clear integration step.",
    core:
      "You do not need complicated theory. You need a repeatable process that improves daily function.",
    week:
      "Measure progress by communication, boundaries, and recovery speed."
  },
  "remote-healing-aftercare-and-integration-plan": {
    lead:
      "Most gains are made after the session, not during it. Integration is where clarity becomes behavior.",
    core:
      "A seven-day plan keeps the signal alive: stabilize, act, refine boundaries, review.",
    week:
      "Keep aftercare minimal and consistent rather than intense and unsustainable."
  },
  "intuitive-guidance-questions-that-create-clarity": {
    lead:
      "Good intuitive sessions start with better questions, not better predictions.",
    core:
      "Questions should reduce noise, expose the real decision, and generate one practical next step.",
    week:
      "Use a before/during/after question set and review outcomes at day seven."
  },
  "craniosacral-therapy-and-nervous-system-regulation": {
    lead:
      "Regulation is a better target than intensity. The goal is quicker recovery, not constant calm.",
    core:
      "Craniosacral support can be useful when paired with sleep consistency, breathing resets, and boundary cleanup.",
    week:
      "Track one regulation metric daily and reassess after two weeks."
  },
  "spiritual-coaching-goal-setting-that-actually-works": {
    lead:
      "The gap between intention and outcome is usually goal design, not motivation.",
    core:
      "Goals become workable when they are specific, time-bound, and linked to weekly accountability.",
    week:
      "Translate one spiritual intention into one measurable behavior by tonight."
  }
};

const internalLinks = [
  ["/services/energy-healing", "Energy Healing"],
  ["/services/remote-healing", "Remote Healing"],
  ["/services/intuitive-readings", "Intuitive Readings"],
  ["/services/craniosacral-therapy", "Craniosacral Therapy"],
  ["/services/spiritual-coaching", "Spiritual Coaching"],
  ["/blog/what-to-expect-in-an-energy-healing-session", "What to Expect in an Energy Healing Session"],
  ["/blog/remote-energy-healing-how-distance-sessions-work", "Remote Energy Healing"],
  ["/blog/intuitive-reading-vs-psychic-reading", "Intuitive vs Psychic Reading"],
  ["/blog/how-to-choose-a-craniosacral-therapist", "How to Choose a Craniosacral Therapist"],
  ["/blog/spiritual-coaching-how-sessions-are-structured", "Spiritual Coaching Structure"]
];

function hashCode(input) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pickLinks(slug) {
  const seed = hashCode(slug);
  const one = internalLinks[seed % internalLinks.length];
  const two = internalLinks[(seed + 3) % internalLinks.length];
  return [one, two];
}

function buildBody({ slug, title, category, description, tags }) {
  const [linkOne, linkTwo] = pickLinks(slug);
  const entry = editorialBySlug[slug] ?? {
    lead: "This topic is handled with practical language and clear boundaries.",
    core: "The goal is to improve decisions and daily function, not to promise certainty.",
    week: "Use one small action and one measurable marker this week."
  };
  const keywordLine = tags?.slice(0, 3).join(", ") || category;

  return `
## Editorial update

Our editorial team rewrote this page to remove repetitive language and make it more useful for real readers in everyday life. This version is written in plain U.S. English and keeps scope boundaries explicit.

![Editorial hero for ${title}](/images/posts/${slug}-1.svg)

## What actually helps

${entry.lead}

For this topic, a helpful baseline is:

1. Define one current challenge in everyday words.
2. Choose one session or practice with clear boundaries.
3. Track practical markers for 1-2 weeks.
4. Keep what works and simplify what does not.

This article stays inside spiritual and educational scope. It does not offer diagnosis, treatment, or guaranteed outcomes.

## Common pitfalls

The most common mistake is expecting one session to solve everything. Another is collecting insight without applying it. A third is using abstract language instead of making concrete changes.

${entry.core}

## This weekРІР‚в„ўs practical integration

Try this short plan:

- Day 1: write one sentence intention.
- Day 2: identify one energy drain and reduce it.
- Day 3: complete one delayed conversation or decision.
- Day 4-7: track how quickly you recover from stress.

If this topic relates to your current goals, continue with [${linkOne[1]}](${linkOne[0]}) and [${linkTwo[1]}](${linkTwo[0]}).

![Secondary editorial visual for ${title}](/images/posts/${slug}-2.svg)

## Related next reads

- [${linkOne[1]}](${linkOne[0]})
- [${linkTwo[1]}](${linkTwo[0]})
- [Disclaimer](/disclaimer)

## Search relevance note

Primary terms in this article: ${keywordLine}.  
The page is intentionally written for readability, trust, and internal relevance rather than keyword stuffing.

## Safety boundary (important)

This page provides spiritual and educational guidance. It is not medical advice and not a substitute for professional diagnosis or treatment. If you have urgent symptoms or serious health concerns, contact licensed professionals.

## Final thoughts

${entry.week}
`;
}

function palette(seed) {
  const colors = [
    ["#eff6ff", "#bae6fd", "#0369a1"],
    ["#f0fdf4", "#bbf7d0", "#166534"],
    ["#fff7ed", "#fed7aa", "#9a3412"],
    ["#fdf2f8", "#fbcfe8", "#9d174d"],
    ["#f5f3ff", "#ddd6fe", "#5b21b6"],
    ["#ecfeff", "#a5f3fc", "#155e75"]
  ];
  return colors[seed % colors.length];
}

function svgAbstract(slug) {
  const seed = hashCode(`${slug}-a`);
  const [bg, mid, accent] = palette(seed);
  const x = 90 + (seed % 470);
  const y = 120 + (seed % 200);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${bg}"/><stop offset="100%" stop-color="${mid}"/></linearGradient></defs>
  <rect width="1600" height="900" fill="url(#g)"/>
  <circle cx="${x}" cy="${y}" r="180" fill="${accent}" opacity="0.15"/>
  <circle cx="${x + 420}" cy="${y + 150}" r="130" fill="${accent}" opacity="0.2"/>
  <path d="M0 730 C280 640 560 780 850 690 C1100 620 1370 760 1600 670 L1600 900 L0 900 Z" fill="${accent}" opacity="0.25"/>
  <text x="100" y="115" font-size="44" font-family="Georgia, serif" fill="${accent}" opacity="0.88">True Energy Flow</text>
</svg>`;
}

function svgHuman(slug) {
  const seed = hashCode(`${slug}-h`);
  const [bg, mid, accent] = palette(seed + 2);
  const shift = seed % 160;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <rect width="1600" height="900" fill="${bg}"/>
  <rect x="0" y="610" width="1600" height="290" fill="${mid}" opacity="0.58"/>
  <circle cx="${430 + shift}" cy="340" r="78" fill="none" stroke="${accent}" stroke-width="14"/>
  <path d="M${350 + shift} 555 C${365 + shift} 470 ${505 + shift} 470 ${520 + shift} 555" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>
  <path d="M${390 + shift} 515 L${305 + shift} 620 M${480 + shift} 515 L${565 + shift} 620" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
  <circle cx="${1020 - shift}" cy="330" r="70" fill="none" stroke="${accent}" stroke-width="12" opacity="0.76"/>
  <path d="M${965 - shift} 525 C${980 - shift} 450 ${1090 - shift} 450 ${1105 - shift} 525" fill="none" stroke="${accent}" stroke-width="12" opacity="0.76"/>
  <text x="100" y="110" font-size="42" font-family="Georgia, serif" fill="${accent}" opacity="0.9">Editorial Visual</text>
</svg>`;
}

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

for (const file of files) {
  const fullPath = path.join(postsDir, file);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(source);

  const nextFrontmatter = {
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    tags: data.tags,
    slug: data.slug,
    canonical: data.canonical,
    ogImage: `/images/posts/${data.slug}-1.svg`
  };

  const rewritten = buildBody({
    slug: data.slug,
    title: data.title,
    category: data.category,
    description: data.description,
    tags: data.tags
  });

  fs.writeFileSync(fullPath, matter.stringify(rewritten.trimStart(), nextFrontmatter));
  fs.writeFileSync(path.join(imagesDir, `${data.slug}-1.svg`), svgAbstract(data.slug));
  fs.writeFileSync(path.join(imagesDir, `${data.slug}-2.svg`), svgHuman(data.slug));
}

console.log(`Updated ${files.length} posts and generated ${files.length * 2} unique images.`);
