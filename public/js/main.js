// Truy cập
let tableContainEl = document.querySelector(".table-responsive tbody"); 
tableContainEl.innerHTML = "";
let containerEl = document.querySelector(".container");

let users = [];
// API lấy danh sách users
function getUsersAPI() {
    return axios.get("/users");
}

// Lấy danh sách users
async function getUsers() {
    try {
        const res = await getUsersAPI();
        users = res.data;

        renderUser();
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}

users.sort(function(a, b){a.id - b.id});

function removePopUp(){
    let popUp = document.querySelector(".tmp-para");
    containerEl.removeChild(popUp);
}


function delUser(userId){
    axios.delete(`/users/${userId}`);
    removePopUp();
    getUsers();
}

function popUpDel(userId){
    let popUp = document.createElement("p");
    popUp.classList.add("tmp-para");
    popUp.innerHTML = `Bạn có muốn xóa user này không? <br> <a style="cursor: pointer;" onclick = "delUser(${userId})">Có</a> &ensp; <a style="cursor: pointer;" onclick = "removePopUp()">Không</a>`;
    containerEl.appendChild(popUp);
}

// render user từ danh sách users
function renderUser(){
    if(users.length == 0){
        tableContainEl.innerHTML = "<tr>Không có user nào</tr>";
        return;
    }
    tableContainEl.innerHTML = "";
    
    // users được sắp xếp theo id tăng dần nên xếp ngược lại
    for(let i = users.length - 1; i >= 0; i--){
        tableContainEl.innerHTML += `
    <tr>
        <td>${users[i].name}</td>
        <td>${users[i].birthday}</td>
        <td>${users[i].email}</td>
        <td>${users[i].phone}</td>
        <td>
            <a href="/edit.html?id=${users[i].id}" class="text-info"><i class="fa fa-edit"></i> Chỉnh sửa</a>
            |
            <a class="text-danger" onclick = "popUpDel(${users[i].id})"><i class="fa fa-trash-alt"></i> Xóa</a>
        </td>
    </tr>
    `
    }
}
getUsers();

