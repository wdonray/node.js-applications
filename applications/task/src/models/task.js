import { Schema, model, ObjectId } from 'mongoose';

export const createTaskModel = () => {
  const taskModel = {
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
  };

  const options = {
    timestamps: true,
  };
  
  const schema = new Schema(taskModel, options);

  if (!schema.options.toJSON) {
    schema.options.toJSON = {}; 
  }

  schema.options.toJSON.transform= function (_doc, ret) {
    delete ret.__v;
    return ret;
  }

  return model('Task', schema);
}
