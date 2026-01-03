'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Users,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Navbar, Footer } from '@/components/layout';
import { MeetingCard } from '@/features/meetings/components';
import { PostCard } from '@/features/board/components';
import { DUMMY_MEETINGS } from '@/features/meetings/constants';
import { DUMMY_POSTS } from '@/features/board/constants';

// Reverted to vector icons for consistency
const FEATURES = [
  {
    iconUrl: '/images/ui/icon_feature_meeting.png',
    title: '정기 모임',
    description: '매월 한 권의 책을 선정하여 함께 읽고 토론합니다.',
  },
  {
    iconUrl: '/images/ui/icon_feature_community.png', // Placeholder: using the existing vector icon
    title: '따뜻한 커뮤니티',
    description: '30-40대 직장인들이 함께하는 편안한 독서 모임입니다.',
  },
  {
    iconUrl: '/images/ui/icon_feature_chat.png',
    title: '활발한 소통',
    description: '독서 후기와 사진을 공유하며 추억을 나눕니다.',
  },
] as const;

const TEAM_MEMBERS = [
  {
    name: '박장미',
    role: '회장',
    avatarUrl: '/images/team/park_jang_mi.png',
    description: '독서모임을 이끌어가는 열정적인 리더',
  },
  {
    name: '한현욱',
    role: '운영진',
    avatarUrl: '/images/team/han_hyun_wook.png',
    description: '라임화성 브레인',
  },
  {
    name: '김정훈',
    role: '운영진',
    avatarUrl: '/images/team/kim_jung_hoon.png',
    description: '라임의 안전책임자',
  },
];

const FAQ_ITEMS = [
  {
    question: '누구나 참여할 수 있나요?',
    answer:
      '네, 회사 임직원이라면 누구나 참여할 수 있습니다. 회원가입 후 관리자 승인이 완료되면 모임에 참석하실 수 있습니다.',
  },
  {
    question: '모임은 언제 진행되나요?',
    answer:
      '매월 둘째 주 수요일 저녁 7시에 정기 모임을 진행합니다. 장소는 모임마다 다를 수 있으니 공지를 확인해주세요.',
  },
  {
    question: '책은 어떻게 선정하나요?',
    answer:
      '매월 회원들의 추천을 받아 투표를 통해 다음 달 책을 선정합니다. 다양한 장르의 책을 읽으려고 노력하고 있습니다.',
  },
  {
    question: '참가비가 있나요?',
    answer:
      '모임 참가비는 없습니다. 다만 각자 책은 개별 구매하셔야 하며, 모임 장소에 따라 음료 비용이 발생할 수 있습니다.',
  },
  {
    question: '모임에 참석하지 못하면 어떻게 하나요?',
    answer:
      '모임 참석이 어려우시면 게시판을 통해 독서 후기를 공유해주시면 됩니다. 온라인으로도 소통할 수 있습니다.',
  },
];

