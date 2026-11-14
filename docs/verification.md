# CAR-6 初始化验收

## 范围与结果

本轮交付可启动前端基础工程及模块/状态/命令/API 边界，不交付产品页面、真实生成或完整编辑器。

已实际执行：

- `npm run check`：2026-11-13 及 2026-11-14 均通过，包括 Prettier、零警告 ESLint、strict TypeScript 与 7 个测试文件；初次 15 项测试，生命周期修复后 17 项。
- `npm run build`：Next 16.4.6 production build 成功，包含 `/`、`/_not-found`、`/health`。
- `npm start -- --port 3100` 后，`/` 返回 HTTP 200，`/health` 返回 `{"service":"oneirocycle-frontend","status":"ok"}`。
- 根路由 server trace 和 client reference manifest 中无 Three/R3F/React Flow 依赖或编辑器加载入口。
- `npm ls --depth=0`：直接依赖有效，无 peer 冲突。
- `npm audit --omit=dev`：0 漏洞。
- `git diff --check`：通过；原始 LICENSE 不变，后端独立仓库无变更。

`npm ci` 锁文件全新重装通过。独立审查发现并修复首次查询期间无法取消观察的问题：新增调用方 AbortSignal，防止延迟返回后泄漏订阅。独立复审通过（安全/逻辑问题均为空），任务生命周期 5 项测试通过；完整检查及构建结果见下方收尾记录。

## 关键行为证据

- `tests/commands.test.ts`：每实例状态隔离、本地撤销/重做不改远端 revision、过期编辑拒绝、手动/Agent 同权限、相机输入校验、可信生成确认与稳定幂等 key；远端生成副作用不进入本地撤销栈。
- `tests/api.test.ts`：未配置显式失败、HTTP/认证/网络/取消错误、解码失败与跨源路径拒绝、不自动重试提交。
- `tests/tasks.test.ts`：先查询、重连重查、乱序事件忽略、失败终态停止、取消不假报 canceled、错误回调及清理、首次查询中止和预先中止。
- `tests/query.test.ts`：按账户/项目/任务隔离服务端缓存，拒绝跨项目结果。
- `tests/unconfigured.test.ts`：认证和生成端口不伪造任务或成功。
- `tests/engines.test.ts`：加载函数可安全导入，服务端不能激活编辑器引擎。
- `tests/health.test.ts`：健康响应仅表示前端存活。

测试中的 task ID、进度和失败均是隔离夹具，不是模型调用结果。已观察到缺失模块或未实现行为的测试失败，再实现相应逻辑；配置及技术入口并非逐函数 TDD，不将本轮宣称为完整 TDD 合规审计通过。

## 依赖及实际限制

- Next 16.4.6 / React 19.3.1 / Tailwind 4.3.5 / Zustand 5.1.0 / Query 5.107.1 / React Flow 12.12.1 / Three 0.187.0 / R3F 9.8.2。
- TypeScript 6.0.3、ESLint 9.39.5，避免 TS 7 / ESLint 10 超出当前 lint 插件兼容范围。ESLint 9 安装时有已停止支持提示，后续随上游兼容更新。
- 完整 `npm audit` 有 7 项中危开发工具依赖告警，根源为 typescript-eslint 引入的 minimatch 10；`npm audit fix` 未消除。不用 force 或越级覆盖制造未知兼容性；生产依赖审计为 0。后续需随 lint 工具兼容升级处理。
- 尚无已批准 OpenAPI，真实 HTTP 适配、认证、实时 SSE/WS 鉴权/游标/重连、生成服务都未连接。
- 项目文档只有序列化类型和 load/save/revision 端口；文档持久化、迁移、刷新恢复及冲突合并未实现。
- 画布/3D 只有按需引擎加载边界，未挂载 UI 或验证 WebGL 渲染、移动端视觉。
- 未推送、合并、部署或改动后端；Linear 进展由 Hermes 原生客户端同步，不能将本地文件视为外部同步成功。

## 最终收尾（2026-11-14）

锁文件重装后 npm run check 通过，7 个文件 / 17 项测试；修复后 production build 再次通过。根入口 HTTP 200、health JSON 及 server/client 引擎隔离再次通过。独立复审通过，见 .planning/phases/01-foundation/01-REVIEW.md。
