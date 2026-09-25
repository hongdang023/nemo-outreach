import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { activities, targets } from "@/db/schema";
import { SEED_TARGETS, STAGES, TARGET_TYPES, type OutreachTarget } from "@/lib/targets";

const editable = ["name", "type", "city", "website", "contactRole", "contactChannel", "valueProp", "nextAction", "nextActionDate", "stage", "fit", "access", "trust", "readiness", "score", "learners", "notes"] as const;

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const payload = await request.json() as Partial<OutreachTarget>;
    if (payload.stage && !STAGES.includes(payload.stage)) return Response.json({ error: "Invalid stage" }, { status: 400 });
    if (payload.type && !TARGET_TYPES.includes(payload.type)) return Response.json({ error: "Invalid type" }, { status: 400 });

    const db = getDb();
    const [persisted] = await db.select().from(targets).where(eq(targets.id, id)).limit(1);
    const base = persisted || SEED_TARGETS.find((target) => target.id === id);
    if (!base) return Response.json({ error: "Target not found" }, { status: 404 });

    const patch = Object.fromEntries(editable.filter((key) => payload[key] !== undefined).map((key) => [key, payload[key]]));
    const merged = { ...base, ...patch, id, updatedAt: new Date().toISOString() } as typeof targets.$inferInsert;
    const [updated] = await db.insert(targets).values(merged).onConflictDoUpdate({ target: targets.id, set: merged }).returning();

    if (payload.stage && payload.stage !== base.stage) {
      await db.insert(activities).values({ targetId: id, kind: "stage_change", detail: `${base.stage} → ${payload.stage}`, occurredAt: new Date().toISOString() });
    }
    return Response.json({ target: updated });
  } catch (error) {
    console.error("targets:update", error);
    return Response.json({ error: "Unable to update target" }, { status: 500 });
  }
}
