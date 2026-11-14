'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import {
  features,
  filterInspiration,
  type InspirationItem,
} from './inspiration-data';

export const UNAVAILABLE = '该功能尚未接入，当前仅展示界面预览。';

export function trapDialogTab(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== 'Tab') return;
  const controls = [
    ...event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
    ),
  ].filter((node) => node.getClientRects().length > 0);
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

const paths: Record<string, string> = {
  home: 'M3 11 12 3l9 8M5 10v11h5v-7h4v7h5V10',
  image: 'M3 3h18v18H3zM3 16l6-6 6 6 3-3 3 3M15 7h.01',
  film: 'M3 4h18v16H3zM7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  folder: 'M3 6h7l2 3h9v12H3z',
  spark: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z',
  chevron: 'm9 5 7 7-7 7',
  close: 'm6 6 12 12M6 18 18 6',
  arrow: 'M12 20V4m-7 7 7-7 7 7',
  search: 'M20 20l-5-5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
  settings: 'M4 7h16M4 17h16M8 4v6M16 14v6',
  moon: 'M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12',
  plus: 'M12 4v16M4 12h16',
  bell: 'M5 17h14l-2-4V8a5 5 0 0 0-10 0v5zM10 21h4',
  user: 'M20 21a8 8 0 0 0-16 0M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  help: 'M4 14V9a8 8 0 0 1 16 0v5M4 10H2v7h4v-7zM20 10h2v7h-4v-7zM20 17v4h-6',
  bag: 'M4 7h16v14H4zM8 7V5a4 4 0 0 1 8 0v2',
  orbit: 'M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M15 3l6 6M21 3l-6 6',
  wand: 'm4 20 13-13 3 3L7 23zM5 3v6M2 6h6M17 1v4M15 3h4',
  smile: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M8 9h.01M16 9h.01M7 14q5 6 10 0',
  book: 'M3 3h7l2 2 2-2h7v17h-7l-2 2-2-2H3zM12 5v17',
  mic: 'M9 4a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0zM5 11v2a7 7 0 0 0 14 0v-2M12 20v3',
  cube: 'm12 2 10 5v10l-10 5-10-5V7zM2 7l10 5 10-5M12 12v10',
};

export function Icon({
  name,
  className = '',
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] ?? paths.spark} />
    </svg>
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand">
      <span className="brand-mark">
        <Icon name="orbit" />
      </span>
      {!compact && <span>oneirocycle</span>}
    </span>
  );
}

export function Notice({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <div
      className={`notice ${message ? 'notice-visible' : ''}`}
      role="status"
      aria-live="polite"
    >
      {message && (
        <>
          <span>{message}</span>
          <button aria-label="关闭提示" onClick={onDismiss}>
            <Icon name="close" />
          </button>
        </>
      )}
    </div>
  );
}

