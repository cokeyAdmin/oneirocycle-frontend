# CAR-5 视觉返工验收记录

首轮被用户明确否决，原因是偏离原 UI、擅自添加内容。本次不是批准新设计，而是纠正为已提供的 canonical Stitch 原稿。最终用户复验和真实设备键盘 UAT 仍待确认。

## 已纠正内容

- 使用原 logo、原图、Material Symbols 与原字体；保留原稿实际存在的渐变，不再使用自绘行星/人物/城市插画或重构 logo。
- 删除额外英文标语、默认工程说明、示例徽标、新分类筛选、功能区标题/箭头和页脚。不能以“未接后端”为由新增默认界面文案。
- 桌面恢复单行标题、原快捷入口、默认收起的创作胶囊，以及片场旁的双行自动功能流；展开后沿用原稿控件样式和菜单。
- 移动恢复原稿的图片、紧凑双向自动功能行、两列 masonry、左侧小胶囊和胶囊底栏；展开面板只有原稿输入、工具与图标提交，不再添加模式、模型、文字 CTA。
- 交互改为 React 状态与显式事件，不复制导出脚本。默认页面不显示反馈；不可用动作只在激活后提示，无 API、任务、保存或登录成功。

## 来源及对照方法

Stitch 项目 `8072174646258336334`。桌面 Screen `11739032930266818070` / HTML `11065783241239000542`；移动 Screen `be1747efb4544717b4a1ac2b403cd297` / HTML `9878290599392228766`。重新从 MCP 读取，保留可读原稿 HTML、使用其原样式与原素材重渲染。损坏的桌面导出 raster 不是核对基准。

源图与实现使用同一 Chromium、同一 CSS 视口、同一字体环境；动画暂停在同一时间点。并排图始终左原稿、右实现，不用分别展示两张图代替对照。全页及字体/控件区域裁切均实际检查。详细五类核对见 [design-qa.md](../design-qa.md)。

- [桌面收起对照](assets/rework/desktop-closed-comparison.png)、[桌面展开对照](assets/rework/desktop-open-comparison.png)
- [移动收起对照](assets/rework/mobile-closed-comparison.png)、[移动展开对照](assets/rework/mobile-open-comparison.png)
- [桌面创作区细节](assets/rework/desktop-creator-comparison.png)、[移动内容细节](assets/rework/mobile-detail-comparison.png)、[移动输入细节](assets/rework/mobile-dock-detail-comparison.png)

原图/字体下载路径与来源分别在 `public/media/stitch/manifest.json`、`public/fonts/stitch/manifest.json`。未生成或替换图片。像素噪点、光标和可见焦点不能当作产品差异，也不会把像素统计当作用户验收标准。

## 工程及浏览器验证

命令：`npm run check`、`npm run build`、`npm start -- --port 3102`。本地入口 `http://localhost:3102/`，未部署或提供虚构的公共链接。

- 格式、lint、strict TS 通过；7 个文件 / 17 项基础测试通过。删除了已废弃、只测试首轮自造数据的两项测试，没有以遗留测试证明新 UI。
- 最终应用 production build 通过；[可复跑浏览器脚本](../scripts/verify-homepage.mjs) 使用已有 Playwright，`PLAYWRIGHT_MODULE` 指向本机安装，不新增项目依赖。
- 原始结果：[browser-results.json](assets/rework/browser-results.json)。375、390、768、1280、1440 的 scrollWidth 分别等于视口宽度，无页面横向溢出。先等待响应式/折叠动画稳定后才测量。
- 实测：源胶囊开合、类型/模型菜单、侧栏、主题、设置、紧凑搜索、移动触控/键盘、Escape/遮罩关闭及焦点返回、底栏创作入口、跨断点清理、reduced-motion。
- 600、440、360px 可视高度下输入和图标提交可达；Physical mobile OS keyboard UAT: PENDING。这仍是 Chromium 代理，不冒充真实设备。
- 无运行时 pageerror，无第三方字体/媒体请求，无业务 fetch/XHR。
- Premium 静态核对结果归档为 [premium-audit.json](assets/rework/premium-audit.json)；静态规则不替代浏览器对照和用户复验。

## 验收状态

**用户视觉复验：PENDING。真实手机 OS 键盘/安全区：PENDING。**

首轮“差异可交付”的判断已撤回。当前不宣称用户验收通过，不标记 Done；没有推送、合并、部署或修改后端。
