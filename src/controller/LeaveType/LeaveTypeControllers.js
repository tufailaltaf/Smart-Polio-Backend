//External Lib Import
const ObjectId = require("mongoose").Types.ObjectId;

//External Lib Import
const LeaveTypeModel = require("../../model/LeaveType/LeaveTypeModel");
const { CreateError } = require("../../helper/ErrorHandler");

const CheckAssociateService = require("../../services/Common/CheckAssociateService");
const CreateService = require("../../services/Common/CreateService");
const DropDownService = require("../../services/Common/DropDownService");
const ListService = require("../../services/Common/ListService");
const UpdateService = require("../../services/Common/UpdateService");
const DeleteService = require("../../services/Common/DeleteService");
const DetailsService = require("../../services/Common/DetailsService");
const SendMailUtility = require("../../utility/SendMailUtility");
const EmployeesModel = require("../../model/Employee/EmployeeModel");
const RewardModel = require("../../model/Reward/RewardModel")

/**
 * @desc LeaveType Create
 * @access private
 * @route /api/v1/LeaveType/LeaveTypeCreate
 * @methud POST
 */

const LeaveTypeCreate = async (req, res, next) => {
  try {
    // Just to make it unique
    req.body.LeaveTypeName = new Date().getTime();
    const result = await CreateService(req, LeaveTypeModel);
    res.status(201).json(result);
    
    // Get the employee data to send email
    const empData = await EmployeesModel.findById(req.body.USERID);
 console.log(empData)
    // Send Email to Person
    const EmailBody = `<p>Dear ${req.body.PERSONNAME},</p>
    <p>This message is to inform you that our employee <b>NAME: ${empData.FirstName} ${empData.LastName} , Phone No: ${empData.Phone}</b> has been given the task of visiting your home tommorow between 12 pm - 2 pm with regard to polio vaccine.<p>
    <p>Thank you for your cooperation, and we hope to see you soon.</p> <br/><p><b>Note:</b> The image of our employee is Attached in email, please verify it when he comes.</p> <img src="data:image/png;base64,${empData.Image}" alt="Embedded Image"/> `;
    const EmailSubject = `New Visit Information`;
    const Attachments= `${empData.Image}`
    await SendMailUtility(req.body.PERSONEMAIL, EmailBody, EmailSubject, Attachments);

    // Send Email to Assigned Employee
    const EmailBodyEmp = `<p>Dear ${empData.FirstName} ${empData.LastName},</p>
    <p>New task has been assigned to you, please visit <b>${req.body.PERSONNAME}</b> home in ${req.body.AREANAME} area. For Polio Vaccination<p>
    <p>Thank you!</p>`;
    const EmailSubjectEmp = `Task Assignment`;
    await SendMailUtility(empData.Email, EmailBodyEmp, EmailSubjectEmp);
    

  } catch (error) {
    next(error);
  }
};

/**
 * @desc LeaveType List
 * @access private
 * @route /api/v1/LeaveType/LeaveTypeList/:pageNumber/:perPage/:searchKeyword
 * @methud GET
 */

const LeaveTypeList = async (req, res, next) => {
  const searchKeyword = req.params.searchKeyword;
  let SearchRgx = { $regex: searchKeyword, $options: "i" };
  let SearchArray = [{ LeaveTypeName: SearchRgx }];

  try {
    const result = await ListService(req, LeaveTypeModel, SearchArray);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc LeaveType Drop Down
 * @access private
 * @route /api/v1/LeaveType/LeaveTypeDropDown
 * @methud GET
 */

const LeaveTypeDropDown = async (req, res, next) => {
  try {
    const result = await DropDownService(
      req,
      LeaveTypeModel,
      {
        LeaveTypeStatus: true,
      },
      {
        label: "$LeaveTypeName",
        value: "$_id",
      },
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc LeaveType Details
 * @access private
 * @route /api/v1/LeaveType/LeaveTypeDetails/:id
 * @methud GET
 */

const LeaveTypeDetails = async (req, res, next) => {
  try {
    const result = await DetailsService(req, LeaveTypeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc LeaveType Update
 * @access private
 * @route /api/v1/LeaveType/LeaveTypeUpdate/:id
 * @methud PATCH
 */

const LeaveTypeUpdate = async (req, res, next) => {
  try {
    const result = await UpdateService(req, LeaveTypeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc LeaveType  Delete
 * @access private
 * @route /api/v1/LeaveType/LeaveTypeDelete/:id
 * @methud DELETE
 */

const LeaveTypeDelete = async (req, res, next) => {
  try {
    const result = await DeleteService(req, LeaveTypeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc LeaveType Compelte
 * @access private
 * @route /api/v1/LeaveType/LeaveTypeComplete/:id
 * @methud GET
 */

const LeaveTypeComplete = async (req, res, next) => {
  try {

    /*const filter = { id: req.params.id };
    const update = { LEAVETYPESTATUS: true };
    await LeaveTypeModel.findOneAndUpdate(filter, update, {
      returnOriginal: false
    });*/

    // Update Status
    await LeaveTypeModel.updateOne(
      { _id: ObjectId(req.params.id) },
      {
        LEAVETYPESTATUS: true,
      },
    );

    // Add into Ranking
    var reward = new RewardModel({
      LEAVETYPEID: req.params.id,
      POINTS: 10
    });
    //const data = new DataModel(reward);
    var re = await reward.save();

    res.json('Task Completed Successfully!');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  LeaveTypeCreate,
  LeaveTypeDropDown,
  LeaveTypeList,
  LeaveTypeDetails,
  LeaveTypeUpdate,
  LeaveTypeDelete,
  LeaveTypeComplete
};
