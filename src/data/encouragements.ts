export const encouragements: string[] = [
  '再坚持一下，你已经很棒了。',
  '今天也在认真生活。',
  '每一次专注都在积累未来。',
  '休息一下，大脑也需要呼吸。',
  '你刚刚又完成了一次自我超越。',
  '专注的人会发光。',
  '慢慢来，比较快。',
  '你已经比五分钟前的自己更好了。',
  '了不起的坚持。',
  '成长藏在每一个四十五分钟里。',
  '你做的事，值得全力以赴。',
  '深度工作是最稀缺的能力。',
  '休息不是偷懒，是为了更好地出发。',
  '一步一个脚印，你走得很稳。',
  '专注力是这个时代最好的礼物。',
  '给自己一个微笑，你值得。',
  '保持节奏，你做得很好。',
  '时间看得见你的努力。',
  '今天又是充实的一天。',
  '心流是最美的状态。',
];

export function getRandomEncouragement(exclude?: string): string {
  const pool = exclude
    ? encouragements.filter((e) => e !== exclude)
    : encouragements;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}
