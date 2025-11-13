const Intro = require("../models/introModel");

exports.getIntro = async (req, res, next) => {
  try {
    console.log("get intro vimeo id");

    const intro = await Intro.findOne({});

    res.status(200).json(intro);
  } catch (e) {
    console.log(e);
  }

};

exports.updateIntro = async (req, res, next) => {
  try {
    console.log("update intro vimeo id");
    const { vimeoId } = req.body;

    await Intro.findOneAndUpdate({}, { vimeoId: vimeoId }).then(doc => {
      console.log('Document updated successfully:', doc);
      res.status(200).json({ result: true });
    })
      .catch(error => {
        console.error('Error updating document:', error);
        res.status(200).json({ result: false, message: error });
      });

  } catch (e) {
    console.log(e);
  }

};
