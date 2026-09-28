export const TARGET_TYPES = ["Experts", "Professional Affiliators", "Nemo12 Advocates", "Schools", "Communities"] as const;
export const ENTITY_TYPES = ["Person", "Organization"] as const;
export const TARGET_TYPE_ENTITY: Record<TargetType, typeof ENTITY_TYPES[number]> = {
  Experts: "Person",
  "Professional Affiliators": "Person",
  "Nemo12 Advocates": "Person",
  Schools: "Organization",
  Communities: "Organization",
};
export const TARGET_TYPE_ENTITIES: Record<TargetType, Array<typeof ENTITY_TYPES[number]>> = {
  Experts: ["Person"],
  "Professional Affiliators": ["Person", "Organization"],
  "Nemo12 Advocates": ["Person"],
  Schools: ["Organization"],
  Communities: ["Organization"],
};
export const STAGES = ["Research", "Qualified", "Contacted", "Replied", "Conversation", "Meeting", "Pilot", "Partner"] as const;
export type TargetType = typeof TARGET_TYPES[number];
export type Stage = typeof STAGES[number];
export type OutreachTarget = {
  id: string; name: string; type: TargetType; entityType: "Person" | "Organization"; relationshipType: string; organization: string; location: string; city: string; website: string;
  audience: string; audienceSizeEstimate: string; audienceFit: string; expertiseArea: string; platforms: string; contentTopics: string; promotionChannel: string; organizationType: string; organizationSize: string; decisionMakerRole: string; distributionChannels: string; accessToLearners: string; engagementQuality: string; influenceType: string; partnershipReadiness: string; researchConfidence: string;
  facebookUrl: string; linkedinUrl: string; contactRole: string; contactChannel: string; contactEmail: string; contactPhone: string; contactFormUrl: string; preferredContactMethod: string; contactStatus: "Verified" | "Public route" | "Research needed";
  warmContactPerson: string; warmContactTeam: string; warmContactNote: string; relationshipStrength: string; introductionStatus: string; sourceUrls: string; researchSummary: string; advocateType: string;
  valueProp: string; nextAction: string; nextActionDate: string; stage: Stage; fit: number; access: number; trust: number; readiness: number; score: number; trials: number; learners: number; notes: string;
};
