import { Router } from 'express';
import { createResource, fetchResources, fetchResource, deleteResource, updateResource } from '../handlers/genericHandler.js';

const route = '/tasks';
const idRoute = `${route}/:id`;

export const setupTaskRouter = (Task) => {
  const taskRouter = new Router();

  // Create task
  taskRouter.post(route, async (req, res) => await createResource(Task, req, res, { ...req.body, owner: req.user._id }));

  // Get all task from current owner
  taskRouter.get(route, async (req, res) => await fetchResources(Task, res, { owner: req.user._id }));

  // Get a specific task from current owner
  taskRouter.get(idRoute, async (req, res) => await fetchResource(Task, req, res, { _id: req.params.id, owner: req.user._id }));

  // Delete task
  taskRouter.delete(idRoute, async (req, res) => await deleteResource(Task, req, res));

  // Update task
  taskRouter.patch(idRoute, async (req, res) => 
    await updateResource({
      query: async () => await Task.findOne({ _id: req.params.id, owner: req.user._id }),
      req,
      res,
      resourceModel: Task, 
    })
  );
  
  return taskRouter;
};