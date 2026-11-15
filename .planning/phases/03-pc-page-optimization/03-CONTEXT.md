# Phase 03 — CAR-7 当前 PC 优化

2026-11-15 用户授权实施 CAR-8～CAR-12，后续新增子任务不自动纳入。用户确认无服务器同任务写入者，由 Mac Codex 接手，直接维护 Linear。

基线 22aa286；分支 codex/car-7-pc-page-optimization。已有 AGENTS.md 与 next-env.d.ts 的 Next 自动生成差异保留，不回滚。

## 锁定决定及验收

- PC-01 / CAR-8：左侧菜单不滚动；顶部始终可见；只滚动右侧正文。横幅开关、短视口和侧栏收起不能制造整页溢出。
- PC-02 / CAR-9：四种模式采用用户 LiquidNavbar，水滴拉伸融合涟漪，保留 category 来源；键盘可用、静音。
- PC-03 / CAR-10：现有本地项目 Logo 使用玻璃显现效果，替换参考的 21st.dev 示例标识。
- PC-04 / CAR-11：菜单项目名 oneirocycle 使用 LiquidText，略大于现有 24px；补齐缺失 utils，使用现有 React/matchMedia，无新增依赖。
- PC-05 / CAR-12：输入采用参考的圆角胶囊弹性展开、自动增高和工具区过渡；沿用现有输入状态/模型/创作类型，未接服务继续反馈，禁止演示语音或新增产品功能。

完整参考已从 Linear 读回并归档 references/CAR-9～CAR-12.md。只修改桌面；保留移动页面现有布局。

## 验证及交付

npm run check、npm run build、strict UI audit；Ego 浏览器桌面/短视口/主题/键盘/长文本/降级与移动回归。固定区域实测 rect，正文实际滚动；源码、浏览器截图与检查结果归档。阶段为待用户视觉验收，不编造真机验收。按仓库常驻授权提交推送任务分支，读回 SHA，不合并部署。
