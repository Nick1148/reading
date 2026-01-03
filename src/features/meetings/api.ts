import {
  Meeting,
  MeetingsListParams,
  MeetingsListResponse,
  MeetingDetailResponse,
  RegistrationResponse,
  UnregisterResponse,
  MeetingParticipant,
} from './types';
import { DUMMY_MEETINGS } from './constants';

/* ========================================
   Meeting Schedule Announcement - API

   Data Flow:
   1. UI triggers data fetch (React Query)
   2. Calls REST endpoint /api/meetings
   3. Returns JSON array of meetings
   4. UI renders list

   On register click:
   1. POST to /api/meetings/[id]/register
   2. Update cache
   3. Re-render status
   ======================================== */

const API_BASE_URL = '/api';
const SIMULATED_DELAY = 500;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/* ========================================
   GET /api/meetings - Fetch Meetings List
   ======================================== */
export async function fetchMeetings(
  params: MeetingsListParams = {}
): Promise<MeetingsListResponse> {
  await delay(SIMULATED_DELAY);

  const { status, page = 1, limit = 10 } = params;

  let filteredMeetings = [...DUMMY_MEETINGS];

  if (status) {
    filteredMeetings = filteredMeetings.filter((m) => m.status === status);
  }

  const total = filteredMeetings.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginatedMeetings = filteredMeetings.slice(startIndex, startIndex + limit);

  const meetingsWithDates: Meeting[] = paginatedMeetings.map((m) => ({
    ...m,
    host: { ...m.host, id: `host-${m.id}` },
    isRegistered: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  return {
    data: meetingsWithDates,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

/* ========================================
   GET /api/meetings/:id - Fetch Meeting Detail
   ======================================== */
export async function fetchMeetingById(
  id: string
): Promise<MeetingDetailResponse> {
  await delay(SIMULATED_DELAY);

  const meeting = DUMMY_MEETINGS.find((m) => m.id === id);

  if (!meeting) {
    throw new Error(`Meeting with id ${id} not found`);
  }

  const participants: MeetingParticipant[] = Array.from(
    { length: meeting.currentParticipants },
    (_, index) => ({
      id: `participant-${index + 1}`,
      userId: `user-${index + 1}`,
      meetingId: meeting.id,
      name: `참여자 ${index + 1}`,
      avatarUrl: `https://picsum.photos/seed/participant${index}/100/100`,
      joinedAt: new Date(Date.now() - index * 86400000).toISOString(),
    })
  );

  return {
    data: {
      ...meeting,
      host: { ...meeting.host, id: `host-${meeting.id}` },
      isRegistered: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      participants,
    },
  };
}

/* ========================================
   POST /api/meetings/:id/register - Register for Meeting
   ======================================== */
export async function registerForMeeting(
  meetingId: string
): Promise<RegistrationResponse> {
  await delay(SIMULATED_DELAY);

  const meeting = DUMMY_MEETINGS.find((m) => m.id === meetingId);

  if (!meeting) {
    throw new Error(`Meeting with id ${meetingId} not found`);
  }

  if (meeting.currentParticipants >= meeting.maxParticipants) {
    throw new Error('Meeting is full');
  }

  if (meeting.status !== 'upcoming') {
    throw new Error('Cannot register for a meeting that is not upcoming');
  }

  return {
    success: true,
    message: '모임 참여 신청이 완료되었습니다.',
    data: {
      meetingId,
      userId: 'current-user-id',
      registeredAt: new Date().toISOString(),
      status: 'registered',
    },
  };
}

/* ========================================
   DELETE /api/meetings/:id/register - Unregister from Meeting
   ======================================== */
export async function unregisterFromMeeting(
  meetingId: string
): Promise<UnregisterResponse> {
  await delay(SIMULATED_DELAY);

  const meeting = DUMMY_MEETINGS.find((m) => m.id === meetingId);

  if (!meeting) {
    throw new Error(`Meeting with id ${meetingId} not found`);
  }

  if (meeting.status !== 'upcoming') {
    throw new Error('Cannot unregister from a meeting that is not upcoming');
  }

  return {
    success: true,
    message: '모임 참여가 취소되었습니다.',
    data: {
      meetingId,
      userId: 'current-user-id',
      unregisteredAt: new Date().toISOString(),
    },
  };
}

/* ========================================
   API Endpoints Summary

   | Method | Endpoint                      | Description              |
   |--------|-------------------------------|--------------------------|
   | GET    | /api/meetings                 | List all meetings        |
   | GET    | /api/meetings/:id             | Get meeting details      |
   | POST   | /api/meetings/:id/register    | Register for meeting     |
   | DELETE | /api/meetings/:id/register    | Unregister from meeting  |
   ======================================== */
