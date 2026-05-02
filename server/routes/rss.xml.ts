import { queryCollection } from "#imports";
import RSS from "rss";

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: 'Melvin van Megen',
    site_url: 'https://blog.melvinvmegen.com',
    feed_url: `https://blog.melvinvmegen.com/rss.xml`,
  })

  const contents = await queryCollection('content').path(event.path)
    .where("draft", "<>", true)
    .order("id", "DESC")
    .all();
  
  const blogPosts = contents.filter(content => 
    content?.path?.includes('posts') || content?.path?.includes('snippets')
  );
  
  for (const post of blogPosts) {
    feed.item({
      title: post.title,
      url: `https://blog.melvinvmegen.com${post.path}`,
      description: post.description,
      categories: [post.category],
      date: post.last_updated,
      language: 'en-US',
    })
  }
  
  const feedString = feed.xml({ indent: true })
  event.node.res.setHeader('Content-Type', 'text/xml');
  event.node.res.end(feedString);
});
