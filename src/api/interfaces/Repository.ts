import { RepositoryOwner } from './RepositoryOwner';
import { RepositoryLicense } from './RepositoryLicense';

export interface Repository {
    id: number
    node_id: string

    name: string
    full_name: string
    description: string

    owner: RepositoryOwner

    license: RepositoryLicense

    private: boolean
    fork: boolean

    html_url: string
    url: string

    created_at: string
    updated_at: string
    pushed_at: string

    homepage: string

    size: number

    stargazers_count: number
    watchers_count: number
    forks_count: number

    language: string

    open_issues_count: number

    master_branch: string
    default_branch: string

    score: number
}