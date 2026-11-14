'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Brand,
  FeaturedBanner,
  FeatureRail,
  Icon,
  InspirationFeed,
  Notice,
  UNAVAILABLE,
  trapDialogTab,
} from './homepage-primitives';

export function MobileHomepage() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [notice, setNotice] = useState('');
  const [promotion, setPromotion] = useState(true);
  const [mode, setMode] = useState('图片生成');
  const [dockNotice, setDockNotice] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const submit = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const unavailable = () => setNotice(UNAVAILABLE);
  function showDock() {
    lastTrigger.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : trigger.current;
    setDockNotice('');
    setOpen(true);
  }
  useEffect(() => {
    const node = dialog.current;
    if (!open || !node) return;
    node.showModal();
    input.current?.focus({ preventScroll: true });
    const viewport = window.visualViewport;
    let frame = 0;
    function updateViewport() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!node) return;
        const height = viewport?.height ?? window.innerHeight;
        const offsetTop = viewport?.offsetTop ?? 0;
        const keyboardInset = Math.max(
          0,
          window.innerHeight - height - offsetTop,
        );
        node.style.setProperty('--visual-height', `${height}px`);
        node.style.setProperty('--visual-offset', `${offsetTop}px`);
        node.style.setProperty('--keyboard-inset', `${keyboardInset}px`);
        if (document.activeElement === input.current) {
          for (const control of [input.current, submit.current]) {
            if (!control) continue;
            const rect = control.getBoundingClientRect();
            if (rect.top < offsetTop || rect.bottom > offsetTop + height)
              control.scrollIntoView({ block: 'nearest' });
          }
        }
      });
    }
    updateViewport();
    viewport?.addEventListener('resize', updateViewport);
    viewport?.addEventListener('scroll', updateViewport);
    window.addEventListener('resize', updateViewport);
    // display:none does not remove an open native dialog from the top layer.
    const desktop = window.matchMedia('(min-width: 768px)');
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      viewport?.removeEventListener('resize', updateViewport);
      viewport?.removeEventListener('scroll', updateViewport);
      window.removeEventListener('resize', updateViewport);
      desktop.removeEventListener('change', onBreakpoint);
      cancelAnimationFrame(frame);
      node.close();
      for (const property of [
        '--visual-height',
        '--visual-offset',
        '--keyboard-inset',
      ])
        node.style.removeProperty(property);
      if (!desktop.matches) lastTrigger.current?.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <div className="mobile-homepage">
      <header className="mobile-header">
        <Brand />
        <div className="mobile-account">
          <button aria-label="在线客服" onClick={unavailable}>
            <Icon name="help" />
          </button>
          <button aria-label="消息通知" onClick={unavailable}>
            <Icon name="bell" />
          </button>
          <button
            className="credits"
            aria-label="账户额度尚未接入"
            onClick={unavailable}
          >
            ϟ <span>—</span>
          </button>
        </div>
      </header>
      <main className="mobile-main">
        {promotion && (
          <div className="mobile-promotion">
            <span className="promo-dot" />
            <span>限时福利</span>
            <button className="mobile-promo-cta" onClick={unavailable}>
              Seedance 模型限免体验
            </button>
            <button
              aria-label="关闭福利横幅"
              onClick={() => setPromotion(false)}
            >
              <Icon name="close" />
            </button>
          </div>
        )}
        <FeaturedBanner mobile onAction={unavailable} />
        <FeatureRail onAction={unavailable} />
        <InspirationFeed mobile onAction={unavailable} />
      </main>
      <Notice message={notice} onDismiss={() => setNotice('')} />
      <button
        ref={trigger}
        className="mobile-prompt-trigger"
        aria-label="展开创作面板"
        aria-expanded={open}
        aria-controls="mobile-prompt-dialog"
        onClick={showDock}
      >
        <Icon name="spark" />
        <span>{prompt || '创作灵感…'}</span>
        <span className="dock-arrow">
          <Icon name="arrow" />
        </span>
      </button>
      <nav className="mobile-bottom-nav" aria-label="底部导航">
        {[
          { name: '首页', icon: 'home' },
          { name: '工具', icon: 'grid' },
          { name: '创作', icon: 'spark' },
          { name: '资产', icon: 'folder' },
          { name: '我的', icon: 'user' },
        ].map((item, i) => (
          <button
            key={item.name}
            aria-current={i === 0 ? 'page' : undefined}
            onClick={() => {
              if (i === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
              else if (i === 1)
                document
                  .querySelector('.mobile-homepage .feature-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              else if (i === 2) showDock();
              else unavailable();
            }}
          >
            <Icon name={item.icon} />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
      <dialog
        ref={dialog}
        id="mobile-prompt-dialog"
        className="mobile-prompt-dialog"
        onKeyDown={trapDialogTab}
        aria-labelledby="mobile-prompt-title"
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <section className="mobile-prompt-panel">
          <div className="dock-heading">
            <label id="mobile-prompt-title" htmlFor="mobile-prompt">
              <Icon name="spark" />
              创作灵感
            </label>
            <button aria-label="收起创作面板" onClick={() => setOpen(false)}>
              <Icon name="close" />
            </button>
          </div>
          <textarea
            ref={input}
            id="mobile-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="描述你的想象，让灵感有迹可循…"
          />
          <div className="dock-modes">
            {['图片生成', '视频生成', 'Agent 模式'].map((value) => (
              <button
                key={value}
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="dock-tools">
            {[
              { name: '添加参考', icon: 'plus' },
              { name: '3D 参考', icon: 'cube' },
              { name: '风格', icon: 'orbit' },
              { name: '角色', icon: 'smile' },
              { name: '语音输入', icon: 'mic' },
            ].map((item) => (
              <button
                key={item.name}
                aria-label={item.name}
                onClick={() => setDockNotice(UNAVAILABLE)}
              >
                <Icon name={item.icon} />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
          <div className="dock-submit">
            <label className="select-control">
              <select aria-label="移动端模型">
                <option>Seedream 5.0 Pro</option>
                <option>Seedance 2.5 Cinema</option>
                <option>FLUX.1 Ultra</option>
              </select>
            </label>
            <button
              ref={submit}
              className="primary-button"
              onClick={() => setDockNotice(UNAVAILABLE)}
            >
              开始创作 <Icon name="arrow" />
            </button>
          </div>
          <p className="dock-notice" role="status">
            {dockNotice || '仅界面预览 · 生成服务未接入'}
          </p>
        </section>
      </dialog>
    </div>
  );
}
