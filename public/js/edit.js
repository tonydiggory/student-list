let nameEl = document.getElementById("name");
let birthdayEl = document.getElementById("birthday");
let emailEl = document.getElementById("email");
let phoneEl = document.getElementById("phone");
let btnSuccessEl = document.querySelector(".btn-success");
let btnSecondaryEl = document.querySelector(".btn-secondary");

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
        let tmpUrl = window.location.href;
    tmpUrl = tmpUrl.split("=");
    idRecent = tmpUrl[1];
    for(let i = 0; i < users.length; i++){
        if(users[i].id == idRecent){
        nameEl.value = users[i].name;
        birthdayEl.value = users[i].birthday;
        emailEl.value = users[i].email;
        phoneEl.value = users[i].phone;
        break;
    }
}
    } catch (error) {
        console.log(error);
    }
}

getUsers();

function nameValidation(text){
    if(text.length == 0){
        return false;
    }
}
function isNumber(num){
    if(/^\d+$/.test(num)){
        return true;
    }
    return false;
}
function dayValidation(text){
    if(text.length == 0){
        return false;
    }
    let tmp = text.split("/");
    console.log(tmp);
    if(tmp.length != 3){
        return false;
    }
    for(let i = 0; i < tmp.length; i++){
        if(!isNumber(tmp[i])){
            return false;
        }
    }
    if(tmp[0] > 31){
        return false;
    }
    if(tmp[1] == 2){
        if(tmp[2] % 4 == 0){
            if(tmp[0] > 29){
                return false;
            }
        }else if(tmp[2] % 4 != 0){
            if(tmp[0] > 28){
                return false;
            }
        }
    }
    if((tmp[1] % 2 == 0 && tmp[1] <= 7) || (tmp[1] % 2 == 1 && tmp[1] >=8)){
        if(tmp[0] > 30){
            return false;
        }
    }
}

function emailValidation(text){
    text = text.trim();
    let tmp = text.split("@");
    if(text.length == 0){
        return false;
    }
    if(tmp.length != 2){
        return false;
    }
    for(let i = 0; i < tmp.length; i++){
        if(tmp[i] == ""){
            return false;
        }
    }
    tmp[1] = tmp[1].trim();
    let tmp2 = tmp[1].split(".");
    if(tmp2.length != 2){
        return false;
    }
    for(let i = 0; i < tmp2.length; i++){
        if(tmp2[i] == ""){
            return false;
        }
    }
}

function phoneValidation(num){
    if(num.length == 0){
        return false;
    }
    if(!isNumber(num)){
        return false;
    }
}

btnSuccessEl.onclick = function(){
    check = 0;
    if(nameValidation(nameEl.value) == false){
        alert("tên không được để trống");
    }else{
        if(dayValidation(birthdayEl.value) == false){
            alert("sai định dạng ngày");
        }else{
            if(emailValidation(emailEl.value) == false){
                alert("sai định dạng email");
            }else{
                if(phoneValidation(phoneEl.value) == false){
                    alert("sai định dạng phone");
                }else{
                    axios.put(`/users/${idRecent}`, {
                        id: idRecent,
                        name: nameEl.value,
                        email: emailEl.value,
                        phone: phoneEl.value,
                        birthday: birthdayEl.value
                    });
                    location.href = "./index.html";
                }
            }
        }
    }
}

btnSecondaryEl.onclick = function(){
    location.href = "./index.html";
}