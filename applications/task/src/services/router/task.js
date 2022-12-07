import { Router } from 'express';
import { createResource, fetchResource, deleteResource, updateResource } from '../handlers/genericHandler.js';

const route = '/tasks';
const idRoute = `${route}/:id`;

// GET /tasks?completed=true
const getTasksQueryMatch = (query) => {
  const match = {};

  if (query.completed) {
    match.completed = query.completed === 'true';
  };

  return match;
};

// GET /tasks?limit=10&skip10
const getTasksQueryOptions = (query) => {
  return {
    limit: parseInt(query.limit),
    skip: parseInt(query.skip)
  };
};

// GET /tasks?sortBy=createdAt:desc
const getTasksQuerySort = (query) => {
  const sort = {};

  if (query.sortBy) {
    const parts = query.sortBy.split(':');

    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  return sort;
};

export const setupTaskRouter = (Task) => {
  const taskRouter = new Router();

  // Create task
  taskRouter.post(route, async (req, res) => 
    await createResource(Task, req, res, { ...req.body, owner: req.user._id })
  );

  // Get all task from current owner
  taskRouter.get(route, async (req, res) => {
    try {
      await req.user.populate({ 
        path: 'tasks', 
        match: getTasksQueryMatch(req.query), 
        options: { 
          ...getTasksQueryOptions(req.query), 
          sort: getTasksQuerySort(req.query) 
        } , 
      });
      
      res.send(req.user.tasks);
    } catch(error) {
      res.status(500).send();
    }
  });

  // Get a specific task from current owner
  taskRouter.get(idRoute, async (req, res) => 
    await fetchResource(Task, req, res, { _id: req.params.id, owner: req.user._id })
  );

  // Delete task
  taskRouter.delete(idRoute, async (req, res) => 
    await deleteResource(Task, res, { _id: req.params.id, owner: req.user._id })
  );

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