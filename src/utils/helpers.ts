export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('is-IS', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(dateString));
}

export function buildApiUrl(path: string) {
  return `${path.startsWith('http') ? '' : ''}${path}`;
}
