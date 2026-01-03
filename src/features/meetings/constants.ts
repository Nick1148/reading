import { Meeting } from './types';



export const DUMMY_MEETINGS: Meeting[] = [
  {
    id: '25-4q',
    title: '25.4Q 정기 모임',
    bookTitle: '각자 추천 도서',
    bookAuthor: '자유 선정',
    bookCoverUrl: '/images/meetings/photo7_ghibli_real.png', // Photo 7 (Newest)
    date: '2025-11-26',
    time: '21:00',
    location: '오하이잔',
    description: '서로 감명 깊게 읽은 책을 소개하고 추천하는 시간을 가졌습니다.',
    maxParticipants: 7,
    currentParticipants: 7,
    status: 'completed',
    host: {
      id: '1',
      name: '박장미',
      avatarUrl: 'https://picsum.photos/seed/host1/100/100',
    },
    createdAt: '2025-11-01T00:00:00Z',
    updatedAt: '2025-11-27T00:00:00Z',
  },
  {
    id: '25-3q',
    title: '25.3Q 정기 모임',
    bookTitle: '어느 작가의 오후',
    bookAuthor: '페터 한트케',
    bookCoverUrl: '/images/meetings/photo6_ghibli_real.png', // Photo 6
    date: '2025-09-03',
    time: '21:00',
    location: '에피소드',
    description: '노벨문학상 수상 작가의 내면을 들여다보는 깊이 있는 독서였습니다.',
    maxParticipants: 7,
    currentParticipants: 7,
    status: 'completed',
    host: {
      id: '2',
      name: '이관익',
      avatarUrl: 'https://picsum.photos/seed/host2/100/100',
    },
    createdAt: '2025-08-01T00:00:00Z',
    updatedAt: '2025-09-04T00:00:00Z',
  },
  {
    id: '25-2q-2',
    title: '25.2Q 두 번째 모임',
    bookTitle: '오리엔트 특급살인',
    bookAuthor: '애거서 크리스티',
    bookCoverUrl: '/images/meetings/photo5_ghibli_real.png', // Photo 5
    date: '2025-06-19',
    time: '21:00',
    location: '장소 미정',
    description: '추리 소설의 여왕 애거서 크리스티의 대표작을 함께 읽었습니다.',
    maxParticipants: 6,
    currentParticipants: 6,
    status: 'completed',
    host: {
      id: '2-2',
      name: '김수헌',
      avatarUrl: 'https://picsum.photos/seed/host3/100/100',
    },
    createdAt: '2025-06-01T00:00:00Z',
    updatedAt: '2025-06-20T00:00:00Z',
  },
  {
    id: '25-2q-1',
    title: '25.2Q 첫 번째 모임',
    bookTitle: '사피엔스',
    bookAuthor: '유발 하라리',
    bookCoverUrl: '/images/meetings/photo4_ghibli_real.png', // Photo 4
    date: '2025-05-14',
    time: '19:00',
    location: '장소 미정',
    description: '인류의 기원과 미래에 대해 뜨거운 토론을 나눴습니다.',
    maxParticipants: 6,
    currentParticipants: 6,
    status: 'completed',
    host: {
      id: '3',
      name: '김수헌',
      avatarUrl: 'https://picsum.photos/seed/host3/100/100',
    },
    createdAt: '2025-04-01T00:00:00Z',
    updatedAt: '2025-05-15T00:00:00Z',
  },
  {
    id: '25-1q',
    title: '25.1Q 정기 모임',
    bookTitle: '월급쟁이 부자로 은퇴하라',
    bookAuthor: '너나위',
    bookCoverUrl: '/images/meetings/photo3_ghibli_real.png', // Photo 3
    date: '2025-02-19',
    time: '20:00',
    location: '대잠맨션',
    description: '경제적 자유를 향한 현실적인 조언들을 함께 나눴습니다.',
    maxParticipants: 6,
    currentParticipants: 6,
    status: 'completed',
    host: {
      id: '4',
      name: '김선준',
      avatarUrl: 'https://picsum.photos/seed/host4/100/100',
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-02-20T00:00:00Z',
  },
  {
    id: '24-4q-2',
    title: '24.4Q 두 번째 모임',
    bookTitle: '동물농장',
    bookAuthor: '조지 오웰',
    bookCoverUrl: '/images/meetings/photo2_ghibli_real.png', // Photo 2
    date: '2024-11-26',
    time: '16:00',
    location: '눅카페',
    description: '풍자와 해학이 넘치는 고전을 통해 사회를 다시 생각해보았습니다.',
    maxParticipants: 6,
    currentParticipants: 6,
    status: 'completed',
    host: {
      id: '5',
      name: '허창근',
      avatarUrl: 'https://picsum.photos/seed/host5/100/100',
    },
    createdAt: '2024-11-01T00:00:00Z',
    updatedAt: '2024-11-27T00:00:00Z',
  },
  {
    id: '24-4q-1',
    title: '24.4Q 첫 번째 모임',
    bookTitle: '여덟 단어',
    bookAuthor: '박웅현',
    bookCoverUrl: '/images/meetings/photo1_ghibli_real.png', // Photo 1
    date: '2024-10-30',
    time: '19:00',
    location: '루시구시',
    description: '인생을 대하는 우리의 자세에 대해 이야기 나눴습니다.',
    maxParticipants: 6,
    currentParticipants: 6,
    status: 'completed',
    host: {
      id: '6',
      name: '한현욱',
      avatarUrl: 'https://picsum.photos/seed/host6/100/100',
    },
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-10-31T00:00:00Z',
  },
];

export const MEETING_STATUS_LABELS = {
  upcoming: '예정',
  ongoing: '진행 중',
  completed: '완료',
} as const;

export const MEETING_STATUS_COLORS = {
  upcoming: 'bg-accent text-accent-foreground',
  ongoing: 'bg-primary text-primary-foreground',
  completed: 'bg-muted text-muted-foreground',
} as const;
