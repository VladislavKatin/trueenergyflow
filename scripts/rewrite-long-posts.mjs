import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content", "posts");

const topic = {
  "what-to-expect-in-an-energy-healing-session": {
    q1: "person meditating sunlight",
    q2: "healing hands calm room",
    tone:
      "Most first-time clients are not looking for mystical theater. They want relief from mental noise and a clearer sense of direction."
  },
  "signs-your-energy-is-out-of-balance": {
    q1: "tired woman window morning",
    q2: "man journaling coffee table",
    tone:
      "Energetic imbalance usually appears in ordinary habits before it appears in spiritual language: sleep drift, low patience, and emotional overreaction."
  },
  "chakra-healing-session-how-it-works": {
    q1: "meditation color lights",
    q2: "wellness studio breathing practice",
    tone:
      "A chakra session can be highly practical when each center is treated as a reflection theme rather than a rigid belief system."
  },
  "energy-healing-vs-reiki": {
    q1: "reiki session therapist client",
    q2: "wellness consultation modern office",
    tone:
      "People compare labels, but outcomes depend more on process design than on terminology."
  },
  "remote-energy-healing-how-distance-sessions-work": {
    q1: "online therapy laptop headphones",
    q2: "woman home office meditation",
    tone:
      "Distance sessions can be effective because emotional regulation and focused attention are transferable through structured conversation."
  },
  "how-to-prepare-for-a-remote-reiki-session": {
    q1: "quiet room tea notebook",
    q2: "person headphones breathing",
    tone:
      "Preparation works best when it is minimal and specific. You are building focus, not performance."
  },
  "intuitive-reading-vs-psychic-reading": {
    q1: "coach conversation table",
    q2: "thoughtful woman writing journal",
    tone:
      "This distinction matters because session style influences agency. Useful guidance should strengthen responsibility."
  },
  "what-is-an-intuitive-medical-reading": {
    q1: "doctor patient conversation",
    q2: "woman questions notebook clinic",
    tone:
      "Safe framing protects clients. Intuitive information may support reflection, but clinical decisions belong to licensed professionals."
  },
  "questions-to-ask-in-a-medical-intuitive-session": {
    q1: "checklist hand writing",
    q2: "health consultation notes",
    tone:
      "Good questions prevent confusion and reduce risk. They also keep expectations aligned with ethical boundaries."
  },
  "craniosacral-therapy-what-it-is-and-what-to-expect": {
    q1: "craniosacral therapy session",
    q2: "relaxed woman treatment table",
    tone:
      "Craniosacral sessions are usually subtle. Progress tends to be cumulative and function-based rather than dramatic."
  },
  "how-to-choose-a-craniosacral-therapist": {
    q1: "therapist consultation smiling",
    q2: "wellness interview notes",
    tone:
      "Choosing the right practitioner is mostly about communication, scope clarity, and trust over time."
  },
  "spiritual-coaching-how-sessions-are-structured": {
    q1: "coaching session desk",
    q2: "goal planning journal",
    tone:
      "A good session has structure: review, clarify, commit, and follow up. Inspiration alone is not enough."
  },
  "energy-healing-for-beginners-complete-guide": {
    q1: "beginner meditation room",
    q2: "young woman wellness reading",
    tone:
      "Beginners benefit from straightforward expectations, plain language, and one manageable action after each session."
  },
  "remote-healing-aftercare-and-integration-plan": {
    q1: "weekly planner notebook",
    q2: "sunrise walk alone woman",
    tone:
      "Aftercare is where insight becomes behavior. A short weekly rhythm prevents old patterns from returning too quickly."
  },
  "intuitive-guidance-questions-that-create-clarity": {
    q1: "thinking woman writing questions",
    q2: "coaching dialogue closeup",
    tone:
      "Question quality determines guidance quality. Clear prompts create clear outcomes."
  },
  "craniosacral-therapy-and-nervous-system-regulation": {
    q1: "calm breathing practice",
    q2: "restful sleep woman",
    tone:
      "The practical target is regulation: how quickly your system recovers after stress."
  },
  "spiritual-coaching-goal-setting-that-actually-works": {
    q1: "goal setting planner woman",
    q2: "productivity coaching call",
    tone:
      "Most goals fail because they are emotionally inspiring but operationally weak."
  }
};

