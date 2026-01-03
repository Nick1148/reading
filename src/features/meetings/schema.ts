import { z } from 'zod';

/* ========================================
   Meeting Schedule Announcement - Schemas
   ======================================== */

export const meetingStatusSchema = z.enum(['upcoming', 'ongoing', 'completed']);

export const meetingHostSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatarUrl: z.string().url(),
});

export const meetingSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  bookTitle: z.string().min(1),
  bookAuthor: z.string().min(1),
  bookCoverUrl: z.string().url(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  location: z.string().min(1),
  description: z.string(),
  maxParticipants: z.number().int().positive(),
  currentParticipants: z.number().int().nonnegative(),
  status: meetingStatusSchema,
  host: meetingHostSchema,
  isRegistered: z.boolean().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const meetingParticipantSchema = z.object({
  id: z.string(),
  userId: z.string(),
  meetingId: z.string(),
  name: z.string(),
  avatarUrl: z.string().url(),
  joinedAt: z.string().datetime(),
});

/* ========================================
   API Request Schemas
   ======================================== */

export const meetingsListParamsSchema = z.object({
  status: meetingStatusSchema.optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(50).optional().default(10),
});

export const registrationRequestSchema = z.object({
  meetingId: z.string().min(1),
});

export const unregisterRequestSchema = z.object({
  meetingId: z.string().min(1),
});

/* ========================================
   API Response Schemas
   ======================================== */

export const paginationSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export const meetingsListResponseSchema = z.object({
  data: z.array(meetingSchema),
  pagination: paginationSchema,
});

export const meetingDetailResponseSchema = z.object({
  data: meetingSchema.extend({
    participants: z.array(meetingParticipantSchema),
  }),
});

export const registrationResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    meetingId: z.string(),
    userId: z.string(),
    registeredAt: z.string().datetime(),
    status: z.enum(['registered', 'unregistered']),
  }),
});

export const unregisterResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    meetingId: z.string(),
    userId: z.string(),
    unregisteredAt: z.string().datetime(),
  }),
});

export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.unknown()).optional(),
});

/* ========================================
   Type Inference from Schemas
   ======================================== */

export type MeetingStatusSchema = z.infer<typeof meetingStatusSchema>;
export type MeetingSchema = z.infer<typeof meetingSchema>;
export type MeetingParticipantSchema = z.infer<typeof meetingParticipantSchema>;
export type MeetingsListParamsSchema = z.infer<typeof meetingsListParamsSchema>;
export type MeetingsListResponseSchema = z.infer<typeof meetingsListResponseSchema>;
export type MeetingDetailResponseSchema = z.infer<typeof meetingDetailResponseSchema>;
export type RegistrationRequestSchema = z.infer<typeof registrationRequestSchema>;
export type RegistrationResponseSchema = z.infer<typeof registrationResponseSchema>;
