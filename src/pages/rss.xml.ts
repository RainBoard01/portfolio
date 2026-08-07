import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getContent } from '@/data';
import { blogPostPath, type BlogPostId } from '@/i18n';

export const GET: APIRoute = async (context) => {
  const content = await getContent('en');
  return rss({
    title: 'Yerko Acuña — Field notes',
    description: content.pages.blog.description,
    site: context.site || 'https://yerkoacuna.dev',
    items: content.blogPosts.map((post) => ({
      title: post.title,
      description: post.excerpt,
      pubDate: new Date(`${post.publishedAt}T00:00:00Z`),
      link: blogPostPath(post.id as BlogPostId, 'en'),
      categories: post.topics,
      author: content.settings.contactEmail,
    })),
    customData: '<language>en-US</language>',
  });
};
