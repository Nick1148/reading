'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Navbar, Footer } from '@/components/layout';
import { DUMMY_MEETINGS, MEETING_STATUS_COLORS, MEETING_STATUS_LABELS } from '@/features/meetings/constants';
import { cn } from '@/lib/utils';

const ALL_MEMBERS = [
  { id: '1', name: '이관익', avatarUrl: 'https://picsum.photos/seed/2/100/100' },
  { id: '2', name: '김선준', avatarUrl: 'https://picsum.photos/seed/4/100/100' },
  { id: '3', name: '허창근', avatarUrl: 'https://picsum.photos/seed/5/100/100' },
  { id: '4', name: '김정훈', avatarUrl: '/images/team/kim_jung_hoon.png' },
  { id: '5', name: '한현욱', avatarUrl: '/images/team/han_hyun_wook.png' },
  { id: '6', name: '박장미', avatarUrl: '/images/team/park_jang_mi.png' },
  { id: '7', name: '김수헌', avatarUrl: 'https://picsum.photos/seed/3/100/100' },
];

interface MeetingDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function MeetingDetailPage({ params }: MeetingDetailPageProps) {
  const { id } = use(params);
  const meeting = DUMMY_MEETINGS.find((m) => m.id === id);

  if (!meeting) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-h2 mb-4">모임을 찾을 수 없습니다</h1>
            <Button asChild>
              <Link href="/meetings">모임 목록으로 돌아가기</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = format(new Date(meeting.date), 'yyyy년 M월 d일 (EEEE)', {
    locale: ko,
  });
  const isFull = meeting.currentParticipants >= meeting.maxParticipants;
  const spotsLeft = meeting.maxParticipants - meeting.currentParticipants;
  const isUpcoming = meeting.status === 'upcoming';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Back Navigation */}
        <div className="border-b">
          <div className="container py-4">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/meetings">
                <ArrowLeft className="h-4 w-4" />
                모임 목록
              </Link>
            </Button>
          </div>
        </div>

        {/* Content */}
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Book Cover & Title */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-48 h-72 md:h-64 flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
                    <Image
                      src={meeting.bookCoverUrl}
                      alt={meeting.bookTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge className={cn(MEETING_STATUS_COLORS[meeting.status])}>
                        {MEETING_STATUS_LABELS[meeting.status]}
                      </Badge>
                    </div>
                    <h1 className="text-h1">{meeting.title}</h1>
                    <div>
                      <p className="text-h4 text-primary">{meeting.bookTitle}</p>
                      <p className="text-body text-muted-foreground">
                        {meeting.bookAuthor}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={meeting.host.avatarUrl} alt={meeting.host.name} />
                        <AvatarFallback>{meeting.host.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-body-sm">주최자</p>
                        <p className="text-label">{meeting.host.name}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>모임 소개</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body text-muted-foreground leading-relaxed">
                      {meeting.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Participants */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {/* User requested: Exclude host, rest are participants. So always 6 participants. */}
                      <span>참여자 (6명)</span>
                      <span className="text-body-sm text-muted-foreground font-normal">
                        정원 {meeting.maxParticipants}명
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      {/* Filter out the host from ALL_MEMBERS to get the participant list */}
                      {ALL_MEMBERS.filter((member) => member.name !== meeting.host.name).map(
                        (participant) => (
                          <div
                            key={participant.id}
                            className="flex items-center gap-2"
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={participant.avatarUrl}
                                alt={participant.name}
                              />
                              <AvatarFallback>{participant.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-body-sm">{participant.name}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Info Card */}
                <Card className="sticky top-24">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-caption text-muted-foreground">날짜</p>
                        <p className="text-body font-medium">{formattedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-caption text-muted-foreground">시간</p>
                        <p className="text-body font-medium">{meeting.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-caption text-muted-foreground">장소</p>
                        <p className="text-body font-medium">{meeting.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-caption text-muted-foreground">참여 현황</p>
                        <p className="text-body font-medium">
                          {meeting.currentParticipants}/{meeting.maxParticipants}명
                          {!isFull && isUpcoming && (
                            <span className="text-accent ml-2">
                              ({spotsLeft}자리 남음)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {isUpcoming ? (
                      <Button
                        className="w-full"
                        size="lg"
                        disabled={isFull}
                      >
                        {isFull ? '마감되었습니다' : '참여 신청하기'}
                      </Button>
                    ) : (
                      <Button className="w-full" size="lg" variant="secondary">
                        후기 작성하기
                      </Button>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 gap-2">
                        <Heart className="h-4 w-4" />
                        관심
                      </Button>
                      <Button variant="outline" className="flex-1 gap-2">
                        <Share2 className="h-4 w-4" />
                        공유
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
