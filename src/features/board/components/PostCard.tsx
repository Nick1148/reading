'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Heart, MessageCircle, Eye } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Post } from '../types';
import { POST_CATEGORIES, POST_CATEGORY_COLORS } from '../constants';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <Card className="flex flex-row md:flex-col overflow-hidden hover:shadow-lg transition-shadow h-28 md:h-auto">
      {post.thumbnailUrl && (
        <div className="relative w-28 md:w-full h-full md:h-40 bg-secondary shrink-0">
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0 justify-between">
        <CardHeader className="p-3 pb-0 md:p-6 md:pb-2">
          <div className="flex items-center justify-between mb-1 md:mb-2">
            <Badge className={cn('px-1.5 py-0 text-[10px] md:text-xs', POST_CATEGORY_COLORS[post.category])}>
              {POST_CATEGORIES[post.category]}
            </Badge>
            <span className="text-[10px] md:text-caption text-muted-foreground">{timeAgo}</span>
          </div>
          <Link href={`/board/${post.id}`} className="block">
            <h3 className="text-body-sm md:text-h6 font-semibold line-clamp-2 hover:text-primary transition-colors leading-tight">
              {post.title}
            </h3>
          </Link>
        </CardHeader>

        <CardContent className="hidden md:block pb-3">
          <p className="text-body-sm text-muted-foreground line-clamp-2">
            {post.content}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between p-3 pt-0 md:p-6 md:pt-0">
          <div className="flex items-center gap-1.5 md:gap-2">
            <Avatar className="h-4 w-4 md:h-6 md:w-6">
              <AvatarImage
                src={post.author.avatarUrl}
                alt={post.author.name}
              />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-[10px] md:text-caption text-muted-foreground line-clamp-1">
              {post.author.name}
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-3 text-caption text-muted-foreground text-[10px] md:text-xs">
            <span className="flex items-center gap-1">
              <Heart
                className={cn('h-3 w-3 md:h-4 md:w-4', post.isLiked && 'fill-accent text-accent')}
              />
              {post.likesCount}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
              {post.commentsCount}
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.viewsCount}
            </span>
          </div>
        </CardFooter>
      </div>
      {/* Mobile Whole Card Link Overlay */}
      <Link href={`/board/${post.id}`} className="absolute inset-0 md:hidden" />
    </Card>
  );
}