export default function HomePage() {
  const upcomingMeetings = DUMMY_MEETINGS.filter(
    (meeting) => meeting.status === 'upcoming'
  ).slice(0, 3);
  const recentPosts = DUMMY_POSTS.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden flex flex-col justify-center items-center text-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero_illustration.png"
              alt="Reading Future Library"
              fill
              className="object-cover object-center brightness-[0.7]"
              priority
            />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 container space-y-8 px-4">
            <h1 className="text-display-lg md:text-[5rem] lg:text-[7rem] font-serif font-bold tracking-tight text-white drop-shadow-xl loading-tight">
              Reading Future
            </h1>

            <p className="text-body-lg md:text-2xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-md">
              함께 읽고, 함께 성장하는<br />
              우리의 독서 커뮤니티
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <Button
                  size="lg"
                  className="relative bg-white text-primary hover:bg-white border-0 font-bold px-12 h-16 text-xl md:text-2xl shadow-[0_0_40px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.5)] transition-all hover:scale-105 active:scale-95 w-full md:w-auto animate-[pulse_3s_ease-in-out_infinite]"
                  asChild
                >
                  <Link href="/meetings">
                    모임 참여하기
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Why Us Section - Frameless Design (Responsive) */}
        <section className="py-16 md:py-32 bg-background">
          <div className="container max-w-7xl">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-h2 mb-4">왜 저희 독서모임인가요?</h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                단순히 책을 읽는 것을 넘어, 함께 성장하는 커뮤니티를 만들어갑니다.
              </p>
            </div>
            {/* Frameless: Mobile 2-Column Grid, Desktop 3-Column Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-16 px-4 md:px-12">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center text-center group">
                  <div className="relative w-24 h-24 md:w-48 md:h-48 mb-4 md:mb-8">
                    <Image
                      src={feature.iconUrl}
                      alt={feature.title}
                      fill
                      className="object-contain drop-shadow-sm transition-transform group-hover:scale-105 duration-500"
                    />
                  </div>
                  <h3 className="text-body-lg md:text-h4 mb-2 md:mb-4 text-foreground font-bold">{feature.title}</h3>
                  <p className="text-body-sm md:text-body-lg text-muted-foreground leading-relaxed break-keep whitespace-pre-wrap">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section - Timeline Design (Responsive with Vertical Line on Mobile) */}
        <section className="py-16 md:py-32 bg-secondary/20 overflow-hidden">
          <div className="container max-w-7xl">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-h2 mb-4">이렇게 진행됩니다</h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                간단한 4단계로 독서모임에 참여할 수 있습니다.
              </p>
            </div>

            <div className="relative">
              {/* Connecting Line (Desktop: Horizontal) */}
              <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-primary/20 -z-10" />

              {/* Connecting Line (Mobile: Vertical) */}
              <div className="block md:hidden absolute top-8 bottom-8 left-1/2 w-0.5 bg-primary/20 -translate-x-1/2 -z-10" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 px-2 md:px-4">
                {[
                  {
                    step: '01',
                    title: '회원가입',
                    description: '홈페이지에서 간단하게\n가입 신청을 하세요',
                  },
                  {
                    step: '02',
                    title: '책 선정',
                    description: '매월 투표를 통해\n함께 읽을 책을 정합니다',
                  },
                  {
                    step: '03',
                    title: '함께 읽기',
                    description: '한 달 동안 각자의 속도로\n즐겁게 독서합니다',
                  },
                  {
                    step: '04',
                    title: '모임 참석',
                    description: '월 1회 정기 모임에서\n깊이 있는 대화를 나눕니다',
                  },
                ].map((item, index) => (
                  <div key={item.step} className="flex flex-col items-center text-center group relative p-2">
                    {/* Circle Node (With background to cover line) */}
                    <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-background border-2 border-primary/30 shadow-sm mb-4 md:mb-8 group-hover:border-primary group-hover:scale-110 transition-all duration-300 z-10 shrink-0">
                      <span className="text-body-lg md:text-title font-bold text-primary font-serif">
                        {item.step}
                      </span>
                    </div>

                    {/* Content Box */}
                    <h3 className="text-body-lg md:text-h5 mb-1 md:mb-3 font-bold text-foreground">{item.title}</h3>
                    <p className="text-body-xs md:text-body text-muted-foreground whitespace-pre-line leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-h2 mb-4">운영진 소개</h2>
              <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                독서모임을 이끌어가는 운영진을 소개합니다.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {TEAM_MEMBERS.map((member) => (
                <Card key={member.name} className="text-center overflow-hidden transition-all hover:shadow-lg border-none bg-background/50">
                  <CardContent className="pt-8 pb-6">
                    <Avatar className="h-32 w-32 mx-auto mb-6 ring-4 ring-background shadow-md">
                      <AvatarImage src={member.avatarUrl} alt={member.name} className="object-cover" />
                      <AvatarFallback className="text-h3">
                        {member.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-h5 mb-1">{member.name}</h3>
                    <p className="text-label text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-body-sm text-muted-foreground">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Meetings Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-h2 mb-2">다가오는 모임</h2>
                <p className="text-body text-muted-foreground">
                  참여하고 싶은 모임에 등록해보세요.
                </p>
              </div>
              <Button variant="ghost" asChild className="gap-1">
                <Link href="/meetings">
                  전체 보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 px-0">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="w-full">
                  <MeetingCard meeting={meeting} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-h2 mb-2">최근 게시글</h2>
                <p className="text-body text-muted-foreground">
                  회원들의 독서 후기와 모임 소식을 확인하세요.
                </p>
              </div>
              <Button variant="ghost" asChild className="gap-1">
                <Link href="/board">
                  전체 보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 px-0">
              {recentPosts.map((post) => (
                <div key={post.id} className="w-full">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24 bg-secondary/50">
          <div className="container max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-h2 mb-4">자주 묻는 질문</h2>
              <p className="text-body text-muted-foreground">
                궁금한 점이 있으시면 아래를 확인해보세요.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg border px-4 mb-2">
                  <AccordionTrigger className="text-left text-body font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body text-muted-foreground pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <h2 className="text-h2 mb-4">지금 바로 참여하세요</h2>
            <p className="text-body-lg opacity-90 max-w-2xl mx-auto mb-8">
              책을 사랑하는 동료들과 함께 특별한 경험을 만들어보세요.
              <br />
              첫 모임은 무료로 참여할 수 있습니다.
            </p>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="gap-2"
            >
              <Link href="/register">
                회원가입 하기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
