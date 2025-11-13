/* global process */
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Quiz = require("../models/quizModel");
const { firestore } = require("firebase-admin");

/**
 * Generate JWT
 *
 * @desc Generates a JSON Web Token upon logging in and creating an account
 * @param {String} id - The given user id
 * @param {String} expiresIn - The given token expiration time
 * @returns {String} - JWT
 * @throws {Error} If any required field is missing, or if a user with the same email already exists.
 */
const generateToken = (id, expiresIn = "30d") => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

exports.getUserProfile = async (req, res, next) => {
  try{
    const user = await User.findOne({email: req.user.email}).select(['firstname', 'lastname', 'email', 'experience', 'note', 'avatarUrl', 'favorites', 'histories']);
    console.log(user);
    res.status(200).json(user);
  } catch (error){
    console.log(error);
  }
};

exports.signInAdmin = async (req, res, next) => {
  try{
    const {email} = req.body;
    const user = await User.findOne({email: email}).select(['role']);
    
    if (!user){
      res.status(200).json({result: false});
    }
    else{
      console.log(user);
      if (user.role >= 1)
        res.status(200).json({result: true});
      else
        res.status(200).json({result: false});
    }
  } catch (error){
    console.log(error);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try{
    const {firstname, lastname, experience, note} = req.body;
    
    const quizzes = await Quiz.find();
    const level = quizzes.find((quiz) => quiz.title == experience)?.level;

    await User.findOneAndUpdate(
      {email: req.user.email}, 
      {
        $set: {
          firstname: firstname,
          lastname: lastname,
          experience: experience,
          level: level,
          note: note
        }
      });
    res.status(200).json();
  } catch (error){
    console.log(error);
  }
};

exports.updateUserExperience = async (req, res, next) => {
  try{
    const {experience} = req.body;
    
    const quizzes = await Quiz.find();
    
    var level = 0;
    var index = quizzes.findIndex(quiz => quiz.title == experience);
    
    if (index != -1)
      level = quizzes[index].level;
   
    await User.findOneAndUpdate(
      {email: req.user.email}, 
      {
        $set: {
          experience: experience,
          level: level,
        }
      });
    res.status(200).json();
  } catch (error){
    console.log(error);
  }
};

exports.updateUserAvatarUrl = async (req, res, next) => {
  try{
    console.log("update avatar url");
    
    const {avatarUrl} = req.body;
    await User.findOneAndUpdate(
      {email: req.user.email},
      {
        $set: {
          avatarUrl: avatarUrl
        }
      }
    );
    res.status(200).json();
  } catch (error){
    console.log(error);
  }
};

exports.registerUser = async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
  } = req.body;
  let newUserObject = {};
  console.log("this is req", req.body);
  if (!firstname || !lastname || !email ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email });
  console.log("this is userExists", userExists);
  if (userExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }

  // //Image upload
  // if (req.file?.buffer) {
  //   const image = await uploadImage(req.file.buffer);
  //   newUserObject.image = image;
  // }

  newUserObject = {
    ...newUserObject,
    firstname,
    lastname,
    email,
    experience : '',
    level: 0,
    role: 0,
    note : '',
    favorites: [],
    notes: [],
    histories: [],
  };
  console.log("this is newUserObject", newUserObject);
  let user = await User.create(newUserObject);
  console.log("this is user", user);

  try{
    user = await user.save();
  
  } catch(e){
    console.log(e);
  }
  
  if (user) {
    //token
    res.status(200).json();
  } else {
    res.status(500);
    throw new Error("Invalid user data");
  }
};

exports.getUsers = async (req, res, next) => {
  try{
    const {search = '', page = 1, perPage = 10} = req.query;
    
    const skip = (page - 1) * perPage;
    const query = { $or: [ 
      {"email": { $regex: search, $options: 'i' } },
      {"firstname": { $regex: search, $options: 'i' } },
      {"lastname": { $regex: search, $options: 'i' } },
    ]};

    const totalCount = await User.countDocuments(query);
    const result = await User.find(query).select(['firstname', 'lastname', 'email', 'experience', 'note', 'role']).skip(skip).limit(perPage);

    console.log(result);
    
    res.status(200).json({count: totalCount, users: result});
  } catch (error){
    console.log(error);
  }
};

exports.getUser = async (req, res, next) => {
  try{
    const user = await User.findOne({_id: req.params.id});
    
    res.status(200).json(user);
  } catch (error){
    console.log(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try{
    
    await User.findOneAndDelete({_id: req.params.id})
    .then(result => {
      console.log('Document deleted successfully:', result);
      res.status(200).json({result: true});
    })
    .catch(error => {
      console.error('Error deleting document:', error);
      res.status(200).json({result: false, message: error});
    });

  } catch (error){
    console.log(error);
  }
};
