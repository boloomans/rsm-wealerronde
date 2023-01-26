export function absoluteURL(uri: string) {
  if (uri.indexOf('internal:') === 0){
    return `${uri.replace('internal:', '')}`;
  }
  return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${uri}`;
}
