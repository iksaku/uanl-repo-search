import axios from 'axios'

export { Repository } from './interfaces/Repository'
export { RepositorySearch } from './interfaces/RepositorySearch'
export { RateLimit } from './interfaces/RateLimit'

export const client = axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
        'Accept': 'application/vnd.github.mercy-preview+json'
    }
})