export function Artwork({
  variant = 'orb',
  label,
}: {
  variant?: InspirationItem['visual'];
  label: string;
}) {
  const id = useId().replaceAll(':', '');
  return (
    <svg
      className={`artwork art-${variant}`}
      role="img"
      aria-label={label}
      viewBox="0 0 400 480"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x2="1" y2="1">
          <stop stopColor={variant === 'city' ? '#10252d' : '#251a49'} />
          <stop offset="1" stopColor="#080c16" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop stopColor="#bcefff" />
          <stop offset=".45" stopColor="#7183ff" />
          <stop offset="1" stopColor="#2c1666" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-surface`} x2=".9" y2="1">
          <stop stopColor="#bbf7ec" />
          <stop offset=".5" stopColor="#8895f5" />
          <stop offset="1" stopColor="#312959" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id}-bg)`} d="M0 0h400v480H0z" />
      <circle
        cx="225"
        cy="195"
        r="190"
        fill={`url(#${id}-glow)`}
        opacity=".65"
      />
      {variant === 'city' ? (
        <g>
          <path
            d="M0 380V85h50v295m15 0V165h60v215m160 0V110h60v270m10 0V30h45v350"
            fill="#0b1724"
          />
          <path
            d="M25 120v170m65-80v110m220-165v130m60-215v250"
            stroke="#55dfe0"
            strokeWidth="5"
          />
          <path d="m145 480 55-205 70 205" fill="#37305e" />
          <path d="m180 480 25-190 30 190" fill="#83cdcf" opacity=".35" />
          <path
            d="M5 352h100m205-60h80M20 190h20m50 100h20"
            stroke="#fa7aaa"
            strokeWidth="8"
          />
          <ellipse cx="206" cy="340" rx="12" ry="28" fill="#0b1020" />
          <circle cx="206" cy="304" r="9" fill="#0b1020" />
        </g>
      ) : variant === 'portrait' ? (
        <g>
          <path
            d="M112 480q-3-105 32-142-50-71-18-159 31-90 119-44 89 36 34 166l-19 44q53 43 68 135"
            fill={`url(#${id}-surface)`}
          />
          <path
            d="m233 171 21 63-13 34 22 7-25 23-15 37-68-17"
            fill="none"
            stroke="#e1d8ff"
            strokeWidth="3"
          />
          <path
            d="m143 161 46 21-24 120m-17 51 41 23-11 102M257 354l-43 65"
            fill="none"
            stroke="#373756"
            strokeWidth="5"
          />
          <path d="m220 225 28-5" stroke="#9af8f8" strokeWidth="6" />
          <circle
            cx="163"
            cy="239"
            r="18"
            fill="none"
            stroke="#b1dffc"
            strokeWidth="4"
          />
        </g>
      ) : variant === 'mountain' ? (
        <g>
          <circle cx="290" cy="110" r="40" fill="#dfd6fa" opacity=".8" />
          <path
            d="m-20 360 125-200 80 136 70-70 165 180v100H0"
            fill="#474971"
          />
          <path d="m45 307 60-147 80 136-71-49z" fill="#9894bc" />
          <path d="M0 405q70-100 170-20t230-30v125H0" fill="#172f44" />
          <path
            d="M0 445q140-70 250-12t150-25"
            fill="none"
            stroke="#85d0d0"
            strokeWidth="2"
          />
        </g>
      ) : (
        <g>
          <circle cx="200" cy="225" r="108" fill={`url(#${id}-surface)`} />
          <ellipse
            cx="200"
            cy="225"
            rx="165"
            ry="48"
            fill="none"
            stroke="#b9c4ff"
            strokeWidth="7"
            transform="rotate(-30 200 225)"
          />
          <ellipse
            cx="200"
            cy="225"
            rx="146"
            ry="33"
            fill="none"
            stroke="#a1e7e0"
            strokeWidth="2"
            transform="rotate(30 200 225)"
          />
          <circle cx="310" cy="95" r="10" fill="#f5caef" />
        </g>
      )}
      <g fill="#e4f2ff" opacity=".6">
        <circle cx="55" cy="50" r="1" />
        <circle cx="340" cy="205" r="2" />
        <circle cx="70" cy="300" r="1.5" />
        <circle cx="270" cy="40" r="1" />
        <circle cx="330" cy="400" r="1" />
      </g>
    </svg>
  );
}

export function FeaturedBanner({
  onAction,
  mobile = false,
}: {
  onAction: () => void;
  mobile?: boolean;
}) {
  return (
    <section
      className={`featured-banner ${mobile ? 'featured-mobile' : ''}`}
      aria-label="环梦片场"
    >
      <div className="banner-art">
        <Artwork variant="orb" label="环梦片场抽象行星示例插画" />
      </div>
      <div className="banner-copy">
        <span className="eyebrow">
          {mobile ? 'FEATURED' : 'ONEIRO STUDIOS · RELEASE'}
        </span>
        <h2>环梦片场上线</h2>
        <p>
          {mobile
            ? '下一代多模态电影级虚幻生成工作室'
            : '寻找 AI 时代最具想象力的好故事 · 电影级生成引擎'}
        </p>
        <button onClick={onAction}>
          进入片场 <Icon name="chevron" />
        </button>
      </div>
      <span className="banner-caption">示例视觉 / 01</span>
    </section>
  );
}

