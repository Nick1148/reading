'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Filter, Plus, Search, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar, Footer } from '@/components/layout';
import { PostList } from '@/features/board/components';
import { DUMMY_POSTS, POST_CATEGORIES } from '@/features/board/constants';
import { Post } from '@/features/board/types';
import { cn } from '@/lib/utils';

type CategoryFilter = 'all' | Post['category'];

const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'notice', label: '공지사항' },
  { value: 'review', label: '독서 후기' },
  { value: 'photo', label: '모임 사진' },
  { value: 'free', label: '자유게시판' },
];

export default function BoardPage() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = DUMMY_POSTS.filter((post) => {
    const matchesCategory = category === 'all' || post.category === category;
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8" />
              <h1 className="text-h1">게시판</h1>
            </div>
            <p className="text-body-lg opacity-90 max-w-2xl">
              독서 후기를 공유하고, 모임 사진을 올리며, 자유롭게 소통해보세요.
            </p>
          </div>
        </section>

        {/* Filter & Search */}
        <section className="border-b bg-background sticky top-16 z-40">
          <div className="container py-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex gap-2">
                  {CATEGORY_OPTIONS.map((option) => (
                    <Button
                      key={option.value}
                      variant={category === option.value ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCategory(option.value)}
                      className={cn(
                        'whitespace-nowrap',
                        category === option.value && 'pointer-events-none'
                      )}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="검색어를 입력하세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  글쓰기
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Post List */}
        <section className="py-8 md:py-12">
          <div className="container">
            {/* Sample Data Notice */}
            <div className="bg-accent/30 border border-accent rounded-lg p-4 mb-8 flex items-start md:items-center gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5 md:mt-0 flex-shrink-0" />
              <div className="text-sm text-foreground/80">
                <span className="font-semibold text-foreground mr-1">알림:</span>
                현재 게시판은 서비스 예시를 보여드리기 위한 <strong>샘플 데이터</strong>로 구성되어 있습니다.
                실제 글쓰기 및 커뮤니티 기능은 추후 업데이트될 예정입니다.
              </div>
            </div>

            <div className="mb-6">
              <p className="text-body-sm text-muted-foreground">
                총 {filteredPosts.length}개의 게시글
              </p>
            </div>
            <PostList
              posts={filteredPosts}
              emptyMessage="해당 조건에 맞는 게시글이 없습니다."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
