# 前端路线图

按单独 Linear 任务分阶段交付；真实服务端/生成服务仍不在当前首页范围。

## Phase 1: 工程、模块和协作边界

**Goal:** 可启动、可检查的前端工程骨架，不实现产品页面。

**Requirements:** ENG-01、ENG-02、MOD-01、LOAD-01、STATE-01、CMD-01、API-01、JOB-01、CONTRACT-01、QA-01、FLOW-01。

**Success Criteria:**

1. 全新安装、格式化、lint、类型检查、领域测试和构建实际通过。
2. 实际启动服务并读取 HTTP 响应；普通入口不加载画布或 3D 引擎。
3. 状态、文档、业务命令、认证及任务恢复边界有代码与核验依据。
4. 文档明确区分已实现基础设施、未接通能力和待协商 API；无假生成成功。
5. 原文件及后端仓库保持不变，Linear 同一任务有证据记录，无未授权远程写入。

**Status:** 本轮工程已实现并通过本地验收；独立复审通过。CAR-6 已存在，历史创建拒绝已解除。CAR-6 已同步 In Review 并读回；不将本地完成当作外部 Done。

### Phase 2: Implement Stitch homepage (desktop and mobile)

**Goal:** 依据 CAR-5 指定的 Stitch 桌面与移动专属原型实现 OneiroCycle 首页、响应式布局和页面内交互。

**Requirements:** HOME-01、HOME-02、HOME-03、HOME-04、HOME-05、HOME-06。

**Depends on:** Phase 1

**Success Criteria:**

1. 桌面与移动分别按对应 Stitch Screen 和原始 HTML 核对；损坏的桌面静态截图不作为布局依据。
2. 375、390、768、1280、1440px 下无意外横向滚动、截断、固定浮层遮挡；移动提示框展开、收起、触控/键盘及安全区行为可用。
3. 页面内已实现交互可操作；未接服务的能力均为清楚占位，不声称生成或数据写入成功。
4. `npm run check`、`npm run build` 和实际浏览器断点核验通过；桌面/移动截图与偏差记录归档。
5. 验收证据同步到 CAR-5；不修改后端，不推送、合并或部署。

**Status:** 首轮视觉被用户否决，已按原稿返工（45bf9f1）；17 测试、构建、五宽度及原稿/实现对照已完成。CAR-5 In Review 已读回，待用户重新视觉复验及真机 UAT，未标记 Done。

**Plans:** 3 plans

Plans:

- [x] 02-01-PLAN.md — Root-route tracer, separate desktop/mobile shells, and accessible prompt-dock focus lifecycle.
- [x] 02-02-PLAN.md — Complete desktop/mobile expansion, local interactions, and VisualViewport resilience.
- [x] 02-03-PLAN.md — Five-width browser evidence, screenshots, precise handoff guidance, and physical-device UAT boundary.

## Progress

| Phase              | Plans Complete | Status      | Completed  |
| ------------------ | -------------- | ----------- | ---------- |
| 1. Foundation      | 1/1            | Complete    | 2026-11-14 |
| 2. Stitch homepage | 3/3            | In Progress | —          |

Phase 2 工程完成；In Progress 仅保留真实手机与视觉人工验收，不是实现仍在后台运行。
