import { model } from 'mongoose';

export const createResource = async (resourceModel, req, res, body = null) => {
  const modelInstance = new resourceModel(body ?? req.body);
  try {
    const resource = await modelInstance.save();
    
    res.status(201).send(resource);
  } catch(e) {
    res.status(400).send(e);
  }
};

export const fetchResources = async (resourceModel, res, searchObject = null) => {
  if (searchObject === null) {
    res.status(400).send('Please include owner.');
    return;
  }

  try {
    const resources = await resourceModel.find(searchObject);
    res.send(resources);
  } catch(e) {
    res.status(500).send(e);
  }
};

export const fetchResource = async (resourceModel, _req, res, searchObject = null) => {
  if (searchObject === null) {
    res.status(400).send('Please include search.');
    return;
  }

  try {
    const resource = await resourceModel.findOne(searchObject);
    
    if (!resource) {
      res.status(404).send();
      return;
    }

    res.send(resource);
  } catch(e) {
    res.status(500).send(e);
  }
};

export const deleteResource = async (resourceModel, res, searchObject) => {
  if (searchObject === null) {
    res.status(400).send('Please include search.');
    return;
  }

  try {
    const resource = await resourceModel.findOneAndDelete(searchObject);

    if (!resource) {
      res.status(404).send();
      return;
    }

    res.send(resource);
  } catch(e) {
    res.status(500).send(e);
  }
};

export const updateResource = async ({ 
  query = null,
  req, 
  res,
  resourceModel, 
}) => {  
  if (query === null) {
    res.status(404).send('No query.');
    return;
  }

  const acceptedKeys = Object.keys(model(resourceModel.modelName).schema.obj);
  const updates = Object.keys(req.body);

  const isValidOperations = updates.every((update) => acceptedKeys.includes(update));

  if (!isValidOperations) {
    return res.status(400).send({error: 'Invalid updates!'});
  }

  try {
    const updatedResource = await query();

    if (!updatedResource) {
      res.status(404).send();
      return;
    }

    updates.forEach((update) => updatedResource[update] = req.body[update]);
    await updatedResource.save();

    res.send(updatedResource);
  } catch(e) {
    res.status(400).send(e);
  }
};