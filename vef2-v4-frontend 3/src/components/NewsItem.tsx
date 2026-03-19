import { Link } from 'react-router-dom';
import type { News } from '../types/api';
import { formatDate } from '../utils/helpers';

export function NewsItem({ news }: { news: News }) {
  return (
    <article className="card news-card">
      <div className="news-card-meta">
        <span>{news.author.name}</span>
        <span>{formatDate(news.createdAt)}</span>
      </div>
      <h2>{news.title}</h2>
      <p>{news.intro}</p>
      <Link to={`/frett/${news.slug}`} className="inline-link">
        Lesa frétt
      </Link>
    </article>
  );
}
