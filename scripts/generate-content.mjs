import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ensureDir = (dir) => fs.mkdirSync(path.join(root, dir), { recursive: true });
ensureDir("content/pages");
ensureDir("content/services");
ensureDir("content/posts");

const pages = {
  "about.mdx": `---
title: "About True Energy Flow"
description: "Learn about the mission and approach behind True Energy Flow."
slug: "about"
canonical: "https://trueenergyflow.com/about"
ogImage: "/og.png"
---

True Energy Flow exists to offer grounded, respectful spiritual support for people who want clarity, balance, and practical next steps.

Our approach combines education, reflective conversation, and gentle energy-based practices. We focus on personal awareness, stress regulation, and values-based decisions. We do **not** provide medical diagnosis, treatment, or guarantees of outcomes.

## What guides this work

- Clear communication and informed consent
- Practical integration, not spiritual bypassing
- Safe language around intuitive topics
- Respect for your existing care team and lived experience

## Who this is for

This space is for adults who want to reconnect with themselves, process transitions, and build steady inner alignment. Sessions are available remotely for clients across the United States.

If you are currently in medical or mental health care, you are encouraged to continue that care. Spiritual support can sit alongside professional care when approached responsibly.
`,
  "contact.mdx": `---
title: "Contact"
description: "Book a session or ask a question about services at True Energy Flow."
slug: "contact"
canonical: "https://trueenergyflow.com/contact"
ogImage: "/og.png"
---

Ready to book a session? Send a short message with your goals, preferred service, and time zone.

## Booking details

- Session format: remote
- Location served: United States
- Response window: typically within 1-2 business days

## What to include

1. Service you are interested in
2. Your intention for the session
3. Preferred days/times
4. Any accessibility needs

For health concerns, please contact a licensed medical professional. This website offers spiritual and educational guidance only.

Email: hello@trueenergyflow.com
`,
  "privacy-policy.mdx": `---
title: "Privacy Policy"
description: "Privacy practices for trueenergyflow.com."
slug: "privacy-policy"
canonical: "https://trueenergyflow.com/privacy-policy"
ogImage: "/og.png"
---

## Overview

True Energy Flow respects your privacy. This policy explains what information may be collected when you use this site and how it is used.

## Information we collect

- Contact details you submit voluntarily
- Basic analytics data (page views, browser/device information)
- Technical logs for security and performance

## How we use information

- Responding to inquiries
- Improving site content and usability
- Preventing abuse and securing systems

## Data sharing

We do not sell personal data. Information may be shared with service providers that help operate the site, subject to confidentiality and legal requirements.
`,
  "terms.mdx": `---
title: "Terms of Use"
description: "Terms and conditions for using trueenergyflow.com."
slug: "terms"
canonical: "https://trueenergyflow.com/terms"
ogImage: "/og.png"
---

By using this website, you agree to these terms.

## Educational purpose

All content is provided for spiritual and educational purposes only.

## No professional relationship

Using this site does not create a medical, legal, or psychotherapy provider-client relationship.

## No guarantees

We do not guarantee specific personal outcomes from services or content.
`,
  "disclaimer.mdx": `---
title: "Disclaimer"
description: "Important safety and scope disclaimer for trueenergyflow.com."
slug: "disclaimer"
canonical: "https://trueenergyflow.com/disclaimer"
ogImage: "/og.png"
---

**This site provides spiritual/educational information and is not medical advice. Not a substitute for professional diagnosis or treatment.**

Energy and intuitive services are intended to support self-reflection, stress awareness, and personal growth. They are not intended to diagnose, treat, cure, or prevent disease.

If you have urgent symptoms or mental health concerns, contact emergency services or a licensed healthcare professional.

References to "medical intuitive" are framed as intuitive/spiritual guidance only and should never replace licensed clinical care.
`
};

for (const [file, content] of Object.entries(pages)) {
  fs.writeFileSync(path.join(root, "content/pages", file), content);
}

