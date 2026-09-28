# Nemo12 Partner Research Schema

## Research scope

The web-researched groups are Experts, Professional Affiliators, Schools, and Communities. Nemo12 Advocates are first-party relationships and are excluded from web discovery.

## Classification

- `entity_type`: `Person` or `Organization`
- `partner_type`: `Experts`, `Professional Affiliators`, `Nemo12 Advocates`, `Schools`, or `Communities`
- `relationship_type`: `Referral`, `Content`, `Distribution`, `Community activation`, `Advisory`, or `Strategic`

Professional Affiliators may be a person, a registered affiliate operator, or a partnership team. Do not force an organization into `Person`; preserve the actual entity type.

## Required evidence

Every researched record must have:

1. At least two public sources when claiming `Verified`.
2. A source for each important claim, not only a homepage.
3. A public contact route; never infer a private email or phone number.
4. `research_confidence`: `High`, `Medium`, or `Low`.
5. `last_verified_at`.

If these conditions are not met, use `contact_status = Research needed` and `research_confidence = Low`.

## Assessment rubric

Score each criterion from 1 to 5 and record evidence:

- Relevance: English/IELTS and Nemo12 learner fit.
- Audience fit: age, geography, intent, and audience quality.
- Access: real channel to learners or decision makers.
- Trust: public proof of expertise, activity, engagement, or outcomes.
- Partnership readiness: public contact route, previous collaborations, or clear partnership signal.

`total_score` is the sum of the five criteria. A candidate is `Qualified` only when total score is at least 18/25 and no critical evidence gap remains.
