export type ThreatLevel = "low" | "medium" | "high" | "critical";

export type UserRecord = {
  id: string;
  externalId: string | null;
  name: string;
  email: string;
  phone: string | null;
  ipAddress: string | null;
  device: string | null;
  location: string | null;
  course: string | null;
  accountType: string | null;
  paymentMode: string | null;
  amount: number | null;
  status: string;
  threatLevel: ThreatLevel;
  lastSeen: string;
  createdAt: string;
};

export type UserInput = {
  externalId?: string;
  name: string;
  email: string;
  phone?: string;
  ipAddress?: string;
  device?: string;
  location?: string;
  course?: string;
  accountType?: string;
  paymentMode?: string;
  amount?: number;
  status?: string;
  threatLevel?: ThreatLevel;
};
