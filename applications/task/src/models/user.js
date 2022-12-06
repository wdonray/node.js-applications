import { Schema, model } from 'mongoose';
import validator from 'validator';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUserModel = () => {
  const schema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (validator.isEmail(value)){
          return;
        }
        throw new Error('Email is invalid');
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
      validate(value) {
        if(!value.includes('password')) {
          return;
        }
        throw new Error('Password is invalid');
      }
    },
    age: {
      type: Number,
      default: 1,
      validate(value) {
        if(value >= 1) {
          return;
        }
        throw new Error('Cannot be 0 years old.')
      }
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        }
      }
    ]
  });

  schema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
  });

  // Hash the plain text password before saving
  schema.pre('save', async function (next) {
    const user = this;
    
    if (user.isModified('password')) {
      user.password = await hash(user.password, 8);
    }

    next();
  });

  if (!schema.options.toJSON) {
    schema.options.toJSON = {}; 
  }

  schema.options.toJSON.transform= function (_doc, ret) {
    delete ret.password;
    delete ret.tokens;
    delete ret.__v;
    return ret;
  }

  return model('User', schema);
}

export const findByCredentials = async (userModel, email, password) => {
  try {
    const user = await userModel.findOne({ email });
  
    if (!user) {
      throw new Error('Unable to login');
    }
  
    const isMatch = await compare(password, user.password);
  
    if(!isMatch) {
      throw new Error('Unable to login');
    }
  
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

export const generateAuthToken = async (user, secret) => {
  try {
    const token = jwt.sign({ _id: user._id.toString() }, secret);
    user.tokens = user.tokens.concat({ token });
 
    await user.save();

    return token;
  } catch (err) {
    throw new Error(err);
  }
}
