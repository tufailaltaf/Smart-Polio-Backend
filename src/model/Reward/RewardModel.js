//External Lib Import
const { Int32 } = require("mongodb");
const { model, Schema } = require("mongoose");

const RewardSchema = new Schema(
  {
    LEAVETYPEID: {
      type: Schema.Types.ObjectId,
      ref: "LeaveType",
      required: true,
    },
    POINTS: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true, versionKey: false },
);

const RewardModel = new model("Reward", RewardSchema);
module.exports = RewardModel;
