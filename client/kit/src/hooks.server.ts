import type { Handle } from "@sveltejs/kit";
import { get } from "$lib/axios";
import { getTokenCookie } from "$lib/stores/auth";
import { getThemeCookie } from "$lib/stores/theme";

const NON_PROTECTED_ROUTES = ["/kit/login"];

const isNonProtected = (url: URL): boolean => {
  return NON_PROTECTED_ROUTES.includes(url.pathname);
};

export const handle: Handle = async ({ event, resolve }) => {
  const theme = getThemeCookie(event.cookies) || null;

  event.locals.theme = theme;

  if (isNonProtected(event.url)) {
    return resolve(event);
  }

  const token = getTokenCookie(event.cookies);

  if (!token) {
    return new Response(null, { status: 302, headers: { Location: "/kit/login" } });
  }

  try {
    const { data } = await get("users/me", {}, decodeURIComponent(token));

    event.locals.user = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      scope: data.role,
    };

    return resolve(event);
  } catch {
    return new Response(null, { status: 302, headers: { Location: "/kit/login" } });
  }
};
