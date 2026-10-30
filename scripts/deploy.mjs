// 一键部署到 GitHub Pages（gh-pages 分支）
// 用法: npm run deploy
// 流程: vite build --outDir dist-gh → 在 dist-gh 内以独立 gh-pages 仓 force push 到 GitHub
import { execSync } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]):/, '$1:')
const out = join(root, 'dist-gh')
const remote = 'git@github.com:arronJack/designerform.git'

function run(cmd, cwd) {
  console.log(`$ ${cmd}`)
  execSync(cmd, { cwd, stdio: 'inherit', shell: 'bash' })
}

// 1. 构建（独立 outDir，绕开 trash 垫片对 dist/ 的清空问题）
run('npx vite build --outDir dist-gh', root)

// 2. dist-gh 作为独立 gh-pages 仓库提交
const gitDir = join(out, '.git')
if (existsSync(gitDir)) rmSync(gitDir, { recursive: true, force: true })
run('git init -q -b gh-pages', out)
run('git add -A', out)
run('git commit -q -m "deploy: rebuild from master"', out)

// 3. force push 到 GitHub Pages 源分支
run(`git push --force ${remote} gh-pages:refs/heads/gh-pages`, out)

console.log('\n✅ 已推送 gh-pages。Pages 构建约 1 分钟后生效:')
console.log('   https://arronjack.github.io/designerform/')
