'use client';

import { CalendarX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyMeetingListProps {
  message?: string;
}

export function EmptyMeetingList({
  message = '등록된 모임이 없습니다.',
}: EmptyMeetingListProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <CalendarX className="h-16 w-16 text-muted-foreground mb-6" />
        <h3 className="text-h4 mb-2">모임이 없습니다</h3>
        <p className="text-body text-muted-foreground max-w-md">
          {message}
        </p>
      </CardContent>
    </Card>
  );
}
