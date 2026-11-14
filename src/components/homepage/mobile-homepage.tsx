'use client';

import { useEffect, useRef, useState } from 'react';

export function MobileHomepage() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [notice, setNotice] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      input.current?.focus();
    } else if (dialog.current?.open) {
      dialog.current.close();
      trigger.current?.focus();
    }
  }, [open]);
  return (
    <div className="mobile-homepage">
      <header>OneiroCycle</header>
      <main>
        <h1>灵感</h1>
      </main>
      <button ref={trigger} onClick={() => setOpen(true)}>
        展开创作面板
      </button>
      <dialog
        ref={dialog}
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <section>
          <button onClick={() => setOpen(false)}>收起创作面板</button>
          <label htmlFor="mobile-prompt">创作灵感</label>
          <textarea
            ref={input}
            id="mobile-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={() => setNotice('该功能尚未接入，当前仅展示界面预览。')}
          >
            开始创作
          </button>
          <p role="status">{notice}</p>
        </section>
      </dialog>
    </div>
  );
}
