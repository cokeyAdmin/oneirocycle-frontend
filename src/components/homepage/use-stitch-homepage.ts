'use client';

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';

export function useStitchHomepage(variant: 'desktop' | 'mobile') {
  const [open, setOpen] = useState(false);
  const [promotion, setPromotion] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [light, setLight] = useState(false);
  const [category, setCategory] = useState('game');
  const [menu, setMenu] = useState<string | null>(null);
  const [model, setModel] = useState('Seedream 5.0 Pro');
  const [creationType, setCreationType] = useState('图片生成');
  const [prompt, setPrompt] = useState('');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [resolution, setResolution] = useState('1080P 高清');
  const [floating, setFloating] = useState(false);
  const [notice, setNotice] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLDivElement | HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const settingsRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const mobile = variant === 'mobile';
  const unavailable = () => setNotice('该功能尚未接入，当前仅展示界面预览。');
  function closePrompt(restoreFocus = true) {
    setOpen(false);
    setMenu(null);
    if (!restoreFocus) return;
    requestAnimationFrame(() =>
      (lastTrigger.current ?? triggerRef.current)?.focus({
        preventScroll: true,
      }),
    );
  }
  function showPrompt(trigger?: HTMLElement) {
    lastTrigger.current = trigger ?? triggerRef.current;
    setOpen(true);
    if (!mobile)
      rootRef.current?.querySelector('[data-stitch-creator]')?.scrollIntoView({
        block: 'center',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
  }

  useEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    const viewport = window.visualViewport;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height = viewport?.height ?? window.innerHeight;
        const top = viewport?.offsetTop ?? 0;
        const inset = Math.max(0, window.innerHeight - height - top);
        root?.style.setProperty('--source-visual-height', `${height}px`);
        root?.style.setProperty('--source-visual-offset', `${top}px`);
        root?.style.setProperty('--source-keyboard-inset', `${inset}px`);
        root?.style.setProperty(
          '--source-dock-bottom',
          `${inset > 0 ? inset + 12 : Math.min(144, Math.max(12, height - 220))}px`,
        );
      });
    };
    promptRef.current?.focus({ preventScroll: true });
    update();
    viewport?.addEventListener('resize', update);
    viewport?.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    const breakpoint = window.matchMedia('(min-width: 768px)');
    const onBreakpoint = () => {
      if (mobile === breakpoint.matches) setOpen(false);
    };
    breakpoint.addEventListener('change', onBreakpoint);
    return () => {
      viewport?.removeEventListener('resize', update);
      viewport?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      breakpoint.removeEventListener('change', onBreakpoint);
      cancelAnimationFrame(frame);
      for (const key of [
        '--source-visual-height',
        '--source-visual-offset',
        '--source-keyboard-inset',
        '--source-dock-bottom',
      ])
        root?.style.removeProperty(key);
    };
  }, [open, mobile]);

  useEffect(() => {
    if (!menu) return;
    const frame = requestAnimationFrame(() =>
      rootRef.current
        ?.querySelector<HTMLElement>(
          '[role="menu"]:not([hidden]) [aria-checked="true"]',
        )
        ?.focus(),
    );
    return () => cancelAnimationFrame(frame);
  }, [menu]);

  useEffect(() => {
    if (!settings) return;
    const node = settingsRef.current;
    const previous = document.activeElement;
    node?.showModal();
    const breakpoint = window.matchMedia('(max-width: 767px)');
    const closeAtMobile = () => {
      if (breakpoint.matches) setSettings(false);
    };
    breakpoint.addEventListener('change', closeAtMobile);
    return () => {
      node?.close();
      breakpoint.removeEventListener('change', closeAtMobile);
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus({ preventScroll: true });
    };
  }, [settings]);

  function onClick(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    if (!(event.target instanceof Element)) return;
    const node = event.target.closest<HTMLElement>('[data-stitch-action]');
    if (!node || !event.currentTarget.contains(node)) {
      setMenu(null);
      return;
    }
    if (node.tagName === 'A') event.preventDefault();
    const action = node.dataset.stitchAction;
    switch (action) {
      case 'open-prompt':
        showPrompt(node);
        break;
      case 'close-prompt':
        closePrompt();
        break;
      case 'close-promo':
        setPromotion(false);
        break;
      case 'sidebar':
        setCollapsed((value) => !value);
        break;
      case 'theme':
        setLight((value) => !value);
        break;
      case 'category':
        setCategory(node.dataset.category ?? 'inspiration');
        break;
      case 'type-menu':
        setMenu((value) => (value === 'type' ? null : 'type'));
        break;
      case 'model-menu':
        setMenu((value) => (value === 'model' ? null : 'model'));
        break;
      case 'type':
        setCreationType(node.dataset.value ?? '图片生成');
        setMenu(null);
        break;
      case 'model':
        setModel(node.dataset.model ?? 'Seedream 5.0 Pro');
        setMenu(null);
        break;
      case 'resolution':
        setResolution(node.dataset.value ?? '1080P 高清');
        break;
      case 'search':
        setSearchOpen(true);
        requestAnimationFrame(() => searchRef.current?.focus());
        break;
      case 'close-search':
        setQuery('');
        setSearchOpen(false);
        requestAnimationFrame(() =>
          rootRef.current
            ?.querySelector<HTMLElement>('[data-stitch-action="search"]')
            ?.focus(),
        );
        break;
      case 'settings':
        setSettings(true);
        break;
      case 'close-settings':
        setSettings(false);
        break;
      case 'save-settings':
        setSettings(false);
        unavailable();
        break;
      case 'home':
        rootRef.current
          ?.querySelector<HTMLElement>('main')
          ?.scrollTo({ top: 0, behavior: 'smooth' });
        if (mobile) window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'tools':
        rootRef.current
          ?.querySelector<HTMLElement>('[data-stitch-features]')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'notice-close':
        setNotice('');
        break;
      default:
        unavailable();
        break;
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (menu && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      const options = [
        ...(rootRef.current?.querySelectorAll<HTMLElement>(
          '[role="menu"]:not([hidden]) [role="menuitemradio"]',
        ) ?? []),
      ];
      const index = options.findIndex(
        (node) => node === document.activeElement,
      );
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? options.length - 1
            : (index + (event.key === 'ArrowUp' ? -1 : 1) + options.length) %
              options.length;
      if (options[next]) {
        event.preventDefault();
        options[next].focus();
      }
      return;
    }

    if (event.key === 'Escape') {
      if (settings) setSettings(false);
      else if (open) closePrompt();
      else if (menu) setMenu(null);
      else if (searchOpen) {
        setSearchOpen(false);
        setQuery('');
      }
      return;
    }
    const panel = settings
      ? settingsRef.current
      : mobile && open
        ? panelRef.current
        : null;
    if (event.key === 'Tab' && panel) {
      const controls = [
        ...panel.querySelectorAll<HTMLElement>(
          'button, input, textarea, select, [tabindex="0"]',
        ),
      ].filter(
        (node) =>
          node.getClientRects().length && !node.hasAttribute('disabled'),
      );
      const first = controls[0],
        last = controls[controls.length - 1];
      if (first && last && event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        first &&
        last &&
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }
    if (
      (event.key === 'Enter' || event.key === ' ') &&
      event.target instanceof HTMLElement &&
      event.target.getAttribute('role') === 'button'
    ) {
      event.preventDefault();
      event.target.click();
    }
  }

  return {
    open,
    promotion,
    collapsed,
    setCollapsed,
    light,
    setLight,
    category,
    setCategory,
    showPrompt,
    unavailable,
    menu,
    model,
    creationType,
    prompt,
    setPrompt,
    query,
    setQuery,
    searchOpen,
    settings,
    resolution,
    floating,
    notice,
    rootRef,
    promptRef,
    triggerRef,
    panelRef,
    searchRef,
    settingsRef,
    onClick,
    dismissMenus: () => setMenu(null),
    dismissNotice: () => setNotice(''),
    onKeyDown,
    closePrompt,
    setSettings,
    onScroll: (event: React.UIEvent<HTMLElement>) => {
      const creator = event.currentTarget.querySelector(
        '[data-stitch-creator]',
      );
      if (creator) setFloating(creator.getBoundingClientRect().bottom < 80);
    },
  };
}
