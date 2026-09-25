import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { targets } from "@/db/schema";
import { SEED_TARGETS, type OutreachTarget, type TargetType } from "@/lib/targets";

function mergeTarget(row: typeof targets.$inferSelect): OutreachTarget {
  return row as OutreachTarget;
}

export async function GET() {
  try {
    const persisted = await getDb().select().from(targets).orderBy(desc(targets.updatedAt));
    const byId = new Map(SEED_TARGETS.map((target) => [target.id, target]));
    for (const row of persisted) byId.set(row.id, mergeTarget(row));
    return Response.json({ targets: [...byId.values()] });
  } catch (error) {
    console.error("targets:list", error);
    return Response.json({ targets: SEED_TARGETS, persistence: "unavailable" });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as Partial<OutreachTarget>;
    const name = payload.name?.trim();
    if (!name) return Response.json({ error: "name is required" }, { status: 400 });

    const now = new Date().toISOString();
    const target: typeof targets.$inferInsert = {
      id: crypto.randomUUID(),
      name,
      type: (payload.type || "School") as TargetType,
      city: payload.city?.trim() || "Việt Nam",
      website: payload.website?.trim() || "",
      contactRole: payload.contactRole?.trim() || "Partnership lead",
      contactChannel: payload.contactChannel?.trim() || "Chưa research",
      valueProp: payload.valueProp?.trim() || "IELTS Diagnostic miễn phí cho 100 learners",
      nextAction: "Research đúng contact và chuẩn bị lý do họ nên quan tâm.",
      nextActionDate: "Chưa đặt",
      stage: "Research",
      fit: 15,
      access: 15,
      trust: 15,
      readiness: 15,
      score: 60,
      learners: 0,
      notes: "",
      updatedAt: now,
    };
    const [created] = await getDb().insert(targets).values(target).returning();
    return Response.json({ target: mergeTarget(created) }, { status: 201 });
  } catch (error) {
    console.error("targets:create", error);
    return Response.json({ error: "Unable to create target" }, { status: 500 });
  }
}
