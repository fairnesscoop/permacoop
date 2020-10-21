import {get} from '../utils/axios';

export default async (req, res, next) => {
  // Catch only sapper routing
  if (req.url.startsWith('/client') || req.url.startsWith('/service-worker')) {
    return next();
  }

  const token = req.headers?.cookie?.replace('permacoop_token=', '');
  if (!token) {
    req.user = {};

    return next();
  }

  try {
    const {data: {id, firstName, lastName, email, role}} = await get('users/me', {}, decodeURIComponent(token));
    req.user = {
      id,
      firstName,
      lastName,
      email,
      scope: role
    };
    next();
  } catch (e) {
    next();
  }
}

