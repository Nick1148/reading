/* ========================================
   Meeting Schedule Announcement Feature
   ======================================== */

// Components
export {
  MeetingCard,
  MeetingList,
  MeetingListSkeleton,
  MeetingListError,
  MeetingDetailSkeleton,
  MeetingDetailError,
  EmptyMeetingList,
} from './components';

// Hooks
export {
  useMeetings,
  useUpcomingMeetings,
  useCompletedMeetings,
  MEETINGS_QUERY_KEY,
  useMeetingDetail,
  MEETING_DETAIL_QUERY_KEY,
  useRegisterMeeting,
  useUnregisterMeeting,
  useToggleMeetingRegistration,
} from './hooks';

// API
export {
  fetchMeetings,
  fetchMeetingById,
  registerForMeeting,
  unregisterFromMeeting,
} from './api';

// Types
export type {
  MeetingStatus,
  MeetingHost,
  Meeting,
  MeetingParticipant,
  MeetingsListParams,
  MeetingsListResponse,
  MeetingDetailResponse,
  RegistrationRequest,
  RegistrationResponse,
  UnregisterRequest,
  UnregisterResponse,
  ApiError,
} from './types';

// Schemas
export {
  meetingStatusSchema,
  meetingHostSchema,
  meetingSchema,
  meetingParticipantSchema,
  meetingsListParamsSchema,
  registrationRequestSchema,
  unregisterRequestSchema,
  paginationSchema,
  meetingsListResponseSchema,
  meetingDetailResponseSchema,
  registrationResponseSchema,
  unregisterResponseSchema,
  apiErrorSchema,
} from './schema';

// Constants
export {
  DUMMY_MEETINGS,
  MEETING_STATUS_LABELS,
  MEETING_STATUS_COLORS,
} from './constants';
