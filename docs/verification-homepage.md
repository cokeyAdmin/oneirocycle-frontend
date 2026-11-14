# CAR-5 首页验收记录

关联：[CAR-5](https://linear.app/cardof/issue/CAR-5) · 2026-11-14 · `/workspace/oneirocycle-frontend`。

**工程与自动化检查通过；等待人工视觉及真实手机验收。未推送、合并或部署。**

## 真实设备边界

**Physical mobile OS keyboard UAT: PENDING**

**Chromium VisualViewport proxy: PASS**

容器中没有真实 iOS/Android 设备。缩短 Chromium 视口只证明几何响应，不是物理设备 OS 软键盘、刘海安全区或浏览器工具栏行为通过的证据。HOME-04 / HOME-05 不因此标为最终验收完成。

## 运行和证据

```sh
npm run check
npm run build
npm start -- --port 3102
# 在另一个终端；使用已安装工具，不改项目依赖
PLAYWRIGHT_MODULE=/opt/data/home/.local/lib/node_modules/@playwright/cli/node_modules/playwright/index.mjs node scripts/verify-homepage.mjs
```

入口：`http://localhost:3102/`。生产 HTTP 200；`/health` 只说明前端进程存活，不是模型可用性。

- 静态检查：Prettier、ESLint、strict TypeScript PASS。
- Vitest：8 个文件、19 项测试 PASS；新增本地筛选组合、空/一/多结果与两套标题搜索测试。
- Next production build PASS；根入口不导入 generation/account/API/画布/3D 服务或引擎。
- 浏览器：Chromium 155.0.8059.12，桌面上下文启用触控模拟；这不是真实手机浏览器。
- 可复跑脚本：[verify-homepage.mjs](../scripts/verify-homepage.mjs)；原始结果：[homepage-browser-results.json](assets/homepage-browser-results.json)。脚本失败会以非零退出。
- 实际渲染截图：[桌面 1440](assets/homepage-desktop-1440.png)、[移动 390](assets/homepage-mobile-390.png)、[展开面板](assets/homepage-mobile-dock.png)。其余宽度在同目录归档。

## 五宽度矩阵

下列宽度均使用 900px 高度，无隐藏另一套组合留下的可操作层。横向功能 rail 的局部滚动与被裁出下一项是设计行为，不是页面横向溢出。

| 宽度 | document scrollWidth | 活跃布局           | 页面横向溢出 | 页面外控件 / 小于 44px 的目标 | dock 与底栏间距 |
| ---- | -------------------- | ------------------ | ------------ | ----------------------------- | --------------- |
| 375  | 375                  | 独立移动           | 无           | 0 / 0                         | 16px            |
| 390  | 390                  | 独立移动           | 无           | 0 / 0                         | 16px            |
| 768  | 768                  | 紧凑桌面，图标侧栏 | 无           | 0 / 0                         | 不挂移动固定层  |
| 1280 | 1280                 | 桌面               | 无           | 0 / 0                         | 不挂移动固定层  |
| 1440 | 1440                 | 桌面               | 无           | 0 / 0                         | 不挂移动固定层  |

已检查截图的标题、输入、选择器与卡片，没有发现非预期文字/控件截断。列表内容可以滚动至固定导航和 dock 上方；页面底部留有安全区及固定控件余量。全页截图中的 fixed 导航会出现在初始视口位置，这是浏览器 fullPage 截图行为。

## 交互与可访问性

浏览器实际操作通过：

- 桌面 prompt、类型/模型/画幅/分辨率/数量选项，创作时显示“尚未接入”，保留输入；侧栏折叠/展开、亮暗主题、活动关闭。
- 设置弹窗 Tab 循环、Escape 关闭、焦点回到触发按钮；键盘焦点可见轮廓。第一次检查发现原生 dialog 循环 Tab 可落到 body，已加首尾循环并复测通过。
- 搜索无匹配空态、清空恢复 4 条、分类筛出 1 条；单元测试同时覆盖组合筛选和不受信字符串。
- 桌面功能 rail 滚动、marquee hover 暂停、reduced-motion 禁止动画。选项采用原生 select / aria-pressed。
- 移动 rail 触控按钮、悬浮 dock 触控/键盘打开、textarea 自动聚焦、模式选中、未接入工具/创作提示。
- 移动浮层 Tab 循环、Escape/遮罩/关闭按钮关闭、焦点恢复、连续重开、跨 768px 断点关闭 native top-layer 浮层。
- 移动资产等未接入口只提示不可用，不假导航、不伪造保存/登录/生成结果。
- 生产页面无运行时 pageerror、无失败资源请求、无第三方媒体/字体请求、无 fetch/XHR 业务调用。没有 taskId、进度或生成成功反馈。

### 可视视口代理

输入框聚焦时，真实 Chromium viewport resize 更新 `--visual-height`；输入及主 CTA 可见或可在面板内部滚至可见。读回尺寸：

| 可视高度 | 面板顶部 | 面板高度      | 结果 |
| -------- | -------- | ------------- | ---- |
| 600      | 206      | 382           | PASS |
| 440      | 46       | 382           | PASS |
| 360      | 12       | 336，内部滚动 | PASS |

另用**受控 VisualViewport 属性注入和合成 scroll 事件**验证非零 offsetTop / keyboardInset 到 CSS 的传播；不把它称为真实浏览器键盘滚动。具体值和断言保存在原始 JSON 及脚本。源码另审 resize/scroll listener 清理、取消动画帧、关闭后样式重置、无 VisualViewport 时窗口尺寸回退与 safe-area CSS。

## Stitch 核对与明确差异

设计项目 `8072174646258336334`：

- 桌面 Screen `11739032930266818070`，HTML `11065783241239000542`。
- 移动 Screen `be1747efb4544717b4a1ac2b403cd297`，HTML `9878290599392228766`。

本轮重新用 Stitch MCP 读取 Screen/HTML，检查原始 HTML 并用浏览器渲染参照。原桌面 raster 损坏，不用它作为像素比对基准。

结构保留：桌面点阵/深色玻璃侧栏、胶囊导航、创作器、横移区、片场/功能探索和四列高低卡片；移动独立头部、福利/片场、两行横向功能、双列作品、底栏与浮层输入。平板收成图标侧栏和两列作品。

**不是逐像素还原；以下差异待最终视觉 UAT 确认：**

1. 根据已锁定阶段规范，所有品牌、片场和作品媒体使用本地 CSS/内联 SVG 替代 Stitch 的远程图片；品牌是重构的轨道图标，作品图片/缩略图不与原图相同，均标为示例。
2. 采用系统无衬线字体，按 UI 合同统一 12/16/24/32px 和最小 44px 触控范围；不复制源稿的 10px 文案或远程 Google Fonts。截图环境注册了现有本地 Noto Sans CJK 字体以解决中文方框，产品不下载网页字体。
3. 桌面创作器始终显示完整选项，较源 HTML 默认收起输入条更高；明确增加服务未接提示。模型、价格/账户额度不模拟真实可用性，移动额度用破折号而非虚构余额。
4. 功能卡采用手动横向滚动，另有可暂停自动文字 marquee；移动不复刻源 HTML 的自动双向功能滚动。原型浮层、外部字体和脚本不原样复制。
5. 示范作品使用共享数据；移动标题/元数据与桌面按组合展示。布局使用响应式网格，非完整 masonry 算法；高度不同的四张示例卡保留视觉节奏。
6. 设置只做本页预览，无账户持久化或快捷指令/GPU 引擎实际启用；没有可访问的目标路由时显示不可用。

## 待人工验收

- **视觉 UAT：PENDING**。用上述桌面/移动截图与 canonical Stitch Screen/HTML 比较，确认主要构图及明确差异，或指出需调整处。
- **真实设备 UAT：PENDING**。在物理 iOS Safari / Android Chrome 上打开页面，触控展开 dock，唤起 OS 键盘，输入并滚动长文本，检查输入和主 CTA 可达、底栏避让；旋转后重复，关闭并确认焦点返回。记录设备型号、OS 和浏览器版本及 PASS/FAIL。

当前仅本地生产服务已验证；未发布公共 URL，不提供虚构的远程预览入口。