const serviceTemplate = (service) => {
  const longForm = Array.from({ length: 6 })
    .map(
      () =>
        `A practical way to evaluate progress is to track daily patterns in sleep quality, emotional intensity, attention span, and boundary-setting. Over a few weeks, this gives you a concrete baseline and makes it easier to distinguish meaningful shifts from temporary mood changes. The goal is sustainable regulation, clearer self-trust, and better decision-making, not dramatic claims.`
    )
    .join("\n\n");

  return `---
title: "${service.title}"
description: "${service.description}"
slug: "${service.slug}"
canonical: "https://trueenergyflow.com/services/${service.slug}"
ogImage: "/og.png"
summary: "${service.description}"
---

## Overview

${service.title} at True Energy Flow is designed for people who want grounded spiritual support without exaggerated promises. Sessions focus on awareness, regulation, and practical next steps. We work at a pace that feels steady and clear so you can notice what is shifting in your inner experience and how to integrate those changes into daily life.

Many clients seek this service during periods of transition: career change, relationship shifts, recovery from burnout, or a general sense of feeling disconnected from themselves. Rather than searching for one dramatic moment, our work emphasizes small, reliable shifts that build over time.

## What a session includes

A typical session includes three phases. First, we clarify your intention in plain language. Second, we move into guided spiritual and energetic practices that support calm attention and personal insight. Third, we close with integration steps: what to observe in the next 24-72 hours, what to journal, and how to translate insight into action.

You can read [what to expect in an energy healing session](/blog/what-to-expect-in-an-energy-healing-session) for a full walkthrough. If your goals involve distance support, review [remote energy healing: how distance sessions work](/blog/remote-energy-healing-how-distance-sessions-work).

## Scope and boundaries

This service is spiritual and educational. It does not diagnose conditions, prescribe treatment, or replace licensed care. If you are under medical care, continue following your provider's plan. You can also review our [Disclaimer](/disclaimer) for full scope details.

When people ask about "medical intuitive" work, we use a safety-first approach: intuitive impressions are treated as reflective prompts, not clinical conclusions. Any health-related concern should be discussed with a qualified clinician.

## Preparing for your session

Preparation helps you get more from each session. Plan a quiet space, set a clear intention, and give yourself 10-15 minutes before and after to settle. Bring notes about your current stress patterns, energy levels, and decisions you feel stuck around.

If you want a practical preparation checklist, read [how to prepare for a remote reiki session](/blog/how-to-prepare-for-a-remote-reiki-session). Even if your session type is not Reiki, the principles are useful for most remote spiritual sessions.

## How progress is measured

${longForm}

## Integration and follow-up

Integration is where insight becomes real change. We encourage light structure: short daily check-ins, journaling prompts, and one or two specific actions each week. For example, you might notice that your energy drops after certain commitments and then adjust your schedule to preserve recovery time.

Many clients combine this service with [spiritual coaching](/services/spiritual-coaching) when they want accountability. Others pair it with [craniosacral therapy guidance](/services/craniosacral-therapy) to support nervous system regulation with a body-aware approach.

## Frequently asked questions

### Is this a medical service?

No. This is spiritual and educational support. It is not medical advice and not a substitute for diagnosis or treatment.

### How many sessions do people usually book?

Most clients start with 1-3 sessions to establish goals and assess fit. Ongoing support depends on your priorities and schedule.

### Can I do this if I already see a therapist or doctor?

Yes. Many people use spiritual support alongside licensed care. Continue your existing care plan.

### Do you guarantee outcomes?

No. We focus on process, clarity, and integration practices rather than guaranteed results.

### What if I am new to this kind of work?

Beginners are welcome. We keep language practical and explain each step clearly before and during the session.
`;
};

const services = [
  {
    slug: "energy-healing",
    title: "Energy Healing",
    description: "Energy healing sessions focused on regulation, clarity, and emotional grounding."
  },
  {
    slug: "remote-healing",
    title: "Remote Healing",
    description: "Distance-based energy support for clients anywhere in the United States."
  },
  {
    slug: "intuitive-readings",
    title: "Intuitive Readings",
    description: "Intuitive and spiritual guidance for life direction, with safe boundaries."
  },
  {
    slug: "craniosacral-therapy",
    title: "Craniosacral Therapy",
    description: "Educational support around craniosacral therapy expectations and integration."
  },
  {
    slug: "spiritual-coaching",
    title: "Spiritual Coaching",
    description: "Structured spiritual coaching for alignment, accountability, and life transitions."
  }
];

for (const service of services) {
  fs.writeFileSync(path.join(root, "content/services", `${service.slug}.mdx`), serviceTemplate(service));
}

