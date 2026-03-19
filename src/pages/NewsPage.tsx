import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getNewsBySlug } from '../api/news';
import { HttpError } from '../api/fetcher';
import type { News } from '../types/api';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { formatDate } from '../utils/helpers';

export function NewsPage() {
  const { slug } = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadNews() {
      if (!slug) {
        setLoading(false);
        setError('Frétt fannst ekki.');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await getNewsBySlug(slug);
        setNews(response);
      } catch (err) {
        if (err instanceof HttpError && err.status === 404) {
          setError('Frétt fannst ekki.');
        } else if (err instanceof HttpError) {
          setError(err.message);
        } else {
          setError('Ekki tókst að sækja frétt.');
        }
      } finally {
        setLoading(false);
      }
    }

    void loadNews();
  }, [slug]);

  if (loading) {
    return <Loading text="Hleð frétt..." />;
  }

  if (error) {
    return (
      <section>
        <ErrorMessage message={error} />
        <Link to="/" className="inline-link">
          Aftur á forsíðu
        </Link>
      </section>
    );
  }

  if (!news) {
    return null;
  }

  return (
    <article className="card article-card">
      <p className="eyebrow">Frétt</p>
      <h1>{news.title}</h1>

      <div className="article-meta">
        <span>Höfundur: {news.author.name}</span>
        <span>Birt: {formatDate(news.createdAt)}</span>
        <span>{news.published ? 'Birt' : 'Óbirt'}</span>
      </div>

      <p className="article-intro">{news.intro}</p>
      <div className="article-content">
        {news.content.split('\n').map((paragraph) => (
          <p key={`${news.id}-${paragraph.slice(0, 20)}`}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
