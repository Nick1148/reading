'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Eye,
  Share2,
  MoreHorizontal,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Navbar, Footer } from '@/components/layout';
import { DUMMY_POSTS, POST_CATEGORIES, POST_CATEGORY_COLORS } from '@/features/board/constants';
import { cn } from '@/lib/utils';

const DUMMY_COMMENTS = [
  {
    id: '1',
    content: '정말 좋은 후기네요! 저도 이 책 읽어봐야겠어요.',
    author: {
      id: '2',
      name: '이책방',
      avatarUrl: 'https://picsum.photos/seed/c1/100/100',
    },
    createdAt: '2024-12-20T12:00:00Z',
    likesCount: 5,
  },
  {
    id: '2',
    content: '1%의 개선 개념이 정말 인상적이었어요. 실천하기 쉬운 것부터 시작해봐야겠습니다.',
    author: {
      id: '3',
      name: '박문학',
      avatarUrl: 'https://picsum.photos/seed/c2/100/100',
    },
    createdAt: '2024-12-20T14:30:00Z',
    likesCount: 3,
  },
  {
    id: '3',
    content: '다음 모임에서 더 자세히 이야기해봐요!',
    author: {
      id: '4',
      name: '최소설',
      avatarUrl: 'https://picsum.photos/seed/c3/100/100',
    },
    createdAt: '2024-12-20T16:00:00Z',
    likesCount: 2,
  },
];

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = use(params);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const post = DUMMY_POSTS.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-h2 mb-4">게시글을 찾을 수 없습니다</h1>
            <Button asChild>
              <Link href="/board">게시판으로 돌아가기</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Back Navigation */}
        <div className="border-b">
          <div className="container py-4">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/board">
                <ArrowLeft className="h-4 w-4" />
                게시판
              </Link>
            </Button>
          </div>
        </div>

        {/* Content */}
        <section className="py-8 md:py-12">
          <div className="container max-w-4xl">
            {/* Post Header */}
            <div className="mb-8">
              <Badge className={cn('mb-4', POST_CATEGORY_COLORS[post.category])}>
                {POST_CATEGORIES[post.category]}
              </Badge>
              <h1 className="text-h1 mb-4">{post.title}</h1>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-body font-medium">{post.author.name}</p>
                    <p className="text-caption text-muted-foreground">{timeAgo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-body-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {post.viewsCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {post.likesCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {post.commentsCount}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Post Content */}
            <div className="mb-8">
              {post.thumbnailUrl && (
                <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden bg-secondary">
                  <Image
                    src={post.thumbnailUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="prose prose-lg max-w-none">
                <p className="text-body leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>

              {post.imageUrls && post.imageUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {post.imageUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden bg-secondary"
                    >
                      <Image src={url} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2">
                <Button
                  variant={isLiked ? 'default' : 'outline'}
                  className="gap-2"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={cn('h-4 w-4', isLiked && 'fill-current')} />
                  좋아요 {post.likesCount + (isLiked ? 1 : 0)}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  공유
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>

            <Separator className="mb-8" />

            {/* Comments */}
            <div>
              <h2 className="text-h4 mb-6">
                댓글 {DUMMY_COMMENTS.length}개
              </h2>

              {/* Comment Form */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://picsum.photos/seed/me/100/100" alt="나" />
                      <AvatarFallback>나</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="댓글을 입력하세요..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mb-3"
                      />
                      <div className="flex justify-end">
                        <Button className="gap-2" disabled={!comment.trim()}>
                          <Send className="h-4 w-4" />
                          등록
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comment List */}
              <div className="space-y-4">
                {DUMMY_COMMENTS.map((c) => {
                  const commentTimeAgo = formatDistanceToNow(new Date(c.createdAt), {
                    addSuffix: true,
                    locale: ko,
                  });
                  return (
                    <Card key={c.id}>
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={c.author.avatarUrl} alt={c.author.name} />
                            <AvatarFallback>{c.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="text-body font-medium">
                                  {c.author.name}
                                </span>
                                <span className="text-caption text-muted-foreground ml-2">
                                  {commentTimeAgo}
                                </span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-body text-muted-foreground mb-3">
                              {c.content}
                            </p>
                            <Button variant="ghost" size="sm" className="gap-1 h-8 px-2">
                              <Heart className="h-3 w-3" />
                              {c.likesCount}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
