//Internal Lib Import
const app = require("./app");
const PORT = process.env.PORT || 8080;
const EmployeeModel = require("./src/model/Employee/EmployeeModel");
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
    // EmployeeModel.create({
    //     Email: 'tufailaltaf11@gmail.com',
    //     FirstName: 'Tufail',
    //     LastName: 'Altaf',
    //     Password: 'Admin@123',
    //     Roles: 'ADMIN'
    // })
});
