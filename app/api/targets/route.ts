import { getDb } from "@/db";
import { targets } from "@/db/schema";
import { TARGET_TYPES, type OutreachTarget, type TargetType } from "@/lib/targets";
import { RESEARCH_CANDIDATES } from "@/lib/research-candidates";

function mergeTarget(row: typeof targets.$inferSelect): OutreachTarget {
  return { ...row, trials: row.trials || 0, contactStatus: (row.contactStatus || "Research needed") as OutreachTarget["contactStatus"] } as OutreachTarget;
}

export async function GET() {
  try {
    const researched = RESEARCH_CANDIDATES.filter(candidate => TARGET_TYPES.includes(candidate.type));
    let persisted = await getDb().select().from(targets);
    if (persisted.length === 0 && researched.length > 0) {
      await getDb().insert(targets).values(researched as typeof targets.$inferInsert[]).onConflictDoNothing();
      persisted = await getDb().select().from(targets);
    }
    const byId = new Map(researched.map(candidate => [candidate.id, candidate]));
    for (const row of persisted.filter(row => TARGET_TYPES.includes(row.type as TargetType))) byId.set(row.id, mergeTarget(row));
    return Response.json({ targets: [...byId.values()] });
  } catch (error) {
    console.error("targets:list", error instanceof Error ? error.message : String(error), error);
    return Response.json({ targets: RESEARCH_CANDIDATES, persistence: "unavailable" });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as Partial<OutreachTarget>;
    const name = payload.name?.trim();
    if (!name) return Response.json({ error: "name is required" }, { status: 400 });
    if (payload.type && !TARGET_TYPES.includes(payload.type as TargetType)) return Response.json({ error: "Invalid partner type" }, { status: 400 });

    const now = new Date().toISOString();
    const target: typeof targets.$inferInsert = {
      id: crypto.randomUUID(),
      name,
      type: (payload.type || "Schools") as TargetType,
      entityType: payload.entityType || "Organization",
      relationshipType: payload.relationshipType || "Distribution",
      organization: payload.organization?.trim() || "",
      location: payload.location?.trim() || payload.city?.trim() || "",
      audience: payload.audience?.trim() || "",
      audienceSizeEstimate: payload.audienceSizeEstimate?.trim() || "",
      audienceFit: payload.audienceFit?.trim() || "",
      expertiseArea: payload.expertiseArea?.trim() || "",
      platforms: payload.platforms?.trim() || "",
      contentTopics: payload.contentTopics?.trim() || "",
      promotionChannel: payload.promotionChannel?.trim() || "",
      organizationType: payload.organizationType?.trim() || "",
      organizationSize: payload.organizationSize?.trim() || "",
      decisionMakerRole: payload.decisionMakerRole?.trim() || "",
      distributionChannels: payload.distributionChannels?.trim() || "",
      accessToLearners: payload.accessToLearners?.trim() || "",
      engagementQuality: payload.engagementQuality?.trim() || "",
      influenceType: payload.influenceType?.trim() || "",
      partnershipReadiness: payload.partnershipReadiness?.trim() || "",
      researchConfidence: payload.researchConfidence || "Low",
      city: payload.city?.trim() || "Việt Nam",
      website: payload.website?.trim() || "",
      contactRole: payload.contactRole?.trim() || "Partnership lead",
      contactChannel: payload.contactChannel?.trim() || "Chưa research",
      contactEmail: payload.contactEmail?.trim() || "",
      contactPhone: payload.contactPhone?.trim() || "",
      contactFormUrl: payload.contactFormUrl?.trim() || "",
      preferredContactMethod: payload.preferredContactMethod?.trim() || "",
      contactStatus: payload.contactStatus || "Research needed",
      valueProp: payload.valueProp?.trim() || "IELTS Diagnostic miễn phí cho 100 learners",
      nextAction: "Research đúng contact và chuẩn bị lý do họ nên quan tâm.",
      nextActionDate: "Chưa đặt",
      stage: payload.stage || "Research",
      fit: payload.fit ?? 0,
      access: payload.access ?? 0,
      trust: payload.trust ?? 0,
      readiness: payload.readiness ?? 0,
      score: payload.score ?? 0,
      learners: payload.learners ?? 0,
      trials: payload.trials ?? 0,
      notes: payload.notes?.trim() || "",
      facebookUrl: payload.facebookUrl?.trim() || "",
      linkedinUrl: payload.linkedinUrl?.trim() || "",
      warmContactPerson: payload.warmContactPerson?.trim() || "",
      warmContactTeam: payload.warmContactTeam?.trim() || "",
      warmContactNote: payload.warmContactNote?.trim() || "",
      relationshipStrength: payload.relationshipStrength || "Cold",
      introductionStatus: payload.introductionStatus || "Not requested",
      sourceUrls: payload.sourceUrls?.trim() || payload.website?.trim() || "",
      researchSummary: payload.researchSummary?.trim() || "",
      advocateType: payload.advocateType?.trim() || "",
      updatedAt: now,
    };
    const [created] = await getDb().insert(targets).values(target).returning();
    return Response.json({ target: mergeTarget(created) }, { status: 201 });
  } catch (error) {
    console.error("targets:create", error);
    return Response.json({ error: "Unable to create target" }, { status: 500 });
  }
}
