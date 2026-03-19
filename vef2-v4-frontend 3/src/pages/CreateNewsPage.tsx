import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNews } from '../api/news';
import { HttpError } from '../api/fetcher';
import { NewsForm } from '../components/NewsForm';
import type { ApiError } from '../types/api';

function formatApiErrors(details?: ApiError) {
  if (!details) {
    return '';
  }

  if (details.errors?.length) {
    return details.errors.map((error) => `${error.path}: ${error.message}`).join(', ');
  }

  return details.message ?? '';
}

export function CreateNewsPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handleSubmit(values: {
    title: string;
    intro: string;
    content: string;
    authorId: number;
  }) {
    setSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const createdNews = await createNews(values);
      setSuccessMessage('Frétt var búin til. Nú opnast fréttasíðan.');
      navigate(`/frett/${createdNews.slug}`);
    } catch (err) {
      if (err instanceof HttpError) {
        setError(formatApiErrors(err.details) || err.message);
      } else {
        setError('Ekki tókst að búa til frétt.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">Unnið með gögn</p>
          <h1>Búa til frétt með höfundi</h1>
          <p className="lead">
            Fylltu út formið hér að neðan til að stofna nýja frétt.
          </p>
        </div>
      </div>

      {error ? <p className="status-message error-message">{error}</p> : null}
      {successMessage ? <p className="status-message success-message">{successMessage}</p> : null}

      <NewsForm onSubmit={handleSubmit} submitting={submitting} />
    </section>
  );
}
