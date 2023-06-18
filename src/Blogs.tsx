import { useEffect, useState } from "react";

type Event = {
  event_id: number;
  provider: string;
};

type Launch = {
  launch_id: string;
  provider: string;
};

type Blog = {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: true;
  launches: Launch[];
  events: Event[];
};

type Response = {
  count: number;
  next: string;
  previous: string;
  results: Blog[];
};
export const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getBlogs = async () => {
    const response = await fetch(
      "https://api.spaceflightnewsapi.net/v4/blogs/"
    );
    const blogs: Response = await response.json();
    return blogs.results;
  };
  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);
  return (
    <div>
      {blogs.map((blog) => (
        <li key={blog.id}>
          {blog.title}
          <img src={blog.image_url} alt={blog.title} width={400} />
          {blog.summary}
        </li>
      ))}
    </div>
  );
};
