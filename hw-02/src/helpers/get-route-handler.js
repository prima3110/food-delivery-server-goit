const getIdFreeUrl = url => {
  const firstIndex = url.indexOf("/");
  const lastIndex = url.lastIndexOf("/");

  if (lastIndex === 0) {
    return url;
  }

  return url.slice(firstIndex, lastIndex);

};

const getRouteHandler = (routerConfig, url) => {
  const clearUrl = getIdFreeUrl(url);
  return routerConfig[clearUrl];
};

module.exports = getRouteHandler;