import { Navbar, Footer } from '@/components/layout';
import { HistoryTimeline } from '@/features/history/components/HistoryTimeline';
import { HISTORY_ITEMS } from '@/features/history/constants';

export default function HistoryPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 py-16 md:py-24">
                <div className="container max-w-5xl">
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-display-sm md:text-display-md text-primary">
                            리딩퓨처 활동 내역
                        </h1>
                        <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                            우리가 함께 읽고 나눈 소중한 시간들의 기록입니다.
                        </p>
                    </div>

                    <HistoryTimeline items={HISTORY_ITEMS} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
