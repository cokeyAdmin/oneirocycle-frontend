---
phase: '02'
slug: 'implement-stitch-homepage-desktop-and-mobile'
status: implementation-authorized
shadcn_initialized: false
preset: none
created: '2026-11-14'
---

# Phase 02 — UI Design Contract

> 本阶段视觉及交互合同。以 CAR-5 指定的 Stitch 两个 screen 与 HTML 为唯一构图来源；实现可抽取 React 组件，但不得把导出 HTML 原样作为页面交付。

## Design System

| Property          | Value                                                                                                                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tool              | none — 沿用项目现有 Tailwind v4 与 CSS；不初始化 shadcn                                                                                                                                                                |
| Preset            | 不适用                                                                                                                                                                                                                 |
| Component library | none — 使用本地 React 组件和 CSS                                                                                                                                                                                       |
| Icon library      | 无已安装图标库；使用项目现有图标方案或内联 SVG，不新增依赖                                                                                                                                                             |
| Font              | 桌面采用系统无衬线栈（-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Microsoft YaHei）；移动沿用 Stitch 的 Outfit / Space Grotesk / JetBrains Mono 视觉角色，若不加载外部字体则用相近系统无衬线回退 |

现有 `src/app/globals.css` 无产品 token，`src/app/page.tsx` 当前返回 `null`。在全局 CSS 定义本阶段 token，页面业务状态留在 client component；保留 App Router 与现有 TypeScript/Tailwind 栈。桌面 HTML 的损坏 raster 不作为设计依据。不得引入真实服务调用、虚假成功状态或外部生成能力。

## Desktop / Mobile Composition

### 桌面（Stitch Screen `11739032930266818070` / HTML `11065783241239000542`）

1. 深色点阵画布作页面背景；顶部促销横条置于主工作区上沿。
2. 左侧液态玻璃侧栏：品牌、首页/图片/视频/画布/资产导航、侧栏折叠控制及底部账户/主题设置区。
3. 主滚动工作区：吸顶类别胶囊导航（灵感/短剧/小说/游戏），其下是创作器。
4. 创作器：多行 prompt 输入、图片/视频/Agent 模式、模型选择、画幅/分辨率或价格提示与主提交控件；控件状态显式显示当前选择。
5. 创作器之后依序为横向功能 marquee、环梦片场/推荐 banner、功能入口卡、灵感区（标题、分类/搜索、示例作品瀑布流）。
6. 菜单/设置/主题/公告关闭等浮层只在其触发后展示；遵循同一深色玻璃层级，不默认覆盖主要内容。

### 移动（Stitch Screen `be1747efb4544717b4a1ac2b403cd297` / HTML `9878290599392228766`）

移动为独立组合，禁止缩窄或缩放桌面侧栏/创作器。顺序为：品牌与账户/额度/消息头部、福利横幅、精选片场 banner、横向功能探索行、两列灵感瀑布流；底部固定安全区导航（首页/工具/创作/资产/我的）与可折叠悬浮 prompt dock。展开 dock 时显示 prompt textarea、添加/3D/风格/角色/语音等控件及主操作，并以遮罩建立焦点层级。桌面与移动可共享卡片/数据 primitive，但分别定义布局。

## Spacing Scale

采用 4px 基础倍数；视觉参考 Stitch 的紧凑移动间距与宽松桌面分区。

| Token | Value | Usage                          |
| ----- | ----- | ------------------------------ |
| xs    | 4px   | 图标与文字间距、紧凑徽标       |
| sm    | 8px   | 控件内部与卡片小间距           |
| md    | 16px  | 常规控件/卡片内边距            |
| lg    | 24px  | 区块内分组间距                 |
| xl    | 32px  | 主内容水平 gutter / 组件组间隔 |
| 2xl   | 48px  | 桌面主区段间距                 |
| 3xl   | 64px  | 大型 banner 与 feed 的段落间隔 |

Exceptions: 移动底部 dock/nav 的固定触控命中区域最小 44×44px（可大于 4px 网格）；移动安全区使用 `env(safe-area-inset-bottom)`，不计入内容间距 token。

## Typography

只使用以下四档尺寸和两档字重；组件不得另加第五档字号或第三档字重。样式尺寸为 CSS px；窄屏可在既定层级内使用同档字号。

