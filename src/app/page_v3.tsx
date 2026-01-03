'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Users,
  MessageSquare,
  ChevronDown,
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

const FEATURES = [
  {
    icon: Calendar,
    title: '정기 모임',
    description: '매월 한 권의 책을 선정하여 함께 읽고 토론합니다.',
  },
  {
    icon: Users,
    title: '따뜻한 커뮤니티',
    description: '30-40대 직장인들이 함께하는 편안한 독서 모임입니다.',
  },
  {
    icon: MessageSquare,
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
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 border-0 font-bold px-12 h-16 text-xl shadow-xl transition-transform hover:scale-105"
                asChild
              >
                <Link href="/meetings">
                  모임 참여하기
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features / Why Us Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-h2 mb-4">왜 저희 독서모임인가요?</h2>
              <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                단순히 책을 읽는 것을 넘어, 함께 성장하는 커뮤니티를 만들어갑니다.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURES.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-h5 mb-2">{feature.title}</h3>
                    <p className="text-body-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section (How It Works) */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-h2 mb-4">이렇게 진행됩니다</h2>
              <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                간단한 4단계로 독서모임에 참여할 수 있습니다.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  icon: Users,
                  title: '회원가입',
                  description: '간단한 정보 입력으로 가입 신청',
                },
                {
                  step: '2',
                  icon: BookOpen,
                  title: '책 선정',
                  description: '매월 투표로 다음 책 선정',
                },
                {
                  step: '3',
                  icon: Calendar,
                  title: '함께 읽기',
                  description: '한 달간 각자의 속도로 독서',
                },
                {
                  step: '4',
                  icon: MessageSquare,
                  title: '모임 참석',
                  description: '월 1회 정기 모임에서 토론',
                },
              ].map((item) => (
                <Card key={item.step} className="relative">
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-label font-semibold">
                      {item.step}
                    </div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-h5 mb-2">{item.title}</h3>
                    <p className="text-body-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
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
                <Card key={member.name} className="text-center overflow-hidden transition-all hover:shadow-lg">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
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
