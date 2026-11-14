const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || 'playwright'
);
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const out = fileURLToPath(new URL('../docs/assets/', import.meta.url));
fs.mkdirSync(out, { recursive: true });
const base = (process.env.HOMEPAGE_URL || 'http://127.0.0.1:3102').replace(
  /\/$/,
  '',
);
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    hasTouch: true,
  });
  const page = await context.newPage();
  const errors = [],
    failed = [],
    external = [],
    serviceRequests = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('requestfailed', (r) => failed.push(r.url()));
  page.on('request', (r) => {
    if (!r.url().startsWith(`${base}/`)) external.push(r.url());
    if (['fetch', 'xhr'].includes(r.resourceType()))
      serviceRequests.push(r.url());
  });
  const evidence = {
    browser: browser.version(),
    widths: [],
    interactions: [],
    viewportProxy: [],
    physicalKeyboard: 'PENDING',
  };
  const check = (ok, label) => {
    assert(ok, label);
    evidence.interactions.push(label);
  };
  try {
    await page.goto(`${base}/`);
    const desktop = page.locator('.desktop-homepage'),
      mobile = page.locator('.mobile-homepage');
    for (const width of [375, 390, 768, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(150);
      const geometry = await page.evaluate(() => {
        const root = document.querySelector(
          innerWidth < 768 ? '.mobile-homepage' : '.desktop-homepage',
        );
        const controls = [
          ...root.querySelectorAll('button,input,select,textarea'),
        ].filter(
          (e) => e.getClientRects().length && !e.closest('dialog:not([open])'),
        );
        const outside = controls
          .filter((e) => !e.closest('.feature-rail'))
          .filter((e) => {
            const r = e.getBoundingClientRect();
            return r.left < -0.5 || r.right > innerWidth + 0.5;
          })
          .map((e) => e.getAttribute('aria-label') || e.textContent);
        const undersized = controls
          .filter((e) => !e.closest('.marquee'))
          .filter((e) => {
            const r = e.getBoundingClientRect();
            return r.width < 43.5 || r.height < 43.5;
          })
          .map((e) => ({
            name: e.getAttribute('aria-label') || e.textContent,
            w: e.getBoundingClientRect().width,
            h: e.getBoundingClientRect().height,
          }));
        const nav = root
            .querySelector('.mobile-bottom-nav')
            ?.getBoundingClientRect(),
          dock = root
            .querySelector('.mobile-prompt-trigger')
            ?.getBoundingClientRect();
        return {
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          composition:
            getComputedStyle(document.querySelector('.mobile-homepage'))
              .display === 'none'
              ? 'desktop'
              : 'mobile',
          outside,
          undersized,
          dockNavGap: nav && dock ? nav.top - dock.bottom : null,
        };
      });
      assert.equal(
        geometry.width,
        geometry.scrollWidth,
        `overflow at ${width}`,
      );
      assert.equal(geometry.outside.length, 0, JSON.stringify(geometry));
      assert.equal(geometry.undersized.length, 0, JSON.stringify(geometry));
      assert.equal(geometry.composition, width < 768 ? 'mobile' : 'desktop');
      if (width < 768) assert(geometry.dockNavGap >= 0);
      evidence.widths.push(geometry);
      await page.screenshot({
        path: `${out}/homepage-${width}.png`,
        fullPage: true,
      });
      if (width === 390)
        await page.screenshot({
          path: `${out}/homepage-mobile-390.png`,
          fullPage: true,
        });
      if (width === 1440)
        await page.screenshot({
          path: `${out}/homepage-desktop-1440.png`,
          fullPage: true,
        });
    }
    await desktop
      .getByLabel('创作想法或剧本')
      .fill('雨夜的城市，与一段未完成的梦');
    await desktop
      .getByLabel('创作类型', { exact: true })
      .selectOption('视频生成');
    await desktop
      .getByLabel('模型', { exact: true })
      .selectOption('Seedance 2.5 Cinema');
    await desktop.getByLabel('画幅', { exact: true }).selectOption('16:9');
    await desktop.getByLabel('分辨率', { exact: true }).selectOption('4K');
    await desktop.getByLabel('生成数量', { exact: true }).selectOption('1 张');
    await desktop
      .getByRole('button', { name: '开始创作', exact: true })
      .click();
    check(
      (await desktop.getByRole('status').textContent()).includes('尚未接入'),
      'desktop creation reports unavailable, retaining prompt and choices',
    );
    await desktop
      .getByRole('button', { name: '关闭提示', exact: true })
      .click();
    await desktop
      .getByRole('button', { name: '收起侧边栏', exact: true })
      .click();
    check(
      await desktop.evaluate((e) => e.classList.contains('sidebar-collapsed')),
      'sidebar collapses',
    );
    await desktop
      .getByRole('button', { name: '展开侧边栏', exact: true })
      .click();
    await desktop
      .getByRole('button', { name: '切换亮暗主题', exact: true })
      .click();
    check(
      await desktop.evaluate((e) => e.classList.contains('light-theme')),
      'theme changes locally',
    );
    await desktop
      .getByRole('button', { name: '切换亮暗主题', exact: true })
      .click();
    await desktop
      .getByRole('button', { name: '偏好设置', exact: true })
      .click();
    const settings = page.getByRole('dialog', { name: '创作平台偏好设置' });
    assert(await settings.isVisible());
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      assert(
        await settings.evaluate((e) => e.contains(document.activeElement)),
        'settings focus escaped',
      );
    }
    check(
      await page.evaluate(
        () => getComputedStyle(document.activeElement).outlineStyle !== 'none',
      ),
      'keyboard focus has visible outline',
    );
    await page.keyboard.press('Escape');
    check(
      await desktop
        .getByRole('button', { name: '偏好设置', exact: true })
        .evaluate((e) => e === document.activeElement),
      'settings focus trap, Escape and restore',
    );
    await desktop
      .getByRole('button', { name: '关闭福利横幅', exact: true })
      .click();
    check(
      (await desktop.locator('.promotion').count()) === 0,
      'promotion dismisses locally',
    );
    const search = desktop.getByRole('searchbox', { name: '搜索灵感作品' });
    await search.fill('不存在的作品');
    check(
      await desktop
        .getByText('还没有找到灵感作品', { exact: true })
        .isVisible(),
      'search empty state',
    );
    await desktop
      .getByRole('button', { name: '清空搜索', exact: true })
      .click();
    check(
      (await desktop.locator('.inspiration-card').count()) === 4,
      'clear restores four illustrative works',
    );
    await desktop.getByRole('button', { name: '科幻', exact: true }).click();
    check(
      (await desktop.locator('.inspiration-card').count()) === 1,
      'category produces one matching work',
    );
    await desktop
      .getByRole('button', { name: '全部作品', exact: true })
      .click();
    const rail = desktop.locator('.feature-rail');
    const before = await rail.evaluate((e) => e.scrollLeft);
    await desktop
      .getByRole('button', { name: '向右滚动功能', exact: true })
      .click();
    await page.waitForTimeout(500);
    check(
      (await rail.evaluate((e) => e.scrollLeft)) > before,
      'desktop feature rail scroll',
    );
    await desktop.locator('.marquee').hover();
    check(
      (await desktop
        .locator('.marquee-track')
        .evaluate((e) => getComputedStyle(e).animationPlayState)) === 'paused',
      'marquee pauses on hover',
    );
    await page.emulateMedia({ reducedMotion: 'reduce' });
    check(
      (await desktop
        .locator('.marquee-track')
        .evaluate((e) => getComputedStyle(e).animationName)) === 'none',
      'reduced-motion disables marquee animation',
    );
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    const mrail = mobile.locator('.feature-rail');
    const mbefore = await mrail.evaluate((e) => e.scrollLeft);
    await mobile
      .getByRole('button', { name: '向右滚动功能', exact: true })
      .tap();
    await page.waitForTimeout(500);
    check(
      (await mrail.evaluate((e) => e.scrollLeft)) > mbefore,
      'mobile rail touch scroll control',
    );
    const trigger = mobile.getByRole('button', {
      name: '展开创作面板',
      exact: true,
    });
    await trigger.tap();
    const dock = page.getByRole('dialog', { name: '创作灵感', exact: true }),
      input = page.locator('#mobile-prompt');
    check(
      await input.evaluate((e) => e === document.activeElement),
      'touch opens dock and focuses textarea',
    );
    await input.fill('本地输入，不提交真实任务');
    await dock.getByRole('button', { name: '视频生成', exact: true }).tap();
    check(
      (await dock
        .getByRole('button', { name: '视频生成', exact: true })
        .getAttribute('aria-pressed')) === 'true',
      'mobile mode selection announced',
    );
    await dock.getByRole('button', { name: '风格', exact: true }).tap();
    check(
      (await dock.getByRole('status').textContent()).includes('尚未接入'),
      'mobile tool unavailable feedback',
    );
    await dock.getByRole('button', { name: '开始创作', exact: true }).tap();
    check(
      (await dock.getByRole('status').textContent()).includes('尚未接入'),
      'mobile creation unavailable feedback',
    );
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      assert(
        await dock.evaluate((e) => e.contains(document.activeElement)),
        'dock focus escaped',
      );
    }
    await input.focus();
    for (const height of [600, 440, 360]) {
      await page.setViewportSize({ width: 390, height });
      await page.waitForTimeout(150);
      const viewport = await dock.evaluate((e) => ({
        derived: e.style.getPropertyValue('--visual-height'),
        offset: e.style.getPropertyValue('--visual-offset'),
        keyboard: e.style.getPropertyValue('--keyboard-inset'),
        actual: visualViewport.height,
        top: visualViewport.offsetTop,
      }));
      assert.equal(
        parseFloat(viewport.derived),
        viewport.actual,
        'viewport resize not propagated',
      );
      for (const locator of [
        input,
        dock.getByRole('button', { name: '开始创作', exact: true }),
      ]) {
        await locator.scrollIntoViewIfNeeded();
        const r = await locator.boundingBox();
        assert(
          r &&
            r.y >= viewport.top - 0.5 &&
            r.y + r.height <= viewport.top + viewport.actual + 0.5,
          'input/CTA not reachable',
        );
      }
      const panel = await dock.locator('.mobile-prompt-panel').boundingBox();
      assert(
        panel.y >= viewport.top - 0.5 &&
          panel.y + panel.height <= viewport.top + viewport.actual + 0.5,
        'panel outside viewport',
      );
      evidence.viewportProxy.push({ ...viewport, height, panel });
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await input.focus();
    await page.waitForTimeout(150);
    // Controlled offset/inset injection exercises the scroll handler; not a native keyboard test.
    await page.evaluate(() => {
      Object.defineProperty(visualViewport, 'height', {
        configurable: true,
        value: 460,
      });
      Object.defineProperty(visualViewport, 'offsetTop', {
        configurable: true,
        value: 80,
      });
      visualViewport.dispatchEvent(new Event('scroll'));
    });
    await page.waitForTimeout(150);
    evidence.syntheticViewport = await dock.evaluate((e) => ({
      derived: e.style.getPropertyValue('--visual-height'),
      offset: e.style.getPropertyValue('--visual-offset'),
      keyboard: e.style.getPropertyValue('--keyboard-inset'),
    }));
    assert.equal(evidence.syntheticViewport.derived, '460px');
    assert.equal(evidence.syntheticViewport.offset, '80px');
    assert.equal(evidence.syntheticViewport.keyboard, '304px');
    const injectedPanel = await dock
      .locator('.mobile-prompt-panel')
      .boundingBox();
    assert(
      injectedPanel.y >= 80 && injectedPanel.y + injectedPanel.height <= 540,
    );
    await page.evaluate(() => {
      delete visualViewport.height;
      delete visualViewport.offsetTop;
      visualViewport.dispatchEvent(new Event('resize'));
    });
    await page.waitForTimeout(150);
    check(
      true,
      'synthetic VisualViewport scroll offset/inset propagates (not native device evidence)',
    );
    await page.screenshot({ path: `${out}/homepage-mobile-dock.png` });
    await page.keyboard.press('Escape');
    check(
      await trigger.evaluate((e) => e === document.activeElement),
      'mobile Escape closes and restores focus',
    );
    await trigger.focus();
    await page.keyboard.press('Enter');
    assert(await dock.isVisible());
    await page.mouse.click(3, 80);
    check(
      !(await dock.isVisible()) &&
        (await trigger.evaluate((e) => e === document.activeElement)),
      'keyboard open and backdrop close restore focus',
    );
    for (let i = 0; i < 3; i++) {
      await trigger.tap();
      await dock
        .getByRole('button', { name: '收起创作面板', exact: true })
        .tap();
    }
    check(
      (await page.locator('dialog[open]').count()) === 0,
      'rapid reopen closes without leaked modal',
    );
    await trigger.tap();
    await page.setViewportSize({ width: 768, height: 900 });
    await page.waitForTimeout(150);
    check(
      (await page.locator('dialog[open]').count()) === 0,
      'mobile dock closes across desktop breakpoint',
    );
    await page.setViewportSize({ width: 1440, height: 900 });
    await desktop
      .getByRole('button', { name: '偏好设置', exact: true })
      .click();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(150);
    check(
      (await page.locator('dialog[open]').count()) === 0,
      'desktop settings close across mobile breakpoint',
    );
    await mobile.getByRole('button', { name: '资产', exact: true }).tap();
    check(
      (await mobile.getByRole('status').textContent()).includes('尚未接入'),
      'unavailable mobile destinations do not navigate',
    );
    check(errors.length === 0, 'no runtime page errors');
    check(failed.length === 0, 'no failed resource requests');
    check(external.length === 0, 'no external media/font requests');
    check(serviceRequests.length === 0, 'no fetch/XHR requests from local UI');
    evidence.errors = errors;
    evidence.failed = failed;
    evidence.external = external;
    evidence.serviceRequests = serviceRequests;
    evidence.result = 'PASS';
    fs.writeFileSync(
      `${out}/homepage-browser-results.json`,
      JSON.stringify(evidence, null, 2) + '\n',
    );
    console.log(JSON.stringify(evidence, null, 2));
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
