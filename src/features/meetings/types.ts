/* ========================================
   Meeting Schedule Announcement - Types
   ======================================== */

export type MeetingStatus = 'upcoming' | 'ongoing' | 'completed';

export interface MeetingHost {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Meeting {
  id: string;
  title: string;
  bookTitle: string;
  bookAuthor: string;
  bookCoverUrl: string;
  date: string;
  time: string;
  location: string;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  status: MeetingStatus;
  host: MeetingHost;
  isRegistered?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MeetingParticipant {
  id: string;
  userId: string;
  meetingId: string;
  name: string;
  avatarUrl: string;
  joinedAt: string;
}

/* ========================================
   API Request/Response Types
   ======================================== */

export interface MeetingsListParams {
  status?: MeetingStatus;
  page?: number;
  limit?: number;
}

export interface MeetingsListResponse {
  data: Meeting[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface MeetingDetailResponse {
  data: Meeting & {
    participants: MeetingParticipant[];
  };
}

export interface RegistrationRequest {
  meetingId: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  data: {
    meetingId: string;
    userId: string;
    registeredAt: string;
    status: 'registered' | 'unregistered';
  };
}

export interface UnregisterRequest {
  meetingId: string;
}

export interface UnregisterResponse {
  success: boolean;
  message: string;
  data: {
    meetingId: string;
    userId: string;
    unregisteredAt: string;
  };
}

/* ========================================
   Error Types
   ======================================== */

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
