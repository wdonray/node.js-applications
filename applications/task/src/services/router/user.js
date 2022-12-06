import { Router } from 'express';
import { updateResource } from '../handlers/genericHandler.js';
import { findByCredentials, generateAuthToken } from '../../models/user.js';

const route = '/users';

export const setupUserRouter = (User, secret) => {
  const userRouter = new Router();
  
  // Login User
  userRouter.post(`${route}/login`, async (req, res) => {
    try {
      const user = await findByCredentials(User, req.body.email, req.body.password);
      const token = await generateAuthToken(user, secret);

      req.user = user;

      res.send({ user, token });
    } catch(err) {
      res.status(400).send();
    }
  });

  // Logout
  userRouter.post(`${route}/logout`, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token; 
      });

      await req.user.save();

      res.send();
    } catch(err) {  
      res.status(500).send();
    }
  });

  // Wipe all tokens
  userRouter.post(`${route}/logoutAll`, async (req, res) => {
    try {
      req.user.tokens = [];

      await req.user.save();

      res.send();
    } catch(err) {  
      res.status(500).send();
    }
  });

  // Create User
  userRouter.post(route, async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();

      const token = await generateAuthToken(user, secret);

      req.user = user;
      
      res.status(201).send({ user, token });
    } catch(e) {
      res.status(400).send(e);
    }
  });

  // Read current user
  userRouter.get(`${route}/me`, (req, res) => {
    res.send(req.user);
  });

  // Delete user
  userRouter.delete(`${route}/me`, async (req, res) => {
    try {
      await req.user.remove();
      res.send(req.user);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // Update User
  userRouter.patch(`${route}/me`, async (req, res) =>
    await updateResource({ 
      query: async () => await User.findById(req.user._id),
      req, 
      res, 
      resourceModel: User, 
    }) 
  );

  return userRouter;
};