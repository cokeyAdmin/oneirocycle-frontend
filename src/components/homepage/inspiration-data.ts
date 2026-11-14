export type InspirationItem = {
  id: string;
  title: string;
  mobileTitle: string;
  category: '短剧' | '动画' | '科幻';
  visual: 'city' | 'orb' | 'mountain' | 'portrait';
  author: string;
  duration: string;
  likes: string;
  illustrative: true;
};

export const inspiration: InspirationItem[] = [
  {
    id: 'roommate',
    title: '女生合租的神秘室友',
    mobileTitle: '雨夜霓虹漫步实录',
    category: '短剧',
    visual: 'city',
    author: 'Neo',
    duration: '03:10',
    likes: '3.4k',
    illustrative: true,
  },
  {
    id: 'cyber',
    title: '螺妹妹的馈赠 · 赛博志异',
    mobileTitle: '赛博机械姬·醒',
    category: '科幻',
    visual: 'portrait',
    author: 'Cyber',
    duration: '00:48',
    likes: '2.1k',
    illustrative: true,
  },
  {
    id: 'adventure',
    title: '呱呱和辣条的奇妙冒险',
    mobileTitle: '琉璃星云·意识肖像',
    category: '动画',
    visual: 'orb',
    author: 'Kling',
    duration: '01:45',
    likes: '1.8k',
    illustrative: true,
  },
  {
    id: 'dream',
    title: '听见你的心声 · 日漫风纯爱',
    mobileTitle: '光子坍缩与虚空梦境',
    category: '动画',
    visual: 'mountain',
    author: 'Oneiro',
    duration: '02:15',
    likes: '956',
    illustrative: true,
  },
];

export const features = [
  {
    title: '智能编导',
    description: '剧本与分镜智导',
    icon: 'spark',
    badge: 'NEW',
  },
  {
    title: '电商画布',
    description: '商业模特与商品图',
    icon: 'bag',
    badge: '',
  },
  {
    title: '短剧工作室',
    description: '短剧全流程创作',
    icon: 'film',
    badge: 'HOT',
  },
  {
    title: '动效工作室',
    description: '物理仿真与运镜',
    icon: 'orbit',
    badge: '',
  },
  {
    title: '环梦画布',
    description: '串联灵感，自由创作',
    icon: 'grid',
    badge: 'CANVAS',
  },
  {
    title: '智能编辑',
    description: '标记画面，精准修改',
    icon: 'wand',
    badge: '',
  },
  { title: '爆笑短剧', description: '爆款网感模版', icon: 'smile', badge: '' },
  {
    title: '故事剧本',
    description: '情节自洽长篇构建',
    icon: 'book',
    badge: 'PRO',
  },
] as const;

export function filterInspiration(query: string, category: string) {
  const normalized = query.trim().toLocaleLowerCase();
  return inspiration.filter(
    (item) =>
      (category === '全部作品' || item.category === category) &&
      `${item.title} ${item.mobileTitle} ${item.category} ${item.author}`
        .toLocaleLowerCase()
        .includes(normalized),
  );
}