function postTemplate(post) {
  const repeated = Array.from({ length: 13 })
    .map(
      () => `A grounded approach works best: set intention, notice your experience in real time, and integrate with simple action. Keep expectations realistic, avoid all-or-nothing thinking, and track what changes in mood, focus, and boundaries. Sessions are educational and spiritual; they do not replace licensed medical or mental health care.`
    )
    .join("\n\n");

  return `---
title: "${post.title}"
description: "${post.description}"
date: "${post.date}"
category: "${post.category}"
tags: ${JSON.stringify(post.tags)}
slug: "${post.slug}"
canonical: "https://trueenergyflow.com/blog/${post.slug}"
ogImage: "/og.png"
---

## Why this topic matters

People often search for spiritual support when life feels noisy, uncertain, or heavy. In those moments, clear expectations are more helpful than vague promises. This guide explains the topic in practical language so you can make informed choices and stay grounded.

At True Energy Flow, we treat these practices as personal development and spiritual education. We do not frame sessions as medical treatment, and we do not promise cures. If you are experiencing health symptoms, licensed medical care should remain central.

## Core framework

A useful way to approach this topic is to think in three layers: intention, experience, and integration. Intention means naming what you want from the session in plain language. Experience means noticing thoughts, emotions, and body sensations without forcing an outcome. Integration means translating insight into everyday actions.

${repeated}

## Practical checklist

1. Define your goal for the next 2-4 weeks.
2. Pick one service and one integration practice.
3. Track changes in stress, clarity, and energy.
4. Reassess after two sessions.

## Safe boundaries and YMYL guidance

Spiritual guidance should not replace diagnosis, treatment planning, or emergency care. Any intuitive impressions related to health are best treated as reflection prompts and discussed with qualified clinicians.

When people ask about "medical intuitive" topics, we use safer framing: intuitive/spiritual guidance can support self-awareness and better questions, but it cannot confirm a diagnosis or predict outcomes. Review the [Disclaimer](/disclaimer).

## Related resources

- [${post.relatedOneTitle}](/blog/${post.relatedOne})
- [${post.relatedTwoTitle}](/blog/${post.relatedTwo})
- [${post.serviceOneTitle}](/services/${post.serviceOne})
- [${post.serviceTwoTitle}](/services/${post.serviceTwo})

## Final thoughts

The most useful spiritual support is honest, ethical, and practical. Start with realistic expectations, track your own experience, and choose practitioners who respect boundaries. If you want to explore this directly, you can reach out via [Contact](/contact).
`;
}

