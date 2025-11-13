const Tag = require("../models/tagModel");

exports.getTags = async (req, res, next) => {
  try{
    console.log("getTags");

    const tags = await Tag.find({}).populate('featuredCollections', 'id title thumbnail exerciseCount');
    
    console.log(tags[0].featuredCollections);
    res.status(200).json(tags);
  } catch(e) {
    console.log(e);
  }
  
};

exports.getTagNames = async (req, res, next) => {
  try{
    console.log("getTagNames");

    const tags = await Tag.find({});
    
    res.status(200).json(tags);
  } catch(e) {
    console.log(e);
  }
  
};


exports.getTag = async (req, res, next) => {
  try{
    console.log("get tag");

    const tag = await Tag.findOne({_id: req.params.id}).populate('featuredCollections', 'id title thumbnail exerciseCount');
    
    res.status(200).json(tag);
  } catch(e) {
    console.log(e);
  }
  
};

exports.addTag = async (req, res, next) => {
  try{
    console.log("addTag");
    const {name, featuredCollections} = req.body;
    
    const documentToInsert = {
      name: name,
      featuredCollections: featuredCollections,
    };
    
    const tag = await Tag.create(documentToInsert);
    if (tag)
      res.status(200).json({result: true});
    else
      res.status(200).json({result: false});
  } catch(e) {
    console.log(e);
  }
  
};

exports.updateTag = async (req, res, next) => {
  try{
    console.log("updateTag");
    const {_id, name, featuredCollections} = req.body;
    
    await Tag.findOneAndUpdate({_id: _id}, {name: name, featuredCollections: featuredCollections}).then(doc => {
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

exports.deleteTag = async (req, res, next) => {
  try{
    console.log("deleteTag");
    const _id = req.params.id;
    
    await Tag.findOneAndDelete({_id: _id})
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
