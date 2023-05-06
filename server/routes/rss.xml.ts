import { serverQueryContent } from "#content/server";
import RSS from 'rss';

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: 'Melvin van Megen',
    site_url: 'https://blog.melvinvmegen.com',
    feed_url: `https://blog.melvinvmegen.com/rss.xml`,
  })

  const contents = await serverQueryContent(event).sort({ last_updated: -1 }).where({ _partial: false }).find();
  const blogPosts = contents.filter(content => ['posts', 'snippets'].some(condition => content?._path?.includes(condition)));
  for (const post of blogPosts) {
    feed.item({
      title: post.title,
      url: `https://blog.melvinvmegen.com${post._path}`,
      description: post.description,
      categories: [post.category],
      date: post.date,
      language: 'en-US',
    })
  }
  
  const feedString = feed.xml({ indent: true })
  event.node.res.setHeader('Content-Type', 'text/xml');
  event.node.res.end(feedString);
});
