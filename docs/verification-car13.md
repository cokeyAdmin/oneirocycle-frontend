# CAR-13 侧栏交互验证

基线：GitHub main 08ac551；范围为 PC 收起态 Logo 交互，不改动其余页面设计。

- 收起侧栏后不显示原展开按钮；鼠标悬停 Logo 展开侧栏并触发既有 Logo 动效的重播入口。
- 键盘聚焦 Logo 后 Enter 也可展开，保留可访问名称及展开状态。
- `npm run check` 通过：格式、lint、类型及 17 项测试；`npm run build` 通过。
- Chromium 1440×900：收起按钮不存在、悬停展开、重播入口触发、键盘展开和无 pageerror 检查通过。原始截图见 `docs/assets/car13/`；浏览器插件不可用，使用 Playwright。
- 开发模式观察到已有的 hydration 属性不一致警告（文本输入 caret-color）；不视为本次 pageerror 或本次修复通过的内容。
- 自动检查只验证重播入口被触发，不替代对动画画面的用户验收。

CAR-14～CAR-17 的源码未附在 Linear 子任务，未擅自替代效果；待取得来源后继续。
