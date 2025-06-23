import { AuditLog } from "@/libs/db/models/AuditLogModel";
import { headers } from "next/headers";

export async function logAuditEvent(userId: string, action: string, resourceType: string, resourceId: string, details: Record<string, unknown> = {}) {
  try {
    const ipAddress = await getClientIP();
    const userAgent = await getUserAgent();

    await AuditLog.create({
      userId,
      action,
      resourceType,
      resourceId,
      details,
      ipAddress,
      userAgent,
    });
  } catch (error) {
    console.error("Failed to log audit event:", error);
  }
}

async function getClientIP(): Promise<string> {
  const headersList = await headers();
  return headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
}

async function getUserAgent(): Promise<string> {
  const headersList = await headers();
  return headersList.get("user-agent") || "unknown";
}
