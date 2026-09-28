# Partner research audit — 2026-09-28

## Scope

This audit covers the public-source candidate pool for `Experts`, `Professional Affiliators`, `Schools`, and `Communities`. `Nemo12 Advocates` are excluded because they are first-party relationships and must be populated from Nemo12's own records.

## Current data state

The candidate pool is intentionally loaded as `Research` with `contact_status = Research needed`, `research_confidence = Low`, and score `0`. This means a public website or programme page has been found, but the target has not yet been qualified.

The pool is not mock data. Each candidate has a public source URL and a research note. A missing second source, decision-maker, or contact route is recorded as a verification gap rather than guessed.

The current city coverage is a cross-group minimum, not a claim of ten candidates in every group in every city. The verified city totals are: Hà Nội 14, TP.HCM 10, Hải Phòng 10, and Đà Nẵng 10. National candidates remain labelled `Toàn quốc` instead of being incorrectly copied into a city.

## Qualification rubric

Score each dimension from 1–5:

1. Relevance — direct fit with English/IELTS learning or Nemo12's learner profile.
2. Audience fit — age, geography, intent, and reachable audience match.
3. Access — credible route to learners, members, or an owned distribution channel.
4. Trust — visible expertise, activity, engagement, or institutional legitimacy.
5. Partnership readiness — public contact route, prior collaboration signal, or clear partner programme.

`Qualified` requires a total of at least 18/25, no score below 3, at least two independent public sources, an active primary channel, and a non-guessed contact route.

## Group-specific checks

- **Experts:** must be an active English/IELTS influencer or educator with identifiable public content and learner audience. A generic celebrity or a tutoring centre is not enough.
- **Professional Affiliators:** must have a referral, affiliate, creator, community, or partnership mechanism. Organisations are valid here; they must not be forced into the Person entity type.
- **Schools:** must be an actual school or education institution with learner access. IELTS/English centres are excluded from this group and should not be treated as schools.
- **Communities:** must have an identifiable member base, active channel, and a responsible lead or public route.

## Required next verification pass

For each candidate, add a second independent source, contact role/route, audience evidence, and five rubric scores. Only then should the API record a `Qualified` stage and non-zero score. The UI should continue to show the evidence state (`Research needed`, `Low`) until this pass is complete.
