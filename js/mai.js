// $ npm i -g json-server
// $ json-server -w db.json -p 8000
// http://localhost:8000/products
let API = "http://localhost:8000/users";
let body = document.querySelector("body");
let btn_signIn = document.querySelector(".btn_signIn");
let modalWindow = document.querySelector(".modalWindow");
btn_signIn.addEventListener("click", () => {
  modalWindow.style.display = "block";
  modalWindow.style.display = "flex";
  modalWindow.style.flexDirection = "column";
  modalWindow.style.justifyContent = "space-around";
  //   modalWindow.style.backgroundColor = "blueviolet";
  modalWindow.style.alignItems = "center";
  body.style.backgroundColor = "green";
});

let inpName = document.querySelector(".inputName");
let inpSurName = document.querySelector(".inputSurName");
let inpNum = document.querySelector(".inputNumber");
let inpImg = document.querySelector(".inputImg");
let btnSave = document.querySelector(".saveContact");
let allInps = document.querySelectorAll(".allInputs");

let list = document.querySelector(".task-list");

btnSave.addEventListener("click", () => {
  if (!inpName.value.trim()) {
    alert("Заполните имя");
  } else if (!inpSurName.value.trim()) {
    alert("Заполните фамилию");
  } else if (!inpNum.value.trim()) {
    alert("Заполните номер телефон");
  } else if (!inpImg.value.trim()) {
    alert("Загрузите ссылку на фото");
  }
  let obj = {
    name: inpName.value,
    surname: inpSurName.value,
    number: inpNum.value,
    link_img: inpImg.value,
  };
  alert("Данные успешно отправлены");
  modalWindow.style.display = "none";
  createTask(obj);
  readTask();
});
function createTask(elem) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(elem),
  }).then(() => readTask());
}
let olContacts = document.querySelector(".olContacts");
olContacts.style.display = "flex";
olContacts.style.flexDirection = "column";
olContacts.style.justifyContent = "space-around";

function readTask() {
  fetch(API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      olContacts.innerHTML = "";
      data.forEach((element) => {
        olContacts.innerHTML += `
        <li id =${element.id} class ="liClass">
        <span class = "spans">${element.name}</span>
        <span class = "spans">${element.surname}</span>
        <span class = "spans">${element.number}</span>
        <button id =${element.id} class="btnDelete">Delete</button>
        <button id =${element.id} class="btnEdit">Edit</button>
        <span"><img src="${element.link_img}" alt=""></span>
        </li>`;
      });
    });
}
readTask();

// ! DELETED =========================================
let btnDelete = document.querySelector(".btnDelete");
document.addEventListener("click", (e) => {
  let del_class = [...e.target.classList];
  if (del_class.includes("btnDelete")) {
    const id = e.target.id;
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => readTask());
  }
});

let modalWindow1 = document.querySelector(".modalWindow1");

let inpName1 = document.querySelector(".inputName1");
let inpSurName1 = document.querySelector(".inputSurName1");
let inpNum1 = document.querySelector(".inputNumber1");
let inpImg1 = document.querySelector(".inputImg1");

let saveContact1 = document.querySelector(".saveContact1");

document.addEventListener("click", (e) => {
  let edit_class = [...e.target.classList];
  if (edit_class.includes("btnEdit")) {
    modalWindow1.style.display = "block";
    const id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        inpName1.value = data.name;
        inpSurName1.value = data.surname;
        inpNum1.value = data.number;
        inpImg1.value = data.link_img;
        saveContact1.setAttribute("id", data.id);
      });
  }
});

saveContact1.addEventListener("click", () => {
  let editTask = {
    name: inpName1.value,
    surname: inpSurName1.value,
    number: inpNum1.value,
    link_img: inpImg1.value,
    // id: inpEdit.id,
  };
  editedTask(editTask, saveContact1.id);
  modalWindow1.style.display = "none";
});
function editedTask(editTask, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(editTask),
  }).then(() => readTask());
}
