import { reactive } from 'vue'
import { Repository } from '@/hooks/octokit'

export const repos = reactive(new Map<Repository['id'], Repository>())
