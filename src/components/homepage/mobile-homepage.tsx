'use client';

import Image from 'next/image';
import { useStitchHomepage } from './use-stitch-homepage';
import { SourceNotice } from './homepage-primitives';

export function MobileHomepage() {
  const {
    dismissMenus,
    dismissNotice,
    light,
    notice,
    onClick,
    onKeyDown,
    open,
    panelRef,
    promotion,
    prompt,
    promptRef,
    query,
    rootRef,
    searchOpen,
    searchRef,
    setPrompt,
    setQuery,
    triggerRef,
  } = useStitchHomepage('mobile');
  return (
    <div
      ref={rootRef}
      onClick={dismissMenus}
      onKeyDown={onKeyDown}
      className={
        'stitch-mobile bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col relative selection:bg-primary-container selection:text-on-primary-container' +
        (light ? ' light-theme' : '')
      }
    >
      {'\n'}
      <header
        className="fixed top-0 inset-x-0 z-50 bg-surface/75 backdrop-blur-2xl pt-safe shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
        style={{
          background: 'rgba(11, 12, 16, 0.75)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
        }}
        inert={open}
      >
        <div className="h-16 px-gutter flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-surface-container-high flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10">
              <div className="w-full h-full bg-surface-container-lowest flex items-center justify-center p-0.5">
                <Image
                  alt="OneiroCycle Logo"
                  className="w-full h-full object-contain"
                  src="/media/stitch/ba73406027bb1bd3.png"
                  width={64}
                  height={64}
                  unoptimized={true}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-headline-sm text-[17px] text-on-surface tracking-tight font-semibold leading-none">
                {'OneiroCycle'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="在线客服"
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 transition-colors relative active:scale-95"
              type="button"
              data-stitch-action="unavailable"
              onClick={onClick}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                aria-hidden="true"
              >
                {'support_agent'}
              </span>
            </button>
            <button
              aria-label="消息通知"
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 transition-colors relative active:scale-95"
              type="button"
              data-stitch-action="unavailable"
              onClick={onClick}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                aria-hidden="true"
              >
                {'notifications'}
              </span>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_#4cd7f6]"></span>
            </button>
            <div
              className="flex items-center gap-1 h-8 px-2.5 py-0.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] border border-white/10 cursor-pointer active:scale-95 transition-transform"
              role="button"
              data-stitch-action="unavailable"
              tabIndex={0}
              onClick={onClick}
            >
              <span
                className="material-symbols-outlined text-[14px] text-amber-400"
                style={{ color: 'rgb(250, 204, 21)' }}
                aria-hidden="true"
              >
                {'electric_bolt'}
              </span>
              <span className="font-label-sm text-[12px] text-on-surface font-semibold tracking-wide font-medium">
                {'1,280'}
              </span>
            </div>
          </div>
        </div>
      </header>
      <main
        className="flex-1 w-full bg-surface pt-16 pb-28 min-h-screen pb-36"
        inert={open}
      >
        <div className="flex flex-col w-full pb-10 select-none">
          {'\n'}
          {'\n'}
          <div
            className="w-full px-gutter-sm pt-space-xs transition-all duration-300"
            id="mobile-promo-banner"
            hidden={!promotion}
          >
            {'\n'}
            <div className="w-full rounded-full bg-surface-container/70 backdrop-blur-md px-space-md py-1.5 flex items-center justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
              {'\n'}
              <div className="flex items-center gap-space-xs min-w-0">
                {'\n'}
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shrink-0"></span>
                {'\n'}
                <span className="font-label-sm text-label-sm text-secondary tracking-tight shrink-0 font-medium">
                  {'限时福利'}
                </span>
                {'\n'}
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {'Seedance 4.0 超清模型限免体验中'}
                </span>
                {'\n'}
              </div>
              {'\n'}
              <div className="flex items-center gap-space-xs shrink-0">
                {'\n'}
                <button
                  className="px-space-sm py-0.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-label-sm text-label-sm active:scale-95 transition-transform border border-white/10"
                  type="button"
                  aria-label="立即试用"
                  data-stitch-action="unavailable"
                  onClick={onClick}
                >
                  {'立即试用'}
                </button>
                {'\n'}
                <button
                  className="w-5 h-5 rounded-full flex items-center justify-center text-outline hover:text-on-surface"
                  type="button"
                  aria-label="close"
                  data-stitch-action="close-promo"
                  onClick={onClick}
                >
                  {'\n'}
                  <span
                    className="material-symbols-outlined text-[14px]"
                    aria-hidden="true"
                    data-stitch-action="close-promo"
                    onClick={onClick}
                  >
                    {'close'}
                  </span>
                  {'\n'}
                </button>
                {'\n'}
              </div>
              {'\n'}
            </div>
            {'\n'}
          </div>
          {'\n'}
          {'\n'}
          <section className="px-gutter pt-space-sm">
            <div
              className="relative w-full rounded-DEFAULT overflow-hidden bg-surface-container-high/60 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] group"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(24px)',
              }}
            >
              <div className="relative w-full aspect-[21/9] sm:aspect-[2.4/1] overflow-hidden flex flex-col justify-between p-space-md">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage:
                      "url('/media/stitch/fec77d0ed8115337.jpg')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-surface-container-lowest/40 pointer-events-none"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-bright/80 backdrop-blur-md text-on-surface font-label-sm text-[10px] tracking-wider uppercase font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10">
                    {'FEATURED'}
                  </span>
                </div>
                <div className="relative z-10 flex items-end justify-between gap-space-sm pt-2">
                  <div className="min-w-0 flex flex-col gap-1">
                    <h3 className="font-headline-sm text-[18px] text-on-surface font-semibold tracking-tight leading-tight">
                      {'环梦片场上线'}
                    </h3>
                    <p className="font-body-sm text-[12px] text-on-surface-variant truncate leading-none">
                      {'下一代多模态电影级虚幻生成工作室'}
                    </p>
                  </div>
                  <button
                    className="px-3.5 py-1.5 rounded-full bg-white text-surface font-label-sm text-[12px] font-semibold active:scale-95 transition-transform shadow-[0_4px_16px_rgba(255,255,255,0.2)] shrink-0"
                    style={{
                      background: 'rgb(255, 255, 255)',
                      color: 'rgb(11, 12, 16)',
                    }}
                    type="button"
                    aria-label="进入片场"
                    data-stitch-action="unavailable"
                    onClick={onClick}
                  >
                    {'进入片场'}
                  </button>
                </div>
              </div>
              <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none z-10">
                <span className="w-4 h-1 rounded-full bg-on-surface transition-all"></span>
                <span className="w-1.5 h-1 rounded-full bg-on-surface/30"></span>
                <span className="w-1.5 h-1 rounded-full bg-on-surface/30"></span>
              </div>
            </div>
          </section>
          {'\n'}
          {'\n'}
          <section
            className="pt-space-md pb-space-xs overflow-hidden"
            data-stitch-features=""
          >
            <div className="px-gutter flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-[16px] text-on-surface font-semibold tracking-tight">
                  {'功能探索'}
                </span>
              </div>
              <div className="flex items-center text-on-surface-variant font-label-sm text-[12px]">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary/80 animate-pulse mr-1.5"></span>
                {'全部'}
              </div>
            </div>
            <div className="w-full flex flex-col gap-2.5 overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none"></div>
              <div className="w-full overflow-hidden">
                <div className="animate-marquee-left gap-2 px-2">
                  <div className="flex items-center gap-2 shrink-0">
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-on-surface"
                          aria-hidden="true"
                        >
                          {'psychology'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1.5">
                          <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                            {'智能编导'}
                          </span>
                          <span className="px-1 py-0.2 rounded bg-surface-bright/80 text-on-surface font-label-sm text-[9px] uppercase font-bold leading-tight">
                            {'NEW'}
                          </span>
                        </div>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'剧本与分镜智导'}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-secondary"
                          aria-hidden="true"
                        >
                          {'storefront'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                          {'电商画布工作流'}
                        </span>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'商业模特与商品图'}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-tertiary"
                          aria-hidden="true"
                        >
                          {'movie_filter'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1.5">
                          <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                            {'短剧工作室'}
                          </span>
                          <span className="px-1 py-0.2 rounded bg-secondary-container/30 text-secondary font-label-sm text-[9px] uppercase font-bold leading-tight">
                            {'HOT'}
                          </span>
                        </div>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'8K超清连续剧目'}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-on-surface-variant"
                          aria-hidden="true"
                        >
                          {'slow_motion_video'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                          {'动效工作室'}
                        </span>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'物理仿真与运镜'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    aria-hidden="true"
                    className="flex items-center gap-2 shrink-0"
                  >
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-on-surface"
                          aria-hidden="true"
                        >
                          {'psychology'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1.5">
                          <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                            {'智能编导'}
                          </span>
                          <span className="px-1 py-0.2 rounded bg-surface-bright/80 text-on-surface font-label-sm text-[9px] uppercase font-bold leading-tight">
                            {'NEW'}
                          </span>
                        </div>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'剧本与分镜智导'}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-secondary"
                          aria-hidden="true"
                        >
                          {'storefront'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                          {'电商画布工作流'}
                        </span>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'商业模特与商品图'}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-tertiary"
                          aria-hidden="true"
                        >
                          {'movie_filter'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1.5">
                          <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                            {'短剧工作室'}
                          </span>
                          <span className="px-1 py-0.2 rounded bg-secondary-container/30 text-secondary font-label-sm text-[9px] uppercase font-bold leading-tight">
                            {'HOT'}
                          </span>
                        </div>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'8K超清连续剧目'}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-on-surface-variant"
                          aria-hidden="true"
                        >
                          {'slow_motion_video'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                          {'动效工作室'}
                        </span>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'物理仿真与运镜'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full overflow-hidden">
                <div className="animate-marquee-right gap-2 px-2">
                  <div className="flex items-center gap-2 shrink-0">
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-secondary"
                          aria-hidden="true"
                        >
                          {'hub'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1.5">
                          <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                            {'环梦画布'}
                          </span>
                          <span className="px-1 py-0.2 rounded bg-surface-bright/80 text-on-surface-variant font-label-sm text-[9px] uppercase font-bold leading-tight">
                            {'CANVAS'}
                          </span>
                        </div>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'节点自由生图'}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-on-surface"
                          aria-hidden="true"
                        >
                          {'auto_fix_high'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                          {'智能编辑'}
                        </span>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'AI智能音频对齐'}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-tertiary"
                          aria-hidden="true"
                        >
                          {'theater_comedy'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                          {'爆笑短剧'}
                        </span>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'爆款网感模版'}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-secondary-fixed-dim"
                          aria-hidden="true"
                        >
                          {'history_edu'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1.5">
                          <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                            {'故事剧本'}
                          </span>
                          <span className="px-1 py-0.2 rounded bg-white/10 text-white font-label-sm text-[9px] uppercase font-bold leading-tight">
                            {'PRO'}
                          </span>
                        </div>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'情节自洽长篇构建'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    aria-hidden="true"
                    className="flex items-center gap-2 shrink-0"
                  >
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-secondary"
                          aria-hidden="true"
                        >
                          {'hub'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1.5">
                          <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                            {'环梦画布'}
                          </span>
                          <span className="px-1 py-0.2 rounded bg-surface-bright/80 text-on-surface-variant font-label-sm text-[9px] uppercase font-bold leading-tight">
                            {'CANVAS'}
                          </span>
                        </div>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'节点自由生图'}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-on-surface"
                          aria-hidden="true"
                        >
                          {'auto_fix_high'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                          {'智能编辑'}
                        </span>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'AI智能音频对齐'}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-tertiary"
                          aria-hidden="true"
                        >
                          {'theater_comedy'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                          {'爆笑短剧'}
                        </span>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'爆款网感模版'}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-all cursor-pointer"
                      role="button"
                      data-stitch-action="unavailable"
                      tabIndex={0}
                      onClick={onClick}
                    >
                      <div className="w-7 h-7 rounded bg-surface-container-high/80 border border-white/10 flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-[16px] text-secondary-fixed-dim"
                          aria-hidden="true"
                        >
                          {'history_edu'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1.5">
                          <span className="font-body-sm text-[12px] text-on-surface font-medium leading-none">
                            {'故事剧本'}
                          </span>
                          <span className="px-1 py-0.2 rounded bg-white/10 text-white font-label-sm text-[9px] uppercase font-bold leading-tight">
                            {'PRO'}
                          </span>
                        </div>
                        <span className="font-label-sm text-[10px] text-outline mt-1 leading-none">
                          {'情节自洽长篇构建'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {'\n'}
          {'\n'}
          <section className="px-gutter flex flex-col pt-space-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-[18px] font-bold text-on-surface tracking-tight leading-none">
                  {'灵感'}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <div
                  id="mobile-inspiration-search-container"
                  className={
                    'relative flex items-center h-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
                    (searchOpen ? ' w-40' : ' w-8')
                  }
                >
                  <button
                    className="h-8 w-8 rounded-full bg-surface-container-high/60 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
                    id="mobile-inspiration-search-btn"
                    type="button"
                    aria-label="搜索灵感作品"
                    data-stitch-action="search"
                    hidden={searchOpen}
                    onClick={onClick}
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      aria-hidden="true"
                    >
                      {'search'}
                    </span>
                  </button>
                  <div
                    className="flex items-center gap-1.5 px-2.5 h-8 rounded-full bg-surface-container-high/80 backdrop-blur-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    id="mobile-inspiration-search-bar"
                    hidden={!searchOpen}
                  >
                    <span
                      className="material-symbols-outlined text-[16px] text-secondary shrink-0 leading-none"
                      aria-hidden="true"
                    >
                      {'search'}
                    </span>
                    <input
                      className="w-24 bg-transparent text-on-surface font-body-sm text-[12px] placeholder:text-outline focus:outline-none border-none p-0 leading-none h-full"
                      id="mobile-inspiration-search-input"
                      placeholder="搜索作品/创作者..."
                      type="search"
                      aria-label="搜索灵感作品"
                      ref={searchRef}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <button
                      className="w-5 h-5 rounded-full flex items-center justify-center text-outline hover:text-on-surface active:scale-90 transition-transform shrink-0"
                      id="mobile-inspiration-search-close"
                      type="button"
                      aria-label="关闭搜索"
                      data-stitch-action="close-search"
                      onClick={onClick}
                    >
                      <span
                        className="material-symbols-outlined text-[14px] leading-none"
                        aria-hidden="true"
                      >
                        {'close'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3 w-full items-start">
                <div className="flex flex-col gap-3 w-full">
                  <div
                    className="w-full flex flex-col group rounded-DEFAULT overflow-hidden bg-surface-container-high/40 border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all"
                    data-stitch-card=""
                    hidden={
                      !!query.trim() &&
                      !'favorite3.4kplay_arrow03:10NNeo雨夜霓虹漫步实录copy_all复刻'
                        .toLocaleLowerCase()
                        .includes(query.trim().toLocaleLowerCase())
                    }
                  >
                    <div className="relative w-full aspect-[3/4] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage:
                            "url('/media/stitch/b5e896587700d1b5.jpg')",
                        }}
                      ></div>
                      <div className="absolute top-2 right-2 z-10">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-lowest/70 backdrop-blur-md text-on-surface shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10">
                          <span
                            className="material-symbols-outlined text-[11px] text-tertiary"
                            aria-hidden="true"
                          >
                            {'favorite'}
                          </span>
                          <span className="font-label-sm text-[10px] font-medium">
                            {'3.4k'}
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/30 to-transparent flex items-end justify-between px-2 pb-1.5 z-10">
                        <div className="flex items-center gap-0.5 text-on-surface font-label-sm text-[10px] tracking-wider">
                          <span
                            className="material-symbols-outlined text-[12px] text-secondary"
                            aria-hidden="true"
                          >
                            {'play_arrow'}
                          </span>
                          <span>{'03:10'}</span>
                        </div>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-surface-container-high/70 backdrop-blur-md border border-white/5">
                          <div className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center text-[9px] text-white font-bold">
                            {'N'}
                          </div>
                          <span className="font-body-sm text-[10px] text-on-surface truncate max-w-[56px]">
                            {'Neo'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <h4 className="font-body-md text-[12px] text-on-surface font-medium truncate pr-1 leading-snug">
                        {'雨夜霓虹漫步实录'}
                      </h4>
                      <button
                        className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-label-sm shrink-0"
                        type="button"
                        aria-label="copy_all复刻"
                        data-stitch-action="unavailable"
                        onClick={onClick}
                      >
                        <span
                          className="material-symbols-outlined text-[11px]"
                          aria-hidden="true"
                        >
                          {'copy_all'}
                        </span>
                        <span>{'复刻'}</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className="w-full flex flex-col group rounded-DEFAULT overflow-hidden bg-surface-container-high/40 border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all"
                    data-stitch-card=""
                    hidden={
                      !!query.trim() &&
                      !'favorite2.1kplay_arrow00:48CCyber赛博机械姬·醒copy_all复刻'
                        .toLocaleLowerCase()
                        .includes(query.trim().toLocaleLowerCase())
                    }
                  >
                    <div className="relative w-full aspect-square overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage:
                            "url('/media/stitch/fec77d0ed8115337.jpg')",
                        }}
                      ></div>
                      <div className="absolute top-2 right-2 z-10">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-lowest/70 backdrop-blur-md text-on-surface shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10">
                          <span
                            className="material-symbols-outlined text-[11px] text-tertiary"
                            aria-hidden="true"
                          >
                            {'favorite'}
                          </span>
                          <span className="font-label-sm text-[10px] font-medium">
                            {'2.1k'}
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/30 to-transparent flex items-end justify-between px-2 pb-1.5 z-10">
                        <div className="flex items-center gap-0.5 text-on-surface font-label-sm text-[10px] tracking-wider">
                          <span
                            className="material-symbols-outlined text-[12px] text-secondary"
                            aria-hidden="true"
                          >
                            {'play_arrow'}
                          </span>
                          <span>{'00:48'}</span>
                        </div>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-surface-container-high/70 backdrop-blur-md border border-white/5">
                          <div className="w-3.5 h-3.5 rounded-full bg-primary/30 flex items-center justify-center text-[9px] text-primary font-bold">
                            {'C'}
                          </div>
                          <span className="font-body-sm text-[10px] text-on-surface truncate max-w-[56px]">
                            {'Cyber'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <h4 className="font-body-md text-[12px] text-on-surface font-medium truncate pr-1 leading-snug">
                        {'赛博机械姬·醒'}
                      </h4>
                      <button
                        className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-label-sm shrink-0"
                        type="button"
                        aria-label="copy_all复刻"
                        data-stitch-action="unavailable"
                        onClick={onClick}
                      >
                        <span
                          className="material-symbols-outlined text-[11px]"
                          aria-hidden="true"
                        >
                          {'copy_all'}
                        </span>
                        <span>{'复刻'}</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <div
                    className="w-full flex flex-col group rounded-DEFAULT overflow-hidden bg-surface-container-high/40 border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all"
                    data-stitch-card=""
                    hidden={
                      !!query.trim() &&
                      !'favorite1.8kplay_arrow01:45KKling琉璃星云·意识肖像copy_all复刻'
                        .toLocaleLowerCase()
                        .includes(query.trim().toLocaleLowerCase())
                    }
                  >
                    <div className="relative w-full aspect-[4/5] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage:
                            "url('/media/stitch/b8b351ca1136cedb.jpg')",
                        }}
                      ></div>
                      <div className="absolute top-2 right-2 z-10">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-lowest/70 backdrop-blur-md text-on-surface shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10">
                          <span
                            className="material-symbols-outlined text-[11px] text-tertiary"
                            aria-hidden="true"
                          >
                            {'favorite'}
                          </span>
                          <span className="font-label-sm text-[10px] font-medium">
                            {'1.8k'}
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/30 to-transparent flex items-end justify-between px-2 pb-1.5 z-10">
                        <div className="flex items-center gap-0.5 text-on-surface font-label-sm text-[10px] tracking-wider">
                          <span
                            className="material-symbols-outlined text-[12px] text-secondary"
                            aria-hidden="true"
                          >
                            {'play_arrow'}
                          </span>
                          <span>{'01:45'}</span>
                        </div>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-surface-container-high/70 backdrop-blur-md border border-white/5">
                          <div className="w-3.5 h-3.5 rounded-full bg-secondary-container flex items-center justify-center text-[9px] text-on-secondary font-bold">
                            {'K'}
                          </div>
                          <span className="font-body-sm text-[10px] text-on-surface truncate max-w-[56px]">
                            {'Kling'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <h4 className="font-body-md text-[12px] text-on-surface font-medium truncate pr-1 leading-snug">
                        {'琉璃星云·意识肖像'}
                      </h4>
                      <button
                        className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-label-sm shrink-0"
                        type="button"
                        aria-label="copy_all复刻"
                        data-stitch-action="unavailable"
                        onClick={onClick}
                      >
                        <span
                          className="material-symbols-outlined text-[11px]"
                          aria-hidden="true"
                        >
                          {'copy_all'}
                        </span>
                        <span>{'复刻'}</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className="w-full flex flex-col group rounded-DEFAULT overflow-hidden bg-surface-container-high/40 border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all"
                    data-stitch-card=""
                    hidden={
                      !!query.trim() &&
                      !'favorite956play_arrow02:15OOneiro光子坍缩与虚空梦境copy_all复刻'
                        .toLocaleLowerCase()
                        .includes(query.trim().toLocaleLowerCase())
                    }
                  >
                    <div className="relative w-full aspect-[3/4] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage:
                            "url('/media/stitch/ba73406027bb1bd3.png')",
                        }}
                      ></div>
                      <div className="absolute top-2 right-2 z-10">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-lowest/70 backdrop-blur-md text-on-surface shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10">
                          <span
                            className="material-symbols-outlined text-[11px] text-tertiary"
                            aria-hidden="true"
                          >
                            {'favorite'}
                          </span>
                          <span className="font-label-sm text-[10px] font-medium">
                            {'956'}
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/30 to-transparent flex items-end justify-between px-2 pb-1.5 z-10">
                        <div className="flex items-center gap-0.5 text-on-surface font-label-sm text-[10px] tracking-wider">
                          <span
                            className="material-symbols-outlined text-[12px] text-secondary"
                            aria-hidden="true"
                          >
                            {'play_arrow'}
                          </span>
                          <span>{'02:15'}</span>
                        </div>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-surface-container-high/70 backdrop-blur-md border border-white/5">
                          <div className="w-3.5 h-3.5 rounded-full bg-tertiary-container flex items-center justify-center text-[9px] text-on-tertiary font-bold">
                            {'O'}
                          </div>
                          <span className="font-body-sm text-[10px] text-on-surface truncate max-w-[56px]">
                            {'Oneiro'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <h4 className="font-body-md text-[12px] text-on-surface font-medium truncate pr-1 leading-snug">
                        {'光子坍缩与虚空梦境'}
                      </h4>
                      <button
                        className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 backdrop-blur-md border border-white/10 text-white/90 text-[10px] font-label-sm shrink-0"
                        type="button"
                        aria-label="copy_all复刻"
                        data-stitch-action="unavailable"
                        onClick={onClick}
                      >
                        <span
                          className="material-symbols-outlined text-[11px]"
                          aria-hidden="true"
                        >
                          {'copy_all'}
                        </span>
                        <span>{'复刻'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {'\n'}
          {'\n'}
          <section className="px-gutter">{'\n\n'}</section>
          {'\n'}
        </div>
      </main>
      <div
        className="fixed inset-0 z-40 pointer-events-none flex flex-col justify-end items-stretch px-gutter pb-safe pb-36"
        id="mobile-prompt-dock-container"
      >
        <div
          id="mobile-prompt-dock-backdrop"
          data-stitch-action="close-prompt"
          className={
            'fixed inset-0 bg-surface-container-lowest/60 transition-opacity duration-300' +
            (open
              ? ' pointer-events-auto opacity-100'
              : ' pointer-events-none opacity-0')
          }
          aria-hidden={!open}
          onClick={onClick}
        ></div>
        <div
          className="pointer-events-auto w-full relative z-10 transition-all duration-300 ease-out flex flex-col items-start"
          id="mobile-prompt-dock-card"
        >
          <button
            className="inline-flex items-center gap-2 h-10 px-3.5 rounded-full backdrop-blur-2xl bg-white/10 border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:bg-white/15 active:scale-95 transition-all cursor-pointer group text-left"
            id="mobile-prompt-dock-collapsed"
            style={{
              background: 'rgba(22, 24, 32, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(28px)',
              boxShadow:
                'rgba(255, 255, 255, 0.12) 0px 1px 1px inset, rgba(0, 0, 0, 0.6) 0px 8px 24px',
            }}
            type="button"
            role="button"
            aria-controls="mobile-prompt-dock-expanded"
            aria-label="展开创作面板"
            data-stitch-action="open-prompt"
            tabIndex={0}
            hidden={open}
            aria-expanded={open}
            ref={(node) => {
              triggerRef.current = node;
            }}
            onClick={onClick}
          >
            <div className="flex items-center justify-center text-secondary shrink-0">
              <span
                className="material-symbols-outlined text-[16px] text-secondary group-hover:scale-110 transition-transform"
                aria-hidden="true"
              >
                {'auto_awesome'}
              </span>
            </div>
            <span className="text-on-surface/80 font-body-sm text-[12px] font-medium tracking-wide whitespace-nowrap select-none">
              {'创作灵感...'}
            </span>
          </button>
          <div
            className="w-full bg-[#1e1f24]/95 backdrop-blur-2xl px-space-md py-space-md flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/5 transition-all duration-300 rounded-lg min-h-[160px] relative flex"
            id="mobile-prompt-dock-expanded"
            style={{
              background: 'rgba(18, 20, 28, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(32px)',
              boxShadow:
                'rgba(255, 255, 255, 0.15) 0px 1px 1px inset, rgba(0, 0, 0, 0.8) 0px 20px 50px',
            }}
            data-stitch-creator=""
            role="dialog"
            aria-modal="true"
            aria-label="创作灵感"
            hidden={!open}
            ref={panelRef}
          >
            <div className="flex-1 flex flex-col justify-start relative">
              <div className="flex items-start w-full relative">
                <span className="w-0.5 h-5 bg-white rounded-full mr-1.5 mt-0.5 shrink-0 animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.5)]"></span>
                <textarea
                  className="w-full bg-transparent text-on-surface font-body-md text-[16px] placeholder:text-[#6a6b74] focus:outline-none border-none resize-none p-0 leading-snug"
                  id="mobile-prompt-dock-textarea"
                  placeholder="描述你的创意与分镜构想..."
                  rows={3}
                  aria-label="创作想法"
                  ref={promptRef}
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex items-center justify-between pt-space-sm mt-space-xs">
              <div className="flex items-center gap-space-sm">
                <div className="flex items-center gap-space-sm text-on-surface">
                  <button
                    aria-label="添加"
                    className="w-7 h-7 flex items-center justify-center text-[#e2e2eb] hover:text-white transition-colors active:scale-90"
                    type="button"
                    data-stitch-action="unavailable"
                    onClick={onClick}
                  >
                    <span
                      className="material-symbols-outlined text-[22px]"
                      aria-hidden="true"
                    >
                      {'add'}
                    </span>
                  </button>
                  <div className="w-[1px] h-4 bg-white/10 mx-0.5"></div>
                  <button
                    aria-label="3D模型"
                    className="w-7 h-7 flex items-center justify-center text-[#e2e2eb] hover:text-white transition-colors active:scale-90"
                    type="button"
                    data-stitch-action="unavailable"
                    onClick={onClick}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      aria-hidden="true"
                    >
                      {'view_in_ar'}
                    </span>
                  </button>
                  <button
                    aria-label="风格融合"
                    className="w-7 h-7 flex items-center justify-center text-[#e2e2eb] hover:text-white transition-colors active:scale-90"
                    type="button"
                    data-stitch-action="unavailable"
                    onClick={onClick}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      aria-hidden="true"
                    >
                      {'bubble_chart'}
                    </span>
                  </button>
                  <button
                    aria-label="角色主体"
                    className="w-7 h-7 flex items-center justify-center text-[#e2e2eb] hover:text-white transition-colors active:scale-90"
                    type="button"
                    data-stitch-action="unavailable"
                    onClick={onClick}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      aria-hidden="true"
                    >
                      {'mood'}
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  aria-label="语音输入"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#6a6b74] hover:text-[#e2e2eb] transition-colors active:scale-90"
                  type="button"
                  data-stitch-action="unavailable"
                  onClick={onClick}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    aria-hidden="true"
                  >
                    {'mic'}
                  </span>
                </button>
                <button
                  aria-label="生成"
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-on-primary shadow-[0_4px_16px_rgba(76,215,246,0.35)] active:scale-90 transition-all"
                  style={{
                    background: 'rgb(255, 255, 255)',
                    color: 'rgb(11, 12, 16)',
                    boxShadow: 'rgba(255, 255, 255, 0.25) 0px 4px 16px',
                  }}
                  type="button"
                  data-stitch-action="unavailable"
                  onClick={onClick}
                >
                  <span
                    className="material-symbols-outlined text-[20px] font-bold text-surface"
                    style={{ color: 'rgb(11, 12, 16)' }}
                    aria-hidden="true"
                  >
                    {'arrow_upward'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        className="fixed bottom-0 inset-x-0 z-50 pb-safe pointer-events-none"
        data-active-classes="text-white shadow-[0_0_14px_rgba(255,255,255,0.25)]"
        inert={open}
      >
        <div className="px-gutter-sm pb-space-sm pt-space-xs flex justify-center">
          <div
            className="pointer-events-auto w-full max-w-md h-16 rounded-full bg-surface-container-low/80 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-around px-space-sm border border-white/5"
            style={{
              background: 'rgba(16, 18, 24, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(28px)',
              boxShadow:
                'rgba(255, 255, 255, 0.16) 0px 1px 1px inset, rgba(0, 0, 0, 0.7) 0px 12px 36px',
            }}
          >
            <button
              aria-current="page"
              className="flex flex-col items-center justify-center min-w-[48px] h-12 rounded-full transition-all duration-200 text-white"
              data-path="explore-feed"
              type="button"
              aria-label="explore首页"
              data-stitch-action="home"
              onClick={onClick}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                aria-hidden="true"
              >
                {'explore'}
              </span>
              <span className="font-label-sm text-[11px] mt-1 font-medium leading-none">
                {'首页'}
              </span>
            </button>
            <button
              className="flex flex-col items-center justify-center min-w-[48px] h-12 rounded-full text-on-surface-variant hover:text-on-surface transition-all duration-200"
              data-path="tools"
              type="button"
              aria-label="widgets工具"
              data-stitch-action="tools"
              onClick={onClick}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                aria-hidden="true"
              >
                {'widgets'}
              </span>
              <span className="font-label-sm text-[11px] mt-1 leading-none">
                {'工具'}
              </span>
            </button>
            <div className="flex flex-col items-center justify-center -translate-y-2 relative z-20 shrink-0">
              <button
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-surface shadow-[0_4px_20px_rgba(255,255,255,0.35),inset_0_1px_1px_rgba(255,255,255,0.9)] border border-white/80 active:scale-90 transition-transform"
                type="button"
                aria-label="展开创作面板"
                data-stitch-action="open-prompt"
                onClick={onClick}
              >
                <span
                  className="material-symbols-outlined text-[22px] font-bold text-surface"
                  style={{ color: 'rgb(11, 12, 16)' }}
                  aria-hidden="true"
                >
                  {'auto_awesome'}
                </span>
              </button>
              <span className="font-label-sm text-[11px] mt-1 text-on-surface font-medium leading-none">
                {'创作'}
              </span>
            </div>
            <button
              className="flex flex-col items-center justify-center min-w-[48px] h-12 rounded-full text-on-surface-variant hover:text-on-surface transition-all duration-200"
              data-path="asset-vault"
              type="button"
              aria-label="folder_special资产"
              data-stitch-action="unavailable"
              onClick={onClick}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                aria-hidden="true"
              >
                {'folder_special'}
              </span>
              <span className="font-label-sm text-[11px] mt-1 leading-none">
                {'资产'}
              </span>
            </button>
            <button
              className="flex flex-col items-center justify-center min-w-[48px] h-12 rounded-full text-on-surface-variant hover:text-on-surface transition-all duration-200"
              data-path="profile"
              type="button"
              aria-label="person我的"
              data-stitch-action="unavailable"
              onClick={onClick}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                aria-hidden="true"
              >
                {'person'}
              </span>
              <span className="font-label-sm text-[11px] mt-1 leading-none">
                {'我的'}
              </span>
            </button>
          </div>
        </div>
      </nav>
      {'\n'}
      {'\n\n\n\n\n\n\n\n\n\n\n\n\n\n'}
      <SourceNotice message={notice} onDismiss={dismissNotice} />
    </div>
  );
}
