"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  CircleDot,
  GraduationCap,
  LayoutDashboard,
  ListFilter,
  Mail,
  Menu,
  Network,
  Plus,
  Search,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { SEED_TARGETS, STAGES, TARGET_TYPES, type OutreachTarget, type Stage } from "@/lib/targets";

type WebMcpContext = {
  registerTool: (tool: {
    name: string;
    title: string;
    description: string;
    inputSchema: Record<string, unknown>;
    annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
    execute: (input: unknown) => unknown | Promise<unknown>;
  }, options?: { signal?: AbortSignal }) => void | Promise<void>;
};

const stageStyle: Record<Stage, string> = {
  Research: "bg-slate-100 text-slate-700",
  Qualified: "bg-blue-50 text-blue-700",
  Contacted: "bg-violet-50 text-violet-700",
  Replied: "bg-amber-50 text-amber-800",
  Conversation: "bg-orange-50 text-orange-800",
  Meeting: "bg-cyan-50 text-cyan-800",
  Pilot: "bg-emerald-50 text-emerald-800",
  Partner: "bg-[#153f36] text-white",
};

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function scoreTone(score: number) {
  if (score >= 90) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (score >= 80) return "text-blue-700 bg-blue-50 border-blue-200";
  return "text-slate-700 bg-slate-50 border-slate-200";
}

