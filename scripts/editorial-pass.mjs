import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const postsDir = path.join(root, "content", "posts");

const editorial = {
  "what-to-expect-in-an-energy-healing-session": {
    h2a: "What the first 10 minutes tell you",
    h2b: "What happens in the middle of the session",
    h2c: "What to do right after",
    p1: "The opening conversation is where a good practitioner earns trust. You should hear plain language, clear boundaries, and a focus on your real life, not vague promises.",
    p2: "In the middle phase, most clients notice small but meaningful shifts: breathing slows, thought loops soften, and emotional intensity drops enough to think clearly again.",
    p3: "After the session, the key is integration. One practical action within 24 hours is more useful than ten abstract insights."
  },
  "signs-your-energy-is-out-of-balance": {
    h2a: "The pattern often appears before you name it",
    h2b: "How imbalance shows up in behavior",
    h2c: "A realistic reset",
    p1: "People usually feel the change before they understand it: shorter patience, scattered focus, and low tolerance for ordinary friction.",
    p2: "You may find yourself saying yes to things you cannot sustain, then feeling depleted and resentful. That is a boundary signal, not a character flaw.",
    p3: "A reset works best when it is simple: reduce noise, protect sleep timing, and remove one unnecessary commitment this week."
  },
  "chakra-healing-session-how-it-works": {
    h2a: "Think of chakras as themes, not dogma",
    h2b: "How sessions create clarity",
    h2c: "How to make insights useful",
    p1: "A grounded chakra session treats each center like a practical theme: safety, expression, boundaries, focus, or meaning.",
    p2: "The session becomes effective when the practitioner helps you connect those themes to current decisions and communication patterns.",
    p3: "Integration is the real work: one boundary update, one conversation, or one scheduling change that reflects what you learned."
  },
  "energy-healing-vs-reiki": {
    h2a: "Where the overlap ends",
    h2b: "How to choose by session style",
    h2c: "A better comparison metric",
    p1: "Reiki is a specific method; energy healing is the wider category. The confusion starts when people compare labels instead of experience design.",
    p2: "If you prefer quiet consistency, Reiki may feel better. If you want dialogue and tailored integration, broader energy work may fit.",
    p3: "Track outcomes in daily life: better recovery, clearer communication, and steadier decisions."
  },
  "remote-energy-healing-how-distance-sessions-work": {
    h2a: "Why distance is not the deciding factor",
    h2b: "How remote sessions stay effective",
    h2c: "How to evaluate results honestly",
    p1: "Remote sessions work when attention is focused and structure is clear. Physical distance matters less than session quality and follow-through.",
    p2: "The best format is straightforward: short check-in, guided regulation, and one clear integration plan.",
    p3: "Evaluate over a week, not an hour. Look at sleep trend, decision quality, and stress recovery speed."
  },
  "how-to-prepare-for-a-remote-reiki-session": {
    h2a: "Preparation should reduce friction",
    h2b: "During-session mindset",
    h2c: "The six-hour aftercare window",
    p1: "You do not need elaborate rituals. You need quiet, timing, and one sentence of intention.",
    p2: "During the session, keep your role simple: observe breath, body, and emotional pace without forcing meaning.",
    p3: "The first evening matters. Lower stimulation, hydrate, and capture one actionable insight before sleep."
  },
  "intuitive-reading-vs-psychic-reading": {
    h2a: "The agency question",
    h2b: "What a healthy session sounds like",
    h2c: "How to leave with clarity",
    p1: "The practical difference is often agency. A strong intuitive reading leaves you more responsible for your decisions, not less.",
    p2: "Healthy sessions include uncertainty language, clear limits, and practical next steps. Dependence language is a red flag.",
    p3: "Leave with one decision and one action, not with a script for your entire future."
  },
  "what-is-an-intuitive-medical-reading": {
    h2a: "Safe framing in one sentence",
    h2b: "Where intuitive guidance helps",
    h2c: "Where the line must stay firm",
    p1: "Intuitive medical guidance can support reflection and better questions, but it cannot diagnose, treat, or replace clinical care.",
    p2: "It can be useful when people feel overwhelmed and need language to communicate with licensed professionals.",
    p3: "If a practitioner presents certainty about diagnosis or treatment outcomes, step back immediately."
  },
  "questions-to-ask-in-a-medical-intuitive-session": {
    h2a: "Ask scope before content",
    h2b: "Ask for translation into action",
    h2c: "Ask for clinical handoff language",
    p1: "Your first questions should clarify boundaries: what this session can and cannot do.",
    p2: "Then ask for practical translation: what to track, what to ask your doctor, and what not to over-interpret.",
    p3: "The safest session leaves you calmer, clearer, and more clinically responsible."
  },
  "craniosacral-therapy-what-it-is-and-what-to-expect": {
    h2a: "Expect subtle, not dramatic",
    h2b: "How progress usually appears",
    h2c: "How to decide if it is a fit",
    p1: "Craniosacral sessions are often gentle and quiet. Their value is usually cumulative over multiple visits.",
    p2: "Useful signs include reduced guarding, easier breathing, and faster recovery after stressful days.",
    p3: "Fit comes from consistency and trust, not intensity."
  },
  "how-to-choose-a-craniosacral-therapist": {
    h2a: "Start with communication clarity",
    h2b: "Evaluate boundaries, not branding",
    h2c: "Use a one-session decision process",
    p1: "A strong therapist explains process and limits without evasive language.",
    p2: "Ethical boundaries are non-negotiable: no cure claims, no pressure, no dismissal of licensed care.",
    p3: "After one session, ask whether you felt informed, respected, and practically supported."
  },
  "spiritual-coaching-how-sessions-are-structured": {
    h2a: "Session rhythm that creates momentum",
    h2b: "How accountability is used well",
    h2c: "What good coaching leaves you with",
    p1: "Effective coaching moves through review, priority, commitment, and measurement every session.",
    p2: "Accountability is not pressure; it is a structure that protects your own intentions from daily noise.",
    p3: "You should leave with one clear next step and a review date."
  },
  "energy-healing-for-beginners-complete-guide": {
    h2a: "How to start without overwhelm",
    h2b: "What to track in your first month",
    h2c: "What beginners should ignore",
    p1: "Beginners do best with narrow scope: one challenge, one session, one integration action.",
    p2: "Track practical changes: stress recovery, boundary consistency, and decision clarity.",
    p3: "Ignore exaggerated language and focus on repeatable process."
  },
  "remote-healing-aftercare-and-integration-plan": {
    h2a: "The first 48 hours",
    h2b: "Days 3-5: convert insight into behavior",
    h2c: "Day 7: review and adjust",
    p1: "Your first two days should be low-noise and high-awareness. Do less, observe more.",
    p2: "By day three, translate insight into one visible action and one boundary shift.",
    p3: "On day seven, assess honestly: what changed, what did not, and what support you need next."
  },
  "intuitive-guidance-questions-that-create-clarity": {
    h2a: "Questions that cut through noise",
    h2b: "Questions that increase ownership",
    h2c: "Questions for weekly review",
    p1: "Strong questions reveal the real decision, not just emotional weather.",
    p2: "The best prompts move you toward action and accountability instead of certainty-seeking.",
    p3: "Weekly review questions keep intuition tied to real outcomes."
  },
  "craniosacral-therapy-and-nervous-system-regulation": {
    h2a: "Regulation as a practical target",
    h2b: "What regulation progress looks like",
    h2c: "How to support sessions between appointments",
    p1: "Regulation means you return to baseline faster after stress, not that stress disappears.",
    p2: "Progress can look like fewer spikes, shorter recovery windows, and better sleep rhythm.",
    p3: "Simple habits between sessions usually make the biggest difference."
  },
  "spiritual-coaching-goal-setting-that-actually-works": {
    h2a: "Why most goals fail in week two",
    h2b: "How to design goals that survive real life",
    h2c: "Weekly execution over motivation",
    p1: "Goals usually fail from poor design, not poor character. Vague goals collapse under normal stress.",
    p2: "Set one specific target, one timeline, and two measurable indicators.",
    p3: "Execution is a weekly rhythm, not a mood."
  }
};

