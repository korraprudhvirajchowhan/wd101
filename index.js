const printTable = () => {
  let user_det = fetchData();

  const table_data = user_det
    .map((d) => {
      return `<tr>
            
            <td>${d.name}</td>
            <td>${d.email}</td>
            <td>${d.password}</td>
            <td>${d.dob}</td>
            <td>${d.check}</td>
            </tr>`;
    })
    .join("\n");

  let htmldata = `
    <table>
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>Dob</th>
    <th>Accepted Terms?</th>
    </tr>
    ${table_data}
    </table>
    `;

  document.getElementById("user-table").innerHTML = htmldata;
};

const fetchData = () => {
  let u = localStorage.getItem("u");

  if (u) {
    u = JSON.parse(u);
  } else {
    u = [];
  }
  return u;
};

let dateElement = document.getElementById("dob");
dateElement.addEventListener("input", (e) => {
  let dobValue = e.target.value;

  let dobinDate = new Date(dobValue);

  let age = new Date().getFullYear() - dobinDate.getFullYear(); // Corrected line

  if (age < 18 || age > 55) {
    dateElement.setCustomValidity("Your age is not valid");

    dateElement.reportValidity();
  } else {
    dateElement.setCustomValidity("");
  }
});

let sffunction = (e) => {
  e.preventDefault();

  let email = document.getElementById("email").value;

  let dob = document.getElementById("dob").value;

  let password = document.getElementById("password").value;

  let name = document.getElementById("name").value;

  let check = document.getElementById("acceptedterms").checked;

  const u_data = {
    name,
    email,
    password,
    dob,
    check,
  };

  let user_det = fetchData();

  user_det.push(u_data);

  localStorage.setItem("u", JSON.stringify(user_det));

  printTable();
};

let formelement = document.getElementById("rform");

formelement.addEventListener("submit", sffunction);

printTable();
