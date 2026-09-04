import type { ThreatLevel, UserInput } from "@/lib/types";

const threatLevels = new Set<ThreatLevel>(["low", "medium", "high", "critical"]);

export function parseUserInput(value: unknown): UserInput {
  if (!value || typeof value !== "object") throw new Error("JSON body is required");
  const body = value as Record<string, unknown>;

  const name = text(body.name, "name", true);
  const email = text(body.email, "email", true);
  if (!email.includes("@")) throw new Error("email must be valid");

  const threatLevel = body.threatLevel;
  if (threatLevel !== undefined && !threatLevels.has(threatLevel as ThreatLevel)) {
    throw new Error("threatLevel must be low, medium, high, or critical");
  }

  return {
    name,
    email,
    externalId: text(body.externalId, "externalId"),
    phone: text(body.phone, "phone"),
    ipAddress: text(body.ipAddress, "ipAddress"),
    device: text(body.device, "device"),
    location: text(body.location, "location"),
    course: text(body.course, "course"),
    accountType: text(body.accountType, "accountType"),
    paymentMode: text(body.paymentMode, "paymentMode"),
    amount: money(body.amount, "amount"),
    status: text(body.status, "status"),
    threatLevel: threatLevel as ThreatLevel | undefined,
  };
}

function money(value: unknown, field: string): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`${field} must be a valid number`);
  if (value < 0 || value > 100_000_000) throw new Error(`${field} must be between 0 and 100000000`);
  return Math.round(value * 100) / 100;
}

function text(value: unknown, field: string, required = false): string {
  if (value === undefined || value === null || value === "") {
    if (required) throw new Error(`${field} is required`);
    return "";
  }
  if (typeof value !== "string") throw new Error(`${field} must be a string`);
  const clean = value.trim();
  if (required && !clean) throw new Error(`${field} is required`);
  if (clean.length > 255) throw new Error(`${field} is too long`);
  return clean;
}
