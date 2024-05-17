const categories = require('../models/category');

const findAllCategories = async (req, res, next) => {
     req.categoriesArray = await categories.find({});
  next();
}


const createCategory = async (req, res, next) => {
  console.log("POST /categories");
  try {
    console.log(req.body);
    req.category = await categories.create(req.body);
    next();
  } catch (error) {
      res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка создания категории" }));
  }
}; 


const findCategoryById = async (req, res, next) => {
  try {
      req.category = await categories.findById(req.params.id);
  next();
  } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify({ message: "Категория не найдена" }));
  }
}; 


const updateCategory = async (req, res, next) => {
  try {
    
    req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка обновления Категории" }));
  }
};


const deleteCategory = async (req, res, next) => {
  try {
    
    req.category = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка удаления Категории" }));
  }
}; 



const checkIsCategoryExists = async (req, res, next) => {
  // Среди существующих в базе категорий пытаемся найти категорию с тем же именем,
  // с которым хотим создать новую категорию
  const isInArray = req.categoriesArray.find((category) => {
    return req.body.name === category.name;
  });
  // Если нашли совпадение, то отвечаем кодом 400 и сообщением
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Категория с таким названием уже существует" }));
  } else {
  // Если категория, которую хотим создать, действительно новая, то передаём управление дальше
    next();
  }
}; 

const checkEmptyName = async (req, res, next) => {
  if (!req.body.name) {
 
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Заполни поле с названием категории" }));
  } else {
   
    next();
  }
}; 



module.exports = {findAllCategories, createCategory,findCategoryById,updateCategory, deleteCategory,checkIsCategoryExists,checkEmptyName}; 