| Role             | Size | Weight | Line Height |
| ---------------- | ---- | ------ | ----------- |
| Label / metadata | 12px | 400    | 1.4         |
| Body / controls  | 16px | 400    | 1.5         |
| Section heading  | 24px | 600    | 1.2         |
| Display / hero   | 32px | 600    | 1.15        |

桌面 Stitch 的 10–12px 微型标签需提升可读性时，优先用 12px 档，不能因装饰性信息造成必要内容低于 12px。长中文标题允许换行；卡片单行标题可在视觉空间不足时省略，但须保留可访问全名。

## Color

页面保持 Stitch 深色模式与低对比装饰层；比例为构图指导，色值须抽成 CSS custom properties。桌面与移动各自保留源设计色彩，避免将桌面冷蓝体系强行覆盖移动紫/青/粉主题。

| Role            | Value                                                                | Usage                                                           |
| --------------- | -------------------------------------------------------------------- | --------------------------------------------------------------- |
| Dominant (60%)  | Desktop `#0b0c10`; mobile `#111319`                                  | 页面底色/主画布                                                 |
| Secondary (30%) | Desktop sidebar `#0f1015` 与半透明卡面；mobile `#191b22` / `#1e1f26` | 导航、玻璃卡片、输入 dock、feed 卡                              |
| Accent (10%)    | Desktop `#8ea8ff`; mobile `#d0bcff`、`#4cd7f6`，少量 `#ffb0cd`       | 被选中的模式/类别、主创作动作、重点模型与福利标签、卡片计数图标 |
| Destructive     | `#ffb4ab`（移动错误语义）/ `#f87171`（桌面错误语义）                 | 仅错误提示，不用于普通促销或选中状态                            |

Accent reserved for: 当前选中 tab/模式、主创作提交按钮（未接通时明确占位）、重点功能标签与小型数据徽标；不可铺满普通按钮、长段正文或所有图标。玻璃面板使用白色 8–12% 边框、深色半透明底和 Stitch 级模糊；保持正文与底色有可读对比。

## Copywriting Contract

| Element                  | Copy                                                                            |
| ------------------------ | ------------------------------------------------------------------------------- |
| Primary CTA              | `开始创作` — 点击后若生成服务未配置，展示下方未接通提示，不提交任务、不显示成功 |
| Empty state heading      | `还没有找到灵感作品`                                                            |
| Empty state body         | `试试其他关键词或切换分类，探索示例作品。`                                      |
| Error state              | `暂时无法完成此操作。该功能尚未接入服务，请稍后再试或继续浏览示例内容。`        |
| Destructive confirmation | 无删除/不可逆业务动作；关闭福利横幅仅隐藏当前横幅，无确认对话框                 |

其他未配置入口统一使用诚实提示：`该功能尚未接入，当前仅展示界面预览。` 对“生成、试用、复刻、登录/我的、工具、资产”等不具备目标路由或服务的入口，不宣称创建、保存、复制成功；仅对当前页面可完成的 tab、折叠、搜索、滚动、选择状态提供即时本地反馈。示例内容需标注为示例/灵感展示，而非当前用户生成记录。

## Responsive and Interaction Rules

| Viewport | Required behavior                                                                                                                        |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 375px    | 使用专属移动版；两列 feed 等宽且卡片内容可读；横向功能 rail 自身可滚，不得令 body 横溢；底栏和 dock 不遮挡可见内容/输入焦点              |
| 390px    | 与 375px 相同的组件顺序；保留左右 gutter；dock 展开时输入可滚动、按钮可触达，安全区留白生效                                              |
| 768px    | 紧凑平板布局：隐藏桌面宽侧栏或改为收起图标态，创作器与 feed 根据实际可用宽度重排；不把移动固定 dock 覆盖桌面主操作，也不出现两套底栏叠层 |
| 1280px   | 桌面 shell、可折叠侧栏、吸顶类别栏、创作器/banner/feed 按 Stitch 展示；内容区 min-width 为 0，feed 列数与卡片比例遵循 HTML               |
| 1440px   | 保持桌面视觉最大内容宽度/边距节奏，不拉伸卡片或标题行至难读长度；侧栏、玻璃控件和 feed 维持独立层级                                      |

