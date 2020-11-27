import { get } from '../utils/axios';

export default async (req, res, next) => {
  // Catch only sapper routing
  if (req.url.startsWith('/client') || req.url.startsWith('/service-worker')) {
    return next();
  }

  const token = req.cookies?.permacoop_token;

  if (!token) {
    return next();
  }

  try {
    const {
      data: { id, firstName, lastName, email, role },
    } = await get('users/me', {}, decodeURIComponent(token));
    req.user = {
      id,
      firstName,
      lastName,
      email,
      scope: role,
    };

   return next();
  } catch (e) {
   return next();
  }
};
