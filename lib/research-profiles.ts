import type { TargetType } from "@/lib/targets";

export const RESEARCH_TYPES = ["Experts", "Professional Affiliators", "Schools", "Communities"] as const satisfies readonly TargetType[];

export const RESEARCH_PROFILES: Record<typeof RESEARCH_TYPES[number], {
  entityType: "Person" | "Organization";
  mustVerify: string[];
  searchSignals: string[];
  scoring: string[];
}> = {
  Experts: {
    entityType: "Person",
    mustVerify: ["Hoạt động thật trong English/IELTS", "Audience phù hợp", "Public contact route", "Có bằng chứng trust hoặc expertise"],
    searchSignals: ["IELTS / English content", "YouTube TikTok Facebook Instagram", "course / teaching / creator profile", "brand collaborations"],
    scoring: ["Relevance", "Audience fit", "Access", "Trust", "Partnership readiness"],
  },
  "Professional Affiliators": {
    entityType: "Person",
    mustVerify: ["Có hoạt động referral/affiliate", "Kênh promotion rõ", "Audience source rõ", "Public business contact"],
    searchSignals: ["affiliate / referral / ambassador", "education or English audience", "promotion channels", "commission or partnership history"],
    scoring: ["Relevance", "Audience fit", "Access", "Trust", "Partnership readiness"],
  },
  Schools: {
    entityType: "Organization",
    mustVerify: ["Trường đang hoạt động", "Có learner phù hợp", "Decision-maker role", "Kênh tiếp cận nội bộ"],
    searchSignals: ["school website", "English department", "IELTS / extracurricular program", "counselor / student club"],
    scoring: ["Relevance", "Audience fit", "Access", "Trust", "Partnership readiness"],
  },
  Communities: {
    entityType: "Organization",
    mustVerify: ["Community còn hoạt động", "Quy mô member có thể ước tính", "Community lead", "Kênh phân phối"],
    searchSignals: ["community page/group", "member activity", "events", "program or partnership history"],
    scoring: ["Relevance", "Audience fit", "Access", "Trust", "Partnership readiness"],
  },
};

export const RESEARCH_RULES = {
  verifiedMinimumSources: 2,
  confidenceLevels: ["High", "Medium", "Low"] as const,
  principles: ["Tách fact khỏi inference", "Không đoán email cá nhân", "Ghi source URL cho từng claim", "Ghi last verified date"],
};
