# 环梦篇章 AIGC — 前端

## What This Is

面向创作者的 AI Native 创作平台。长期覆盖文生图、图生图、文生视频、图生视频、节点式无限画布、3D 导演台与 Agent 创作模式，对标即梦等产品的创作能力。

当前授权包括前端基础工程和 CAR-5 首页桌面/移动实现；真实服务、完整编辑器、推送、合并与部署仍未授权。

## Core Value

以可追踪、可恢复的类型化创作操作连接创作者、编辑器和后台生成任务。

## Requirements

### Validated

基础工程已验证；CAR-5 首页本地交互、生产构建与五宽度 Chromium 检查已通过。真实设备和最终视觉验收待人工确认。

### Active

见 REQUIREMENTS.md。Phase 01 工程已完成；Phase 02 首页工程与自动化验证已完成，等待真实设备/视觉 UAT。

### Out of Scope

- 未批准的页面视觉、真实模型接入和完整编辑器功能。
- 后端实现、远程仓库创建、推送、合并与部署。
- 未协商的 HTTP 路径、认证方案和生成服务参数。

## Context

- 前端：`/workspace/oneirocycle-frontend`，已有独立 Git 仓库及 LICENSE。
- 后端：`/workspace/oneirocycle-backend`，独立 Git 仓库；本次不修改。
- 前端已有 origin，沿用而不创建或推送；原始提交 `7f3eea3`。
- 本地 Git 身份已有配置；不修改全局身份。
- 使用全局 GSD Core 1.18.0 和 telegram-gsd-workflow，不安装重叠工作流。
- 首页任务 CAR-5 的桌面/移动 Stitch Screen 和 HTML 已读取；实现、截图及差异见 docs/verification-homepage.md。

## Constraints

- TypeScript strict、React、Next.js App Router、Tailwind CSS。
- Zustand 仅编辑器临时状态；TanStack Query 管理服务端状态和任务缓存。
- React Flow 与 Three.js/R3F 必须客户端按需加载，不能进入普通入口的重型依赖链。
- 稳定且兼容版本、依赖锁文件；不以忽略 peerDependencies 解决冲突。
- 密钥不得进入浏览器、日志、规划文件或 Git。
- 任何具体页面开工前读取对应设计及设备规范；链接不可访问须报告访问问题。

## Decisions — 已确认

- 用户先授权工程初始化，后明确授权 CAR-5 首页实现并要求继续推进；不扩大为完整创作产品。
- 手动与 Agent 操作共用类型化业务命令，不以 DOM 自动化作为业务接口。
- 开发前必须关联 Linear；同一任务记录开始、重要进展、阻塞与验收。
- OpenAPI 为跨仓库协作契约，不猜测接口；开发 mock 必须标注且不假报生成成功。

## Decisions — 待确认

- 本轮按用户明确继续指令执行骨架初始化；未修改全局 GSD 偏好。后续产品阶段的工作流模式/粒度等配置仍待确定。
- OpenAPI 权威文件所在仓库、发布/版本策略、认证机制、任务事件协议。
- 可持久化文档的服务端 revision、冲突及迁移规则；本地历史不是服务端版本。
- CAR-5 最终视觉及真实手机 OS 软键盘 UAT 待用户提供结果；不把 Chromium 代理验收当作真实设备通过。

## Evolution

阶段转换更新需求、决策与实际能力；实现、测试通过、用户验收、合并及部署分别记录。

最后更新：2026-11-14，首页已实现并通过本地自动化检查，待人工 UAT；未推送、合并或部署。
