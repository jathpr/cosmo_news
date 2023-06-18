import { useEffect, useState } from "react";

type Report = {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
};

type Response = {
  count: number;
  next: string;
  previous: string;
  results: Report[];
};
export const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);

  const getReports = async () => {
    const response = await fetch(
      "https://api.spaceflightnewsapi.net/v4/reports/"
    );
    const reports: Response = await response.json();
    return reports.results;
  };
  useEffect(() => {
    getReports().then(setReports);
  }, []);
  return (
    <div>
      {reports.map((report) => (
        <li key={report.id}>
          {report.title}
          <img src={report.image_url} alt={report.title} width={400} />
          {report.summary}
        </li>
      ))}
    </div>
  );
};