function blocks(title, tone, category) {
  return `
## Field notes from real sessions

${tone} In editorial work, we repeatedly see the same pattern: readers do not need more hype, they need a clear sequence they can repeat under normal life pressure. The most useful sequence is intention, observation, integration, and review. When that loop is consistent, people feel less scattered and more capable of making values-based decisions.

## What this looks like in daily life

A strong ${category} process does not begin with perfection. It begins with one honest sentence about what is not working. From there, the next step is to protect a small window for focused attention and then commit to one visible behavior change. In most cases, the behavior change is simple: clearer boundaries, better sleep timing, less overcommitment, or direct communication.

Readers often ask if a session \"worked.\" A practical answer is to measure trend changes over seven to fourteen days. Are you recovering faster after stress? Are you less reactive in conversations that used to drain you? Are decisions moving from rumination to action? These markers are more reliable than chasing intense emotional moments.

## Common mistakes and how to avoid them

The first mistake is expecting one session to resolve everything at once. The second mistake is collecting insight without applying it. The third mistake is replacing practical responsibility with spiritual vocabulary. A healthier model is to keep language clear and behavior measurable. Insight has value only when it improves how you live.

Another common issue is skipping follow-up. The brain naturally returns to familiar patterns when structure disappears. That is why short reviews matter. If you review once a week, you can keep what is helping and remove what is not. This keeps progress realistic and sustainable.

## A grounded one-week protocol

1. Day one: define one intention in plain words.
2. Day two: identify one energy drain and reduce it.
3. Day three: complete one delayed conversation or decision.
4. Day four to six: track stress recovery and emotional clarity.
5. Day seven: review what changed and choose one next step.

This protocol is intentionally simple. The point is not complexity; the point is consistency. Complex plans fail quickly when life gets busy. Simple plans survive.

## Safety and scope

This article is educational and spiritual in scope. It is not medical advice and not a substitute for diagnosis or treatment. If symptoms are severe, persistent, or urgent, licensed care should remain central. For this reason, we use non-clinical language and avoid disease claims.

## Final editorial takeaway

The best content is not the most dramatic content. It is the content that helps someone make one better decision today, then repeat that process tomorrow. That is the standard we apply here.

## Deep dive: implementation details readers usually ask about

A recurring question from readers is how to avoid losing momentum between sessions. The answer is not motivation tricks. It is system design. Keep your process observable: write intentions in concrete language, assign one short review window each week, and define success as repeatable behavior rather than emotional intensity. This approach is less exciting in the short term but more reliable in the long term. If your schedule is unstable, protect one anchor habit that survives hard weeks. Most people choose either a nightly five-minute review or a morning planning block. What matters is consistency under pressure.

Another frequent question is how to keep spiritual work grounded when life is complicated. The strongest method is to pair insight with evidence. If an insight says your boundaries are weak, test that insight by changing one boundary and observing the result for seven days. If an insight says you are overextending your attention, reduce one recurring commitment and evaluate stress recovery after two weeks. This turns abstract guidance into practical feedback loops. Over time, these loops build self-trust because you are no longer guessing; you are observing and adjusting.

## Extended integration checklist

Use this long-form checklist to keep the process stable:

1. Define the one situation that currently creates the most friction.
2. Translate that situation into one sentence without spiritual jargon.
3. Choose one change that is visible on your calendar.
4. Add one boundary sentence you can use in real conversation.
5. Track reaction before and after the boundary is used.
6. Note what improved, what stayed difficult, and what needs support.
7. Bring those notes into your next session and refine the plan.
8. Repeat for three weeks before judging the overall process.

This extended loop helps prevent false negatives and false positives. Some people quit too early because they expected instant transformation. Others continue too long without review because they confuse intensity with progress. A three-week cycle with measurable markers gives a fair signal.
`;
}

for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"))) {
  const full = path.join(postsDir, file);
  const src = fs.readFileSync(full, "utf8");
  const { data } = matter(src);
  const meta = topic[data.slug];
  if (!meta) continue;

  const image1 = `https://source.unsplash.com/1600x900/?${encodeURIComponent(meta.q1)}`;
  const image2 = `https://source.unsplash.com/1600x900/?${encodeURIComponent(meta.q2)}`;

  const content = `
![${data.title} - editorial image 1](${image1})

${blocks(data.title, meta.tone, data.category)}

## Related resources

- [Contact](/contact)
- [Disclaimer](/disclaimer)

![${data.title} - editorial image 2](${image2})
`;

  const next = matter.stringify(content.trimStart(), {
    ...data,
    ogImage: image1
  });
  fs.writeFileSync(full, next);
}

console.log("Rewrote all posts with long-form editorial content and realistic photo URLs.");
