'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Brand,
  FeaturedBanner,
  FeatureRail,
  Icon,
  InspirationFeed,
  Modal,
  Notice,
  UNAVAILABLE,
} from './homepage-primitives';
import { features } from './inspiration-data';

export function DesktopHomepage() {
  const [prompt, setPrompt] = useState('');
  const [notice, setNotice] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [light, setLight] = useState(false);
  const [promotion, setPromotion] = useState(true);
  const [settings, setSettings] = useState(false);
  const [category, setCategory] = useState('灵感创作');
  const [mode, setMode] = useState('图片生成');
  const creator = useRef<HTMLTextAreaElement>(null);
  const unavailable = () => setNotice(UNAVAILABLE);
  useEffect(() => {
    if (!settings) return;
    const mobile = window.matchMedia('(max-width: 767px)');
    const closeOnMobile = () => {
      if (mobile.matches) setSettings(false);
    };
    mobile.addEventListener('change', closeOnMobile);
    return () => mobile.removeEventListener('change', closeOnMobile);
  }, [settings]);
  return (
    <div
      className={`desktop-homepage ${collapsed ? 'sidebar-collapsed' : ''} ${light ? 'light-theme' : ''}`}
    >
      <aside className="sidebar">
        <div className="sidebar-top">
          <Brand compact={collapsed} />
          <button
            className="collapse-button"
            aria-label={collapsed ? '展开侧边栏' : '收起侧边栏'}
            aria-expanded={!collapsed}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon name="chevron" className={collapsed ? '' : 'reverse'} />
          </button>
        </div>
        <nav aria-label="主导航">
          {[
            { label: '首页', icon: 'home' },
            { label: '创作图片', icon: 'image' },
            { label: '创作视频', icon: 'film' },
            { label: '无限画布', icon: 'grid' },
            { label: '我的资产', icon: 'folder' },
          ].map((item, i) => (
            <button
              key={item.label}
              className={i === 0 ? 'nav-active' : ''}
              aria-label={item.label}
              aria-current={i === 0 ? 'page' : undefined}
              onClick={() => {
                if (i === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
                else if (i < 3) {
                  setMode(i === 1 ? '图片生成' : '视频生成');
                  creator.current?.focus();
                } else unavailable();
              }}
            >
              <Icon name={item.icon} />
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button
            className="settings-button"
            onClick={() => setSettings(true)}
            aria-label="偏好设置"
          >
            <Icon name="settings" />
            <span className="sidebar-label">偏好设置</span>
          </button>
          <div className="account-panel">
            <button
              className="avatar"
              aria-label="账户信息"
              onClick={unavailable}
            >
              OC
            </button>
            <span className="sidebar-label">
              <span>oneirocycle</span>
              <small>访客 · 界面预览</small>
            </span>
            <button
              aria-label="切换亮暗主题"
              aria-pressed={light}
              onClick={() => setLight(!light)}
            >
              <Icon name="moon" />
            </button>
          </div>
        </div>
      </aside>
      <div className="desktop-workspace">
        {promotion && (
          <div className="promotion">
            <span className="eyebrow">LIMITED OFFER</span>
            <span>
              新创作者礼遇{' '}
              <span className="promotion-detail">
                · Seedance 2.5 Cinema 及 20 款影视模型免费试用 7 天
              </span>
            </span>
            <button onClick={unavailable}>
              立即体验 <Icon name="chevron" />
            </button>
            <button
              aria-label="关闭福利横幅"
              onClick={() => setPromotion(false)}
            >
              <Icon name="close" />
            </button>
          </div>
        )}
        <header className="workspace-header">
          <nav className="category-pills" aria-label="创作类别">
            {['灵感创作', '短剧创作', '小说创作', '游戏创作'].map((value) => (
              <button
                key={value}
                aria-pressed={category === value}
                onClick={() => {
                  setCategory(value);
                  if (value !== '灵感创作')
                    setNotice(`${value}：${UNAVAILABLE}`);
                }}
              >
                {value}
              </button>
            ))}
          </nav>
          <button
            className="credits"
            onClick={unavailable}
            aria-label="额度信息"
          >
            ϟ <span>界面预览</span>
          </button>
        </header>
        <main className="desktop-main">
          <section className="creator-section" aria-label="灵感创作">
            <p className="eyebrow">FROM A SPARK TO A WORLD</p>
            <h1>
              OneiroCycle 环梦篇章<span>一站式 AIGC 创作平台</span>
            </h1>
            <div className="quick-ideas">
              {[
                '智能编导',
                '电商画布',
                'AI 剪辑',
                '故事板',
                '搞笑短剧',
                '萌宠动画',
              ].map((value, i) => (
                <button key={value} onClick={unavailable}>
                  <Icon name={features[i]?.icon ?? 'spark'} />
                  {value}
                  {i === 0 && <span className="tiny-label">新</span>}
                </button>
              ))}
            </div>
            <div className="creator-panel">
              <label className="sr-only" htmlFor="desktop-prompt">
                创作想法或剧本
              </label>
              <textarea
                ref={creator}
                id="desktop-prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="输入想法、剧本或上传参考，和 Agent 一起创作…"
              />
              <div className="creator-controls">
                <div className="creator-options">
                  <label className="select-control">
                    <Icon
                      name={
                        mode === '视频生成'
                          ? 'film'
                          : mode === 'Agent 模式'
                            ? 'spark'
                            : 'image'
                      }
                    />
                    <select
                      aria-label="创作类型"
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                    >
                      <option>图片生成</option>
                      <option>视频生成</option>
                      <option>Agent 模式</option>
                    </select>
                  </label>
                  <label className="select-control">
                    <select aria-label="模型">
                      <option>Seedream 5.0 Pro</option>
                      <option>Seedance 2.5 Cinema</option>
                      <option>FLUX.1 Ultra</option>
                    </select>
                  </label>
                  <select aria-label="画幅">
                    <option>1:1</option>
                    <option>16:9</option>
                    <option>9:16</option>
                  </select>
                  <select aria-label="分辨率">
                    <option>2K</option>
                    <option>1080P</option>
                    <option>4K</option>
                  </select>
                  <select aria-label="生成数量">
                    <option>2 张</option>
                    <option>1 张</option>
                  </select>
                </div>
                <div className="creator-submit">
                  <button aria-label="添加参考" onClick={unavailable}>
                    <Icon name="plus" />
                  </button>
                  <span className="muted">服务未接入</span>
                  <button className="primary-button" onClick={unavailable}>
                    开始创作 <Icon name="arrow" />
                  </button>
                </div>
              </div>
            </div>
            <p className="creator-footnote">
              让想象发生。生成、模型与账户服务尚未接入。
            </p>
          </section>
          <div className="marquee" aria-label="创作能力滚动展示">
            <div className="marquee-track">
              {[
                'IMAGE TO STORY',
                '无限创意',
                'ONEIROCYCLE',
                '灵感即刻成片',
                'CREATE WITHOUT LIMITS',
                'IMAGE TO STORY',
                '无限创意',
                'ONEIROCYCLE',
                '灵感即刻成片',
                'CREATE WITHOUT LIMITS',
              ].map((text, i) => (
                <span key={`${text}-${i}`}>✧ {text}</span>
              ))}
            </div>
            <button
              className="sr-only marquee-stop"
              onClick={(e) =>
                e.currentTarget.parentElement?.classList.toggle('paused')
              }
            >
              暂停或继续滚动展示
            </button>
          </div>
          <div className="desktop-discovery">
            <FeaturedBanner onAction={unavailable} />
            <FeatureRail onAction={unavailable} />
          </div>
          <InspirationFeed onAction={unavailable} />
        </main>
        <footer className="desktop-footer">
          <span>ONEIROCYCLE · 环梦篇章</span>
          <div>
            <button onClick={unavailable}>在线客服</button>
            <button onClick={unavailable}>帮助中心</button>
          </div>
        </footer>
        <Notice message={notice} onDismiss={() => setNotice('')} />
      </div>
      <Modal
        open={settings}
        onClose={() => setSettings(false)}
        title="创作平台偏好设置"
      >
        <p className="muted">仅调整当前页面预览，不保存账户偏好或启用服务。</p>
        <label className="setting-field">
          默认主干推理引擎
          <select defaultValue="Seedance 2.5 Cinema Engine">
            <option>Seedance 2.5 Cinema Engine</option>
            <option>OneiroCycle Fast Render v3</option>
          </select>
        </label>
        <label className="setting-field">
          默认画质分辨率
          <select defaultValue="2K 超清">
            <option>1080P 高清</option>
            <option>2K 超清</option>
            <option>4K 影院级</option>
          </select>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" defaultChecked />
          显示快捷指令提示（预览）
        </label>
        <p className="muted">GPU / WebGL 服务尚未接入，不在此启动引擎。</p>
        <div className="dialog-actions">
          <button onClick={() => setSettings(false)}>取消</button>
          <button
            className="primary-button"
            onClick={() => {
              setSettings(false);
              setNotice('偏好仅用于界面预览，尚未接入账户保存。');
            }}
          >
            完成预览
          </button>
        </div>
      </Modal>
    </div>
  );
}
