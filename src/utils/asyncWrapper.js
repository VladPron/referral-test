export const asyncWrapper = (asyncRouteHandler) => {
  return function routeHandler(req, res, next) {
    return asyncRouteHandler(req, res, next).catch(next);
  };
};
