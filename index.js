var input1 = document.getElementById("urlName");
var input2 = document.getElementById("siteUrl");
var URLlist = [];

if (localStorage.getItem("siteContainer") !== null) {
  URLlist = JSON.parse(localStorage.getItem("siteContainer"));
  displayData();
}

function addSite() {
  const isNameValid = validInputs(input1, "msgName");
  const isUrlValid = validInputs(input2, "msgLink");

  if (isNameValid && isUrlValid) {
    const newName = input1.value.trim();

    const isDuplicate = URLlist.some(site => site.name.toLowerCase() === newName.toLowerCase());

    if (!isDuplicate) {
      var site = {
        name: input1.value.trim(),
        link: input2.value.trim()
      };

      URLlist.push(site);
      localStorage.setItem("siteContainer", JSON.stringify(URLlist));
      displayData();
      clearForm();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Bookmark added successfully!',
        showConfirmButton: false,
        timer: 1000
      });

    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Duplicate Name',
        text: 'This website name already exists. Please choose a different name.',
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          title: 'swal-title-center',
          popup: 'custom-popup-style'
        }
      });
    }

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Site Name or Url is not valid, Please follow the rules below :',
      html: `
        <ul style="text-align: left;">
          <li><i class="fas fa-triangle-exclamation text-danger me-2"></i> Site name must contain at least <strong>3 characters</strong></li>
          <li><i class="fas fa-triangle-exclamation text-danger me-2"></i> Site URL must be a valid one</li>
        </ul>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      background: '#fff',
      customClass: {
        title: 'swal-title-center',
        popup: 'custom-popup-style'
      }
    });
  }
}

function displayData() {
  var data = "";
  for (var i = 0; i < URLlist.length; i++) {
    data += `
      <tr>
        <td>${i + 1}</td>
        <td>${URLlist[i].name}</td>
        <td><a href="${URLlist[i].link}" target="_blank"><button class="btn px-3 visit"><i class="fa-regular fa-eye"></i> Visit</button></a></td>
        <td><button class="btn delete" onclick="deleteURL(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
      </tr>`;
  }
  document.getElementById("tab").innerHTML = data;
}

function clearForm() {
  input1.value = "";
  input2.value = "";
}

function deleteURL(index) {
  URLlist.splice(index, 1);
  localStorage.setItem("siteContainer", JSON.stringify(URLlist));
  displayData();
}

function validInputs(element, msgId) {
  var text = element.value.trim();
  var msg = document.getElementById(msgId);
  var regex = {
    urlName: /^[A-Za-z0-9]{3,}(?: [A-Za-z0-9]+)*$/,
    siteUrl: /^https?:\/\/[\w\-]+(\.[\w\-]+)+([\/\w\-.?=&%+]*)?$/
  };

  const isValid = regex[element.id].test(text);
  if (isValid) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.remove("d-none");
  }

  return isValid;
}
