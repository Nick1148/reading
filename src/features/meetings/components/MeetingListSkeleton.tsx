'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

function MeetingCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-muted animate-pulse" />
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 w-6 rounded-full bg-muted animate-pulse" />
          <div className="h-4 w-20 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-6 w-3/4 bg-muted animate-pulse rounded mb-2" />
        <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
      </CardHeader>
      <CardContent className="space-y-2 pb-4">
        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
        <div className="h-4 w-40 bg-muted animate-pulse rounded" />
        <div className="h-4 w-28 bg-muted animate-pulse rounded" />
      </CardContent>
      <CardFooter>
        <div className="h-10 w-full bg-muted animate-pulse rounded" />
      </CardFooter>
    </Card>
  );
}

interface MeetingListSkeletonProps {
  count?: number;
}

export function MeetingListSkeleton({ count = 6 }: MeetingListSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <MeetingCardSkeleton key={index} />
      ))}
    </div>
  );
}