export function FeatureRail({ onAction }: { onAction: () => void }) {
  const rail = useRef<HTMLDivElement>(null);
  return (
    <section className="feature-section" aria-label="功能探索">
      <div className="section-heading">
        <h2>功能探索</h2>
        <div>
          <button
            aria-label="向左滚动功能"
            onClick={() =>
              rail.current?.scrollBy({ left: -280, behavior: 'smooth' })
            }
          >
            <Icon name="chevron" className="reverse" />
          </button>
          <button
            aria-label="向右滚动功能"
            onClick={() =>
              rail.current?.scrollBy({ left: 280, behavior: 'smooth' })
            }
          >
            <Icon name="chevron" />
          </button>
        </div>
      </div>
      <div className="feature-rail" ref={rail}>
        {features.map((feature, i) => (
          <button
            className={`feature-card feature-${i % 4}`}
            key={feature.title}
            onClick={onAction}
          >
            <span className="feature-icon">
              <Icon name={feature.icon} />
            </span>
            <span className="feature-name">
              {feature.title}
              {feature.badge && (
                <span className="feature-badge">{feature.badge}</span>
              )}
            </span>
            <span className="muted">{feature.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function InspirationFeed({
  mobile = false,
  onAction,
}: {
  mobile?: boolean;
  onAction: () => void;
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('全部作品');
  const items = filterInspiration(query, category);
  return (
    <section
      className="inspiration-section"
      id={mobile ? 'mobile-inspiration' : 'desktop-inspiration'}
      aria-label="灵感作品"
    >
      <div className="section-heading">
        <h2>
          灵感<span className="section-tag">INSPIRATION</span>
        </h2>
        <span className="muted sample-label">示例作品</span>
      </div>
      <div className="feed-toolbar">
        <div className="filter-tabs" aria-label="作品分类">
          {['全部作品', '短剧', '动画', '科幻'].map((value) => (
            <button
              key={value}
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Icon name="search" />
          <input
            aria-label="搜索灵感作品"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索灵感…"
          />
          {query && (
            <button aria-label="清空搜索" onClick={() => setQuery('')}>
              <Icon name="close" />
            </button>
          )}
        </label>
      </div>
      <div className="inspiration-grid">
        {items.map((item) => (
          <article
            className={`inspiration-card card-${item.visual}`}
            key={item.id}
          >
            <div className="card-media">
              <Artwork
                variant={item.visual}
                label={`${mobile ? item.mobileTitle : item.title}，本地示例插画`}
              />
              <span className="card-likes">♡ {item.likes}</span>
              <span className="duration">▷ {item.duration}</span>
              <span className="sample-badge">示例</span>
            </div>
            <div className="card-copy">
              <span className="card-author">
                <span>{item.author[0]}</span>
                {item.author}
              </span>
              <h3>{mobile ? item.mobileTitle : item.title}</h3>
              <button onClick={onAction}>
                复刻 <Icon name="chevron" />
              </button>
            </div>
          </article>
        ))}
      </div>
      {items.length === 0 && (
        <div className="empty-state" role="status">
          <Icon name="search" />
          <h3>还没有找到灵感作品</h3>
          <p>试试其他关键词或切换分类，探索示例作品。</p>
          <button
            onClick={() => {
              setQuery('');
              setCategory('全部作品');
            }}
          >
            重置筛选
          </button>
        </div>
      )}
      <p className="feed-end">
        灵感没有边界，下一段故事由你开启。<span>当前内容为本地示例展示</span>
      </p>
    </section>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const heading = useId();
  useEffect(() => {
    const node = ref.current;
    const previous = document.activeElement;
    if (open && node && !node.open) node.showModal();
    return () => {
      if (node?.open) node.close();
      if (open && previous instanceof HTMLElement && previous.isConnected)
        previous.focus();
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="settings-dialog"
      onKeyDown={trapDialogTab}
      aria-labelledby={heading}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-content">
        <div className="section-heading">
          <h2 id={heading}>{title}</h2>
          <button aria-label="关闭设置" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
