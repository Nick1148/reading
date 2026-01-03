'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerForMeeting, unregisterFromMeeting } from '../api';
import { RegistrationResponse, UnregisterResponse } from '../types';
import { MEETINGS_QUERY_KEY } from './useMeetings';
import { MEETING_DETAIL_QUERY_KEY } from './useMeetingDetail';

/* ========================================
   useRegisterMeeting Hook

   Handles meeting registration with optimistic updates.

   Data Flow:
   1. User clicks "Register" button
   2. POST to /api/meetings/[id]/register
   3. Update cache optimistically
   4. Re-render status

   Usage:
   ```tsx
   const { mutate, isPending } = useRegisterMeeting();

   const handleRegister = () => {
     mutate('meeting-id', {
       onSuccess: () => toast.success('등록 완료!'),
       onError: (error) => toast.error(error.message),
     });
   };
   ```
   ======================================== */

export function useRegisterMeeting() {
  const queryClient = useQueryClient();

  return useMutation<RegistrationResponse, Error, string>({
    mutationFn: (meetingId: string) => registerForMeeting(meetingId),
    onSuccess: (data, meetingId) => {
      queryClient.invalidateQueries({
        queryKey: [MEETINGS_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [MEETING_DETAIL_QUERY_KEY, meetingId],
      });
    },
  });
}

/* ========================================
   useUnregisterMeeting Hook

   Handles meeting unregistration.

   Usage:
   ```tsx
   const { mutate, isPending } = useUnregisterMeeting();

   const handleUnregister = () => {
     mutate('meeting-id', {
       onSuccess: () => toast.success('참여 취소 완료!'),
       onError: (error) => toast.error(error.message),
     });
   };
   ```
   ======================================== */

export function useUnregisterMeeting() {
  const queryClient = useQueryClient();

  return useMutation<UnregisterResponse, Error, string>({
    mutationFn: (meetingId: string) => unregisterFromMeeting(meetingId),
    onSuccess: (data, meetingId) => {
      queryClient.invalidateQueries({
        queryKey: [MEETINGS_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [MEETING_DETAIL_QUERY_KEY, meetingId],
      });
    },
  });
}

/* ========================================
   useToggleMeetingRegistration Hook

   Convenience hook that toggles registration status.

   Usage:
   ```tsx
   const { mutate, isPending } = useToggleMeetingRegistration();

   const handleToggle = () => {
     mutate({ meetingId: 'meeting-id', isRegistered: false });
   };
   ```
   ======================================== */

interface ToggleRegistrationParams {
  meetingId: string;
  isRegistered: boolean;
}

export function useToggleMeetingRegistration() {
  const registerMutation = useRegisterMeeting();
  const unregisterMutation = useUnregisterMeeting();

  const mutate = (
    params: ToggleRegistrationParams,
    options?: {
      onSuccess?: () => void;
      onError?: (error: Error) => void;
    }
  ) => {
    const { meetingId, isRegistered } = params;

    if (isRegistered) {
      unregisterMutation.mutate(meetingId, options);
    } else {
      registerMutation.mutate(meetingId, options);
    }
  };

  return {
    mutate,
    isPending: registerMutation.isPending || unregisterMutation.isPending,
    isError: registerMutation.isError || unregisterMutation.isError,
    error: registerMutation.error || unregisterMutation.error,
  };
}
