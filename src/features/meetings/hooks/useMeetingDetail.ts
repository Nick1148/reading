'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMeetingById } from '../api';
import { MeetingDetailResponse } from '../types';

/* ========================================
   useMeetingDetail Hook

   Fetches detailed information about a specific meeting.
   Includes participants list.

   Usage:
   ```tsx
   const { data, isLoading, error } = useMeetingDetail('meeting-id');
   ```
   ======================================== */

export const MEETING_DETAIL_QUERY_KEY = 'meeting-detail';

interface UseMeetingDetailOptions {
  enabled?: boolean;
}

export function useMeetingDetail(
  meetingId: string,
  options: UseMeetingDetailOptions = {}
) {
  const { enabled = true } = options;

  return useQuery<MeetingDetailResponse, Error>({
    queryKey: [MEETING_DETAIL_QUERY_KEY, meetingId],
    queryFn: () => fetchMeetingById(meetingId),
    enabled: enabled && !!meetingId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}
