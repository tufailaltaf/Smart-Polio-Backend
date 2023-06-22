//External Lib Import
const ObjectId = require("mongoose").Types.ObjectId;

//External Lib Import
const RewardModel = require("../../model/Reward/RewardModel");
const EmployeeRewardModel = require("../../model/Reward/EmployeeRewardModel");
const { CreateError } = require("../../helper/ErrorHandler");

const RankingListService = require("../../services/Common/RankingListService");
const LeaveTypeModel = require("../../model/LeaveType/LeaveTypeModel");

const LeaveModel = require("../../model/Leave/LeaveModel");
const LeaveListService = require("../../services/Common/LeaveListService");

  /**
 * @desc LeaveListAdminByStatus
 * @access private
 * @route /api/v1/Leave/LeaveListAdmin/status
 * @methud POST
 */

const RankingList = async (req, res, next) => {
const searchKeyword = req.params.searchKeyword;
  let SearchRgx = { $regex: searchKeyword, $options: "i" };

  try {
    const searchKeyword = req.params.searchKeyword;
    const pageNumber = +req.params.pageNumber;
    const perPage = +req.params.perPage;
  
    const skipRow = (pageNumber - 1) * perPage;

    const result = await EmployeeRewardModel.aggregate([
      {
        $facet: {
          Total: [{ $count: "count" }],
          Data: [
            { $skip: skipRow },
            { $limit: perPage },
          ],
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

  module.exports = {
    RankingList 
  };