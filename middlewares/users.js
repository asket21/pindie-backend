const users = require("../models/user");
const bcrypt = require("bcryptjs");

const findAllUsers = async (req, res, next) => {
  req.usersArray = await users.find({}); //await users.find({}, { password: 0 }); Можно фильтровать пароль так
  next();
};

const createUser = async (req, res, next) => {
  console.log("POST /api/users")
  try {
   
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания пользователя" }));
  }
};

const findUserById = async (req, res, next) => {
  try {
    req.user = await users.findById(req.params.id); //users.findById(req.params.id, { password: 0 }) Проеция у метода findById
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
  }
};

const updateUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка обновления пользователя" }));
  }
};

const deleteUser = async (req, res, next) => {
 
  try {
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
  }
};

const filterPassword = (req, res, next) => {
  
  const filterUser = (user) => {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  };

  if (req.user) {
    req.user = filterUser(req.user);
  }
  if (req.usersArray) {
    req.usersArray = req.usersArray.map((user) => filterUser(user));
  }
  next();
};

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.password
  ) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Заполни Имя, Почту и Пароль" }));
  } else {
    // Если всё в порядке, то передадим управление следующим миддлварам
    next();
  }
}; 
const checkEmptyNameAndEmail = async (req, res, next) => {
  if (
    !req.body.username ||
    !req.body.email
    
  ) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Заполни Имя и Почту" }));
  } else {
    // Если всё в порядке, то передадим управление следующим миддлварам
    next();
  }
}; 

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Пользователь с таким email уже существует" }));
  } else {
    next();
  }
}; 

const checkPasswordLength = async (req, res, next) => {
  if
  (req.body.password.length < 7){
  
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Пароль Должен быть длинее 7 символов" }));
      
    
  } else {
    next();
  }
}; 



module.exports = {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  filterPassword,
  hashPassword,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  checkPasswordLength
};
