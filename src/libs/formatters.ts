// This function formats URLs into standard forms.
export function formatURL(url: string) {
  if (url === '') return '';

  url = url.replace(/^(https?:\/\/)?/, '');
  url = url.replace(/^www\./, '');

  url = 'www.' + url;
  url = 'https://' + url;

  return url;
}
