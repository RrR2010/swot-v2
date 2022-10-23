import express from 'express'
import jwt from 'jsonwebtoken'

import { ERRORS } from '../../types/errors'

import authConfig from '../../config/auth.json'

const router = express.Router()

router.all("/*", (req, res, next) => {
  const token = req.headers['authorization'] as string;

  jwt.verify(token, authConfig.secret, (err: any, userInfo: any) => {
    if (err) {
      next(new ERRORS.UnauthenticatedError());
      return;
    }
    req.body.loggedUserId = userInfo.id;
    next(err);
  });
});

export default router