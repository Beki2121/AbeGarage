//function to read the data from the user's  local strorage

const getAuth = async() =>{
    const employee = await JSON.parse(localStorage.getItem('employee'))

    if (employee && employee.employee_token) {
        // console.log("Inside auth if statement");
        const decodedToken = await decodeTokenPayload(employee.employee_token);

        console.log("decodedToken>>>>", decodedToken);

        employee.employee_role = decodedToken.employee_role;
        employee.employee_id = decodedToken.employee_id;
        employee.employee_first_name = decodedToken.employee_first_name;
        employee.employee_last_name = decodedToken.employee_last_name;
        employee.employee_email = decodedToken.employee_email;
        employee.employee_phone = decodedToken.employee_phone;
        employee.active_employee = decodedToken.active_employee;
        employee.date_of_employeed = decodedToken.date_of_employeed;

        return employee;
      } else {
        return {};
      }
}



const decodeTokenPayload = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  };
  
  export default getAuth;
