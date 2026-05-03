import { queryCollection } from "@nuxt/content/server";
import RSS from "rss";

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: 'Melvin van Megen',
    site_url: 'https://blog.melvinvmegen.com',
    feed_url: `https://blog.melvinvmegen.com/rss.xml`,
  })

  const [posts, snippets] = await Promise.all([
    queryCollection(event, 'posts').where("draft", "IS NOT", true).order("id", "DESC").all(),
    queryCollection(event, 'snippets').where("draft", "IS NOT", true).order("id", "DESC").all(),
  ]);

  const contents = [...posts, ...snippets]
    .filter(p => p.path.startsWith('/posts/') || p.path.startsWith('/snippets/'))
    .sort((a, b) => +b.id - +a.id);

  for (const post of contents) {
    feed.item({
      title: post.title,
      url: `https://blog.melvinvmegen.com${post.path}`,
      description: post.description,
      categories: [post.category],
      date: post.last_updated,
    })
  }

  const feedString = feed.xml({ indent: true })
  event.node.res.setHeader('Content-Type', 'text/xml');
  event.node.res.end(feedString);
});
