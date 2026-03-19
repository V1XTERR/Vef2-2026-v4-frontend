import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { getAuthors } from '../api/authors';
import type { Author } from '../types/api';
import { HttpError } from '../api/fetcher';

type NewsFormValues = {
  title: string;
  intro: string;
  content: string;
  authorId: string;
};

type NewsFormProps = {
  onSubmit: (values: {
    title: string;
    intro: string;
    content: string;
    authorId: number;
  }) => Promise<void>;
  submitting: boolean;
};

const initialValues: NewsFormValues = {
  title: '',
  intro: '',
  content: '',
  authorId: '',
};

export function NewsForm({ onSubmit, submitting }: NewsFormProps) {
  const [values, setValues] = useState<NewsFormValues>(initialValues);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [authorLoading, setAuthorLoading] = useState(true);
  const [authorError, setAuthorError] = useState('');

  useEffect(() => {
    async function loadAuthors() {
      try {
        const response = await getAuthors();
        setAuthors(response.data);
      } catch (error) {
        if (error instanceof HttpError) {
          setAuthorError(error.message);
        } else {
          setAuthorError('Ekki tókst að sækja höfunda.');
        }
      } finally {
        setAuthorLoading(false);
      }
    }

    void loadAuthors();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await onSubmit({
      title: values.title,
      intro: values.intro,
      content: values.content,
      authorId: Number(values.authorId),
    });
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">Titill</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={128}
          value={values.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="intro">Útdráttur</label>
        <textarea
          id="intro"
          name="intro"
          required
          maxLength={500}
          rows={4}
          value={values.intro}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="content">Texti</label>
        <textarea
          id="content"
          name="content"
          required
          rows={10}
          value={values.content}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="authorId">Höfundur</label>
        <select
          id="authorId"
          name="authorId"
          required
          value={values.authorId}
          onChange={handleChange}
          disabled={authorLoading || authors.length === 0}
        >
          <option value="">Veldu höfund</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        {authorLoading ? <p className="field-hint">Sæki höfunda...</p> : null}
        {!authorLoading && !authorError && authors.length === 0 ? (
          <p className="field-error">Engir höfundar fundust. Keyrðu seed/setup á backend gagnagrunninum.</p>
        ) : null}
        {authorError ? <p className="field-error">{authorError}</p> : null}
      </div>

      <button type="submit" className="button" disabled={submitting || authorLoading || !!authorError}>
        {submitting ? 'Vista frétt...' : 'Búa til frétt'}
      </button>
    </form>
  );
}
