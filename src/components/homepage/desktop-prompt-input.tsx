'use client';

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';

interface DesktopPromptInputProps {
  creationType: string;
  onModeChange: (mode: string) => void;
  open: boolean;
  value: string;
  onChange: (value: string) => void;
  onExpand: () => void;
  onCollapse: (restoreFocus?: boolean) => void;
  onUnavailable: () => void;
  inputRef: RefObject<HTMLTextAreaElement | null>;
  triggerRef: RefObject<HTMLDivElement | HTMLButtonElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}

export function DesktopPromptInput({
  creationType,
  onModeChange,
  open,
  value,
  onChange,
  onExpand,
  onCollapse,
  onUnavailable,
  inputRef,
  triggerRef,
  panelRef,
  children,
}: DesktopPromptInputProps) {
  const root = useRef<HTMLDivElement>(null);
  const [fades, setFades] = useState({ top: false, bottom: false });
  const [listening, setListening] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const modes = ['Agent 模式', '图片生成', '视频生成'];
  const placeholder =
    creationType === 'Agent 模式'
      ? '输入想法，和 Agent 一起创作…'
      : creationType === '视频生成'
        ? '描述你想生成的视频…'
        : '描述你想生成的图片…';
  useEffect(() => {
    if (!listening) return;
    const timer = window.setInterval(
      () => setSeconds((time) => time + 1),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [listening]);
  const updateFades = () => {
    const input = inputRef.current;
    if (input)
      setFades({
        top: input.scrollTop > 1,
        bottom: input.scrollHeight - input.clientHeight - input.scrollTop > 2,
      });
  };
  useLayoutEffect(() => {
    const actions =
      root.current?.querySelector<HTMLElement>('.pc-prompt-actions');
    if (!actions) return;
    const resize = new ResizeObserver(() =>
      root.current?.style.setProperty(
        '--prompt-actions-height',
        `${actions.offsetHeight}px`,
      ),
    );
    resize.observe(actions);
    return () => resize.disconnect();
  }, []);
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const previousTransition = input.style.transition;
    input.style.transition = 'none';
    input.style.height = '0px';
    const height = Math.max(68, Math.min(input.scrollHeight, 160));
    input.style.height = `${height}px`;
    void input.offsetHeight;
    input.style.transition = previousTransition;
    root.current?.style.setProperty('--prompt-text-height', `${height}px`);
    // The scroll event updates both fades after a user scroll; initially only the bottom can overflow.
    input.dispatchEvent(new Event('scroll'));
  }, [value, open, inputRef]);
  return (
    <div
      ref={root}
      className="pc-prompt"
      data-expanded={open}
      data-stitch-creator=""
      data-purpose="expandable-prompt-studio"
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node)) return;
        if (!value.trim()) onCollapse(false);
      }}
    >
      <div
        ref={panelRef}
        id="desktop-prompt-container"
        className="pc-prompt-card"
      >
        <button
          type="button"
          className="pc-prompt-mode"
          aria-label={`当前${creationType}，点击切换模式`}
          title={`当前${creationType}，点击切换模式`}
          onClick={() =>
            onModeChange(
              modes[(modes.indexOf(creationType) + 1) % modes.length] ??
                modes[0]!,
            )
          }
          tabIndex={open ? -1 : 0}
        >
          <svg
            key={creationType}
            className="pc-prompt-mode-icon"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {creationType === 'Agent 模式' ? (
              <path d="M9 3l1.85 5.15L16 10l-5.15 1.85L9 17l-1.85-5.15L2 10l5.15-1.85L9 3Zm9 10 1.05 2.95L22 17l-2.95 1.05L18 21l-1.05-2.95L14 17l2.95-1.05L18 13Zm0-10v5m-2.5-2.5h5" />
            ) : creationType === '视频生成' ? (
              <>
                <rect x="2" y="6" width="13" height="12" rx="2.5" />
                <path d="m15 10 5.5-3v10L15 14" />
              </>
            ) : (
              <>
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <circle cx="9" cy="9" r="1.5" />
                <path d="m4 17 4-4 3 3 4-5 5 6" />
              </>
            )}
          </svg>
          <svg
            aria-hidden="true"
            className="pc-prompt-mode-arrows"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3.75 4.5 2.25-2.25 2.25 2.25m-4.5 3 2.25 2.25 2.25-2.25" />
          </svg>
        </button>
        <button
          ref={(node) => {
            triggerRef.current = node;
          }}
          type="button"
          id="desktop-prompt-collapsed-pill"
          className="pc-prompt-trigger"
          aria-label="展开创作面板"
          aria-expanded={open}
          aria-controls="desktop-main-prompt-input"
          tabIndex={open ? -1 : 0}
          onClick={onExpand}
        >
          <span
            key={creationType}
            className="pc-prompt-mode-placeholder"
            aria-hidden="true"
          >
            {Array.from(placeholder, (character, index) => (
              <span
                key={index}
                className="pc-prompt-mode-character"
                style={{ animationDelay: `${index * 15}ms` }}
              >
                {character === ' ' ? '\u00a0' : character}
              </span>
            ))}
          </span>
        </button>
        <div className="pc-prompt-text-area" inert={!open}>
          <textarea
            ref={inputRef}
            id="desktop-main-prompt-input"
            aria-label="创作想法"
            placeholder="输入灵感提示词、剧本分镜或调用 Agent…"
            className="pc-prompt-textarea resize-none"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            rows={3}
            onScroll={updateFades}
            onKeyDown={(event) => {
              if (
                event.key === 'Enter' &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing &&
                event.keyCode !== 229
              ) {
                event.preventDefault();
                if (value.trim()) onUnavailable();
              }
            }}
          />
          <span
            className="pc-prompt-fade pc-prompt-fade-top"
            style={{ opacity: fades.top ? 1 : 0 }}
          />
          <span
            className="pc-prompt-fade pc-prompt-fade-bottom"
            style={{ opacity: fades.bottom ? 1 : 0 }}
          />
        </div>
        <div className="pc-prompt-actions" inert={!open}>
          {children}
        </div>
        <button
          className="pc-prompt-collapse"
          type="button"
          aria-label="收起为胶囊"
          title="收起为胶囊"
          onClick={() => onCollapse()}
          tabIndex={open ? 0 : -1}
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="m6 14 6-6 6 6" />
          </svg>
        </button>
        <button
          className="pc-prompt-send"
          data-listening={listening}
          type="button"
          title={
            listening
              ? '停止录音动效演示'
              : value.trim()
                ? '快速生成'
                : '语音动效演示'
          }
          aria-label={
            listening
              ? '停止录音动效演示'
              : value.trim()
                ? '快速生成'
                : '语音动效演示'
          }
          onClick={() => {
            if (listening) {
              setListening(false);
              setSeconds(0);
            } else if (value.trim()) onUnavailable();
            else setListening(true);
          }}
        >
          <span
            data-visible={!!value.trim() && !listening}
            className="pc-prompt-action-icon"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 12V2M7 2 2.5 6.5M7 2l4.5 4.5" />
            </svg>
          </span>
          <span
            data-visible={!value.trim() && !listening}
            className="pc-prompt-action-icon"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <rect x="5" y="1" width="4" height="7" rx="2" />
              <path d="M2.75 6.5V7a4.25 4.25 0 0 0 8.5 0v-.5M7 11.25V13" />
            </svg>
          </span>
          {listening && (
            <span className="pc-voice-demo" aria-hidden="true">
              <span className="pc-voice-stop" />
              <span className="pc-voice-bars">
                {Array.from({ length: 12 }, (_, index) => (
                  <span
                    key={index}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  />
                ))}
              </span>
              <span>
                {String(Math.floor(seconds / 60)).padStart(2, '0')}:
                {String(seconds % 60).padStart(2, '0')}
              </span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
