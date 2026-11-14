'use client';

import { useState } from 'react';

export function DesktopHomepage() {
  const [prompt, setPrompt] = useState('');
  const [notice, setNotice] = useState('');
  return (
    <div className="desktop-homepage">
      <aside>oneirocycle</aside>
      <main>
        <h1>OneiroCycle 环梦篇章</h1>
        <label htmlFor="desktop-prompt">创作灵感</label>
        <textarea
          id="desktop-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={() => setNotice('该功能尚未接入，当前仅展示界面预览。')}
        >
          开始创作
        </button>
        <p role="status">{notice}</p>
      </main>
    </div>
  );
}
