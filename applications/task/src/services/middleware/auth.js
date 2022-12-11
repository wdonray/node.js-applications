import jwt from 'jsonwebtoken';

const isExactPath = (path) => {
  const exactPathPass = ['/users', '/users/login'];
  return exactPathPass.some((value) => value === path)
}

// TODO: This raises security issues!
const containsPath = (path) => {
  const contains = ['/avatar'];

  return contains.some((value) => path.includes(value));
}

export const authMiddleware = async (req, res, next, secret, user) => {
  if (isExactPath(req.path) || containsPath(req.path)) {
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