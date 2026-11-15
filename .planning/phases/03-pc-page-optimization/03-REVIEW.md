---
phase: 03-pc-page-optimization
reviewed: 2026-11-15T05:25:00Z
depth: standard
files_reviewed: 12
files_reviewed_list:
  - src/components/ui/liquid-glass-navbar.tsx
  - src/components/ui/liquid-glass-logo-reveal.tsx
  - src/components/ui/liquid-text.tsx
  - src/components/ui/liquid-text-utils/liquid-text-core-canvas.ts
  - src/components/ui/liquid-text-utils/liquid-text-core-loop.ts
  - src/components/ui/liquid-text-utils/liquid-text-core-tone.ts
  - src/components/ui/liquid-text-utils/liquid-text-core-palette.ts
  - src/components/homepage/desktop-homepage.tsx
  - src/components/homepage/desktop-prompt-input.tsx
  - src/components/homepage/pc-optimization.css
  - src/components/homepage/use-stitch-homepage.ts
  - src/app/globals.css
findings:
  critical: 0
  warning: 0
  info: 0
  total: 0
  necessity: 0
status: clean
---

# Phase 03 代码审查

## Narrative Findings (AI reviewer)

## Summary

审查当前五项 PC 优化的组件、接入与样式；依据实际调用和本地 Logo 素材核对，不以编译通过替代行为正确性。本审查未运行浏览器，页面几何、动效观感及人工验收由独立浏览器验证记录覆盖。未发现有证据支持的注入或凭据风险。

当前原审查范围已读回复核，未解决 BLOCKER / WARNING 为 0。下列保留修复历史，不计入当前 findings。

## 已解决问题

### CR-01：BLOCKER（已修复）— 默认单色渲染抹掉原 Logo 内部标识

**File:** `/Users/liuyi/program/wwwroot/oneirocycle-frontend/src/components/homepage/desktop-homepage.tsx:159-169`

**Issue:** 接入使用原 PNG，但未传 `originalColors`。该 PNG 是浅蓝圆角底板与白色月亮/纸飞机，透明度只在底板外角发生变化。组件默认 `originalColors: false`（`liquid-glass-logo-reveal.tsx:85-92`），shader 在 `uUseColor=0` 时只用 alpha SDF 和统一 `logoColor`。整个不透明圆角底板因此被当作 Logo 轮廓，内部月亮/纸飞机的颜色对比被抹掉；静态 mask 降级也存在同一问题。与保留原项目标识的 PC-03 不符。

**Fix:** 接入时启用 `originalColors={true}`，并让原色模式的静态降级使用原图而不是单色 alpha mask；或者使用与现有标识一致、背景透明的轮廓纹理。修复后对照本地原 PNG 核对内部月亮/纸飞机仍清晰可辨。

**复核结果：** 已读回 `desktop-homepage.tsx` 的 `originalColors={true}`，以及组件原色降级的 `backgroundImage` 分支；正常 shader 与静态降级均保留原图内部颜色，不再只填 alpha 轮廓。浏览器原图对照由主执行者验证。

### WR-01：WARNING（已修复）— WebGL 上下文丢失时品牌内容没有静态降级

**File:** `/Users/liuyi/program/wwwroot/oneirocycle-frontend/src/components/ui/liquid-glass-logo-reveal.tsx:1285-1298`

**Issue:** `onLost` 只设置 `lost=true`；`LiquidText` 对应处理（`liquid-text.tsx:926-930`）只清空 `glRef`。上下文丢失会清空 drawing buffer，两个组件的 fallback 状态仍为 false，因而 Logo 和项目名称会空白，直到可能出现的 `webglcontextrestored`。浏览器并不保证恢复事件必然到达。初始化失败的降级已实现，但运行中丢失路径未覆盖。

**Fix:** 丢失时显示已有静态 Logo/文字层；恢复成功后隐藏静态层并重建纹理。保留原 canvas 监听器，避免切到 fallback 时拆除 canvas 导致无法接收恢复事件。浏览器验证应包括 `WEBGL_lose_context` 的丢失与恢复两条路径。

**复核结果：** Logo `onLost` 调用 `showFallback(true)` 并隐藏 canvas；恢复重建 renderer/纹理，实际绘制后才关闭静态层。LiquidText 丢失时设置 `contextLost`，持续保留 canvas 及恢复监听器，展示静态名称；恢复通过 epoch 重建 GL 和距离场，成功绘制后才移除静态层。未发现该修复引入的当前范围新缺陷；实际丢失/恢复浏览器结果另见主验证记录。

## 审查中已修复

- **BLOCKER（已修复）**：空输入 `onBlur` 调用总恢复焦点的 `closePrompt`，Tab 或点击外部控件后被抢回展开按钮。已读回 `onCollapse(false)` 和可选焦点恢复分支。
- **WARNING（已修复）**：自动高度测量未禁用 textarea 的 height transition，长文本删除后高度可能卡在旧值。已读回测量前禁用 transition、测量后恢复的处理。

未修改产品源码；仅输出及更新本审查文档。当前状态是源代码复核通过，不代表最终视觉或真机验收通过。
