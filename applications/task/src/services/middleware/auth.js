import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next, secret, user) => {
  const freePass = ['/users', '/users/login'];

  if (freePass.some((value) => value === req.path)) {
    return next();
  }

  try {
    const token = req.get('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, secret);

    const userFound = await user.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!userFound) {
      throw new Error();
    }

    req.user = userFound;
    req.token = token;
    next();
  } catch(err) {
    res.status(401).send({ err: 'Please authenticate.' })
  }
};