import dotenv from 'dotenv'

/**
 * Loads all .env variables into process.env.
 *
 * Those variables prefixed with "VITE_" will be handled by vite the traditional way,
 * while all other non-prefixed variables will be expected to exist in process.env
 * on deployment, preventing them from being leaked on deployment builds.
 *
 * @returns {import('vite').Plugin}
 */
export default function () {
    return {
        name: 'dotenv',

        config: () => {
            dotenv.config()
        }
    }
}
