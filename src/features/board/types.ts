export interface Post {
  id: string;
  title: string;
  content: string;
  category: 'review' | 'photo' | 'notice' | 'free';
  author: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
  imageUrls?: string[];
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
  likesCount: number;
  isLiked: boolean;
}
