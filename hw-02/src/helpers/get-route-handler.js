const getIdFreeUrl = url => {
  const lastIndex = url.lastIndexOf('/');
  const idString = url.slice(lastIndex + 1);
  const isProductUrl = "/products" && idString && lastIndex !== -1;
  if (url.slice(0, lastIndex) === isProductUrl) {
    return url.slice(0, lastIndex);
  } else if (url.slice(0, lastIndex) !== "/products") {
    return url;
  }
  return '/products';
};

const getRouteHandler = (routerConfig, url) => {
  const clearUrl = getIdFreeUrl(url);
  return routerConfig[clearUrl];
};

module.exports = getRouteHandler;