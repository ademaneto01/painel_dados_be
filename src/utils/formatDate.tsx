export function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString('pt-BR')} às ${date.toLocaleTimeString(
    'pt-BR',
  )}`;
}
