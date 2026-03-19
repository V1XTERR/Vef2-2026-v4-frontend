import { useEffect, useState } from 'react';
import { getNews } from '../api/news';
import { HttpError } from '../api/fetcher';
import type { News, Pagination as PaginationType } from '../types/api';
import { PAGE_SIZE } from '../utils/constants';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { NewsList } from '../components/NewsList';
import { Pagination } from '../components/Pagination';

export function HomePage() {
  const [items, setItems] = useState<News[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      setError('');

      try {
        const response = await getNews({
          limit: PAGE_SIZE,
          offset: (currentPage - 1) * PAGE_SIZE,
        });

        setItems(response.data);
        setPagination(response.pagination);
      } catch (err) {
        if (err instanceof HttpError) {
          setError(err.message);
        } else {
          setError('Ekki tókst að sækja fréttir.');
        }
      } finally {
        setLoading(false);
      }
    }

    void loadNews();
  }, [currentPage]);

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">Forsíða</p>
          <h1>Nýjustu fréttirnar</h1>
          <p className="lead">
            Hér birtast allar fréttir með titli, útdrætti og höfundi.
          </p>
        </div>
      </div>

      {loading ? <Loading /> : null}
      {!loading && error ? <ErrorMessage message={error} /> : null}
      {!loading && !error ? <NewsList items={items} /> : null}

      {!loading && !error && pagination ? (
        <Pagination
          currentPage={currentPage}
          totalItems={pagination.total}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      ) : null}
    </section>
  );
}
