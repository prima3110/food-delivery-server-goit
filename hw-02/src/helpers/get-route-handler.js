const getIdFreeUrl = url => {
    const lastIndex = url.lastIndexOf('/');
    const idString = url.slice(lastIndex +1);
    
    const idNumber = +idString;
    if (idNumber && lastIndex !== -1) {
      return url.slice(0, lastIndex);
    }
    return '/products';
  };

const getRouteHandler = (routerConfig, url) => {
  const clearUrl = getIdFreeUrl(url);
  return routerConfig[clearUrl];
};

module.exports = getRouteHandler;