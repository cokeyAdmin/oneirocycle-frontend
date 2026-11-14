# 环梦篇章 AIGC · 前端

关联任务：[CAR-6](https://linear.app/cardof/issue/CAR-6/前端初始化环梦篇章-aigc-前端项目)。基础工程已完成；首页由 [CAR-5](https://linear.app/cardof/issue/CAR-5) 管理，已实现本地界面，**不代表真实生成服务已接通**。

## 启动

使用 Node 22.12+（建议受支持的 LTS）、npm 10+；开发时以锁文件为准。

```sh
cd /workspace/oneirocycle-frontend
npm ci
cp .env.example .env.local
npm run dev
```

默认端口 3000，可用 `npm run dev -- --port 3100` 调整。根路由 / 现已提供 CAR-5 OneiroCycle 首页。`/health` 返回前端进程存活 JSON，**不证明后端或模型可用**。

```sh
npm run format
npm run check
npm run build
npm start
curl http://localhost:3000/health
```

`npm run typecheck` 会先生成 Next 路由类型；提交 package-lock.json，CI/协作使用 `npm ci`，不使用 `--legacy-peer-deps`。实际版本与核验见 [verification.md](docs/verification.md)。

## 模块

- `src/app`：App Router、Query Provider、首页入口及健康路由。
- `src/components/homepage`：独立桌面/移动组合、本地交互和显式示例内容。
- `src/modules/account` / `assets` / `projects`：认证端口、资产身份、项目文档与持久化端口。
- `src/modules/generation/image.ts` / `video.ts`：四种生成方式的内部输入类型，公共任务端口在 `ports.ts`。
- `src/modules/canvas` / `director`：React Flow 与 Three/R3F 的客户端按需加载入口，未挂载产品页面。
- `src/modules/agent`：复用共享命令，不依赖 DOM；不包含 Agent 推理服务。
- `src/core`：统一 API/错误、共享命令、每实例编辑器 store、任务观察/恢复与 Query 适配。

细节见 [架构文档](docs/architecture.md)、[契约需求清单](docs/openapi-requirements.md) 与 `.planning/phases/01-foundation/`。

## 状态与恢复

TanStack Query 保存服务器快照；Zustand 保存编辑器临时状态及本地撤销栈；纯 JSON 项目文档是可持久化数据。`schemaVersion` 是文档结构版本，`serverRevision` 是服务端并发令牌，`editVersion` 是本地单调计数，不能混用。当前不自动写 localStorage 或服务端；重载恢复需要注入项目仓储。

手动/Agent 使用同一命令分发器；本地变更支持撤销/重做，提交任务的远端副作用不进入撤销栈。权限在分发器统一检查，服务端仍必须鉴权。费用确认不能由不可信 Agent 自行决定。

任务观察先查询快照、再订阅；重连重新查询，按序号忽略过期事件，终态停止订阅。调用 observeTask 时可传入生命周期 AbortSignal（第五参数），即使首次查询未结束也能在宿主卸载时中止。传输适配器负责真实重连、鉴权、游标与退避。取消只有服务端返回 canceled 才算完成。测试中的任务 ID/状态均是隔离夹具，不是开发页面的生成结果。

## 后端协作与安全

当前未提供已批准 OpenAPI，因此没有猜测的业务 URL。统一客户端接收已批准路径及响应解码器；认证/任务默认未配置并显式失败，不伪造成功。

确认权威 OpenAPI 版本后：固定版本生成类型 → 编写/测试 wire 到内部领域类型的适配器 → 注入端口 → 实际联调。不得把内部端口类型直接宣称为服务端协议。

`.env.example` 仅含占位配置，无凭据。`NEXT_PUBLIC_*` 会进入浏览器，只放可公开信息；模型密钥只能在后端，不能用公开前缀。当前无模型调用、上传或计费行为。

未实现：登录界面、项目/资产 CRUD、真实生成、完整画布、3D 交互、Agent 执行、文档持久化/迁移/并发合并。后续具体页面必须按对应桌面/移动设计实现。

## 仓库与工作流

前后端是独立目录、独立仓库；本轮不修改后端。沿用全局 GSD，执行记录保留在 `.planning`。Linear 由 Hermes 唯一写入；Codex 的任务事件和核验证据交由 Hermes 同步，不绕过工具审批。本地提交不等于推送、合并或部署。

## CAR-5 首页验收

开发预览：`npm run dev -- --port 3102`，打开 `http://localhost:3102/`。
生产预览：`npm run build` 后运行 `npm start -- --port 3102`。

桌面侧栏、原稿收起/展开创作器、创作类型/模型、紧凑搜索、设置预览，以及移动原稿悬浮输入框可在当前页面操作。生成、复刻、资产、登录和账户保存均未接入，只提示不可用；刷新后本地界面状态不保留。首页不加载画布或 3D 引擎。Stitch 原图、原 logo 和原字体已本地化，不依赖远程图片、字体或 Tailwind CDN。

- [验收记录与设计差异](docs/verification-homepage.md)
- [桌面截图](docs/assets/homepage-desktop-1440.png)、[移动截图](docs/assets/homepage-mobile-390.png)、[移动展开面板](docs/assets/homepage-mobile-dock.png)
- 首轮视觉版本已被用户否决。当前返工恢复原稿内容，五宽度和 Chromium 可视视口代理检查已通过；**真实手机 OS 软键盘/安全区及最终视觉验收尚待人工确认**，不等于已部署。

可选复跑浏览器证据（另一个终端保持上述生产服务运行）：

```sh
# 使用已有的 Playwright 安装，不需要修改项目依赖。
PLAYWRIGHT_MODULE=/opt/data/home/.local/lib/node_modules/@playwright/cli/node_modules/playwright/index.mjs node scripts/verify-homepage.mjs
```

其他环境可安装/使用自己的 Playwright，省略此变量时从 `playwright` 包解析；`HOMEPAGE_URL` 可覆盖默认 `http://127.0.0.1:3102`。脚本会更新 `docs/assets` 的实际截图和 JSON 结果，需要系统中文字体才能生成可读中文截图。

### 视觉返工与对照

2026-11-14 用户否决首轮擅自改稿；旧 `docs/assets/homepage-*.png` 及旧验收记录仅保留为历史，不代表当前设计验收。

当前来源与约束见 [DESIGN.md](DESIGN.md)，当前记录见 [返工验收](docs/verification-homepage-rework.md) 与 [并排 QA](design-qa.md)。[桌面对照](docs/assets/rework/desktop-closed-comparison.png)、[移动对照](docs/assets/rework/mobile-closed-comparison.png) 均为同一视口左原稿、右实现；展开态也有独立证据。不会用编译/断点通过替代用户视觉验收。