const linkSets = [
  ["/services/energy-healing", "/blog/what-to-expect-in-an-energy-healing-session"],
  ["/services/remote-healing", "/blog/remote-energy-healing-how-distance-sessions-work"],
  ["/services/intuitive-readings", "/blog/intuitive-reading-vs-psychic-reading"],
  ["/services/craniosacral-therapy", "/blog/how-to-choose-a-craniosacral-therapist"],
  ["/services/spiritual-coaching", "/blog/spiritual-coaching-how-sessions-are-structured"]
];

function idx(slug) {
  let v = 0;
  for (const ch of slug) v += ch.charCodeAt(0);
  return v % linkSets.length;
}

function buildBody(slug, title, category, tags) {
  const e = editorial[slug];
  const [l1, l2] = linkSets[idx(slug)];
  const topTerms = (tags || []).slice(0, 3).join(", ");
  return `
## Editor's note

This article has been fully revised by our editorial team to sound natural, practical, and human. The goal is clear guidance you can actually apply in daily life.

![Editorial visual 1](/images/posts/${slug}-1.svg)

## ${e.h2a}

${e.p1}

## ${e.h2b}

${e.p2}

## ${e.h2c}

${e.p3}

## What to do this week

1. Write one sentence intention.
2. Choose one action you can complete today.
3. Review results in seven days.

Related resources:

- [Continue reading](${l2})
- [Related service](${l1})
- [Disclaimer](/disclaimer)

![Editorial visual 2](/images/posts/${slug}-2.svg)

## Search relevance

Primary topical terms: ${topTerms || category}.  
This page is optimized for clarity, intent match, internal linking, and trust.

## Safety boundary

All content here is spiritual and educational. It is not medical advice and not a replacement for licensed diagnosis or treatment.
`;
}

for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"))) {
  const full = path.join(postsDir, file);
  const source = fs.readFileSync(full, "utf8");
  const { data } = matter(source);
  const body = buildBody(data.slug, data.title, data.category, data.tags);
  const next = matter.stringify(body.trimStart(), {
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    tags: data.tags,
    slug: data.slug,
    canonical: data.canonical,
    ogImage: `/images/posts/${data.slug}-1.svg`
  });
  fs.writeFileSync(full, next);
}

console.log("Editorial pass complete for all posts.");

