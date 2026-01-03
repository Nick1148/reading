export interface HistoryItem {
    id: string;
    quarter: string; // e.g., "25.4Q"
    year: number;
    books: string[];
    description?: string;
    images: string[];
}
