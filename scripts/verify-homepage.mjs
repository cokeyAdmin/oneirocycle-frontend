import fs from 'node:fs';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || 'playwright'
);
const out = fileURLToPath(new URL('../docs/assets/rework/', import.meta.url));
fs.mkdirSync(out, { recursive: true });
const base = (process.env.HOMEPAGE_URL || 'http://127.0.0.1:3102').replace(
  /\/$/,
  '',
);
const browser = await chromium.launch();
const context = await browser.newContext({
  hasTouch: true,
  viewport: { width: 1440, height: 1060 },
});
const page = await context.newPage();
const results = {
  widths: [],
  interactions: [],
  viewportProxy: [],
  runtimeErrors: [],
  externalRequests: [],
  serviceRequests: [],
  physicalKeyboard: 'PENDING',
  userVisualAcceptance: 'PENDING',
};
page.on('pageerror', (e) => results.runtimeErrors.push(e.message));
page.on('request', (r) => {
  if (!r.url().startsWith(base)) results.externalRequests.push(r.url());
  if (['xhr', 'fetch'].includes(r.resourceType()))
    results.serviceRequests.push(r.url());
});
const check = (condition, label) => {
  assert(condition, label);
  results.interactions.push(label);
};
try {
  await page.goto(`${base}/`);
  await page.evaluate(() => document.fonts.ready);
  const desktop = page.locator('.stitch-desktop'),
    mobile = page.locator('.stitch-mobile');
  for (const width of [375, 390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(350);
    const geometry = await page.evaluate(() => {
      const root = document.querySelector(
        innerWidth < 768 ? '.stitch-mobile' : '.stitch-desktop',
      );
      return {
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        composition: getComputedStyle(root).display,
        bodyText: root.innerText,
        mainWidth: root.querySelector('main').clientWidth,
      };
    });
    assert.equal(
      geometry.width,
      geometry.scrollWidth,
      `unexpected horizontal page overflow at ${width}`,
    );
    for (const extra of [
      'FROM A SPARK',
      'IMAGE TO STORY',
      'INSPIRATION',
      '当前内容为本地示例',
      '一站式 AIGC 创作平台',
      '服务未接入',
      '示例视觉 / 01',
    ])
      assert(!geometry.bodyText.includes(extra), `unauthorized copy: ${extra}`);
    delete geometry.bodyText;
    results.widths.push(geometry);
    await page.screenshot({
      path: `${out}homepage-${width}.png`,
      fullPage: true,
    });
  }
  await desktop
    .getByRole('button', { name: '展开创作面板', exact: true })
    .focus();
  await page.keyboard.press('Enter');
  const dInput = desktop
    .getByRole('textbox', { name: '创作想法', exact: true })
    .first();
  check(await dInput.isVisible(), 'desktop source pill expands');
  await dInput.fill('城市雨夜中的故事');
  await desktop.locator('#desktop-creation-type-trigger').click();
  await desktop
    .locator('.creation-opt')
    .filter({ hasText: '视频生成' })
    .click();
  check(
    (
      await desktop.locator('#desktop-current-creation-label').textContent()
    ).includes('视频生成'),
    'authored source type menu selects',
  );
  await desktop.locator('#desktop-model-selector-trigger').click();
  await desktop.locator('[data-model="FLUX.1 Ultra"]').click();
  check(
    (await desktop.locator('#desktop-current-model-label').textContent()) ===
      'FLUX.1 Ultra',
    'authored source model menu selects',
  );
  await desktop.locator('#desktop-main-submit-btn').click();
  check(
    (await desktop.locator('[role=status]').textContent()).includes('尚未接入'),
    'no false generation success',
  );
  await desktop.getByRole('button', { name: '关闭提示' }).click();
  await desktop.locator('#desktop-collapse-prompt-btn').click();
  check(
    await desktop.locator('#desktop-prompt-collapsed-pill').isVisible(),
    'desktop returns to original collapsed state',
  );
  await desktop.locator('#desktop-sidebar-collapse-toggle').click();
  await page.waitForTimeout(350);
  check(
    await desktop
      .locator('#desktop-main-sidebar')
      .evaluate((e) => e.getBoundingClientRect().width <= 80),
    'sidebar collapses',
  );
  await desktop.locator('#desktop-sidebar-collapse-toggle').click();
  await desktop.locator('#desktop-theme-toggle-btn').click();
  check(
    await desktop.evaluate((e) => e.classList.contains('light-theme')),
    'source theme toggles',
  );
  await desktop.locator('#desktop-theme-toggle-btn').click();
  await desktop
    .getByRole('button', { name: '账户与偏好设置', exact: true })
    .click();
  const dialog = desktop.getByRole('dialog', { name: '创作平台偏好设置' });
  check(
    await dialog.isVisible(),
    'source settings opens through account surface',
  );
  await page.keyboard.press('Escape');
  check(!(await dialog.isVisible()), 'settings Escape closes');
  await desktop.locator('#desktop-inspiration-search-wrapper').click();
  await desktop
    .getByRole('searchbox', { name: '搜索灵感作品' })
    .fill('神秘室友');
  check(
    (await desktop.locator('[data-stitch-card]:visible').count()) === 1,
    'source search filters one work',
  );
  await desktop.getByRole('searchbox', { name: '搜索灵感作品' }).fill('');
  await page.setViewportSize({ width: 390, height: 844 });
  const trigger = mobile.locator('#mobile-prompt-dock-collapsed');
  await trigger.tap();
  const panel = mobile.getByRole('dialog', { name: '创作灵感' });
  const input = panel.getByRole('textbox', { name: '创作想法' });
  check(
    await input.evaluate((e) => e === document.activeElement),
    'mobile source pill touch focus',
  );
  await input.fill('保留原稿输入布局');
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press('Tab');
    assert(
      await panel.evaluate((e) => e.contains(document.activeElement)),
      'mobile modal focus escaped',
    );
  }
  await panel.getByRole('button', { name: '生成', exact: true }).tap();
  check(
    (await mobile.locator('[role=status]').textContent()).includes('尚未接入'),
    'mobile submit unavailable feedback',
  );
  await mobile.getByRole('button', { name: '关闭提示' }).click();
  for (const height of [600, 440, 360]) {
    await input.focus();
    await page.setViewportSize({ width: 390, height });
    await page.waitForTimeout(100);
    const r = await panel.boundingBox();
    assert(
      r && r.y >= 0 && r.y + r.height <= height,
      `dock outside reduced visual viewport: ${height}`,
    );
    await input.scrollIntoViewIfNeeded();
    await panel
      .getByRole('button', { name: '生成', exact: true })
      .scrollIntoViewIfNeeded();
    results.viewportProxy.push({ height, panel: r });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.keyboard.press('Escape');
  await page.waitForFunction(
    () => document.activeElement?.id === 'mobile-prompt-dock-collapsed',
  );
  check(
    await trigger.evaluate((e) => e === document.activeElement),
    'mobile Escape restores focus',
  );
  await trigger.tap();
  await page.mouse.click(3, 90);
  check(!(await panel.isVisible()), 'mobile backdrop closes');
  await mobile.locator('nav button[data-stitch-action="open-prompt"]').tap();
  check(await panel.isVisible(), 'source bottom create action opens same dock');
  await page.keyboard.press('Escape');
  await mobile.locator('#mobile-inspiration-search-btn').tap();
  await mobile.getByRole('searchbox', { name: '搜索灵感作品' }).fill('机械姬');
  check(
    (await mobile.locator('[data-stitch-card]:visible').count()) === 1,
    'mobile source compact search filters',
  );
  await mobile.locator('#mobile-inspiration-search-close').tap();
  check(
    (await mobile.locator('[data-stitch-card]:visible').count()) === 4,
    'mobile clear restores original masonry',
  );
  await trigger.tap();
  await page.setViewportSize({ width: 768, height: 900 });
  await page.waitForTimeout(100);
  check(
    !(await panel.isVisible()),
    'mobile dock dismisses at desktop breakpoint',
  );
  await page.emulateMedia({ reducedMotion: 'reduce' });
  check(
    (await desktop
      .locator('.auto-scroll-track')
      .evaluate((e) => getComputedStyle(e).animationName)) === 'none',
    'reduced-motion disables source stream',
  );
  check(results.runtimeErrors.length === 0, 'no runtime page errors');
  check(results.externalRequests.length === 0, 'all media/fonts stay local');
  check(results.serviceRequests.length === 0, 'no business fetch/XHR');
  results.result = 'PASS';
  fs.writeFileSync(
    `${out}browser-results.json`,
    JSON.stringify(results, null, 2) + '\n',
  );
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
