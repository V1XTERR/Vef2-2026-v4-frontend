import type { News } from '../types/api';
import { NewsItem } from './NewsItem';

export function NewsList({ items }: { items: News[] }) {
  if (items.length === 0) {
    return <p className="status-message">Engar fréttir fundust.</p>;
  }

  return (
    <section className="news-grid">
      {items.map((item) => (
        <NewsItem key={item.id} news={item} />
      ))}
    </section>
  );
}
