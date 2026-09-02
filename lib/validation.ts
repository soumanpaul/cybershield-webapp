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
    status: text(body.status, "status"),
    threatLevel: threatLevel as ThreatLevel | undefined,
  };
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
