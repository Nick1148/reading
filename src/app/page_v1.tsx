'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Calendar, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
        <section className="relative bg-primary text-primary-foreground py-20 md:py-32">
          <div className="container">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-display-sm md:text-display-md">
                함께 읽고,
                <br />
                함께 성장하는
                <br />
                독서 모임
              </h1>
              <p className="text-body-lg opacity-90">
                매월 한 권의 책을 선정하여 함께 읽고 토론합니다.
                <br />
                책을 통해 새로운 시각을 얻고, 동료들과 깊은 대화를 나눠보세요.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="gap-2"
                >
                  <Link href="/meetings">
                    모임 일정 보기
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link href="/register">회원가입</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block">
            <Image
              src="https://picsum.photos/seed/hero/800/600"
              alt="독서 모임"
              fill
              className="object-cover opacity-20"
            />
          </div>
        </section>

        {/* Features Section */}
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

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-accent text-accent-foreground">
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
