import { Repository } from './Repository'

export interface RepositorySearch {
    total_count: number

    incomplete_results: boolean

    items: Repository[]
}