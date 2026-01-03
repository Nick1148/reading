'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function MeetingDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Book Cover & Title */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 h-72 md:h-64 flex-shrink-0 rounded-lg bg-muted animate-pulse" />
          <div className="flex-1 space-y-4">
            <div className="h-6 w-20 bg-muted animate-pulse rounded" />
            <div className="h-10 w-3/4 bg-muted animate-pulse rounded" />
            <div className="space-y-2">
              <div className="h-6 w-48 bg-muted animate-pulse rounded" />
              <div className="h-4 w-32 bg-muted animate-pulse rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
              <div className="space-y-1">
                <div className="h-3 w-12 bg-muted animate-pulse rounded" />
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Description Card */}
        <Card>
          <CardHeader>
            <div className="h-6 w-24 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>

        {/* Participants Card */}
        <Card>
          <CardHeader>
            <div className="h-6 w-32 bg-muted animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                  <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-5 w-5 bg-muted animate-pulse rounded" />
                <div className="space-y-1">
                  <div className="h-3 w-12 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                </div>
              </div>
            ))}
            <div className="h-px bg-muted" />
            <div className="h-10 w-full bg-muted animate-pulse rounded" />
            <div className="flex gap-2">
              <div className="h-10 flex-1 bg-muted animate-pulse rounded" />
              <div className="h-10 flex-1 bg-muted animate-pulse rounded" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
