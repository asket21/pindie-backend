const mongoose = require('mongoose');

const categoryModel = require('./category');
const userModel = require('./user');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,    
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  users:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: categoryModel,
  }],
 
});

gameSchema.statics.findGameByCategory = function(category) {

  return this.find({}) // Выполним поиск всех игр
  .populate({
    path: "categories",
    match: { name: category } // Опция поможет сопоставить подходящие игры по выбранной категории 
  })
  .populate({
    path: "users",
    select: "-password" // Позволяет получить записи о пользователях за исключением их паролей (они же хранятся в зашифрованном виде)
  })
  .then(games => {
    return games.filter(game => game.catgories.length > 0);
});
};


module.exports = mongoose.model('game', gameSchema);
