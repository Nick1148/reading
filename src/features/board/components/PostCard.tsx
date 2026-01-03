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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {post.thumbnailUrl && (
        <div className="relative h-40 bg-secondary">
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge className={cn(POST_CATEGORY_COLORS[post.category])}>
            {POST_CATEGORIES[post.category]}
          </Badge>
          <span className="text-caption text-muted-foreground">{timeAgo}</span>
        </div>
        <Link href={`/board/${post.id}`}>
          <h3 className="text-h6 font-semibold line-clamp-2 hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-body-sm text-muted-foreground line-clamp-2">
          {post.content}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-0">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={post.author.avatarUrl}
              alt={post.author.name}
            />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-caption text-muted-foreground">
            {post.author.name}
          </span>
        </div>

        <div className="flex items-center gap-3 text-caption text-muted-foreground">
          <span className="flex items-center gap-1">
            <Heart
              className={cn('h-4 w-4', post.isLiked && 'fill-accent text-accent')}
            />
            {post.likesCount}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            {post.commentsCount}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {post.viewsCount}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
