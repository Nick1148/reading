'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Meeting } from '../types';
import { MEETING_STATUS_COLORS, MEETING_STATUS_LABELS } from '../constants';

interface MeetingCardProps {
  meeting: Meeting;
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = format(new Date(meeting.date), 'M월 d일 (EEEE)', {
    locale: ko,
  });
  const isFull = meeting.currentParticipants >= meeting.maxParticipants;
  const spotsLeft = meeting.maxParticipants - meeting.currentParticipants;

  return (
    <Card className="flex flex-row md:flex-col overflow-hidden hover:shadow-lg transition-shadow h-28 md:h-auto">
      <div className="relative w-28 md:w-full h-full md:h-48 bg-secondary shrink-0">
        <Image
          src={meeting.bookCoverUrl}
          alt={meeting.bookTitle}
          fill
          className="object-cover"
        />
        <Badge
          className={cn(
            'absolute top-2 right-2 md:top-3 md:right-3 px-1.5 py-0.5 text-[10px] md:text-xs',
            MEETING_STATUS_COLORS[meeting.status]
          )}
        >
          {MEETING_STATUS_LABELS[meeting.status]}
        </Badge>
      </div>

      <div className="flex flex-col flex-1 min-w-0 justify-between md:justify-start">
        <CardHeader className="p-3 pb-0 md:p-6 md:pb-2 space-y-1 md:space-y-1.5">
          <div className="flex items-center gap-2 mb-0 md:mb-2">
            <Avatar className="h-4 w-4 md:h-6 md:w-6">
              <AvatarImage src={meeting.host.avatarUrl} alt={meeting.host.name} />
              <AvatarFallback>{meeting.host.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-caption text-muted-foreground line-clamp-1">
              {meeting.host.name}
            </span>
          </div>
          <h3 className="text-body-sm md:text-h5 font-semibold line-clamp-1 leading-tight">{meeting.title}</h3>
          <p className="text-caption md:text-body-sm text-muted-foreground line-clamp-1">
            {meeting.bookTitle} - {meeting.bookAuthor}
          </p>
        </CardHeader>

        <CardContent className="p-3 pt-1 md:p-6 md:pb-4 space-y-1 hidden md:block">
          <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{meeting.time}</span>
          </div>
          <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{meeting.location}</span>
          </div>
          <div className="flex items-center gap-2 text-body-sm">
            <Users className="h-4 w-4" />
            <span>
              {meeting.currentParticipants}/{meeting.maxParticipants}명
            </span>
            {!isFull && meeting.status === 'upcoming' && (
              <span className="text-accent">({spotsLeft}자리 남음)</span>
            )}
            {isFull && <span className="text-muted-foreground">(마감)</span>}
          </div>
        </CardContent>

        {/* Mobile Content Summary */}
        <div className="px-3 pb-2 md:hidden flex items-center gap-2 text-caption text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{format(new Date(meeting.date), 'M.d', { locale: ko })}</span>
          <span className="text-border">|</span>
          <Users className="h-3 w-3" />
          <span>{meeting.currentParticipants}/{meeting.maxParticipants}</span>
        </div>

        <CardFooter className="hidden md:flex p-6 pt-0">
          <Button asChild className="w-full" variant={isFull ? 'secondary' : 'default'}>
            <Link href={`/meetings/${meeting.id}`}>
              {meeting.status === 'completed' ? '모임 후기 보기' : '상세보기'}
            </Link>
          </Button>
        </CardFooter>
      </div>
      {/* Mobile Whole Card Link Overlay */}
      <Link href={`/meetings/${meeting.id}`} className="absolute inset-0 md:hidden" />
    </Card>
  );
}