export default function Home() {
  const [targets, setTargets] = useState<OutreachTarget[]>(SEED_TARGETS);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [selected, setSelected] = useState<OutreachTarget | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/targets")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => data.targets?.length && setTargets(data.targets))
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const context = (document as Document & { modelContext?: WebMcpContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: "list_outreach_targets",
      title: "List outreach targets",
      description: "Return the currently visible Nemo12 outreach targets and their scores, stages, and next actions.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: () => ({ targets: targets
        .filter((target) => `${target.name} ${target.city} ${target.type} ${target.contactRole}`.toLowerCase().includes(query.toLowerCase()))
        .filter((target) => typeFilter === "All" || target.type === typeFilter)
        .filter((target) => stageFilter === "All" || target.stage === stageFilter)
        .map(({ id, name, type, city, score, stage, nextAction }) => ({ id, name, type, city, score, stage, nextAction })) }),
    }, { signal: lifecycle.signal })).catch(() => undefined);
    void Promise.resolve(context.registerTool({
      name: "update_outreach_target_stage",
      title: "Update outreach target stage",
      description: "Move one existing Nemo12 outreach target to a new funnel stage and update the visible pipeline.",
      inputSchema: {
        type: "object",
        properties: { targetId: { type: "string" }, stage: { type: "string", enum: STAGES } },
        required: ["targetId", "stage"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: async (input) => {
        const value = input as { targetId?: string; stage?: Stage };
        if (!value.targetId || !value.stage || !STAGES.includes(value.stage)) throw new Error("A valid targetId and stage are required");
        if (!targets.some((target) => target.id === value.targetId)) throw new Error("Target not found");
        await updateTarget(value.targetId, { stage: value.stage }, true);
        return { targetId: value.targetId, stage: value.stage };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, [targets, query, typeFilter, stageFilter]);

  const filtered = useMemo(() => targets.filter((target) => {
    const haystack = `${target.name} ${target.city} ${target.type} ${target.contactRole}`.toLowerCase();
    return haystack.includes(query.toLowerCase())
      && (typeFilter === "All" || target.type === typeFilter)
      && (stageFilter === "All" || target.stage === stageFilter);
  }), [targets, query, typeFilter, stageFilter]);

  const counts = useMemo(() => ({
    targets: targets.length,
    conversations: targets.filter((target) => ["Replied", "Conversation", "Meeting", "Pilot", "Partner"].includes(target.stage)).length,
    pilots: targets.filter((target) => ["Pilot", "Partner"].includes(target.stage)).length,
    learners: targets.reduce((sum, target) => sum + target.learners, 0),
  }), [targets]);

  async function updateTarget(id: string, patch: Partial<OutreachTarget>, quiet = false) {
    const previous = targets;
    const next = targets.map((target) => target.id === id ? { ...target, ...patch } : target);
    setTargets(next);
    if (selected?.id === id) setSelected({ ...selected, ...patch });
    try {
      const response = await fetch(`/api/targets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!response.ok) throw new Error();
      if (!quiet) toast.success("Đã cập nhật target");
    } catch {
      setTargets(previous);
      if (!quiet) toast.error("Chưa lưu được thay đổi. Vui lòng thử lại.");
    }
  }

  async function createTarget(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim(),
      type: String(form.get("type") || "School"),
      city: String(form.get("city") || "Việt Nam").trim(),
      website: String(form.get("website") || "").trim(),
      contactRole: String(form.get("contactRole") || "Partnership lead").trim(),
      valueProp: String(form.get("valueProp") || "IELTS Diagnostic miễn phí").trim(),
    };
    if (!payload.name) return;
    try {
      const response = await fetch("/api/targets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      setTargets((current) => [data.target, ...current]);
      setAddOpen(false);
      toast.success("Đã thêm target mới");
    } catch {
      toast.error("Chưa thêm được target. Vui lòng thử lại.");
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f6f8] text-[#10211d]">
      <Toaster position="bottom-right" richColors />
      <header className="sticky top-0 z-30 border-b border-[#dfe7e4] bg-[#f8faf9]/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
          <button className="lg:hidden" aria-label="Mở menu" onClick={() => setMobileNav(true)}><Menu className="h-5 w-5" /></button>
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#0f6b57] text-white shadow-[0_5px_14px_rgba(15,107,87,.2)]"><Network className="h-5 w-5" /></div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#6d807a]">Nemo12</p>
              <p className="text-[15px] font-semibold leading-4">Outreach Engine</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-[#d7e2df] bg-white px-3 py-1.5 text-xs font-medium text-[#536963] sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Việt Nam · MVP</span>
            <AddTargetDialog open={addOpen} setOpen={setAddOpen} onSubmit={createTarget} />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[224px_minmax(0,1fr)]">
        <aside className="hidden min-h-[calc(100vh-64px)] border-r border-[#dfe7e4] bg-[#f8faf9] px-4 py-6 lg:block">
          <Navigation />
        </aside>

        <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <section className="mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#0f6b57]"><Sparkles className="h-4 w-4" /> Priority wedge</div>
              <h1 className="font-serif text-3xl font-semibold tracking-[-.035em] text-[#10211d] sm:text-4xl">School + Community, trước.</h1>
              <p className="mt-2 max-w-2xl text-[15px] leading-6 text-[#60716c]">Một offer dễ hiểu cho mọi cuộc trò chuyện đầu tiên: <span className="font-semibold text-[#28443c]">IELTS Diagnostic miễn phí cho 100 learners.</span></p>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#60716c]"><CalendarClock className="h-4 w-4" /><span>Chu kỳ đầu: 30 ngày</span></div>
          </section>

          <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Metric label="Target accounts" value={counts.targets} note="Mục tiêu 100" accent="teal" />
            <Metric label="Meaningful conversations" value={counts.conversations} note="Mục tiêu 20" accent="blue" />
            <Metric label="Pilots" value={counts.pilots} note="Mục tiêu 5" accent="amber" />
            <Metric label="Qualified learners" value={counts.learners.toLocaleString("vi-VN")} note="Mục tiêu 500" accent="violet" />
          </section>

          <section className="mb-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_310px]">
            <div className="overflow-hidden rounded-2xl border border-[#dce5e2] bg-white shadow-[0_8px_30px_rgba(22,52,44,.04)]">
              <div className="flex flex-col gap-3 border-b border-[#e6ecea] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold">Priority targets</h2>
                  <p className="mt-0.5 text-sm text-[#73827e]">Đã research công khai · ưu tiên theo fit, access, trust và activation</p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <label className="relative block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#82928d]" />
                    <Input aria-label="Tìm target" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm target..." className="h-9 w-full bg-[#f8faf9] pl-9 sm:w-48" />
                  </label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="h-9 w-full bg-[#f8faf9] sm:w-36"><ListFilter className="h-3.5 w-3.5" /><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="All">Mọi nhóm</SelectItem>{TARGET_TYPES.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
                  </Select>
                  <Select value={stageFilter} onValueChange={setStageFilter}>
                    <SelectTrigger className="h-9 w-full bg-[#f8faf9] sm:w-36"><CircleDot className="h-3.5 w-3.5" /><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="All">Mọi stage</SelectItem>{STAGES.map((stage) => <SelectItem key={stage} value={stage}>{stage}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>

              <div className="max-h-[570px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 z-10 bg-[#f8faf9]">
                    <TableRow className="border-[#e5ece9] hover:bg-[#f8faf9]"><TableHead className="min-w-[270px]">Target</TableHead><TableHead>Score</TableHead><TableHead>Stage</TableHead><TableHead className="min-w-[190px]">Next action</TableHead><TableHead className="w-10" /></TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((target) => (
                      <TableRow key={target.id} className="cursor-pointer border-[#edf1ef] hover:bg-[#f7faf9]" onClick={() => setSelected(target)}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e7f2ef] text-xs font-bold text-[#0f6b57]">{initials(target.name)}</div>
                            <div className="min-w-0"><p className="truncate font-semibold text-[#17322b]">{target.name}</p><p className="mt-0.5 text-xs text-[#73827e]">{target.type} · {target.city}</p></div>
                          </div>
                        </TableCell>
                        <TableCell><span className={`inline-flex min-w-10 justify-center rounded-full border px-2 py-1 text-xs font-bold ${scoreTone(target.score)}`}>{target.score}</span></TableCell>
                        <TableCell onClick={(event) => event.stopPropagation()}>
                          <Select value={target.stage} onValueChange={(value) => updateTarget(target.id, { stage: value as Stage }, true)}>
                            <SelectTrigger className={`h-8 w-[122px] border-0 text-xs font-semibold shadow-none ${stageStyle[target.stage]}`}><SelectValue /></SelectTrigger>
                            <SelectContent>{STAGES.map((stage) => <SelectItem key={stage} value={stage}>{stage}</SelectItem>)}</SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell><p className="line-clamp-2 text-sm leading-5 text-[#526660]">{target.nextAction}</p><p className="mt-1 text-[11px] font-medium text-[#83928e]">{target.nextActionDate}</p></TableCell>
                        <TableCell><ArrowUpRight className="h-4 w-4 text-[#87958f]" /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {!filtered.length && <div className="grid h-48 place-items-center text-sm text-[#73827e]">Không có target phù hợp với bộ lọc.</div>}
                {loading && <div className="border-t border-[#edf1ef] px-4 py-2 text-center text-xs text-[#8a9894]">Đang đồng bộ dữ liệu…</div>}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl bg-[#123e34] p-5 text-white shadow-[0_12px_30px_rgba(18,62,52,.16)]">
                <div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[.13em] text-[#a9cec4]">Focus this week</p><Target className="h-4 w-4 text-[#d8a841]" /></div>
                <h2 className="mt-3 font-serif text-2xl font-semibold leading-7">Chứng minh một pilot lặp lại được.</h2>
                <ol className="mt-5 space-y-4">
                  <FocusItem number="01" text="Chốt one-pager Diagnostic + sample report" />
                  <FocusItem number="02" text="Research đúng contact tại 15 targets top-score" />
                  <FocusItem number="03" text="Mở 5 conversation, xin 2 pilot calls" />
                </ol>
              </div>
              <div className="rounded-2xl border border-[#dce5e2] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[.13em] text-[#7a8985]">Scoring model</p>
                <div className="mt-4 space-y-3"><ScoreBar label="Learner fit" value={25} /><ScoreBar label="Access" value={25} /><ScoreBar label="Trust transfer" value={25} /><ScoreBar label="Activation readiness" value={25} /></div>
                <p className="mt-4 border-t border-[#e7ecea] pt-4 text-xs leading-5 text-[#74847f]">Score giúp ưu tiên research, không thay thế judgment. Chỉ promote target khi có “why they care” cụ thể.</p>
              </div>
            </aside>
          </section>
        </main>
      </div>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto border-l-[#dce5e2] p-0 sm:max-w-xl">
          {selected && <TargetDetail target={selected} onUpdate={(patch) => updateTarget(selected.id, patch)} />}
        </SheetContent>
      </Sheet>

      {mobileNav && <div className="fixed inset-0 z-50 bg-[#0c211c]/40 lg:hidden" onClick={() => setMobileNav(false)}><aside className="h-full w-72 bg-[#f8faf9] p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="mb-7 flex items-center justify-between"><span className="font-semibold">Nemo12 Outreach</span><button aria-label="Đóng menu" onClick={() => setMobileNav(false)}><X className="h-5 w-5" /></button></div><Navigation /></aside></div>}
    </div>
  );
}

function Navigation() {
  return <nav className="space-y-1"><NavItem active icon={<LayoutDashboard />} label="Command center" /><NavItem icon={<Building2 />} label="Targets" count="20" /><NavItem icon={<Users />} label="Relationships" /><NavItem icon={<Target />} label="Pilots" /><NavItem icon={<GraduationCap />} label="Learners" /><div className="my-5 border-t border-[#dfe7e4]" /><p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#93a09c]">Playbooks</p><NavItem icon={<Mail />} label="School" /><NavItem icon={<Network />} label="Community" /></nav>;
}

function NavItem({ icon, label, count, active = false }: { icon: React.ReactNode; label: string; count?: string; active?: boolean }) {
  return <button className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? "bg-[#dfeeea] text-[#0f6b57]" : "text-[#5e706b] hover:bg-[#edf3f1]"}`}><span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span><span>{label}</span>{count && <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[11px] text-[#63756f]">{count}</span>}</button>;
}

function Metric({ label, value, note, accent }: { label: string; value: string | number; note: string; accent: string }) {
  const colors: Record<string, string> = { teal: "before:bg-[#0f6b57]", blue: "before:bg-[#3172b7]", amber: "before:bg-[#d89a22]", violet: "before:bg-[#7759b7]" };
  return <div className={`relative overflow-hidden rounded-2xl border border-[#dce5e2] bg-white p-4 before:absolute before:inset-y-0 before:left-0 before:w-1 ${colors[accent]}`}><p className="text-xs font-medium text-[#73827e]">{label}</p><div className="mt-2 flex items-end justify-between gap-2"><p className="text-2xl font-bold tracking-tight text-[#17322b]">{value}</p><p className="pb-1 text-[11px] text-[#83928e]">{note}</p></div></div>;
}

function FocusItem({ number, text }: { number: string; text: string }) {
  return <li className="flex gap-3"><span className="font-mono text-xs font-bold text-[#d8a841]">{number}</span><span className="text-sm leading-5 text-[#e1efeb]">{text}</span></li>;
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return <div><div className="mb-1.5 flex justify-between text-xs"><span className="text-[#536660]">{label}</span><span className="font-semibold text-[#24463d]">{value}</span></div><div className="h-1.5 rounded-full bg-[#eaf0ee]"><div className="h-full rounded-full bg-[#0f6b57]" style={{ width: `${value * 4}%` }} /></div></div>;
}

function AddTargetDialog({ open, setOpen, onSubmit }: { open: boolean; setOpen: (open: boolean) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger render={<Button className="h-9 rounded-xl bg-[#0f6b57] px-3 text-white hover:bg-[#0c5b4b]" />}><Plus className="h-4 w-4" /> <span className="hidden sm:inline">Thêm target</span></DialogTrigger><DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>Thêm outreach target</DialogTitle></DialogHeader><form onSubmit={onSubmit} className="space-y-4"><Field label="Tên target"><Input name="name" required placeholder="Ví dụ: Trường THPT…" /></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Nhóm"><Select name="type" defaultValue="School"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{TARGET_TYPES.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent></Select></Field><Field label="Thành phố"><Input name="city" defaultValue="Hà Nội" /></Field></div><Field label="Website / nguồn"><Input name="website" type="url" placeholder="https://…" /></Field><Field label="Vai trò cần tìm"><Input name="contactRole" defaultValue="Head of English / Student Affairs" /></Field><Field label="Value proposition"><Textarea name="valueProp" defaultValue="IELTS Diagnostic miễn phí cho 100 learners" /></Field><div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setOpen(false)}>Hủy</Button><Button type="submit" className="bg-[#0f6b57] hover:bg-[#0c5b4b]">Thêm target</Button></div></form></DialogContent></Dialog>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-sm font-medium text-[#40564f]">{label}</span>{children}</label>;
}

function TargetDetail({ target, onUpdate }: { target: OutreachTarget; onUpdate: (patch: Partial<OutreachTarget>) => void }) {
  const [nextAction, setNextAction] = useState(target.nextAction);
  const [notes, setNotes] = useState(target.notes);
  useEffect(() => { setNextAction(target.nextAction); setNotes(target.notes); }, [target]);
  return <div>
    <div className="border-b border-[#e2e9e7] bg-[#f7faf9] p-6 pr-12"><SheetHeader><SheetTitle className="text-left font-serif text-2xl leading-7">{target.name}</SheetTitle></SheetHeader><div className="mt-3 flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#e4efec] px-2.5 py-1 text-xs font-semibold text-[#0f6b57]">{target.type}</span><span className="text-xs text-[#75847f]">{target.city}</span><span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${scoreTone(target.score)}`}>Score {target.score}</span></div></div>
    <div className="space-y-6 p-6">
      <div><p className="detail-label">Why they care</p><p className="mt-2 text-[15px] leading-6 text-[#324a43]">{target.valueProp}</p></div>
      <div className="grid grid-cols-2 gap-3"><div className="detail-card"><p className="detail-label">Contact role</p><p className="mt-2 text-sm font-semibold">{target.contactRole}</p></div><div className="detail-card"><p className="detail-label">Stage</p><Select value={target.stage} onValueChange={(value) => onUpdate({ stage: value as Stage })}><SelectTrigger className="mt-2 h-9 bg-white"><SelectValue /></SelectTrigger><SelectContent>{STAGES.map((stage) => <SelectItem key={stage} value={stage}>{stage}</SelectItem>)}</SelectContent></Select></div></div>
      <div className="rounded-xl border border-[#e0e8e5] p-4"><p className="detail-label">Score breakdown</p><div className="mt-4 grid grid-cols-4 gap-2 text-center">{[["Fit", target.fit], ["Access", target.access], ["Trust", target.trust], ["Ready", target.readiness]].map(([label, value]) => <div key={label as string} className="rounded-lg bg-[#f4f7f6] p-2"><p className="text-lg font-bold text-[#164e41]">{value}</p><p className="text-[10px] text-[#7c8d88]">{label}</p></div>)}</div></div>
      <div><p className="detail-label">Next action</p><Textarea className="mt-2" value={nextAction} onChange={(event) => setNextAction(event.target.value)} /><Button size="sm" className="mt-2 bg-[#0f6b57] hover:bg-[#0c5b4b]" onClick={() => onUpdate({ nextAction })}>Lưu action</Button></div>
      <div><p className="detail-label">Relationship notes</p><Textarea className="mt-2 min-h-28" placeholder="Ghi lại context, warm intro, objection, commitment…" value={notes} onChange={(event) => setNotes(event.target.value)} /><Button size="sm" variant="outline" className="mt-2" onClick={() => onUpdate({ notes })}>Lưu notes</Button></div>
      <a href={target.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f6b57] hover:underline">Mở nguồn công khai <ArrowUpRight className="h-4 w-4" /></a>
    </div>
  </div>;
}
