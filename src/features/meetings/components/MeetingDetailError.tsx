'use client';

import Link from 'next/link';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MeetingDetailErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function MeetingDetailError({
  message = '모임 정보를 불러오는 중 오류가 발생했습니다.',
  onRetry,
}: MeetingDetailErrorProps) {
  return (
    <Card className="border-destructive/50">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <AlertCircle className="h-16 w-16 text-destructive mb-6" />
        <h2 className="text-h3 mb-2">오류가 발생했습니다</h2>
        <p className="text-body text-muted-foreground mb-8 max-w-md">
          {message}
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/meetings">
              <ArrowLeft className="h-4 w-4" />
              목록으로 돌아가기
            </Link>
          </Button>
          {onRetry && (
            <Button onClick={onRetry} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              다시 시도
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
