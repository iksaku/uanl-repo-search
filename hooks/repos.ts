import { reactive } from '@nuxtjs/composition-api'
import { Repository } from '~/hooks/octokit'

export const repos = reactive(new Map<Repository['id'], Repository>())
