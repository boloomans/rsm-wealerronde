export function formatDate(input: string): string {
  const date = new Date(input);
  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
