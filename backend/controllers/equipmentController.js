const Equipment = require("../models/equipmentModel");

exports.getEquipments = async (req, res, next) => {
  try{
    const equipments = await Equipment.find({});
    
    res.status(200).json(equipments);
  } catch(e) {
    console.log(e);
  }
  
};

exports.getEquipment = async (req, res, next) => {
  try{
    const equipment = await Equipment.findOne({_id: req.params.id});
    
    res.status(200).json(equipment);
  } catch(e) {
    console.log(e);
  }
  
};

exports.addEquipment = async (req, res, next) => {
  try{
    console.log("addEquipment");
    const {title, thumbnail, link, price} = req.body;
    
    const documentToInsert = {
      title: title,
      thumbnail: thumbnail,
      link: link,
      price: price,
    };
    
    const equipment = await Equipment.create(documentToInsert);

    if (equipment)
      res.status(200).json({result: true});
    else
      res.status(200).json({result: false});
  } catch(e) {
    console.log(e);
  }
  
};

exports.updateEquipment = async (req, res, next) => {
  try{
    console.log("updateEquipment");
    const {_id, title, thumbnail, link, price} = req.body;
    
    await Equipment.findOneAndUpdate({_id: _id}, {title: title, thumbnail: thumbnail, link: link, price: price})
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

exports.deleteEquipment = async (req, res, next) => {
  try{
    console.log("deleteEquipment");
    await Equipment.findOneAndDelete({_id: req.params.id})
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
