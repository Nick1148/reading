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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-secondary">
        <Image
          src={meeting.bookCoverUrl}
          alt={meeting.bookTitle}
          fill
          className="object-cover"
        />
        <Badge
          className={cn(
            'absolute top-3 right-3',
            MEETING_STATUS_COLORS[meeting.status]
          )}
        >
          {MEETING_STATUS_LABELS[meeting.status]}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={meeting.host.avatarUrl} alt={meeting.host.name} />
            <AvatarFallback>{meeting.host.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-caption text-muted-foreground">
            {meeting.host.name}
          </span>
        </div>
        <h3 className="text-h5 font-semibold line-clamp-1">{meeting.title}</h3>
        <p className="text-body-sm text-muted-foreground line-clamp-1">
          {meeting.bookTitle} - {meeting.bookAuthor}
        </p>
      </CardHeader>

      <CardContent className="space-y-2 pb-4">
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

      <CardFooter>
        <Button asChild className="w-full" variant={isFull ? 'secondary' : 'default'}>
          <Link href={`/meetings/${meeting.id}`}>
            {meeting.status === 'completed' ? '모임 후기 보기' : '상세보기'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
