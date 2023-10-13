import { execSync } from 'child_process'

export function has_pnpm() {
    try {
        const _userAgent = process.env.npm_config_user_agent
        if (_userAgent && _userAgent.startsWith('pnpm')) {
            return true
        }
        execSync('pnpm --version', { stdio: 'ignore' })
        return true
    } catch (error) {
        return false
    }
    
}

export function has_yarn() {
    try {
        const _userAgent = process.env.npm_config_user_agent
        if (_userAgent && _userAgent.startsWith('yarn')) {
            return true
        }
        execSync('yarn --version', { stdio: 'ignore' })
        return true
    } catch (error) {
        return false
    }
}