import { describe, expect, it } from 'vitest';
import { filterInspiration, inspiration } from './inspiration-data';

describe('local inspiration search', () => {
  it('searches both composition titles and authors without treating input as markup', () => {
    expect(
      filterInspiration('  NEO ', '全部作品').map((item) => item.id),
    ).toEqual(['roommate']);
    expect(
      filterInspiration('螺妹妹', '全部作品').map((item) => item.id),
    ).toEqual(['cyber']);
    expect(filterInspiration('<script>', '全部作品')).toEqual([]);
  });
  it('combines category and query, handles zero/one/many, and resets with blank input', () => {
    expect(filterInspiration('', '动画')).toHaveLength(2);
    expect(filterInspiration('Cyber', '动画')).toHaveLength(0);
    expect(filterInspiration('Cyber', '科幻')).toHaveLength(1);
    expect(filterInspiration(' ', '全部作品')).toEqual(inspiration);
    expect(inspiration.every((item) => item.illustrative)).toBe(true);
  });
});
