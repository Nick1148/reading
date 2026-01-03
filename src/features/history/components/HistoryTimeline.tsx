'use client';

import Image from 'next/image';
import { HistoryItem } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HistoryTimelineProps {
    items: HistoryItem[];
}

export function HistoryTimeline({ items }: HistoryTimelineProps) {
    return (
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {items.map((item) => (
                <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                    {/* Timeline Dot */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-secondary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 md:group-hover:scale-110">
                        <Calendar className="w-5 h-5 text-secondary-foreground" />
                    </div>

                    {/* Card Content */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4">
                        <Card className="overflow-hidden border-2 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md group/card">

                            {/* Image Gallery (Grid) */}
                            {item.images.length > 0 && (
                                <div className={cn(
                                    "relative w-full gap-0.5 bg-muted/50",
                                    item.images.length > 1 ? "grid grid-cols-2" : "flex"
                                )}>
                                    {item.images.map((img, idx) => (
                                        <div key={idx} className="relative w-full aspect-video group/img overflow-hidden">
                                            <Image
                                                src={img}
                                                alt={`${item.quarter} 활동 사진 ${idx + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover/img:scale-110"
                                            />
                                        </div>
                                    ))}

                                    {item.images.length > 2 && (
                                        <div className="absolute bottom-2 right-2">
                                            <Badge variant="secondary" className="shadow-sm font-mono">
                                                +{item.images.length - 2} photos
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            )}

                            <CardContent className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-h4 font-bold text-primary group-hover/card:text-accent transition-colors">{item.quarter}</h3>
                                        <span className="text-body-sm text-muted-foreground font-medium">{item.year}</span>
                                    </div>

                                    {/* Books List */}
                                    <div className="space-y-3">
                                        {item.books.map((book) => (
                                            <div key={book} className="flex items-start gap-3 bg-secondary/30 p-2 rounded-md">
                                                <BookOpen className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                                                <span className="text-body font-medium leading-tight">{book}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {item.description && (
                                        <p className="text-body-sm text-muted-foreground pt-4 border-t mt-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ))}
        </div>
    );
}
