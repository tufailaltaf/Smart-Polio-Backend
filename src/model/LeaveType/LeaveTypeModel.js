//External Lib Import
const { model, Schema } = require("mongoose");

const LeaveTypeSchema = new Schema(
  {
    USERID: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    AREANAME: {
      type: String,
      required: true,
      index: false,
      unique: false
    },
    PERSONNAME: {
      type: String,
      required: true,
      index: false,
      unique: false
    },
    PERSONEMAIL: {
      type: String,
      required: true,
    },
    LEAVETYPEDETAIL: {
      type: String,
      index: false,
      unique: false
    },
    LEAVETYPESTATUS: {
      type: Boolean,
      default: false
    },
    LeaveTypeName: {
      type: String,
      default: new Date().getTime(),
      index: false,
      unique: false
    },
  },
  { timestamps: true, versionKey: false },
);

const LeaveTypeModel = new model("LeaveType", LeaveTypeSchema);
module.exports = LeaveTypeModel;
