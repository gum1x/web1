import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    action: {
      type: String,
      required: true,
      enum: ["create", "update", "delete", "login", "logout", "signup"],
    },
    resourceType: {
      type: String,
      required: true,
      enum: ["user", "board", "list", "card"],
    },
    resourceId: {
      type: String,
      required: true,
    },
    details: {
      type: Schema.Types.Mixed,
      default: {},
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });
auditLogSchema.index({ resourceType: 1, resourceId: 1 });

export const AuditLog = mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", auditLogSchema);
