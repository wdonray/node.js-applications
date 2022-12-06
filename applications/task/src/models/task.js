import { Schema, model, ObjectId } from 'mongoose';

export const createTaskModel = () => {
  const schema = new Schema({
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: ObjectId,
      required: true,
      ref: 'User',
    }
  });

  if (!schema.options.toJSON) {
    schema.options.toJSON = {}; 
  }

  schema.options.toJSON.transform= function (_doc, ret) {
    delete ret.__v;
    return ret;
  }

  return model('Task', schema);
}
