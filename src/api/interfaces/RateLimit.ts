export interface RateLimit {
    limit: number;
    remaining: number;
    reset: number;
}