所有视口均禁止非预期页面横向滚动、文字/控件被裁断、固定层互相遮挡。移动 prompt dock 支持触控和键盘展开/收起；Escape 或明确关闭按钮可退出并将焦点归还触发按钮。输入聚焦时监听可视视口变化并保证输入/提交控件仍可达；使用 safe-area inset。Tabs、筛选、主题/侧栏控制使用语义按钮并暴露选中状态；搜索过滤本地示例数据，清空/无匹配结果分别有清楚状态。Marquee hover/focus 时暂停，遵守 `prefers-reduced-motion`。页面可见导航点击仅滚至同页区块或提示未接入，禁止伪造其他路由成功。

## Accessibility Contract

- 语义层级：一个 `main`；站点导航用 `nav` 且具备名称；分区用有序 heading；卡片图片提供与作品相关的 alt，纯装饰图标 `aria-hidden`。
- 所有输入有可见 label 或等效可访问名称；placeholder 仅作示例，不代替 label。搜索清除、公告关闭、折叠/展开、选择器及图标按钮必须有中文 `aria-label`。
- 键盘 Tab 顺序跟随视觉顺序；焦点指示至少 2px 高对比轮廓，不被玻璃模糊层或 fixed dock 截断；对话/展开 overlay 管理焦点、Escape 关闭并恢复焦点。
- 交互目标至少 44×44px（可见图标可小于此尺寸，但命中框须满足）；状态不能只通过颜色表达。
- 不自动播放带声音媒体；动画提供 reduced-motion 静态状态；桌面自动横移内容在 hover/focus 时暂停。

## UI Considerations

Applicable state considerations resolved: 10 covered, 1 backstop, 0 unresolved。

| Category      | Element(s)                                   | Status      | Resolution / Reason                                                                                    |
| ------------- | -------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| empty         | Inspiration feed, search results             | ✅ covered  | 零条本地示例或搜索无匹配时显示 Copywriting Contract 中的空状态标题/说明；清空搜索恢复示例 feed         |
| loading       | Inspiration media, featured banner           | ✅ covered  | 使用本地可用示例与固定占位尺寸；不显示无限 spinner，也不将图片远程加载失败伪装为生成进度               |
| error         | Unconfigured creator action, unavailable nav | ✅ covered  | 使用 Copywriting Contract 的未接通/错误提示；保留当前页面状态，不声称成功                              |
| populated     | Inspiration feed                             | ✅ covered  | 正常状态以 Stitch 对应示例卡片组成桌面瀑布流与移动两列瀑布流；数据显式标记为示例                       |
| partial       | Featured / inspiration card metadata         | ✅ covered  | 缺少作者、计数或媒体时隐藏缺失的可选字段并保留卡片布局；作品标题保留                                   |
| overflow      | Feature rail, feed, fixed dock/nav           | ✅ covered  | 功能 rail 横向滚动，feed 按断点重排；固定层避让安全区和内容底部，不裁断页面或输入控件                  |
| zero-one-many | Inspiration feed                             | ✅ covered  | 零条展示空状态；单条卡片保持正常最大宽度，不伪造补齐；多条维持瀑布流节奏                               |
| long-text     | Prompt input, card titles, labels            | ✅ covered  | prompt 在容器内换行/滚动；卡片标题最多两行或省略且暴露完整 accessible name；操作标签可换行，不撑宽视口 |
| long-text     | Navigation and tab labels                    | ✅ covered  | 长导航文案允许换行或在明确布局边界内截断；提供完整可访问名称，保留触控命中区域                         |
| error         | Search                                       | ✅ covered  | 搜索本地示例不抛网络错误；无匹配走空态；输入异常保留输入并允许清除/重试                                |
| loading       | Search / mode controls                       | 🧪 backstop | 页面内本地切换应即时反馈；实现后通过浏览器验证快速连续切换时无失焦/叠层残留，失败由人工复核            |

<!-- Probe coverage: empty, loading, error, populated, partial, overflow, zero-one-many, long-text -->

## Registry Safety

Tool: none. 本阶段不使用 shadcn 或第三方 registry；无需 registry block、安全审查或组件枚举。

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS
- [ ] Dimension 7 Inventory Provenance: PASS

**Approval:** 用户已授权按 CAR-5 设计实施；本表不是独立 checker 签字，最终视觉 UAT 待用户确认。
