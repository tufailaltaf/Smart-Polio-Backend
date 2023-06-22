//External Lib Import
const { Int32 } = require("mongodb");
const { model, Schema } = require("mongoose");

const EmployeeRewardSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId
    },
    rewards: {
      type: Number
    }
  }
);

const EmployeeRewardModel = new model("view_employee_rewards", EmployeeRewardSchema);
module.exports = EmployeeRewardModel;
