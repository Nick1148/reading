'use client';

import { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar, Footer } from '@/components/layout';
import { MeetingList } from '@/features/meetings/components';
import { DUMMY_MEETINGS } from '@/features/meetings/constants';
import { cn } from '@/lib/utils';

type FilterStatus = 'all' | 'upcoming' | 'completed';

const FILTER_OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'upcoming', label: '예정된 모임' },
  { value: 'completed', label: '지난 모임' },
];

export default function MeetingsPage() {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredMeetings = DUMMY_MEETINGS.filter((meeting) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return meeting.status === 'upcoming';
    if (filter === 'completed') return meeting.status === 'completed';
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-8 w-8" />
              <h1 className="text-h1">모임 일정</h1>
            </div>
            <p className="text-body-lg opacity-90 max-w-2xl">
              매월 정기적으로 모여 책을 읽고 토론합니다.
              관심 있는 모임에 참여해보세요.
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="border-b bg-background sticky top-16 z-40">
          <div className="container py-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                {FILTER_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant={filter === option.value ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilter(option.value)}
                    className={cn(
                      filter === option.value && 'pointer-events-none'
                    )}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meeting List */}
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="mb-6">
              <p className="text-body-sm text-muted-foreground">
                총 {filteredMeetings.length}개의 모임
              </p>
            </div>
            <MeetingList
              meetings={filteredMeetings}
              emptyMessage="해당 조건에 맞는 모임이 없습니다."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
