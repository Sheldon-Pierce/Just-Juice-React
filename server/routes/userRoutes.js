import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import protectRoute from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

//TODO: redefine expiresIn

const genToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '60d' });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password.');
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('We already have an account with that email address.');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    });
  } else {
    res.json(400);
    throw new Error('Invalid user data');
  }
});

const updateUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id);

  if(user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email
    if(req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: genToken(updatedUser._id),
      createdAt: updatedUser.createdAt,
    })
  } else {
    res.status(404)
    throw new Error('User not found.')
  }
})


const getUsers = asyncHandler(async(req, res) => {
  const users = await User.find({})
  res.json(user);
})

const deleteUser = asyncHandler(async(req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id)
    res.json(user);
  } catch (error) {
    res.status(404)
    throw new Error('This user could not be found.')
  }
})




userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/profile/:id').put(protectRoute, updateUserProfile)
// userRoutes.route('/').get(protect, admin, getUsers);
// userRoutes.route('/:id').delete(protect, admin, deleteUser);

export default userRoutes;

