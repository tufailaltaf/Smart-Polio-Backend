//External Lib Import
const RankingRoutes = require("express").Router();
const RankingControllers = require("../controller/Ranking/RankingControllers");
const { CheckEmployeeAuth, CheckAdminAuth } = require("../middleware/CheckAuthLogin");

//RankingList
RankingRoutes.get(
  "/RankingList/:pageNumber/:perPage/:searchKeyword",
  CheckEmployeeAuth,
  RankingControllers.RankingList,
);

module.exports = RankingRoutes;
