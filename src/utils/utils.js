export const getSlugFromServiceName = (serviceName) => {
  if (typeof serviceName !== 'string' || serviceName.trim() === '') {
    return '';
  }

  return serviceName.trim().toLowerCase().replace(/\s+/g, '-'); 
};

export const getServiceNameFromSlug = (slug) => {
  if (typeof slug !== 'string' || slug.trim() === '') {
    return '';
  }
  const withSpaces = slug.replace(/-/g, ' ');

  return withSpaces.replace(/\b\w/g, (char) => char.toUpperCase());
};