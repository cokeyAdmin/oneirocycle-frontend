# 前端架构与边界

状态：基础工程与下述类型/端口/命令/状态骨架已实现；不代表产品能力已接通。

## 目录边界

- `src/app`：App Router、最小根布局、已授权 CAR-5 首页及技术健康入口。
- `src/components/homepage`：独立桌面/移动组合，以 Stitch 原稿的独立组合和本地化原始素材为视觉依据，共用本地行为 hook。状态留在 React，不使用服务器缓存或编辑器 store；未接服务动作只在激活后提示不可用。移动输入保留原稿面板外观，通过 role/dialog、inert 和焦点循环管理模态状态；桌面设置沿用原稿 native dialog。VisualViewport resize/scroll 调整移动面板几何。
- `src/modules/account`：会话读取/登出/权限接口，实际认证适配待协商。
- `src/modules/projects`：可序列化文档、schemaVersion、服务端 revision、保存/恢复接口。
- `src/modules/assets`：资产身份与元数据类型，上传协议列入待确认清单，不将临时 blob URL 当持久地址。
- `src/modules/generation`：图像和视频两类独立输入类型，共用任务生命周期，不随意通用化供应商参数。
- `src/modules/canvas`：React Flow 适配；业务节点文档不依赖 React Flow 内部对象。
- `src/modules/director`：Three.js/R3F 适配；持久化相机/场景描述不保存 Object3D。
- `src/modules/agent`：业务命令入口、策略/权限和确认边界，不操作 DOM。
- `src/core`：命令分发、统一错误/API、任务恢复、依赖注入。

每个边界只落必要类型或实现文件，不为未来 CRUD 生成空页面。

## 三类状态

1. TanStack Query：账户/项目/资产和任务服务端快照；缓存不是项目文档数据库。
2. Zustand：已建立独立编辑器实例、选择 ID 与撤销栈；悬停、拖动、视口等状态以后按设计补充。按编辑器实例创建，避免 SSR 共享可变全局单例。
3. 项目文档：纯 JSON，独立 schemaVersion、项目 ID、服务端 revision；迁移与乐观并发独立于本地编辑序号。

撤销只处理本地可逆文档变更；历史条目保留前后快照或逆命令。撤销不能“取消已收费生成”，副作用需要单独取消命令。恢复需校验 schemaVersion；冲突不得悄悄覆盖远端。当前仅保留 ProjectRepository load/save 与 revision 边界，未实现持久化、迁移、刷新恢复或冲突合并。

## 统一业务命令

使用可辨识联合定义创建节点、设置相机、提交生成任务；统一携带 commandId、projectId、来源（manual/agent）和预期文档版本。业务权限检查在共享分发器，后端仍重新鉴权；Agent 不能绕过费用确认。提交带幂等标识，失败不得自动换标识重试。

## 加载边界

引擎分别置于 client 模块；动态 import 只在后续经批准的编辑器宿主激活时触发。普通根布局不得引入这些宿主或重型 barrel。未批准设计前不挂载引擎、不生成默认编辑器界面。未来 React Flow 宿主需同时接入其样式文件；目前仅有引擎加载函数，未创建编辑器 UI。

## API 与任务

统一 transport 接收已批准契约适配器，不硬编码猜测路径。错误区分网络、HTTP、认证、取消、契约校验和未配置；日志不输出 token 或用户提示词。

任务服务接口保留 submit/get/cancel/subscribe 和断线重查。订阅只是加速通知，权威状态以查询为准；初始加载、网络恢复和重连后重新查询。内部观察器已处理重复与乱序；游标过期、鉴权、退避与实际 SSE/WS 重连由后续契约适配器实现。终态停止轮询/订阅，取消请求发出不等于取消完成。

未接入时明确抛出未配置错误；不回传虚构 taskId、资产或成功状态。测试夹具只能用于隔离测试。

## 已查阅依据

- [Next.js 客户端按需加载](https://nextjs.org/docs/app/guides/lazy-loading)：动态加载与客户端 SSR 边界。
- [R3F 版本配对](https://r3f.docs.pmnd.rs/getting-started/introduction)：v9 配合 React 19；不采用 v10 alpha。
- [TanStack Query 重试](https://tanstack.com/query/latest/docs/framework/react/guides/query-retries)：读请求策略与有副作用提交重试分离。

2026-11-13 npm registry 查询候选：Next 16.4.6、React 19.3.1、R3F 9.8.2、React Flow 12.12.1、Tailwind 4.3.5、Zustand 5.1.0、Query 5.107.1。上述运行依赖已按这些版本安装并锁定；安装、类型检查及构建通过。TypeScript 固定 6.0.3、ESLint 固定 9.39.5，以符合当前 Next lint 插件的兼容范围。实际验收见 verification.md。

## CAR-5 源设计样式隔离

用户否决了首轮自绘媒体与自订 UI 规范，当前 `DESIGN.md` 以 canonical Stitch 为准。原稿的 Tailwind v3 几何与 token 被预编译并限定在 `.stitch-desktop` / `.stitch-mobile` 下，旧工具变量另加命名空间，避免 v4 同名 `space-y` 规则和已注册渐变变量改变源稿。生产不加载 CDN 或原稿 inline scripts；React 组件保留源 DOM/类名层级，交互显式连接到 `use-stitch-homepage.ts`。其他模块/端口和依赖锁文件未变。
