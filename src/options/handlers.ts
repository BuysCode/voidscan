import { file } from 'bun'
import { join as pathJoin } from 'node:path'

export async function gitIgnoreCheck(projectPath: string) {
    const targetPath = pathJoin(projectPath, '.gitignore')
    const gitIgnore = file(targetPath)

    const gitIgnoreExists = await gitIgnore.exists()

    if (!gitIgnoreExists) {
        return { success: false, message: "Arquivo .gitignore não encontrado." }
    }

    const content = await gitIgnore.text()
    if (content.trim().length === 0) {
        return { success: false, message: "O seu .gitignore está vazio." }
    }

    const envFile = file(pathJoin(projectPath, '.env'));
    const envExists = await envFile.exists();

    if (envExists && !content.includes('.env')) {
        return { success: false, message: "Arquivo .env detectado mas não ignorado no .gitignore." }
    }

    return { success: true }
}