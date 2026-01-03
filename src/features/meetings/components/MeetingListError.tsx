'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MeetingListErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function MeetingListError({
  message = '모임 목록을 불러오는 중 오류가 발생했습니다.',
  onRetry,
}: MeetingListErrorProps) {
  return (
    <Card className="border-destructive/50">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-h4 mb-2">오류가 발생했습니다</h3>
        <p className="text-body text-muted-foreground mb-6 max-w-md">
          {message}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            다시 시도
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
