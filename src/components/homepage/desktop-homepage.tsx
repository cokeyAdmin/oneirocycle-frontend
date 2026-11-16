'use client';

import { useRef } from 'react';
import { LiquidNavbar } from '../ui/liquid-glass-navbar';
import { GlassIconReveal } from '../ui/liquid-glass-logo-reveal';
import { LiquidText } from '../ui/liquid-text';
import { LiquidToggle, NimbusToggleIcons } from '../ui/liquid-glass-toggle';
import { ParticleTitle } from '../ui/particle-title';
import { DesktopPromptInput } from './desktop-prompt-input';
import { useStitchHomepage } from './use-stitch-homepage';
import { SourceNotice } from './homepage-primitives';
import { SidebarWater, type SidebarWaterHandle } from './sidebar-water';

export function DesktopHomepage() {
  const waterRef = useRef<SidebarWaterHandle>(null);
  const {
    category,
    setCategory,
    showPrompt,
    closePrompt,
    unavailable,
    collapsed,
    setCollapsed,
    creationType,
    dismissMenus,
    dismissNotice,
    floating,
    light,
    setLight,
    menu,
    model,
    notice,
    onClick,
    onKeyDown,
    onScroll,
    open,
    panelRef,
    promotion,
    prompt,
    promptRef,
    query,
    resolution,
    rootRef,
    searchRef,
    setPrompt,
    setQuery,
    setSettings,
    settingsRef,
    triggerRef,
  } = useStitchHomepage('desktop');
  return (
    <div
      ref={rootRef}
      onClick={dismissMenus}
      onKeyDown={onKeyDown}
      className={
        'stitch-desktop bg-dot-pattern flex flex-col antialiased selection:bg-neutral-600 selection:text-white h-screen min-h-0' +
        (light ? ' light-theme' : '')
      }
    >
      {'\n'}
      {'\n'}
      {'\n'}
      {'\n'}
      {'\n'}
      {'\n'}
      {'\n'}
      {'\n'}
      {'\n'}
      <div
        className="w-full liquid-glass border-b text-xs font-medium py-2 px-4 transition-all duration-300 relative z-50 flex items-center justify-between"
        id="desktop-promo-banner"
        style={{ borderColor: 'var(--card-border)' }}
        hidden={!promotion}
      >
        {'\n'}
        <div className="flex items-center space-x-2.5 mx-auto truncate text-neutral-300 text-xs">
          {'\n'}
          <span className="inline-flex items-center justify-center bg-white/10 px-2 py-0.5 rounded-full text-[11px] font-semibold text-white tracking-wider border border-white/10">
            {'LIMITED OFFER'}
          </span>
          {'\n'}
          <span>
            {
              '新创作者礼遇 | Seedance 2.5 Cinema 及 20 款影视模型免费试用 7 天，尊享云端算力。'
            }
          </span>
          {'\n'}
          <button
            className="ml-1 text-white hover:underline font-semibold transition-colors"
            type="button"
            aria-label="立即体验 >"
            data-stitch-action="unavailable"
            onClick={onClick}
          >
            {'立即体验 >'}
          </button>
          {'\n'}
        </div>
        {'\n'}
        <button
          className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors"
          title="关闭横幅"
          type="button"
          aria-label="关闭横幅"
          data-stitch-action="close-promo"
          onClick={onClick}
        >
          {'\n'}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
          {'\n'}
        </button>
        {'\n'}
      </div>
      {'\n'}
      {'\n'}
      {'\n'}
      <div className="pc-shell flex flex-1 w-full relative min-h-0">
        {'\n'}
        {'\n'}
        <aside
          data-purpose="primary-sidebar"
          id="desktop-main-sidebar"
          style={{
            backgroundColor: 'var(--bg-sidebar)',
            borderColor: 'var(--card-border)',
          }}
          data-collapsed={collapsed}
          className={
            collapsed
              ? 'w-20  border-r flex flex-col justify-between flex-shrink-0 transition-all duration-300 h-full relative z-50 overflow-hidden'
              : 'w-20 md:w-64 border-r flex flex-col justify-between flex-shrink-0 transition-all duration-300 h-full relative z-50 overflow-hidden'
          }
        >
          <div className="pc-sidebar-content flex-1 py-5 px-3 space-y-6">
            <div
              className="flex items-center justify-between px-2 py-1 relative"
              id="desktop-sidebar-header-wrapper"
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  className="pc-sidebar-logo"
                  aria-label={
                    collapsed ? '展开侧边栏并重播 Logo 动画' : '重播 Logo 动画'
                  }
                  aria-expanded={!collapsed}
                  aria-controls="desktop-main-sidebar"
                  onMouseEnter={(event) => {
                    if (!collapsed) return;
                    event.currentTarget
                      .querySelector<HTMLElement>('[role="img"]')
                      ?.click();
                    setCollapsed(false);
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (event.target === event.currentTarget)
                      event.currentTarget
                        .querySelector<HTMLElement>('[role="img"]')
                        ?.click();
                    if (collapsed) setCollapsed(false);
                  }}
                >
                  <GlassIconReveal
                    logo="/media/stitch/oneirocycle-logo-white.png"
                    label="OneiroCycle Logo"
                    look={light ? 'light' : 'dark'}
                    iconPlate={false}
                    tuning={{ halo: 0 }}
                    background={light ? '#ffffff' : '#0f1015'}
                    logoColor={light ? '#15171c' : '#ffffff'}
                    tileSize={36}
                    logoScale={0.82}
                    finalScale={1}
                    loop={false}
                    className="pc-logo-reveal"
                  />
                </button>
                <div
                  className="sidebar-label hidden md:flex flex-col min-w-0"
                  hidden={collapsed}
                >
                  <LiquidText
                    text="oneirocycle"
                    tone={light ? 'light' : 'dark'}
                    fontSize={28}
                    fontWeight={800}
                    className="pc-project-name"
                  />
                </div>
              </div>
              {!collapsed && (
                <button
                  id="desktop-sidebar-collapse-toggle"
                  className="sidebar-label hidden md:flex w-7 h-7 rounded-lg liquid-glass hover:bg-white/10 items-center justify-center text-neutral-400 hover:text-white transition-all duration-200 border border-white/10 active:scale-95 flex-shrink-0"
                  title="收起侧边栏"
                  type="button"
                  data-stitch-action="sidebar"
                  aria-expanded={!collapsed}
                  aria-label={collapsed ? '展开侧边栏' : '收起侧边栏'}
                  onClick={onClick}
                >
                  <svg
                    id="desktop-sidebar-toggle-icon"
                    className="w-4 h-4 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
              )}
            </div>
            <nav
              className="pc-sidebar-nav space-y-1.5 font-medium text-sm"
              onClickCapture={(event) => {
                if (!(event.target instanceof Element)) return;
                const button = event.target.closest('button');
                if (button && event.currentTarget.contains(button))
                  waterRef.current?.moveTo(button);
              }}
            >
              <SidebarWater ref={waterRef} light={light} />
              <button
                className="pc-sidebar-current flex items-center gap-3 px-3 py-2 rounded-xl text-white transition-all"
                type="button"
                aria-label="首页"
                aria-current="page"
                data-stitch-action="home"
                onClick={onClick}
              >
                <svg
                  className="w-4 h-4 text-white flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  ></path>
                </svg>
                <span
                  className="sidebar-label hidden md:inline text-xs truncate"
                  hidden={collapsed}
                >
                  {'首页'}
                </span>
              </button>
              <button
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-all"
                type="button"
                aria-label="创作图片"
                data-stitch-action="unavailable"
                onClick={onClick}
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  ></path>
                </svg>
                <span
                  className="sidebar-label hidden md:inline text-xs truncate"
                  hidden={collapsed}
                >
                  {'创作图片'}
                </span>
              </button>
              <button
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-all"
                type="button"
                aria-label="创作视频"
                data-stitch-action="unavailable"
                onClick={onClick}
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  ></path>
                </svg>
                <span
                  className="sidebar-label hidden md:inline text-xs truncate"
                  hidden={collapsed}
                >
                  {'创作视频'}
                </span>
              </button>
              <button
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-all"
                type="button"
                aria-label="无限画布"
                data-stitch-action="unavailable"
                onClick={onClick}
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  ></path>
                </svg>
                <span
                  className="sidebar-label hidden md:inline text-xs truncate"
                  hidden={collapsed}
                >
                  {'无限画布'}
                </span>
              </button>
              <button
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-all"
                type="button"
                aria-label="我的资产"
                data-stitch-action="unavailable"
                onClick={onClick}
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  ></path>
                </svg>
                <span
                  className="sidebar-label hidden md:inline text-xs truncate"
                  hidden={collapsed}
                >
                  {'我的资产'}
                </span>
              </button>
              <div className="pt-3 border-t border-white/5 my-2"></div>
            </nav>
          </div>
          <div
            className="flex-shrink-0 p-3 border-t relative z-50 bg-[#0e0f14]/95 w-full"
            style={{
              background: 'rgba(14, 15, 20, 0.95)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div
              className="flex items-center justify-between gap-2.5 p-2 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 hover:border-white/25 backdrop-blur-xl transition-all duration-300 cursor-pointer group relative shadow-lg w-full"
              role="button"
              aria-label="账户与偏好设置"
              data-stitch-action="settings"
              tabIndex={0}
              onClick={onClick}
            >
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500/30 to-cyan-500/30 border border-white/25 flex items-center justify-center font-bold text-white text-xs shadow-inner tracking-wider group-hover:scale-105 transition-transform duration-200">
                  {'OC'}
                </div>
                <span
                  className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-neutral-900 absolute -bottom-0.5 -right-0.5 animate-pulse"
                  title="在线"
                ></span>
              </div>
              <div
                className="sidebar-label hidden md:flex flex-col min-w-0 flex-1"
                hidden={collapsed}
              >
                <span className="text-xs font-bold tracking-tight text-white light-theme:text-neutral-900 truncate">
                  {'oneirocycle'}
                </span>
                <span className="text-[10px] text-neutral-400 truncate">
                  {'PRO 会员'}
                </span>
              </div>
              <button
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200 border border-white/15 flex-shrink-0 active:scale-95"
                id="desktop-theme-toggle-btn"
                title="切换亮暗模式"
                type="button"
                aria-label="切换亮暗模式"
                data-stitch-action="theme"
                aria-pressed={light}
                onClick={onClick}
              >
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12"
                  fill="none"
                  id="desktop-theme-icon"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </aside>
        {'\n'}
        {'\n'}
        {'\n'}
        <div className="pc-workspace">
          {'\n'}
          {'\n'}
          <header
            className="sticky top-0 z-20 backdrop-blur-xl border-b py-3 px-6 md:px-10 flex items-center justify-between"
            style={{
              background: 'rgba(11, 12, 16, 0.75)',
              borderColor: 'var(--card-border)',
            }}
          >
            {'\n'}
            {'\n'}
            <LiquidNavbar
              ariaLabel="创作模式"
              compact={false}
              tone={light ? 'light' : 'dark'}
              active={['inspiration', 'short-drama', 'novel', 'game'].indexOf(
                category,
              )}
              onChange={(index) =>
                setCategory(
                  ['inspiration', 'short-drama', 'novel', 'game'][index] ??
                    'inspiration',
                )
              }
              items={[
                { label: '灵感创作' },
                { label: '短剧创作' },
                { label: '小说创作' },
                { label: '游戏创作' },
              ]}
            />
            {'\n'}
            {'\n'}
            <div className="flex items-center space-x-3 text-xs">
              <LiquidToggle
                checked={!light}
                onCheckedChange={(checked) => setLight(!checked)}
                tone={light ? 'light' : 'dark'}
                icons={{
                  off: NimbusToggleIcons.sun,
                  on: NimbusToggleIcons.moon,
                }}
                label="切换亮暗模式"
                size={28}
              />
              <button
                className="pc-sheen-button relative w-8 h-8 rounded-full liquid-glass border border-white/10 hover:border-white/30 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all shadow-sm active:scale-95 group"
                title="消息通知"
                id="desktop-notification-btn"
                type="button"
                aria-label="消息通知"
                data-stitch-action="unavailable"
                onClick={onClick}
              >
                <svg
                  className="w-4 h-4 text-neutral-300 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(76,215,246,0.9)] animate-pulse"></span>
              </button>
              <div
                className="pc-sheen-button flex items-center space-x-2 px-3 py-1.5 rounded-full liquid-glass border text-xs font-medium cursor-pointer hover:border-white/30 transition-colors"
                role="button"
                data-stitch-action="unavailable"
                tabIndex={0}
                onClick={onClick}
              >
                <span className="text-neutral-400">{'⚡'}</span>
                <span className="font-bold text-white">{'60'}</span>
                <span className="text-[10px] text-neutral-300 font-semibold tracking-wider">
                  {'FREE'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90 animate-pulse"></span>
              </div>
            </div>
            {'\n'}
          </header>
          <main
            id="desktop-workspace-scroll-container"
            className="pc-workspace-body"
            onScroll={onScroll}
          >
            {'\n'}
            {'\n'}
            <div className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 py-8 md:py-10 flex flex-col space-y-9">
              {'\n'}
              {'\n'}
              <div className="text-center space-y-2">
                {'\n'}
                <ParticleTitle
                  text="OneiroCycle 环梦篇章，一站式AIGC创作平台"
                  light={light}
                />
                {'\n\n'}
              </div>
              {'\n'}
              {'\n\n'}
              {'\n'}
              <div
                className="w-full mx-auto flex flex-wrap items-center justify-center gap-2 max-w-3xl z-10 relative select-none"
                data-purpose="workflow-pill-bar"
              >
                <button
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200 text-xs text-neutral-300 hover:text-white active:scale-95"
                  type="button"
                  aria-label="智能编导新"
                  data-stitch-action="unavailable"
                  onClick={onClick}
                >
                  <svg
                    className="w-3.5 h-3.5 text-purple-200 group-hover:scale-105 transition-transform flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span className="font-medium tracking-tight">
                    {'智能编导'}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-neutral-300 font-mono">
                    {'新'}
                  </span>
                </button>
                <button
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200 text-xs text-neutral-300 hover:text-white active:scale-95"
                  type="button"
                  aria-label="电商画布"
                  data-stitch-action="unavailable"
                  onClick={onClick}
                >
                  <svg
                    className="w-3.5 h-3.5 text-cyan-200 group-hover:scale-105 transition-transform flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    ></path>
                  </svg>
                  <span className="font-medium tracking-tight">
                    {'电商画布'}
                  </span>
                </button>
                <button
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200 text-xs text-neutral-300 hover:text-white active:scale-95"
                  type="button"
                  aria-label="AI剪辑"
                  data-stitch-action="unavailable"
                  onClick={onClick}
                >
                  <svg
                    className="w-3.5 h-3.5 text-pink-300 group-hover:scale-105 transition-transform flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"
                    ></path>
                  </svg>
                  <span className="font-medium tracking-tight">{'AI剪辑'}</span>
                </button>
                <button
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200 text-xs text-neutral-300 hover:text-white active:scale-95"
                  type="button"
                  aria-label="故事板"
                  data-stitch-action="unavailable"
                  onClick={onClick}
                >
                  <svg
                    className="w-3.5 h-3.5 text-amber-200 group-hover:scale-105 transition-transform flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                  </svg>
                  <span className="font-medium tracking-tight">{'故事板'}</span>
                </button>
                <button
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200 text-xs text-neutral-300 hover:text-white active:scale-95"
                  type="button"
                  aria-label="搞笑短剧"
                  data-stitch-action="unavailable"
                  onClick={onClick}
                >
                  <svg
                    className="w-3.5 h-3.5 text-blue-200 group-hover:scale-105 transition-transform flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span className="font-medium tracking-tight">
                    {'搞笑短剧'}
                  </span>
                </button>
                <button
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200 text-xs text-neutral-300 hover:text-white active:scale-95"
                  type="button"
                  aria-label="萌宠动画PRO"
                  data-stitch-action="unavailable"
                  onClick={onClick}
                >
                  <svg
                    className="w-3.5 h-3.5 text-pink-300 group-hover:scale-105 transition-transform flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                  <span className="font-medium tracking-tight">
                    {'萌宠动画'}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-neutral-300 font-mono">
                    {'PRO'}
                  </span>
                </button>
              </div>
              <section className="pc-prompt-section">
                <DesktopPromptInput
                  open={open}
                  value={prompt}
                  onChange={setPrompt}
                  onExpand={() => showPrompt()}
                  onCollapse={closePrompt}
                  onUnavailable={unavailable}
                  inputRef={promptRef}
                  triggerRef={triggerRef}
                  panelRef={panelRef}
                >
                  <div
                    id="desktop-compact-toolbar-row"
                    className="pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 text-xs select-none"
                  >
                    {'\n    '}
                    <div className="flex items-center flex-wrap gap-2">
                      {'\n      '}
                      {'\n      '}
                      <div
                        className="relative inline-block"
                        id="desktop-creation-type-wrapper"
                      >
                        {'\n        '}
                        <button
                          id="desktop-creation-type-trigger"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 hover:bg-cyan-500/30 font-medium text-xs transition-colors shadow-sm active:scale-95"
                          type="button"
                          aria-haspopup="menu"
                          aria-label="图片生成"
                          data-stitch-action="type-menu"
                          aria-expanded={menu === 'type'}
                          onClick={onClick}
                        >
                          {'\n          '}
                          <svg
                            className="w-3.5 h-3.5 text-cyan-200 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                          {'\n          '}
                          <span id="desktop-current-creation-label">
                            {creationType}
                          </span>
                          {'\n          '}
                          <svg
                            className="w-3 h-3 text-cyan-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                          {'\n        '}
                        </button>
                        {'\n        '}
                        <div
                          className="absolute left-0 bottom-full mb-2 w-44 rounded-xl liquid-glass-elevated border border-white/15 p-1.5 shadow-2xl z-50 flex-col gap-0.5 flex"
                          id="desktop-creation-menu-dropdown"
                          style={{
                            background: 'rgba(18, 20, 28, 0.98)',
                            backdropFilter: 'blur(28px)',
                          }}
                          role="menu"
                          hidden={menu !== 'type'}
                        >
                          {'\n          '}
                          <div className="px-2 py-1 text-[10px] text-neutral-400 font-medium border-b border-white/5">
                            {'创作类型'}
                          </div>
                          {'\n          '}
                          <button
                            className="creation-opt flex items-center justify-between w-full px-2 py-1 rounded-lg text-xs bg-white/10 text-white font-medium"
                            type="button"
                            data-value="图片生成"
                            role="menuitemradio"
                            aria-label="图片生成"
                            data-stitch-action="type"
                            aria-checked={creationType === '图片生成'}
                            onClick={onClick}
                          >
                            {'\n            '}
                            <div className="flex items-center gap-2">
                              {'\n              '}
                              <svg
                                className="w-3.5 h-3.5 text-cyan-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.8"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                ></path>
                              </svg>
                              {'\n              '}
                              <span>{'图片生成'}</span>
                              {'\n            '}
                            </div>
                            {'\n          '}
                          </button>
                          {'\n          '}
                          <button
                            className="creation-opt flex items-center justify-between w-full px-2 py-1 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/10"
                            type="button"
                            data-value="视频生成"
                            role="menuitemradio"
                            aria-label="视频生成"
                            data-stitch-action="type"
                            aria-checked={creationType === '视频生成'}
                            onClick={onClick}
                          >
                            {'\n            '}
                            <div className="flex items-center gap-2">
                              {'\n              '}
                              <svg
                                className="w-3.5 h-3.5 text-neutral-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.8"
                                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                ></path>
                              </svg>
                              {'\n              '}
                              <span>{'视频生成'}</span>
                              {'\n            '}
                            </div>
                            {'\n          '}
                          </button>
                          {'\n          '}
                          <button
                            className="creation-opt flex items-center justify-between w-full px-2 py-1 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/10"
                            type="button"
                            data-value="Agent 模式"
                            role="menuitemradio"
                            aria-label="Agent 模式"
                            data-stitch-action="type"
                            aria-checked={creationType === 'Agent 模式'}
                            onClick={onClick}
                          >
                            {'\n            '}
                            <div className="flex items-center gap-2">
                              {'\n              '}
                              <svg
                                className="w-3.5 h-3.5 text-neutral-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.8"
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                ></path>
                              </svg>
                              {'\n              '}
                              <span>{'Agent 模式'}</span>
                              {'\n            '}
                            </div>
                            {'\n          '}
                          </button>
                          {'\n        '}
                        </div>
                        {'\n      '}
                      </div>
                      {'\n\n      '}
                      {'\n      '}
                      <div
                        className="relative inline-block"
                        id="desktop-model-selector-wrapper"
                      >
                        {'\n        '}
                        <button
                          id="desktop-model-selector-trigger"
                          className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg liquid-glass border border-white/15 hover:border-white/30 text-xs text-white hover:bg-white/10 transition-all shadow-sm active:scale-95"
                          type="button"
                          aria-haspopup="menu"
                          aria-label="Seedream 5.0 Pro"
                          data-stitch-action="model-menu"
                          aria-expanded={menu === 'model'}
                          onClick={onClick}
                        >
                          {'\n          '}
                          <svg
                            className="w-3.5 h-3.5 text-neutral-300 group-hover:scale-105 transition-transform flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            ></path>
                          </svg>
                          {'\n          '}
                          <span
                            id="desktop-current-model-label"
                            className="font-medium tracking-tight"
                          >
                            {model}
                          </span>
                          {'\n          '}
                          <svg
                            className="w-3 h-3 text-neutral-400 group-hover:text-white transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                          {'\n        '}
                        </button>
                        {'\n        '}
                        <div
                          id="desktop-model-menu-dropdown"
                          className="absolute left-0 bottom-full mb-2 w-64 rounded-xl liquid-glass-elevated border border-white/15 p-2 shadow-2xl z-50 flex-col gap-1 flex"
                          style={{
                            background: 'rgba(18, 20, 28, 0.98)',
                            backdropFilter: 'blur(28px)',
                          }}
                          role="menu"
                          hidden={menu !== 'model'}
                        >
                          {'\n          '}
                          <div className="px-2 py-1 text-[10px] text-neutral-400 font-medium border-b border-white/5 flex items-center justify-between">
                            {'\n            '}
                            <span>{'推荐模型'}</span>
                            {'\n            '}
                            <span className="font-mono">{'2K/影视'}</span>
                            {'\n          '}
                          </div>
                          {'\n          '}
                          <button
                            className="model-select-opt flex items-center justify-between w-full px-2 py-1.5 rounded-lg text-xs bg-white/10 text-white font-medium"
                            data-model="Seedream 5.0 Pro"
                            type="button"
                            role="menuitemradio"
                            aria-label="Seedream 5.0 Pro旗舰"
                            data-stitch-action="model"
                            aria-checked={model === 'Seedream 5.0 Pro'}
                            onClick={onClick}
                          >
                            {'\n            '}
                            <div className="flex items-center gap-1.5">
                              <span className="truncate">
                                {'Seedream 5.0 Pro'}
                              </span>
                              <span className="text-[9px] px-1 py-0.2 rounded bg-purple-500/20 text-purple-200 border border-purple-500/30">
                                {'旗舰'}
                              </span>
                            </div>
                            {'\n            '}
                            <svg
                              className="w-3.5 h-3.5 text-cyan-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            {'\n          '}
                          </button>
                          {'\n          '}
                          <button
                            className="model-select-opt flex items-center justify-between w-full px-2 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                            data-model="Seedance 2.5 Cinema"
                            type="button"
                            role="menuitemradio"
                            aria-label="Seedance 2.5 Cinema视频"
                            data-stitch-action="model"
                            aria-checked={model === 'Seedance 2.5 Cinema'}
                            onClick={onClick}
                          >
                            {'\n            '}
                            <div className="flex items-center gap-1.5">
                              <span className="truncate">
                                {'Seedance 2.5 Cinema'}
                              </span>
                              <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                {'视频'}
                              </span>
                            </div>
                            {'\n          '}
                          </button>
                          {'\n          '}
                          <button
                            className="model-select-opt flex items-center justify-between w-full px-2 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                            data-model="FLUX.1 Ultra"
                            type="button"
                            role="menuitemradio"
                            aria-label="FLUX.1 Ultra极速"
                            data-stitch-action="model"
                            aria-checked={model === 'FLUX.1 Ultra'}
                            onClick={onClick}
                          >
                            {'\n            '}
                            <div className="flex items-center gap-1.5">
                              <span className="truncate">{'FLUX.1 Ultra'}</span>
                              <span className="text-[9px] px-1 py-0.2 rounded bg-blue-500/20 text-blue-200 border border-blue-500/30">
                                {'极速'}
                              </span>
                            </div>
                            {'\n          '}
                          </button>
                          {'\n        '}
                        </div>
                        {'\n      '}
                      </div>
                      {'\n\n      '}
                      {'\n      '}
                      <button
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg liquid-glass border border-white/10 hover:border-white/20 text-xs text-neutral-300 hover:text-white transition-colors active:scale-95"
                        type="button"
                        aria-label="1:1 · 2K"
                        data-stitch-action="unavailable"
                        onClick={onClick}
                      >
                        {'\n        '}
                        <div className="w-3.5 h-3.5 border border-neutral-400 rounded-sm flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-neutral-300 rounded-xs"></div>
                        </div>
                        {'\n        '}
                        <span className="font-medium">
                          {'1:1 '}
                          <span className="text-neutral-500">{'·'}</span>
                          {' 2K'}
                        </span>
                        {'\n      '}
                      </button>
                      {'\n      '}
                      <button
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg liquid-glass border border-white/10 hover:border-white/20 text-xs text-neutral-300 hover:text-white transition-colors active:scale-95"
                        type="button"
                        aria-label="2张\n        限免2张"
                        data-stitch-action="unavailable"
                        onClick={onClick}
                      >
                        {'\n        '}
                        <svg
                          className="w-3.5 h-3.5 text-neutral-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <rect
                            x="7"
                            y="3"
                            width="10"
                            height="18"
                            rx="2"
                            strokeWidth="1.8"
                          ></rect>
                          <path
                            d="M4 7c0-1.1.9-2 2-2"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          ></path>
                          <path
                            d="M4 19c0 1.1.9 2 2 2"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          ></path>
                          <path
                            d="M20 7c0-1.1-.9-2-2-2"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          ></path>
                          <path
                            d="M20 19c0 1.1-.9 2-2 2"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          ></path>
                        </svg>
                        {'\n        '}
                        <span className="font-medium">{'2张'}</span>
                        {'\n        '}
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                          {'限免2张'}
                        </span>
                        {'\n      '}
                      </button>
                      {'\n      '}
                      <button
                        className="p-1.5 px-2 rounded-lg liquid-glass border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white transition-colors inline-flex items-center justify-center font-serif text-xs font-semibold"
                        title="提示词优化 (T,,)"
                        type="button"
                        aria-label="提示词优化 (T,,)"
                        data-stitch-action="unavailable"
                        onClick={onClick}
                      >
                        {'\n        '}
                        <span>{'T,,'}</span>
                        {'\n      '}
                      </button>
                      {'\n      '}
                      <button
                        className="relative p-1.5 px-2 rounded-lg liquid-glass border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white transition-colors inline-flex items-center justify-center font-mono text-xs"
                        title="提及主体 (@)"
                        type="button"
                        aria-label="提及主体 (@)"
                        data-stitch-action="unavailable"
                        onClick={onClick}
                      >
                        {'\n        '}
                        <span>{'@'}</span>
                        {'\n        '}
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(76,215,246,0.9)]"></span>
                        {'\n      '}
                      </button>
                      {'\n    '}
                    </div>
                    {'\n    '}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {'\n      '}
                      <div className="flex items-center space-x-1 text-[11px] font-mono text-neutral-400">
                        {'\n        '}
                        <svg
                          className="w-3 h-3 text-cyan-300 animate-pulse"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"></path>
                        </svg>
                        {'\n        '}
                        <span>{'0/张'}</span>
                        {'\n        '}
                        <span className="text-neutral-500 line-through text-[10px]">
                          {'11/张'}
                        </span>
                        {'\n      '}
                      </div>
                      {'\n      '}

                      {'\n    '}
                    </div>
                    {'\n  '}
                  </div>
                  <button
                    type="button"
                    className="pc-prompt-upload"
                    aria-label="上传参考素材"
                    title="上传参考素材"
                    onClick={unavailable}
                  >
                    +
                  </button>
                </DesktopPromptInput>
              </section>
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
              <section
                className="w-full"
                data-purpose="reference-cinema-feature-showcase"
                data-stitch-features=""
              >
                {'\n'}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
                  {'\n'}
                  {'\n'}
                  <div
                    className="lg:col-span-4 rounded-2xl relative overflow-hidden flex flex-col justify-end group cursor-pointer transition-all duration-500 ease-out p-4 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.06] hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.8),0_0_40px_rgba(139,92,246,0.2)] h-full"
                    id="desktop-cinema-banner"
                    role="button"
                    data-stitch-action="unavailable"
                    tabIndex={0}
                    onClick={onClick}
                  >
                    {'\n'}
                    {'\n'}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(circle at 85% 20%, rgba(88, 108, 156, 0.5) 0%, rgba(11, 12, 16, 0.95) 85%), linear-gradient(rgba(16, 18, 25, 0.4) 0%, rgb(11, 12, 16) 100%)',
                      }}
                    >
                      {'\n'}
                      {'\n'}
                      <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-gradient-to-br from-indigo-500/25 via-purple-500/20 to-cyan-400/15 blur-2xl animate-banner-aurora pointer-events-none"></div>
                      {'\n'}
                      <div className="absolute inset-0 opacity-20 flex flex-col justify-center items-start pl-4 select-none pointer-events-none">
                        {'\n'}
                        <span className="text-2xl font-extrabold tracking-tighter leading-none text-neutral-300">
                          {'环梦片场'}
                        </span>
                        {'\n'}
                        <span className="text-2xl font-extrabold tracking-tighter leading-none text-neutral-400 mt-0.5">
                          {'环梦片场'}
                        </span>
                        {'\n'}
                      </div>
                      {'\n'}
                      <div
                        className="absolute right-2 bottom-0 w-28 h-28 opacity-35 bg-no-repeat bg-contain"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle, rgba(255,255,255,0.2) 10%, transparent 60%)',
                        }}
                      ></div>
                      {'\n'}
                    </div>
                    {'\n'}
                    {'\n'}
                    <div className="relative z-10 space-y-1">
                      {'\n'}
                      <div className="flex items-center space-x-2">
                        {'\n'}
                        <h3 className="text-sm font-bold text-white tracking-wide group-hover:text-purple-200 transition-colors duration-300">
                          {'环梦片场上线'}
                        </h3>
                        {'\n'}
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.08] text-purple-200 border border-white/10 font-mono tracking-wider backdrop-blur-md">
                          {'RELEASE'}
                        </span>
                        {'\n'}
                      </div>
                      {'\n'}
                      <p className="text-[11px] text-neutral-400 truncate group-hover:text-neutral-300 transition-colors duration-300">
                        {'寻找AI时代最具想象力的好故事 · 电影级生成引擎'}
                      </p>
                      {'\n'}
                      {'\n'}
                      <div className="flex items-center space-x-1.5 pt-1.5">
                        {'\n'}
                        <span className="dot-step-1 h-1 rounded-full transition-all duration-300"></span>
                        {'\n'}
                        <span className="dot-step-2 h-1 rounded-full transition-all duration-300"></span>
                        {'\n'}
                        <span className="dot-step-3 h-1 rounded-full transition-all duration-300"></span>
                        {'\n'}
                        <span className="dot-step-4 h-1 rounded-full transition-all duration-300"></span>
                        {'\n'}
                      </div>
                      {'\n'}
                    </div>
                    {'\n'}
                  </div>
                  {'\n'}
                  {'\n'}
                  <div
                    className="lg:col-span-8 relative overflow-hidden rounded-2xl flex flex-col justify-center p-2 group/track h-full"
                    id="desktop-features-marquee-container"
                  >
                    {'\n'}
                    {'\n'}
                    <div className="absolute left-0 inset-y-0 w-10 bg-gradient-to-r from-[#0b0c10] to-transparent pointer-events-none z-10"></div>
                    {'\n'}
                    <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[#0b0c10] to-transparent pointer-events-none z-10"></div>
                    {'\n'}
                    {'\n'}
                    <div className="auto-scroll-track gap-3 py-1 group-hover/track:[animation-play-state:paused] h-full">
                      {'\n'}
                      <div className="w-[280px] flex-shrink-0 flex flex-col gap-2">
                        {'\n'}
                        {'\n'}
                        <div
                          className="rounded-xl p-2.5 flex items-center gap-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out cursor-pointer group/card"
                          role="button"
                          data-stitch-action="unavailable"
                          tabIndex={0}
                          onClick={onClick}
                        >
                          {'\n'}
                          <div className="w-12 h-11 rounded-lg bg-gradient-to-br from-amber-500/20 via-orange-600/10 to-transparent border border-white/10 overflow-hidden flex-shrink-0 relative flex items-center justify-center group-hover/card:border-amber-400/40 group-hover/card:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300">
                            {'\n'}
                            <svg
                              className="w-5 h-5 text-amber-200/90 group-hover/card:scale-110 group-hover/card:text-amber-300 transition-all duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.6"
                              ></path>
                            </svg>
                            {'\n'}
                          </div>
                          {'\n'}
                          <div className="min-w-0 flex-1">
                            {'\n'}
                            <div className="flex items-center space-x-1.5">
                              {'\n'}
                              <span className="text-xs font-medium text-white group-hover/card:text-white truncate">
                                {'短剧工作室'}
                              </span>
                              {'\n'}
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/10 text-neutral-200 border border-white/10 font-mono scale-95">
                                {'New'}
                              </span>
                              {'\n'}
                            </div>
                            {'\n'}
                            <p className="text-[10px] text-neutral-400 group-hover/card:text-neutral-300 truncate transition-colors">
                              {'短剧全流程创作'}
                            </p>
                            {'\n'}
                          </div>
                          {'\n'}
                        </div>
                        {'\n'}
                        {'\n'}
                        <div
                          className="rounded-xl p-2.5 flex items-center gap-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out cursor-pointer group/card"
                          role="button"
                          data-stitch-action="unavailable"
                          tabIndex={0}
                          onClick={onClick}
                        >
                          {'\n'}
                          <div className="w-12 h-11 rounded-lg bg-gradient-to-br from-blue-500/20 via-indigo-600/10 to-transparent border border-white/10 overflow-hidden flex-shrink-0 relative flex items-center justify-center group-hover/card:border-blue-400/40 group-hover/card:shadow-[0_0_15px_rgba(96,165,250,0.3)] transition-all duration-300">
                            {'\n'}
                            <div className="w-4 h-4 rounded-full border border-blue-300/60 flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300">
                              {'\n'}
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 shadow-sm"></span>
                              {'\n'}
                            </div>
                            {'\n'}
                          </div>
                          {'\n'}
                          <div className="min-w-0 flex-1">
                            {'\n'}
                            <span className="text-xs font-medium text-white group-hover/card:text-white block truncate">
                              {'动效工作室'}
                            </span>
                            {'\n'}
                            <p className="text-[10px] text-neutral-400 group-hover/card:text-neutral-300 truncate transition-colors">
                              {'风格随选，像素开演'}
                            </p>
                            {'\n'}
                          </div>
                          {'\n'}
                        </div>
                        {'\n'}
                      </div>
                      {'\n'}
                      {'\n'}
                      <div className="w-[280px] flex-shrink-0 flex flex-col gap-2">
                        {'\n'}
                        {'\n'}
                        <div
                          className="rounded-xl p-2.5 flex items-center gap-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out cursor-pointer group/card"
                          role="button"
                          data-stitch-action="unavailable"
                          tabIndex={0}
                          onClick={onClick}
                        >
                          {'\n'}
                          <div className="w-12 h-11 rounded-lg bg-gradient-to-br from-cyan-500/20 via-teal-600/10 to-transparent border border-white/10 overflow-hidden flex-shrink-0 relative flex items-center justify-center group-hover/card:border-cyan-400/40 group-hover/card:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300">
                            {'\n'}
                            <div className="w-4.5 h-4.5 border border-cyan-300/70 border-dashed rounded flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300">
                              {'\n'}
                              <span className="w-1.5 h-1.5 rounded bg-cyan-200 shadow-sm"></span>
                              {'\n'}
                            </div>
                            {'\n'}
                          </div>
                          {'\n'}
                          <div className="min-w-0 flex-1">
                            {'\n'}
                            <span className="text-xs font-medium text-white group-hover/card:text-white block truncate">
                              {'环梦画布'}
                            </span>
                            {'\n'}
                            <p className="text-[10px] text-neutral-400 group-hover/card:text-neutral-300 truncate transition-colors">
                              {'串联灵感，自由创作'}
                            </p>
                            {'\n'}
                          </div>
                          {'\n'}
                        </div>
                        {'\n'}
                        {'\n'}
                        <div
                          className="rounded-xl p-2.5 flex items-center gap-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out cursor-pointer group/card"
                          role="button"
                          data-stitch-action="unavailable"
                          tabIndex={0}
                          onClick={onClick}
                        >
                          {'\n'}
                          <div className="w-12 h-11 rounded-lg bg-gradient-to-br from-purple-500/20 via-violet-600/10 to-transparent border border-white/10 overflow-hidden flex-shrink-0 relative flex items-center justify-center group-hover/card:border-purple-400/40 group-hover/card:shadow-[0_0_15px_rgba(192,132,252,0.3)] transition-all duration-300">
                            {'\n'}
                            <svg
                              className="w-4.5 h-4.5 text-purple-300/90 group-hover/card:scale-110 group-hover/card:text-purple-200 transition-all duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                              ></path>
                            </svg>
                            {'\n'}
                          </div>
                          {'\n'}
                          <div className="min-w-0 flex-1">
                            {'\n'}
                            <span className="text-xs font-medium text-white group-hover/card:text-white block truncate">
                              {'智能编辑'}
                            </span>
                            {'\n'}
                            <p className="text-[10px] text-neutral-400 group-hover/card:text-neutral-300 truncate transition-colors">
                              {'标记画面，精准修改'}
                            </p>
                            {'\n'}
                          </div>
                          {'\n'}
                        </div>
                        {'\n'}
                      </div>
                      {'\n'}
                      {'\n'}
                      <div className="w-[280px] flex-shrink-0 flex flex-col gap-2">
                        {'\n'}
                        {'\n'}
                        <div
                          className="rounded-xl p-2.5 flex items-center gap-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out cursor-pointer group/card"
                          role="button"
                          data-stitch-action="unavailable"
                          tabIndex={0}
                          onClick={onClick}
                        >
                          {'\n'}
                          <div className="w-12 h-11 rounded-lg bg-gradient-to-br from-indigo-500/20 via-sky-600/10 to-transparent border border-white/10 overflow-hidden flex-shrink-0 relative flex items-center justify-center group-hover/card:border-sky-400/40 group-hover/card:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300">
                            {'\n'}
                            <svg
                              className="w-4.5 h-4.5 text-sky-300/90 group-hover/card:scale-110 group-hover/card:text-sky-200 transition-all duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                              ></path>
                            </svg>
                            {'\n'}
                          </div>
                          {'\n'}
                          <div className="min-w-0 flex-1">
                            {'\n'}
                            <span className="text-xs font-medium text-white group-hover/card:text-white block truncate">
                              {'视频局部重拍'}
                            </span>
                            {'\n'}
                            <p className="text-[10px] text-neutral-400 group-hover/card:text-neutral-300 truncate transition-colors">
                              {'重拍动作片段，瑕疵替换'}
                            </p>
                            {'\n'}
                          </div>
                          {'\n'}
                        </div>
                        {'\n'}
                        {'\n'}
                        <div
                          className="rounded-xl p-2.5 flex items-center gap-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out cursor-pointer group/card"
                          role="button"
                          data-stitch-action="unavailable"
                          tabIndex={0}
                          onClick={onClick}
                        >
                          {'\n'}
                          <div className="w-12 h-11 rounded-lg bg-gradient-to-br from-emerald-500/20 via-teal-600/10 to-transparent border border-white/10 overflow-hidden flex-shrink-0 relative flex items-center justify-center group-hover/card:border-emerald-400/40 group-hover/card:shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all duration-300">
                            {'\n'}
                            <svg
                              className="w-4.5 h-4.5 text-emerald-300/90 group-hover/card:scale-110 group-hover/card:text-emerald-200 transition-all duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                              ></path>
                            </svg>
                            {'\n'}
                          </div>
                          {'\n'}
                          <div className="min-w-0 flex-1">
                            {'\n'}
                            <span className="text-xs font-medium text-white group-hover/card:text-white block truncate">
                              {'深度复刻'}
                            </span>
                            {'\n'}
                            <p className="text-[10px] text-neutral-400 group-hover/card:text-neutral-300 truncate transition-colors">
                              {'爆款分镜复刻，批量生产'}
                            </p>
                            {'\n'}
                          </div>
                          {'\n'}
                        </div>
                        {'\n'}
                      </div>
                      {'\n'}
                      {'\n'}
                      <div className="w-[280px] flex-shrink-0 flex flex-col gap-2">
                        {'\n'}
                        <div
                          className="rounded-xl p-2.5 flex items-center gap-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out cursor-pointer group/card"
                          role="button"
                          data-stitch-action="unavailable"
                          tabIndex={0}
                          onClick={onClick}
                        >
                          {'\n'}
                          <div className="w-12 h-11 rounded-lg bg-gradient-to-br from-amber-500/20 via-orange-600/10 to-transparent border border-white/10 overflow-hidden flex-shrink-0 relative flex items-center justify-center group-hover/card:border-amber-400/40 group-hover/card:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300">
                            {'\n'}
                            <svg
                              className="w-5 h-5 text-amber-200/90 group-hover/card:scale-110 group-hover/card:text-amber-300 transition-all duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.6"
                              ></path>
                            </svg>
                            {'\n'}
                          </div>
                          {'\n'}
                          <div className="min-w-0 flex-1">
                            {'\n'}
                            <div className="flex items-center space-x-1.5">
                              {'\n'}
                              <span className="text-xs font-medium text-white group-hover/card:text-white truncate">
                                {'短剧工作室'}
                              </span>
                              {'\n'}
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/10 text-neutral-200 border border-white/10 font-mono scale-95">
                                {'New'}
                              </span>
                              {'\n'}
                            </div>
                            {'\n'}
                            <p className="text-[10px] text-neutral-400 group-hover/card:text-neutral-300 truncate transition-colors">
                              {'短剧全流程创作'}
                            </p>
                            {'\n'}
                          </div>
                          {'\n'}
                        </div>
                        {'\n'}
                        <div
                          className="rounded-xl p-2.5 flex items-center gap-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out cursor-pointer group/card"
                          role="button"
                          data-stitch-action="unavailable"
                          tabIndex={0}
                          onClick={onClick}
                        >
                          {'\n'}
                          <div className="w-12 h-11 rounded-lg bg-gradient-to-br from-blue-500/20 via-indigo-600/10 to-transparent border border-white/10 overflow-hidden flex-shrink-0 relative flex items-center justify-center group-hover/card:border-blue-400/40 group-hover/card:shadow-[0_0_15px_rgba(96,165,250,0.3)] transition-all duration-300">
                            {'\n'}
                            <div className="w-4 h-4 rounded-full border border-blue-300/60 flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300">
                              {'\n'}
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 shadow-sm"></span>
                              {'\n'}
                            </div>
                            {'\n'}
                          </div>
                          {'\n'}
                          <div className="min-w-0 flex-1">
                            {'\n'}
                            <span className="text-xs font-medium text-white group-hover/card:text-white block truncate">
                              {'动效工作室'}
                            </span>
                            {'\n'}
                            <p className="text-[10px] text-neutral-400 group-hover/card:text-neutral-300 truncate transition-colors">
                              {'风格随选，像素开演'}
                            </p>
                            {'\n'}
                          </div>
                          {'\n'}
                        </div>
                        {'\n'}
                      </div>
                      {'\n'}
                      {'\n'}
                      <div className="w-[280px] flex-shrink-0 flex flex-col gap-2">
                        {'\n'}
                        <div
                          className="rounded-xl p-2.5 flex items-center gap-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out cursor-pointer group/card"
                          role="button"
                          data-stitch-action="unavailable"
                          tabIndex={0}
                          onClick={onClick}
                        >
                          {'\n'}
                          <div className="w-12 h-11 rounded-lg bg-gradient-to-br from-cyan-500/20 via-teal-600/10 to-transparent border border-white/10 overflow-hidden flex-shrink-0 relative flex items-center justify-center group-hover/card:border-cyan-400/40 group-hover/card:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300">
                            {'\n'}
                            <div className="w-4.5 h-4.5 border border-cyan-300/70 border-dashed rounded flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300">
                              {'\n'}
                              <span className="w-1.5 h-1.5 rounded bg-cyan-200 shadow-sm"></span>
                              {'\n'}
                            </div>
                            {'\n'}
                          </div>
                          {'\n'}
                          <div className="min-w-0 flex-1">
                            {'\n'}
                            <span className="text-xs font-medium text-white group-hover/card:text-white block truncate">
                              {'环梦画布'}
                            </span>
                            {'\n'}
                            <p className="text-[10px] text-neutral-400 group-hover/card:text-neutral-300 truncate transition-colors">
                              {'串联灵感，自由创作'}
                            </p>
                            {'\n'}
                          </div>
                          {'\n'}
                        </div>
                        {'\n'}
                        <div
                          className="rounded-xl p-2.5 flex items-center gap-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out cursor-pointer group/card"
                          role="button"
                          data-stitch-action="unavailable"
                          tabIndex={0}
                          onClick={onClick}
                        >
                          {'\n'}
                          <div className="w-12 h-11 rounded-lg bg-gradient-to-br from-purple-500/20 via-violet-600/10 to-transparent border border-white/10 overflow-hidden flex-shrink-0 relative flex items-center justify-center group-hover/card:border-purple-400/40 group-hover/card:shadow-[0_0_15px_rgba(192,132,252,0.3)] transition-all duration-300">
                            {'\n'}
                            <svg
                              className="w-4.5 h-4.5 text-purple-300/90 group-hover/card:scale-110 group-hover/card:text-purple-200 transition-all duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                              ></path>
                            </svg>
                            {'\n'}
                          </div>
                          {'\n'}
                          <div className="min-w-0 flex-1">
                            {'\n'}
                            <span className="text-xs font-medium text-white group-hover/card:text-white block truncate">
                              {'智能编辑'}
                            </span>
                            {'\n'}
                            <p className="text-[10px] text-neutral-400 group-hover/card:text-neutral-300 truncate transition-colors">
                              {'标记画面，精准修改'}
                            </p>
                            {'\n'}
                          </div>
                          {'\n'}
                        </div>
                        {'\n'}
                      </div>
                      {'\n'}
                    </div>
                    {'\n'}
                  </div>
                  {'\n'}
                </div>
                {'\n'}
              </section>
              {'\n'}
              {'\n'}
              {'\n'}
              <section
                className="space-y-6 pt-4 relative z-10"
                data-purpose="viral-trending-showcase"
              >
                {' '}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
                  {'\n'}
                  <div className="flex items-center gap-6">
                    {'\n'}
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                      {'灵感'}
                    </h2>
                    {'\n'}
                    <div
                      className="group/search relative flex items-center justify-start rounded-full liquid-glass border border-white/10 hover:border-white/25 focus-within:border-white/30 focus-within:w-64 md:focus-within:w-72 focus-within:px-3 focus-within:bg-white/[0.06] transition-all duration-300 ease-out cursor-pointer w-9 h-9 p-0 overflow-hidden flex-shrink-0 z-20 shadow-sm active:scale-95 focus-within:active:scale-100"
                      id="desktop-inspiration-search-wrapper"
                      role="button"
                      aria-label="搜索灵感作品"
                      data-stitch-action="search"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 text-neutral-400 group-hover/search:text-white transition-colors">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                          ></path>
                        </svg>
                      </div>
                      <input
                        id="desktop-inspiration-search-input"
                        placeholder="搜索灵感、风格、提示词..."
                        type="search"
                        aria-label="搜索灵感作品"
                        ref={searchRef}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        className={
                          query
                            ? 'bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none border-none p-0 w-36 opacity-100 group-focus-within/search:w-full group-focus-within/search:opacity-100 transition-all duration-300 ease-out pl-0 group-focus-within/search:pl-1 pr-2'
                            : 'bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none border-none p-0 w-0 opacity-0 group-focus-within/search:w-full group-focus-within/search:opacity-100 transition-all duration-300 ease-out pl-0 group-focus-within/search:pl-1 pr-2'
                        }
                      />
                    </div>
                    {'\n'}
                  </div>
                  {'\n'}
                  <button
                    className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full liquid-glass border border-white/10 text-xs font-medium text-neutral-300 hover:text-white hover:border-white/25 transition-all duration-300 self-start md:self-auto"
                    type="button"
                    aria-label="全部作品"
                    data-stitch-action="unavailable"
                    onClick={onClick}
                  >
                    {'\n'}
                    <span>{'全部作品'}</span>
                    {'\n'}
                    <svg
                      className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {'\n'}
                      <path
                        d="M9 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      ></path>
                      {'\n'}
                    </svg>
                    {'\n'}
                  </button>
                  {'\n'}
                </div>
                {'\n'}
                {'\n'}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                  {'\n'}
                  {'\n'}
                  <div
                    className="group flex flex-col space-y-2 cursor-pointer"
                    role="button"
                    data-stitch-card=""
                    data-stitch-action="unavailable"
                    tabIndex={0}
                    hidden={
                      !!query.trim() &&
                      !'03:10\n\n\n\n\n\n影\n\n影视造梦师\n\n\n1.2k\n\n\n女生合租的神秘室友\n\n\n复刻'
                        .toLocaleLowerCase()
                        .includes(query.trim().toLocaleLowerCase())
                    }
                    onClick={onClick}
                  >
                    {'\n'}
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 liquid-glass transition-all duration-500 ease-out hover:scale-[1.02] hover:border-white/30 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)]">
                      {'\n'}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(circle at 75% 30%, rgba(142, 168, 255, 0.28) 0%, rgba(20, 24, 38, 0.75) 50%, rgba(11, 13, 18, 0.98) 100%)',
                        }}
                      ></div>
                      {'\n'}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent"></div>
                      {'\n'}
                      {'\n'}
                      <div className="absolute left-3 z-10 bottom-2.5">
                        {'\n'}
                        <span className="font-mono text-[10px] text-white/70 drop-shadow-sm tracking-wider font-normal">
                          {'03:10'}
                        </span>
                        {'\n'}
                      </div>
                      {'\n'}
                      {'\n'}
                      <div className="absolute right-2.5 bottom-2.5 z-10">
                        {'\n'}
                        <div className="flex items-center gap-1.5">
                          {'\n'}
                          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-purple-500/40 to-cyan-400/40 border border-white/30 flex items-center justify-center text-[8px] text-white font-medium flex-shrink-0">
                            {'\n'}
                            <span className="scale-75">{'影'}</span>
                            {'\n'}
                          </div>
                          {'\n'}
                          <span className="text-[10px] text-white/80 font-normal truncate max-w-[90px] drop-shadow-sm">
                            {'影视造梦师'}
                          </span>
                          {'\n'}
                        </div>
                        {'\n'}
                      </div>
                      {'\n'}
                      <div className="absolute right-3 top-2.5 z-10">
                        <button
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full liquid-glass border border-white/10 hover:border-white/30 hover:bg-white/10 text-[10px] text-white/80 hover:text-white transition-all shadow-sm active:scale-95 group/like"
                          type="button"
                          aria-label="1.2k"
                          data-stitch-action="unavailable"
                          onClick={onClick}
                        >
                          <svg
                            className="w-3 h-3 text-white/70 group-hover/like:text-pink-400 group-hover/like:scale-110 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                            ></path>
                          </svg>
                          <span className="font-mono tracking-wider text-[10px]">
                            {'1.2k'}
                          </span>
                        </button>
                      </div>
                    </div>
                    {'\n'}
                    {'\n'}
                    <div className="px-1 flex items-center justify-between gap-2">
                      {'\n'}
                      <h4 className="text-xs font-semibold text-white tracking-tight group-hover:text-neutral-200 transition-colors truncate flex-1">
                        {'女生合租的神秘室友'}
                      </h4>
                      {'\n'}
                      <button
                        className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full liquid-glass border border-white/10 hover:border-white/30 hover:bg-white/10 text-[10px] text-neutral-300 hover:text-white transition-all shadow-sm active:scale-95"
                        type="button"
                        aria-label="复刻"
                        data-stitch-action="unavailable"
                        onClick={onClick}
                      >
                        {'\n'}
                        <svg
                          className="w-3 h-3 text-neutral-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                          ></path>
                        </svg>
                        {'\n'}
                        <span>{'复刻'}</span>
                        {'\n'}
                      </button>
                      {'\n'}
                    </div>
                    {'\n'}
                  </div>
                  {'\n'}
                  {'\n'}
                  <div
                    className="group flex flex-col space-y-2 cursor-pointer"
                    role="button"
                    data-stitch-card=""
                    data-stitch-action="unavailable"
                    tabIndex={0}
                    hidden={
                      !!query.trim() &&
                      !'02:45\n\n\n\n\n\n螺\n\n赛博螺蛳\n\n\n856\n\n\n螺妹妹的馈赠 · 赛博志异\n\n\n复刻'
                        .toLocaleLowerCase()
                        .includes(query.trim().toLocaleLowerCase())
                    }
                    onClick={onClick}
                  >
                    {'\n'}
                    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 liquid-glass transition-all duration-500 ease-out hover:scale-[1.02] hover:border-white/30 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)] h-64 sm:h-72 md:h-80">
                      {'\n'}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(circle at 50% 25%, rgba(208, 188, 255, 0.3) 0%, rgba(30, 22, 48, 0.75) 50%, rgba(11, 13, 18, 0.98) 100%)',
                        }}
                      ></div>
                      {'\n'}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent"></div>
                      {'\n'}
                      {'\n'}
                      <div className="absolute left-3 z-10 bottom-2.5">
                        {'\n'}
                        <span className="font-mono text-[10px] text-white/70 drop-shadow-sm tracking-wider font-normal">
                          {'02:45'}
                        </span>
                        {'\n'}
                      </div>
                      {'\n'}
                      {'\n'}
                      <div className="absolute right-2.5 bottom-2.5 z-10">
                        {'\n'}
                        <div className="flex items-center gap-1.5">
                          {'\n'}
                          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-purple-500/40 to-pink-500/40 border border-white/30 flex items-center justify-center text-[8px] text-white font-medium flex-shrink-0">
                            {'\n'}
                            <span className="scale-75">{'螺'}</span>
                            {'\n'}
                          </div>
                          {'\n'}
                          <span className="text-[10px] text-white/80 font-normal truncate max-w-[90px] drop-shadow-sm">
                            {'赛博螺蛳'}
                          </span>
                          {'\n'}
                        </div>
                        {'\n'}
                      </div>
                      {'\n'}
                      <div className="absolute right-3 top-2.5 z-10">
                        <button
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full liquid-glass border border-white/10 hover:border-white/30 hover:bg-white/10 text-[10px] text-white/80 hover:text-white transition-all shadow-sm active:scale-95 group/like"
                          type="button"
                          aria-label="856"
                          data-stitch-action="unavailable"
                          onClick={onClick}
                        >
                          <svg
                            className="w-3 h-3 text-white/70 group-hover/like:text-pink-400 group-hover/like:scale-110 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                            ></path>
                          </svg>
                          <span className="font-mono tracking-wider text-[10px]">
                            {'856'}
                          </span>
                        </button>
                      </div>
                    </div>
                    {'\n'}
                    {'\n'}
                    <div className="px-1 flex items-center justify-between gap-2">
                      {'\n'}
                      <h4 className="text-xs font-semibold text-white tracking-tight group-hover:text-neutral-200 transition-colors truncate flex-1">
                        {'螺妹妹的馈赠 · 赛博志异'}
                      </h4>
                      {'\n'}
                      <button
                        className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full liquid-glass border border-white/10 hover:border-white/30 hover:bg-white/10 text-[10px] text-neutral-300 hover:text-white transition-all shadow-sm active:scale-95"
                        type="button"
                        aria-label="复刻"
                        data-stitch-action="unavailable"
                        onClick={onClick}
                      >
                        {'\n'}
                        <svg
                          className="w-3 h-3 text-neutral-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                          ></path>
                        </svg>
                        {'\n'}
                        <span>{'复刻'}</span>
                        {'\n'}
                      </button>
                      {'\n'}
                    </div>
                    {'\n'}
                  </div>
                  {'\n'}
                  {'\n'}
                  <div
                    className="group flex flex-col space-y-2 cursor-pointer"
                    role="button"
                    data-stitch-card=""
                    data-stitch-action="unavailable"
                    tabIndex={0}
                    hidden={
                      !!query.trim() &&
                      !'00:48\n\n\n\n\n\n呱\n\n呱呱工作室\n\n\n3.4k\n\n\n呱呱和辣条的奇妙冒险\n\n\n复刻'
                        .toLocaleLowerCase()
                        .includes(query.trim().toLocaleLowerCase())
                    }
                    onClick={onClick}
                  >
                    {'\n'}
                    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 liquid-glass transition-all duration-500 ease-out hover:scale-[1.02] hover:border-white/30 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)] h-64 sm:h-72 md:h-80">
                      {'\n'}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(circle at 50% 30%, rgba(76, 215, 246, 0.3) 0%, rgba(18, 38, 48, 0.75) 50%, rgba(11, 13, 18, 0.98) 100%)',
                        }}
                      ></div>
                      {'\n'}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent"></div>
                      {'\n'}
                      {'\n'}
                      <div className="absolute left-3 z-10 bottom-2.5">
                        {'\n'}
                        <span className="font-mono text-[10px] text-white/70 drop-shadow-sm tracking-wider font-normal">
                          {'00:48'}
                        </span>
                        {'\n'}
                      </div>
                      {'\n'}
                      {'\n'}
                      <div className="absolute right-2.5 bottom-2.5 z-10">
                        {'\n'}
                        <div className="flex items-center gap-1.5">
                          {'\n'}
                          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-cyan-400/40 to-blue-500/40 border border-white/30 flex items-center justify-center text-[8px] text-white font-medium flex-shrink-0">
                            {'\n'}
                            <span className="scale-75">{'呱'}</span>
                            {'\n'}
                          </div>
                          {'\n'}
                          <span className="text-[10px] text-white/80 font-normal truncate max-w-[90px] drop-shadow-sm">
                            {'呱呱工作室'}
                          </span>
                          {'\n'}
                        </div>
                        {'\n'}
                      </div>
                      {'\n'}
                      <div className="absolute right-3 top-2.5 z-10">
                        <button
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full liquid-glass border border-white/10 hover:border-white/30 hover:bg-white/10 text-[10px] text-white/80 hover:text-white transition-all shadow-sm active:scale-95 group/like"
                          type="button"
                          aria-label="3.4k"
                          data-stitch-action="unavailable"
                          onClick={onClick}
                        >
                          <svg
                            className="w-3 h-3 text-white/70 group-hover/like:text-pink-400 group-hover/like:scale-110 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                            ></path>
                          </svg>
                          <span className="font-mono tracking-wider text-[10px]">
                            {'3.4k'}
                          </span>
                        </button>
                      </div>
                    </div>
                    {'\n'}
                    {'\n'}
                    <div className="px-1 flex items-center justify-between gap-2">
                      {'\n'}
                      <h4 className="text-xs font-semibold text-white tracking-tight group-hover:text-neutral-200 transition-colors truncate flex-1">
                        {'呱呱和辣条的奇妙冒险'}
                      </h4>
                      {'\n'}
                      <button
                        className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full liquid-glass border border-white/10 hover:border-white/30 hover:bg-white/10 text-[10px] text-neutral-300 hover:text-white transition-all shadow-sm active:scale-95"
                        type="button"
                        aria-label="复刻"
                        data-stitch-action="unavailable"
                        onClick={onClick}
                      >
                        {'\n'}
                        <svg
                          className="w-3 h-3 text-neutral-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                          ></path>
                        </svg>
                        {'\n'}
                        <span>{'复刻'}</span>
                        {'\n'}
                      </button>
                      {'\n'}
                    </div>
                    {'\n'}
                  </div>
                  {'\n'}
                  {'\n'}
                  <div
                    className="group flex flex-col space-y-2 cursor-pointer"
                    role="button"
                    data-stitch-card=""
                    data-stitch-action="unavailable"
                    tabIndex={0}
                    hidden={
                      !!query.trim() &&
                      !'01:58\n\n\n\n\n\n心\n\n心声绘梦\n\n\n2.1k\n\n\n听见你的心声 · 日漫风纯爱\n\n\n复刻'
                        .toLocaleLowerCase()
                        .includes(query.trim().toLocaleLowerCase())
                    }
                    onClick={onClick}
                  >
                    {'\n'}
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 liquid-glass transition-all duration-500 ease-out hover:scale-[1.02] hover:border-white/30 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)]">
                      {'\n'}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(circle at 60% 20%, rgba(255, 176, 205, 0.28) 0%, rgba(45, 20, 36, 0.75) 50%, rgba(11, 13, 18, 0.98) 100%)',
                        }}
                      ></div>
                      {'\n'}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent"></div>
                      {'\n'}
                      {'\n'}
                      <div className="absolute left-3 z-10 bottom-2.5">
                        {'\n'}
                        <span className="font-mono text-[10px] text-white/70 drop-shadow-sm tracking-wider font-normal">
                          {'01:58'}
                        </span>
                        {'\n'}
                      </div>
                      {'\n'}
                      {'\n'}
                      <div className="absolute right-2.5 bottom-2.5 z-10">
                        {'\n'}
                        <div className="flex items-center gap-1.5">
                          {'\n'}
                          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-pink-400/40 to-purple-500/40 border border-white/30 flex items-center justify-center text-[8px] text-white font-medium flex-shrink-0">
                            {'\n'}
                            <span className="scale-75">{'心'}</span>
                            {'\n'}
                          </div>
                          {'\n'}
                          <span className="text-[10px] text-white/80 font-normal truncate max-w-[90px] drop-shadow-sm">
                            {'心声绘梦'}
                          </span>
                          {'\n'}
                        </div>
                        {'\n'}
                      </div>
                      {'\n'}
                      <div className="absolute right-3 top-2.5 z-10">
                        <button
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full liquid-glass border border-white/10 hover:border-white/30 hover:bg-white/10 text-[10px] text-white/80 hover:text-white transition-all shadow-sm active:scale-95 group/like"
                          type="button"
                          aria-label="2.1k"
                          data-stitch-action="unavailable"
                          onClick={onClick}
                        >
                          <svg
                            className="w-3 h-3 text-white/70 group-hover/like:text-pink-400 group-hover/like:scale-110 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                            ></path>
                          </svg>
                          <span className="font-mono tracking-wider text-[10px]">
                            {'2.1k'}
                          </span>
                        </button>
                      </div>
                    </div>
                    {'\n'}
                    {'\n'}
                    <div className="px-1 flex items-center justify-between gap-2">
                      {'\n'}
                      <h4 className="text-xs font-semibold text-white tracking-tight group-hover:text-neutral-200 transition-colors truncate flex-1">
                        {'听见你的心声 · 日漫风纯爱'}
                      </h4>
                      {'\n'}
                      <button
                        className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full liquid-glass border border-white/10 hover:border-white/30 hover:bg-white/10 text-[10px] text-neutral-300 hover:text-white transition-all shadow-sm active:scale-95"
                        type="button"
                        aria-label="复刻"
                        data-stitch-action="unavailable"
                        onClick={onClick}
                      >
                        {'\n'}
                        <svg
                          className="w-3 h-3 text-neutral-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                          ></path>
                        </svg>
                        {'\n'}
                        <span>{'复刻'}</span>
                        {'\n'}
                      </button>
                      {'\n'}
                    </div>
                    {'\n'}
                  </div>
                  {'\n'}
                </div>
              </section>
              {'\n'}
              {'\n'}
            </div>
            {'\n'}
          </main>
        </div>
        {'\n'}
        {'\n'}
      </div>
      {'\n'}
      {'\n'}
      {'\n'}
      <aside
        data-purpose="floating-bottom-dock"
        id="desktop-floating-dock"
        className={
          'fixed bottom-6 z-40 right-4 left-4 md:left-72 max-w-2xl mx-auto pointer-events-none' +
          (floating ? ' visible' : '')
        }
      >
        {'\n'}
        <div className="liquid-glass-elevated rounded-full p-2 pl-4 pr-2 border flex items-center justify-between gap-3 pointer-events-auto">
          {'\n'}
          <span className="text-neutral-400 flex-shrink-0">
            {'\n'}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M13 10V3L4 14h7v7l9-11h-7z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            {'\n'}
          </span>
          {'\n'}
          <input
            className="bg-transparent text-xs text-white placeholder-neutral-400 focus:outline-none flex-1 border-none"
            id="desktop-dock-prompt-input"
            placeholder="随时输入灵感... 或点击回到主输入框"
            type="text"
            aria-label="创作想法"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onFocus={() => {
              rootRef.current
                ?.querySelector('main')
                ?.scrollTo({ top: 0, behavior: 'smooth' });
              triggerRef.current?.click();
            }}
          />
          {'\n'}
          <span className="hidden sm:inline-block text-[10px] liquid-glass text-neutral-300 px-2 py-0.5 rounded-full border">
            {'\n      Seedance 2.5\n    '}
          </span>
          {'\n'}
          <div className="flex items-center space-x-1.5">
            {'\n'}
            <button
              className="w-8 h-8 rounded-full liquid-glass hover:bg-white/10 flex items-center justify-center text-white text-xs transition-colors"
              id="desktop-dock-expand-btn"
              title="展开至主控制台"
              type="button"
              aria-label="展开至主控制台"
              data-stitch-action="open-prompt"
              onClick={onClick}
            >
              {'\n'}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
              {'\n'}
            </button>
            {'\n'}
            <button
              className="w-8 h-8 rounded-full bg-white text-neutral-950 flex items-center justify-center font-bold transition-all shadow-md active:scale-95"
              id="desktop-dock-submit-btn"
              title="快速生成"
              type="button"
              aria-label="快速生成"
              data-stitch-action="unavailable"
              onClick={onClick}
            >
              {'\n'}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                ></path>
              </svg>
              {'\n'}
            </button>
            {'\n'}
          </div>
          {'\n'}
        </div>
        {'\n'}
      </aside>
      {'\n'}
      {'\n'}
      {'\n'}
      <dialog
        className="bg-transparent p-0 m-0 w-full h-full max-w-none max-h-none backdrop:bg-black/80 backdrop:backdrop-blur-sm z-50"
        id="desktop-settings-modal"
        aria-label="创作平台偏好设置"
        ref={settingsRef}
        onCancel={(event) => {
          event.preventDefault();
          setSettings(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSettings(false);
        }}
      >
        {'\n'}
        <div className="min-h-full flex items-center justify-center p-4">
          {'\n'}
          <div className="liquid-glass-elevated w-full max-w-lg rounded-2xl p-6 border text-white shadow-2xl relative">
            {'\n'}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              {'\n'}
              <div className="flex items-center space-x-2.5">
                {'\n'}
                <div className="w-7 h-7 rounded-lg liquid-glass flex items-center justify-center text-white">
                  {'\n'}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  {'\n'}
                </div>
                {'\n'}
                <h3 className="font-semibold text-sm">{'创作平台偏好设置'}</h3>
                {'\n'}
              </div>
              {'\n'}
              <button
                className="p-1 rounded-lg text-neutral-400 hover:text-white transition-colors"
                id="desktop-close-settings-btn"
                type="button"
                aria-label="关闭设置"
                data-stitch-action="close-settings"
                onClick={onClick}
              >
                {'\n'}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                {'\n'}
              </button>
              {'\n'}
            </div>
            {'\n'}
            <div className="py-4 space-y-4 text-xs">
              {'\n'}
              <div className="space-y-1.5">
                {'\n'}
                <label className="font-medium text-neutral-300">
                  {'默认主干推理引擎'}
                </label>
                {'\n'}
                <select
                  className="w-full liquid-glass border rounded-xl px-3 py-2 text-white text-xs focus:ring-0"
                  aria-label="默认主干推理引擎"
                >
                  {'\n'}
                  <option>{'Seedance 2.5 Cinema Engine (建议配置)'}</option>
                  {'\n'}
                  <option>{'SD 2.5 极致秒批加速卡'}</option>
                  {'\n'}
                  <option>{'OneiroCycle Fast Render v3'}</option>
                  {'\n'}
                </select>
                {'\n'}
              </div>
              {'\n'}
              <div className="space-y-1.5">
                {'\n'}
                <label className="font-medium text-neutral-300">
                  {'默认画质分辨率'}
                </label>
                {'\n'}
                <div className="grid grid-cols-3 gap-2">
                  {'\n'}
                  <button
                    className="px-3 py-2 rounded-xl bg-white/15 text-white border border-white/20 text-center font-medium"
                    type="button"
                    data-value="1080P 高清"
                    aria-label="1080P 高清"
                    data-stitch-action="resolution"
                    aria-pressed={resolution === '1080P 高清'}
                    onClick={onClick}
                  >
                    {'1080P 高清'}
                  </button>
                  {'\n'}
                  <button
                    className="px-3 py-2 rounded-xl liquid-glass text-neutral-400 border text-center hover:text-white"
                    type="button"
                    data-value="2K 超清"
                    aria-label="2K 超清"
                    data-stitch-action="resolution"
                    aria-pressed={resolution === '2K 超清'}
                    onClick={onClick}
                  >
                    {'2K 超清'}
                  </button>
                  {'\n'}
                  <button
                    className="px-3 py-2 rounded-xl liquid-glass text-neutral-400 border text-center hover:text-white"
                    type="button"
                    data-value="4K 影院级"
                    aria-label="4K 影院级"
                    data-stitch-action="resolution"
                    aria-pressed={resolution === '4K 影院级'}
                    onClick={onClick}
                  >
                    {'4K 影院级'}
                  </button>
                  {'\n'}
                </div>
                {'\n'}
              </div>
              {'\n'}
              <div className="flex items-center justify-between pt-2">
                {'\n'}
                <div>
                  {'\n'}
                  <p className="font-medium text-neutral-200">
                    {'启用快捷指令 (/) 与 Agent 唤醒 (@)'}
                  </p>
                  {'\n'}
                  <p className="text-[11px] text-neutral-500">
                    {'在输入框中快速调用预设分镜技能'}
                  </p>
                  {'\n'}
                </div>
                {'\n'}
                <input
                  defaultChecked
                  className="rounded border-white/20 text-neutral-800 focus:ring-0 w-4 h-4 bg-neutral-900"
                  type="checkbox"
                  aria-label="偏好开关"
                />
                {'\n'}
              </div>
              {'\n'}
              <div className="flex items-center justify-between pt-1">
                {'\n'}
                <div>
                  {'\n'}
                  <p className="font-medium text-neutral-200">
                    {'GPU WebGL 无限画布硬件加速'}
                  </p>
                  {'\n'}
                  <p className="text-[11px] text-neutral-500">
                    {'提高多图层节点拖拽流畅度与实时预览帧率'}
                  </p>
                  {'\n'}
                </div>
                {'\n'}
                <input
                  defaultChecked
                  className="rounded border-white/20 text-neutral-800 focus:ring-0 w-4 h-4 bg-neutral-900"
                  type="checkbox"
                  aria-label="偏好开关"
                />
                {'\n'}
              </div>
              {'\n'}
            </div>
            {'\n'}
            <div className="pt-3 border-t border-white/10 flex justify-end space-x-2">
              {'\n'}
              <button
                className="px-4 py-1.5 rounded-xl liquid-glass text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                id="desktop-cancel-settings-btn"
                type="button"
                aria-label="取消"
                data-stitch-action="close-settings"
                onClick={onClick}
              >
                {'取消'}
              </button>
              {'\n'}
              <button
                className="px-4 py-1.5 rounded-xl bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200 transition-colors"
                id="desktop-save-settings-btn"
                type="button"
                aria-label="保存偏好"
                data-stitch-action="save-settings"
                onClick={onClick}
              >
                {'保存偏好'}
              </button>
              {'\n'}
            </div>
            {'\n'}
          </div>
          {'\n'}
        </div>
        {'\n'}
      </dialog>
      {'\n'}
      {'\n'}
      {'\n'}
      {'\n'}
      {'\n'}
      {'\n'}
      {'\n\n\n'}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-auto select-none"
        data-purpose="floating-help-desk"
      >
        <div className="relative group flex items-center justify-end">
          <div className="pointer-events-none absolute right-14 px-2.5 py-1 rounded-lg liquid-glass text-white text-[11px] font-medium tracking-wide border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50">
            <span className="flex items-center gap-1">
              {'在线客服'}
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
            </span>
          </div>
          <button
            className="w-11 h-11 rounded-full liquid-glass-elevated border border-white/10 hover:border-white/30 text-white/80 hover:text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group-hover:shadow-[0_0_20px_rgba(142,168,255,0.25)] relative overflow-hidden"
            title="在线客服"
            type="button"
            aria-label="在线客服"
            data-stitch-action="unavailable"
            onClick={onClick}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <svg
              className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="relative group flex items-center justify-end">
          <div className="pointer-events-none absolute right-14 px-2.5 py-1 rounded-lg liquid-glass text-white text-[11px] font-medium tracking-wide border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50">
            <span className="flex items-center gap-1">{'帮助中心'}</span>
          </div>
          <button
            className="w-11 h-11 rounded-full liquid-glass-elevated border border-white/10 hover:border-white/30 text-white/80 hover:text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group-hover:shadow-[0_0_20px_rgba(76,215,246,0.25)] relative overflow-hidden"
            title="帮助中心"
            type="button"
            aria-label="帮助中心"
            data-stitch-action="unavailable"
            onClick={onClick}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <svg
              className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {'\n\n\n\n\n\n\n\n\n\n'}
      <SourceNotice message={notice} onDismiss={dismissNotice} />
    </div>
  );
}
