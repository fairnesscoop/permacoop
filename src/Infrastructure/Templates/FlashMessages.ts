// Credit: https://github.com/leozhao0709/express-flash-message
import { Request, Response, NextFunction } from 'express';

export interface FlashOptions {
  sessionKeyName: string;
}

export const getFlashMessages = (
  req: Request,
  sessionKeyName: string,
  type: string
) => {
  if (
    req.session[sessionKeyName] === undefined ||
    req.session[sessionKeyName][type] === undefined
  ) {
    return [];
  }
  const flashMessages = req.session[sessionKeyName][type];
  req.session[sessionKeyName];
  delete req.session[sessionKeyName][type];
  return flashMessages;
};

export const flashMessages = (sessionKeyName = 'express-flash-message') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    res.locals.flash = (type: string, message: string) => {
      if (req.session[sessionKeyName] === undefined) {
        req.session[sessionKeyName] = {};
      }

      if (req.session[sessionKeyName][type] === undefined) {
        req.session[sessionKeyName][type] = [];
      }
      req.session[sessionKeyName][type].push(message);
    };

    const originalRender = res.render.bind(res);

    res.render = function(
      view: string,
      data?: object,
      callback?: (err: Error, html: string) => void
    ) {
      originalRender(
        view,
        {
          ...data,
          get_flash_messages: (type: string) =>
            getFlashMessages(req, sessionKeyName, type)
        },
        callback
      );
    };

    next();
  };
};
