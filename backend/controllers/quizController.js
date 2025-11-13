const Quiz = require("../models/quizModel");

exports.getQuizzes = async (req, res, next) => {
  try{
    
    const quizzes = await Quiz.find({});

    console.log("getQuizzes " + quizzes);
    res.status(200).json(quizzes);
  } catch(e) {
    console.log(e);
  }
  
};

exports.getQuiz = async (req, res, next) => {
  try{
    
    const quiz = await Quiz.findOne({_id: req.params.id});

    console.log("getQuiz " + quiz);
    res.status(200).json(quiz);
  } catch(e) {
    console.log(e);
  }
  
};

exports.addQuiz = async (req, res, next) => {
  try{
    console.log("addQuiz");
    const {title, level} = req.body;
    
    const documentToInsert = {
      title: title,
      level: level
    };
    
    const quiz = await Quiz.create(documentToInsert);
    if (quiz)
      res.status(200).json({result: true});
    else
      res.status(200).json({result: false});
    
  } catch(e) {
    console.log(e);
  }
  
};

exports.updateQuiz = async (req, res, next) => {
  try{
    console.log("updateQuiz");
    const {_id, title, level} = req.body;
    
    await Quiz.findOneAndUpdate({_id: _id}, {title: title, level: level})
    .then(doc => {
      console.log('Document updated successfully:', doc);
      res.status(200).json({result: true});
    })
    .catch(error => {
      console.error('Error updating document:', error);
      res.status(200).json({result: false, message: error});
    });

  } catch(e) {
    console.log(e);
  }
  
};

exports.deleteQuiz = async (req, res, next) => {
  try{
    console.log("deleteQuiz");
    
    await Quiz.findOneAndDelete({_id: req.params.id})
    .then(result => {
      console.log('Document deleted successfully:', result);
      res.status(200).json({result: true});
    })
    .catch(error => {
      console.error('Error deleting document:', error);
      res.status(200).json({result: false, message: error});
    });

  } catch(e) {
    console.log(e);
  }
  
};
