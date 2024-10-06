// This function formats URLs into standard forms.
export function formatURL(url: string) {
  if (url === '') return '';

  url = url.replace(/^(https?:\/\/)?/, '');
  url = url.replace(/^www\./, '');

  url = 'www.' + url;
  url = 'https://' + url;

  return url;
}

// This function formats large numbers into readable strings.
export function formatNumber(count: number): string {
  if (count >= 1_000_000_000_000) {
    return (count / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
  } else if (count >= 1_000_000_000) {
    return (count / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (count >= 1_000) {
    return (count / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return count.toString();
  }
}
