import { file } from 'bun'
import { join as pathJoin } from 'node:path'

export async function gitIgnoreCheck(projectPath: string) {
    const targetPath = pathJoin(projectPath, '.gitignore')
    const gitIgnore = file(targetPath)

    const gitIgnoreExists = await gitIgnore.exists()

    if (!gitIgnoreExists) {
        return { success: false, message: ".gitignore: Not Found." }
    }

    const gitIgnoreContent = await gitIgnore.text()

    if (gitIgnoreContent.trim().length === 0) {
        return { success: false, message: ".gitignore: Empty." }
    }

    const envFile = file(pathJoin(projectPath, '.env'));
    const envExists = await envFile.exists();

    const localEnv = file(pathJoin(projectPath, '.env.local'));
    const localEnvExists = await localEnv.exists();

    const testEnv = file(pathJoin(projectPath, '.env.test'));
    const testEnvExists = await testEnv.exists();

    if (envExists && !gitIgnoreContent.includes('.env')) {
        return { success: false, message: ".gitignore: .env exists but not included in .gitignore." }
    }

    if (localEnvExists && !gitIgnoreContent.includes('.env.local')) {
        return { success: false, message: ".gitignore: .env.local exists but not included in .gitignore." }
    }

    if (testEnvExists && !gitIgnoreContent.includes(".env.test")) {
        return { success: false, message: ".gitignore: .env.test exists but not included in .gitignore." }
    }

    return { success: true }
}