const gamesRouter = require("express").Router();

const {
  findAllGames,
  createGame,
  findGameById,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIfUsersAreSafe,
  checkIsGameExists,
  checkIsVoteRequest,
} = require("../middlewares/games");


const {
  sendAllGames,
  sendGameCreated,
  sendGameById,
  sendGameUpdated,
  sendGameDeleted,
} = require("../controllers/games");
const { checkAuth } = require("../middlewares/auth");

gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.post(
  "/games",
  findAllGames,
  checkAuth,
  findGameById,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkIsGameExists,
  checkAuth,
  createGame,  
  sendGameCreated
);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.put(
  "/games/:id",
   checkAuth,
  findAllGames,
  findGameById, 
  checkIsVoteRequest,
  checkIfCategoriesAvaliable,
  checkIsGameExists,  
  checkIfUsersAreSafe,
  checkEmptyFields,  
  updateGame,
  sendGameUpdated,  
);
gamesRouter.delete("/games/:id",checkAuth, deleteGame, sendGameDeleted, );
module.exports = gamesRouter;


