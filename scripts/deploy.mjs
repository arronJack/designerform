// 一键部署到 GitHub Pages（gh-pages 分支）
// 用法: npm run deploy
// 说明：WorkBuddy 环境的 safe-delete 垫片会拦住 vite 清空 outDir（genie-trash ETIMEDOUT），
//       因此这里先「改名」旧产物目录（rename 不走 trash），再构建到 dist-site。
import { execSync } from 'node:child_process'
import { existsSync, renameSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]):/, '$1:')
const out = join(root, 'dist-site')
const remote = 'git@github.com:arronJack/designerform.git'

function run(cmd, cwd) {
  console.log(`$ ${cmd}`)
  execSync(cmd, { cwd, stdio: 'inherit', shell: 'bash' })
}

// 1. 旧产物改名（避免 safe-delete 垫片超时）
if (existsSync(out)) {
  const frozen = `${out}.old-${Date.now()}`
  renameSync(out, frozen)
  console.log(`moved stale build → ${frozen}`)
}

// 2. 构建
run('npx vite build --outDir dist-site', root)

// 3. dist-site 作为独立 gh-pages 仓库提交
const gitDir = join(out, '.git')
if (existsSync(gitDir)) rmSync(gitDir, { recursive: true, force: true })
run('git init -q -b gh-pages', out)
run('git add -A', out)
run('git commit -q -m "deploy: rebuild from master"', out)

// 4. force push 到 GitHub Pages 源分支
run(`git push --force ${remote} gh-pages:refs/heads/gh-pages`, out)

console.log('\n✅ 已推送 gh-pages。Pages 构建约 1 分钟后生效:')
console.log('   https://arronjack.github.io/designerform/')
