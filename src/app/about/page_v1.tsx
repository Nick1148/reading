'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Users,
  Calendar,
  MessageSquare,
  ArrowRight,
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

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary text-primary-foreground py-20 md:py-32">
          <div className="container">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-display-sm md:text-display-md">
                책을 통해
                <br />
                연결되는 사람들
              </h1>
              <p className="text-body-lg opacity-90">
                2024년부터 시작된 회사 독서모임은 책을 사랑하는 동료들이 모여
                함께 읽고, 토론하고, 성장하는 커뮤니티입니다.
              </p>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block">
            <Image
              src="https://picsum.photos/seed/about/800/600"
              alt="독서 모임"
              fill
              className="object-cover opacity-20"
            />
          </div>
        </section>



        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-h2 mb-6">우리의 미션</h2>
                <div className="space-y-4 text-body text-muted-foreground">
                  <p>
                    독서모임은 단순히 책을 읽는 것에서 끝나지 않습니다.
                    다양한 배경과 경험을 가진 동료들과 책에 대해 이야기하며
                    새로운 관점을 발견하고, 서로의 생각을 나눕니다.
                  </p>
                  <p>
                    매월 한 권의 책을 선정하여 함께 읽고, 정기 모임에서
                    자유롭게 토론합니다. 책을 통해 얻은 인사이트를 업무와
                    일상에 적용하며 함께 성장하는 것이 우리의 목표입니다.
                  </p>
                </div>
                <div className="flex gap-4 mt-8">
                  <Button asChild className="gap-2">
                    <Link href="/register">
                      함께하기
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/meetings">모임 보기</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden bg-secondary">
                <Image
                  src="https://picsum.photos/seed/mission/600/400"
                  alt="독서 모임 활동"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-muted">
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
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-h2 mb-4">운영진 소개</h2>
              <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                독서모임을 이끌어가는 운영진을 소개합니다.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {TEAM_MEMBERS.map((member) => (
                <Card key={member.name} className="text-center">
                  <CardContent className="pt-8 pb-6">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback className="text-h3">
                        {member.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-h5 mb-1">{member.name}</h3>
                    <p className="text-label text-primary mb-3">{member.role}</p>
                    <p className="text-body-sm text-muted-foreground">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24 bg-secondary">
          <div className="container max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-h2 mb-4">자주 묻는 질문</h2>
              <p className="text-body text-muted-foreground">
                궁금한 점이 있으시면 아래를 확인해보세요.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-body font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body text-muted-foreground">
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
            <h2 className="text-h2 mb-4">함께 책을 읽어요</h2>
            <p className="text-body-lg opacity-90 max-w-2xl mx-auto mb-8">
              독서를 통해 새로운 세계를 발견하고, 동료들과 깊은 대화를 나눠보세요.
              지금 바로 독서모임에 참여하세요!
            </p>
            <Button size="lg" variant="secondary" asChild className="gap-2">
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
