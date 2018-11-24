const mongoose = require('mongoose');


const MusicSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'authors'
  },
  image: {
    type: String,
    required: false
  },
  views: {
    type: Number,
    default: 0
  },
  artist: {
    type: String,
    require: false
  },
  fileName: {
    type: String
  },
  comments: [{
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'authors'
    },
    content: {
      type: String,
    }
  }]
});

MusicSchema.statics.getPopularSongs = () => {
  return Music.aggregate([
  {
    $sort: { views: -1 }
  }, {
    $limit: 10
  }, {
    $project: {
      name: 1,
      authorId: 1,
      image: 1,
      views: 1,
      artist: 1,
      fileName: 1
    }
  }]);
};

MusicSchema.statics.findMusicById = (musicId) => {
  return Music.findById(musicId);
};

MusicSchema.statics.getRecommendedSongs = () => {
  return Music.find().limit(8).select("-comments -__v");
};

MusicSchema.statics.getRecommendedSongsById = (musicId) => {
  return Music.find({_id : { $ne: musicId }}).limit(8).select("-comments -__v");
};

MusicSchema.statics.getComments = async (musicId) => {
  let result = await Music.findById(musicId);
  
  // for (var i = 0; i < result.comments.length; i++) {
  //   const result = await Author.findById(result.comments[i].authorId);
    // result.comments[i] = {name : res.name, avatar : res.avatar }
    // result.comments[i]["name"] = "hihi";
    // var pair = {name: "hhihi"}
    // result.comments[i] = { ...result.comments[i], ...pair}
    // console.log(result.comments[i]);
  // }
  
  return result;
};

const Music = mongoose.model('musics', MusicSchema);

module.exports = {
  Music
};