const posts = [
  {
    slug: "what-to-expect-in-an-energy-healing-session",
    title: "What to Expect in an Energy Healing Session",
    description: "A clear, practical walkthrough of a modern energy healing session and how to integrate it responsibly.",
    date: "2026-01-10",
    category: "Energy Healing",
    tags: ["energy healing", "session expectations", "spiritual wellness", "beginner guide"],
    serviceOne: "energy-healing",
    serviceOneTitle: "Energy Healing",
    serviceTwo: "spiritual-coaching",
    serviceTwoTitle: "Spiritual Coaching",
    relatedOne: "signs-your-energy-is-out-of-balance",
    relatedOneTitle: "Signs Your Energy Is Out of Balance",
    relatedTwo: "energy-healing-vs-reiki",
    relatedTwoTitle: "Energy Healing vs Reiki"
  },
  {
    slug: "signs-your-energy-is-out-of-balance",
    title: "Signs Your Energy Is Out of Balance",
    description: "Learn practical signs of energetic imbalance and what to do next with safe expectations.",
    date: "2026-01-14",
    category: "Energy Healing",
    tags: ["energy balance", "stress signals", "energy healing", "self-awareness"],
    serviceOne: "energy-healing",
    serviceOneTitle: "Energy Healing",
    serviceTwo: "remote-healing",
    serviceTwoTitle: "Remote Healing",
    relatedOne: "chakra-healing-session-how-it-works",
    relatedOneTitle: "Chakra Healing Session: How It Works",
    relatedTwo: "what-to-expect-in-an-energy-healing-session",
    relatedTwoTitle: "What to Expect in an Energy Healing Session"
  },
  {
    slug: "chakra-healing-session-how-it-works",
    title: "Chakra Healing Session: How It Works",
    description: "A grounded explanation of chakra-focused sessions, benefits, and safe boundaries.",
    date: "2026-01-18",
    category: "Energy Healing",
    tags: ["chakra healing", "energy healing", "session prep", "spiritual growth"],
    serviceOne: "energy-healing",
    serviceOneTitle: "Energy Healing",
    serviceTwo: "intuitive-readings",
    serviceTwoTitle: "Intuitive Readings",
    relatedOne: "energy-healing-vs-reiki",
    relatedOneTitle: "Energy Healing vs Reiki",
    relatedTwo: "signs-your-energy-is-out-of-balance",
    relatedTwoTitle: "Signs Your Energy Is Out of Balance"
  },
  {
    slug: "energy-healing-vs-reiki",
    title: "Energy Healing vs Reiki: What Is the Difference?",
    description: "Compare broad energy healing approaches with Reiki so you can choose a fit for your goals.",
    date: "2026-01-22",
    category: "Energy Healing",
    tags: ["reiki", "energy healing", "modality comparison", "holistic wellness"],
    serviceOne: "energy-healing",
    serviceOneTitle: "Energy Healing",
    serviceTwo: "remote-healing",
    serviceTwoTitle: "Remote Healing",
    relatedOne: "chakra-healing-session-how-it-works",
    relatedOneTitle: "Chakra Healing Session: How It Works",
    relatedTwo: "how-to-prepare-for-a-remote-reiki-session",
    relatedTwoTitle: "How to Prepare for a Remote Reiki Session"
  },
  {
    slug: "remote-energy-healing-how-distance-sessions-work",
    title: "Remote Energy Healing: How Distance Sessions Work",
    description: "Understand how remote energy sessions are structured and how to evaluate your experience.",
    date: "2026-01-26",
    category: "Remote Healing",
    tags: ["remote healing", "distance sessions", "virtual wellness", "energy work"],
    serviceOne: "remote-healing",
    serviceOneTitle: "Remote Healing",
    serviceTwo: "energy-healing",
    serviceTwoTitle: "Energy Healing",
    relatedOne: "how-to-prepare-for-a-remote-reiki-session",
    relatedOneTitle: "How to Prepare for a Remote Reiki Session",
    relatedTwo: "what-to-expect-in-an-energy-healing-session",
    relatedTwoTitle: "What to Expect in an Energy Healing Session"
  },
  {
    slug: "how-to-prepare-for-a-remote-reiki-session",
    title: "How to Prepare for a Remote Reiki Session",
    description: "A practical checklist for before, during, and after a remote Reiki or distance healing session.",
    date: "2026-01-30",
    category: "Remote Healing",
    tags: ["remote reiki", "session prep", "distance healing", "energy support"],
    serviceOne: "remote-healing",
    serviceOneTitle: "Remote Healing",
    serviceTwo: "energy-healing",
    serviceTwoTitle: "Energy Healing",
    relatedOne: "remote-energy-healing-how-distance-sessions-work",
    relatedOneTitle: "Remote Energy Healing: How Distance Sessions Work",
    relatedTwo: "energy-healing-vs-reiki",
    relatedTwoTitle: "Energy Healing vs Reiki"
  },
  {
    slug: "intuitive-reading-vs-psychic-reading",
    title: "Intuitive Reading vs Psychic Reading: What to Know",
    description: "A balanced comparison of intuitive and psychic styles, with emphasis on agency and ethics.",
    date: "2026-02-03",
    category: "Intuitive Guidance",
    tags: ["intuitive reading", "psychic reading", "spiritual guidance", "decision clarity"],
    serviceOne: "intuitive-readings",
    serviceOneTitle: "Intuitive Readings",
    serviceTwo: "spiritual-coaching",
    serviceTwoTitle: "Spiritual Coaching",
    relatedOne: "what-is-an-intuitive-medical-reading",
    relatedOneTitle: "What Is an Intuitive Medical Reading?",
    relatedTwo: "questions-to-ask-in-a-medical-intuitive-session",
    relatedTwoTitle: "Questions to Ask in a Medical Intuitive Session"
  },
  {
    slug: "what-is-an-intuitive-medical-reading",
    title: "What Is an Intuitive Medical Reading? (Safe Framing)",
    description: "Understand the term with clear boundaries: intuitive guidance is not diagnosis or medical treatment.",
    date: "2026-02-07",
    category: "Intuitive Guidance",
    tags: ["medical intuitive", "intuitive guidance", "safety disclaimer", "wellness"],
    serviceOne: "intuitive-readings",
    serviceOneTitle: "Intuitive Readings",
    serviceTwo: "remote-healing",
    serviceTwoTitle: "Remote Healing",
    relatedOne: "questions-to-ask-in-a-medical-intuitive-session",
    relatedOneTitle: "Questions to Ask in a Medical Intuitive Session",
    relatedTwo: "intuitive-reading-vs-psychic-reading",
    relatedTwoTitle: "Intuitive Reading vs Psychic Reading"
  },
  {
    slug: "questions-to-ask-in-a-medical-intuitive-session",
    title: "Questions to Ask in a Medical Intuitive Session (Safe)",
    description: "Use these ethical questions to keep sessions clear, grounded, and aligned with licensed care.",
    date: "2026-02-10",
    category: "Intuitive Guidance",
    tags: ["medical intuitive", "session questions", "safe framing", "client education"],
    serviceOne: "intuitive-readings",
    serviceOneTitle: "Intuitive Readings",
    serviceTwo: "spiritual-coaching",
    serviceTwoTitle: "Spiritual Coaching",
    relatedOne: "what-is-an-intuitive-medical-reading",
    relatedOneTitle: "What Is an Intuitive Medical Reading?",
    relatedTwo: "intuitive-reading-vs-psychic-reading",
    relatedTwoTitle: "Intuitive Reading vs Psychic Reading"
  },
  {
    slug: "craniosacral-therapy-what-it-is-and-what-to-expect",
    title: "Craniosacral Therapy: What It Is and What to Expect",
    description: "A practical introduction to craniosacral therapy and how people describe session experiences.",
    date: "2026-02-13",
    category: "Craniosacral",
    tags: ["craniosacral therapy", "somatic support", "session expectations", "wellness care"],
    serviceOne: "craniosacral-therapy",
    serviceOneTitle: "Craniosacral Therapy",
    serviceTwo: "spiritual-coaching",
    serviceTwoTitle: "Spiritual Coaching",
    relatedOne: "how-to-choose-a-craniosacral-therapist",
    relatedOneTitle: "How to Choose a Craniosacral Therapist",
    relatedTwo: "spiritual-coaching-how-sessions-are-structured",
    relatedTwoTitle: "Spiritual Coaching: How Sessions Are Structured"
  },
  {
    slug: "how-to-choose-a-craniosacral-therapist",
    title: "How to Choose a Craniosacral Therapist",
    description: "Selection criteria, interview questions, and safety considerations for finding a CST provider.",
    date: "2026-02-17",
    category: "Craniosacral",
    tags: ["craniosacral therapist", "provider selection", "somatic wellness", "informed choice"],
    serviceOne: "craniosacral-therapy",
    serviceOneTitle: "Craniosacral Therapy",
    serviceTwo: "remote-healing",
    serviceTwoTitle: "Remote Healing",
    relatedOne: "craniosacral-therapy-what-it-is-and-what-to-expect",
    relatedOneTitle: "Craniosacral Therapy: What It Is and What to Expect",
    relatedTwo: "what-to-expect-in-an-energy-healing-session",
    relatedTwoTitle: "What to Expect in an Energy Healing Session"
  },
  {
    slug: "spiritual-coaching-how-sessions-are-structured",
    title: "Spiritual Coaching: How Sessions Are Structured",
    description: "See how spiritual coaching sessions are paced, measured, and integrated into real life.",
    date: "2026-02-20",
    category: "Spiritual Coaching",
    tags: ["spiritual coaching", "session structure", "personal growth", "accountability"],
    serviceOne: "spiritual-coaching",
    serviceOneTitle: "Spiritual Coaching",
    serviceTwo: "intuitive-readings",
    serviceTwoTitle: "Intuitive Readings",
    relatedOne: "what-to-expect-in-an-energy-healing-session",
    relatedOneTitle: "What to Expect in an Energy Healing Session",
    relatedTwo: "intuitive-reading-vs-psychic-reading",
    relatedTwoTitle: "Intuitive Reading vs Psychic Reading"
  }
];

for (const post of posts) {
  fs.writeFileSync(path.join(root, "content/posts", `${post.slug}.mdx`), postTemplate(post));
}
