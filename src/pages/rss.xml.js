import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');
  const sorted = articles.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  
  return rss({
    title: 'Formula1 Weekly',
    description: '每週深度 F1 賽事分析，由真正的車迷撰寫',
    site: context.site,
    items: sorted.map((article) => ({
      title: article.data.title,
      pubDate: new Date(article.data.date),
      description: article.data.summary,
      link: `/articles/${article.slug}/`,
    })),
  });
}
