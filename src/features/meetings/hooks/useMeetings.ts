'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMeetings } from '../api';
import { MeetingsListParams, MeetingsListResponse } from '../types';

/* ========================================
   useMeetings Hook

   Fetches list of meetings with optional filters.
   Uses React Query for caching and automatic refetching.

   Usage:
   ```tsx
   const { data, isLoading, error } = useMeetings({ status: 'upcoming' });
   ```
   ======================================== */

export const MEETINGS_QUERY_KEY = 'meetings';

interface UseMeetingsOptions {
  params?: MeetingsListParams;
  enabled?: boolean;
}

export function useMeetings(options: UseMeetingsOptions = {}) {
  const { params = {}, enabled = true } = options;

  return useQuery<MeetingsListResponse, Error>({
    queryKey: [MEETINGS_QUERY_KEY, params],
    queryFn: () => fetchMeetings(params),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}

/* ========================================
   useUpcomingMeetings Hook

   Convenience hook for fetching only upcoming meetings.

   Usage:
   ```tsx
   const { data, isLoading } = useUpcomingMeetings();
   ```
   ======================================== */

export function useUpcomingMeetings() {
  return useMeetings({
    params: { status: 'upcoming' },
  });
}

/* ========================================
   useCompletedMeetings Hook

   Convenience hook for fetching only completed meetings.

   Usage:
   ```tsx
   const { data, isLoading } = useCompletedMeetings();
   ```
   ======================================== */

export function useCompletedMeetings() {
  return useMeetings({
    params: { status: 'completed' },
  });
}
