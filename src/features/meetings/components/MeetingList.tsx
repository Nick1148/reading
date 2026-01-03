'use client';

import { Meeting } from '../types';
import { MeetingCard } from './MeetingCard';

interface MeetingListProps {
  meetings: Meeting[];
  emptyMessage?: string;
}

export function MeetingList({
  meetings,
  emptyMessage = '등록된 모임이 없습니다.',
}: MeetingListProps) {
  if (meetings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-body text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
}
