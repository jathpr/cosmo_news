import { useEffect, useState } from "react";

type Event = {
  event_id: number;
  provider: string;
};

type Launch = {
  launch_id: string;
  provider: string;
};

type Article = {
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
  results: Article[];
};
export const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const getArticles = async () => {
    const response = await fetch(
      "https://api.spaceflightnewsapi.net/v4/articles/"
    );
    const articles: Response = await response.json();
    return articles.results;
  };
  useEffect(() => {
    getArticles().then(setArticles);
  }, []);
  return (
    <div>
      {articles.map((article) => (
        <li key={article.id}>
          {article.title}
          <img src={article.image_url} alt={article.title} width={400} />
          {article.summary}
        </li>
      ))}
    </div>
  );
};
