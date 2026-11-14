---
phase: '02'
status: human_needed
verified: '2026-11-14'
---

# CAR-5 — Verification

工程、自动化、证据交付完成；最终用户验收尚未完成。Linear 为 In Review，不能标记 Done。

| Requirement | Automated/local evidence                                  | Final status                      |
| ----------- | --------------------------------------------------------- | --------------------------------- |
| HOME-01     | 桌面独立组合，canonical HTML 核对，1440/1280 截图         | 实现完成；视觉差异待确认          |
| HOME-02     | 移动独立组合，触控/键盘 dock 生命周期、390/375 截图       | 实现完成；真机键盘待验收          |
| HOME-03     | 本地控件/筛选/空态、不可用反馈；无服务请求                | 本地验证通过                      |
| HOME-04     | 五宽度无页面横溢，dock/nav 避让，短视口代理通过           | 真机软键盘/安全区 PENDING         |
| HOME-05     | 控件命名、焦点可见、循环、归还、44px 目标、reduced-motion | 自动化通过；人工/设备验收 PENDING |
| HOME-06     | README、截图、原始 JSON、可复跑脚本、差异记录             | 交付完成                          |

证据：[verification-homepage.md](../../../docs/verification-homepage.md)。`npm run check` PASS（19 tests），最终应用 `npm run build` PASS，生产 HTTP 200，浏览器脚本 exit 0。作者内联核对见 02-REVIEW.md，不冒充独立审查。

Chromium VisualViewport proxy: PASS

Physical mobile OS keyboard UAT: PENDING

必须在物理 iOS Safari/Android Chrome 输入长 prompt、唤起软键盘、滚动与旋转，记录型号/OS/浏览器及结果；另请对照 Stitch 确认媒体/字体/布局差异。当前未发布公共预览、未 push/merge/deploy。
