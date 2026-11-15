# CAR-7 当前 PC 优化验证

2026-11-15；Mac Codex；分支 `codex/car-7-pc-page-optimization`。范围仅 CAR-8～CAR-12，父任务继续接收后续问题。用户明确确认无服务端同任务写入者。本轮不变更后端、依赖、移动视觉或真实服务。

## 实现

| 任务   | 结果与所属模块                                                                                                               |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| CAR-8  | `desktop-homepage.tsx` + `pc-optimization.css`：banner/侧栏/顶部不滚动，仅右侧正文 main 滚动；修复多出42px横幅高度的整页溢出 |
| CAR-9  | `ui/liquid-glass-navbar.tsx`：用户 Waterline shader 与水滴物理，四模式受控，静音、键盘可用                                   |
| CAR-10 | `ui/liquid-glass-logo-reveal.tsx`：原色本地 Logo 玻璃显现/重播，失败与丢失时静态显示                                         |
| CAR-11 | `ui/liquid-text.tsx` 及四辅助模块：液态字形与拖曳回流，菜单名称上限28px，无新增依赖                                          |
| CAR-12 | `desktop-prompt-input.tsx`：320px胶囊到480px卡片弹性展开，68～160px自动高度，长文渐隐，复用原prompt/类型/模型与未接反馈      |

主实现提交：`ad721e2`、`76ec8a7`。完整参考位于 `.planning/phases/03-pc-page-optimization/references/`，不依赖用户附件路径。参考演示的额外上传/语音识别/思考强度未扩大为新产品能力，未伪造服务结果。

## 自动检查

- Node 24.6.0：`npm run check` PASS，格式、ESLint、类型检查及7文件17测试通过。现有单元测试覆盖工程/领域基础；UI行为由浏览器证据支持。
- Node 24.6.0：`npm run build -- --webpack` PASS，首页静态预渲染成功。未改变构建脚本或依赖。
- strict premium UI audit PASS，0 findings，见 `assets/pc-optimization/premium-audit.json`。
- `git diff --check` PASS。
- 独立代码审查修复并复核4项：空blur抢焦、长文缩高、Logo单色丢标识、context loss空白。`03-REVIEW.md` active=0。

本机默认 Node 22.9.0 低于 package.json 的 >=22.12.0；默认 Turbopack 构建触发本机进程端口 EPERM，Webpack 在旧 Node 又触发 require(ESM) 不兼容。使用本机已有 Node24 和 Next支持的Webpack路径后实际构建通过，未安装或更改依赖。未声称默认Turbopack命令通过。

## 实际浏览器

Ego Lite / Chromium，在本地开发页完成26项断言，结果均PASS：

- `layout-results.json`：768/1280/1440/1920×900 与1440×420共5组。等待侧栏响应式宽度稳定后滚动；document高宽等于视口，window.scrollY=0，正文scrollTop增加；header/sidebar的x/y/width/height全部不变，账户区留在视口内。1280的早期采样处于过渡中，已作废并完整重采。
- `interaction-results.json`：四模式指针与方向键/Home/End、展开聚焦、长文滚动、真实未接反馈、清空后缩回68px，共7项。
- `state-results.json`：模型菜单键盘选择、Shift+Enter换行、Escape下一帧恢复焦点且保留输入、空blur不抢外部焦点、IME Enter不拦截、浅色、侧栏收起、关横幅无溢出、动态reduced-motion，共9项。
- `fallback-results.json`：WebGL2主动loss时Logo原图及名称静态可读，restore后重新绘制；启动前禁用WebGL时降级导航仍可切换，共3项。
- `mobile-results.json`：375/390移动布局无横溢出、桌面壳层隐藏，原移动输入展开/输入/Escape可用，共2项。

浏览器采集未发现 console error 或 Runtime.exceptionThrown。初始化前禁用WebGL和主动lose/restore仅用于测试，未写入产品代码。隐藏/离屏停帧和StrictMode资源清理经过源码审查，但未做运行时帧数/资源计数。

截图位于 `assets/pc-optimization/`：default、scrolled各断点、input-expanded、model-menu、light、reduced-motion、WebGL降级与mobile。light-1440截于主题过渡中间态；reduced-motion-light展示主题稳定后的新组件效果。原页面非本轮区域的浅色对比仍沿用现有实现，不宣称全站浅色视觉验收。`before-1440.png` 为改前对照。

## 验收边界

工程实现与上述检查已完成，仍待用户确认本轮PC动效和字号是否符合预期，不标记用户验收通过。未覆盖真实手机软键盘/安全区；原Phase2人工验收不由本轮代理测试替代。未合并或部署。
