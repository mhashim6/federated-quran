const extractToken = (request) =>
  request.headers.authorization.substring("Bearer ".length);
export { extractToken };
