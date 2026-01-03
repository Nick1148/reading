import { Post } from './types';

export const POST_CATEGORIES = {
  review: '독서 후기',
  photo: '모임 사진',
  notice: '공지사항',
  free: '자유게시판',
} as const;

export const POST_CATEGORY_COLORS = {
  review: 'bg-primary/10 text-primary',
  photo: 'bg-accent/10 text-accent',
  notice: 'bg-destructive/10 text-destructive',
  free: 'bg-secondary text-secondary-foreground',
} as const;

export const DUMMY_POSTS: Post[] = [
  {
    id: '1',
    title: '아주 작은 습관의 힘 - 독서 후기',
    content:
      '이 책을 읽고 나서 매일 아침 5분 독서하는 습관을 시작했습니다. 작은 습관이 정말 큰 변화를 만들어내네요! 특히 "1%의 개선"이라는 개념이 인상 깊었습니다.',
    category: 'review',
    author: {
      id: '1',
      name: '허창근',
      avatarUrl: 'https://picsum.photos/seed/user1/100/100',
    },
    createdAt: '2024-12-20T10:30:00Z',
    updatedAt: '2024-12-20T10:30:00Z',
    thumbnailUrl: 'https://picsum.photos/seed/post1/400/300',
    likesCount: 24,
    commentsCount: 8,
    viewsCount: 156,
    isLiked: false,
  },
  {
    id: '2',
    title: '12월 모임 사진 공유합니다!',
    content:
      '지난 12월 모임에서 찍은 사진들입니다. 다들 너무 즐거워 보이네요! 다음 모임도 기대됩니다.',
    category: 'photo',
    author: {
      id: '2',
      name: '한현욱',
      avatarUrl: 'https://picsum.photos/seed/user2/100/100',
    },
    createdAt: '2024-12-19T15:00:00Z',
    updatedAt: '2024-12-19T15:00:00Z',
    thumbnailUrl: 'https://picsum.photos/seed/post2/400/300',
    imageUrls: [
      'https://picsum.photos/seed/photo1/800/600',
      'https://picsum.photos/seed/photo2/800/600',
      'https://picsum.photos/seed/photo3/800/600',
    ],
    likesCount: 42,
    commentsCount: 15,
    viewsCount: 234,
    isLiked: true,
  },
  {
    id: '3',
    title: '[공지] 2025년 1월 모임 안내',
    content:
      '안녕하세요! 2025년 첫 모임 안내드립니다. 이번 달 선정 도서는 "아주 작은 습관의 힘"입니다. 많은 참여 부탁드립니다!',
    category: 'notice',
    author: {
      id: '3',
      name: '박장미', // 관리자를 회장님으로 변경
      avatarUrl: 'https://picsum.photos/seed/admin/100/100',
    },
    createdAt: '2024-12-18T09:00:00Z',
    updatedAt: '2024-12-18T09:00:00Z',
    likesCount: 18,
    commentsCount: 5,
    viewsCount: 320,
    isLiked: false,
  },
  {
    id: '4',
    title: '추천 도서 공유해요!',
    content:
      '최근에 읽었던 책 중에 너무 좋았던 책이 있어서 공유합니다. "역행자"라는 책인데요, 자기계발에 관심 있으신 분들께 추천드려요!',
    category: 'free',
    author: {
      id: '4',
      name: '김정훈',
      avatarUrl: 'https://picsum.photos/seed/user4/100/100',
    },
    createdAt: '2024-12-17T14:20:00Z',
    updatedAt: '2024-12-17T14:20:00Z',
    likesCount: 31,
    commentsCount: 12,
    viewsCount: 198,
    isLiked: false,
  },
  {
    id: '5',
    title: '사피엔스 읽기 시작했어요',
    content:
      '다음 달 모임 도서인 사피엔스를 미리 읽기 시작했습니다. 생각보다 분량이 많네요. 함께 읽으실 분?',
    category: 'free',
    author: {
      id: '5',
      name: '이관익',
      avatarUrl: 'https://picsum.photos/seed/user5/100/100',
    },
    createdAt: '2024-12-16T11:45:00Z',
    updatedAt: '2024-12-16T11:45:00Z',
    likesCount: 15,
    commentsCount: 7,
    viewsCount: 89,
    isLiked: true,
  },
];
