function login() {

    var user = JSON.parse(localStorage.getItem("tabofUsers"));
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var i = 0;
    while (i < user.length) {

        if ((username == user[i].firstname) && (password == user[i].password)) {
            console.log(user[i].firstname);
            alert('you are logged');
            localStorage.setItem("loggedId", user[i].id);
            document.location.href = "addTask.html";
            break;

        }

        else {
            i++;
        }

    }
    if (i == user.length) {
        alert('verify your data');
    }
}

function logout() {
    localStorage.removeItem("loggedId");
    document.location.href = "index.html";
}




function Add() {

    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var dateb = document.getElementById("date").value;
    var password = document.getElementById("pwd").value;

    var tabofUsers = JSON.parse(localStorage.getItem("tabofUsers"));//Retrieve the stored data 

    if (tabofUsers == null) {
        var tabofUsers = [];

    }
    //var tabtask=[];
    var user = {
        id: generateUid(),
        firstname: firstname,
        lastName: lastname, email: email, date: dateb, password: password,
        tasks: []

    };

    tabofUsers.push(user);
    localStorage.setItem("tabofUsers", JSON.stringify(tabofUsers));
    alert("The data was saved.");
    return true;

}





function lister() {

    var tabuser = [];
    tabuser = JSON.parse(localStorage.getItem("tabofUsers"));
    var render = '<table table id="tab1">';
    render += "<tr><th>ID</th><th>FirstName</th><th>Lastname</th><th>Email</th><th>Date</th><th>Password</th><th>Action</th></tr>";

    for (var i in tabuser) {
        var p = tabuser[i];

        render += "<tr><td>" + p.id + "</td><td>" + p.firstname + "</td><td>" + p.lastName + " </td>";
        render += "<td>" + p.email + "</td>";
        render += "<td>" + p.date + "</td>";
        render += "<td>" + p.password + "</td>";
        render += '<td><button onclick="updateUser(' + "" + p.id + ')" class="btnEdit"/>Edit<button onclick="deleteUser(' + "" + p.id + ')" class="btnDelete"/>Delete</td></tr>'

    }
    render += "</table>";
    dvcontainer.innerHTML = render;
}




function generateUid() {
    var uniqueId = Math.round(Math.floor(Math.random() * Math.floor(1000)));

    return uniqueId;
}





function deleteUser(ids) {

    var tabuser = JSON.parse(localStorage.getItem("tabofUsers"));


    for (i = 0; i < tabuser.length; i++) {

        console.log(ids + "" + tabuser[i].id);

        if (tabuser[i].id == ids) {

            tabuser.splice(i, 1);
        }

    }
    localStorage.setItem("tabofUsers", JSON.stringify(tabuser));
    alert("user deleted.");
    lister();


}




function updateUser(idu) {
    var tabuser = JSON.parse(localStorage.getItem("tabofUsers"));
    for (i = 0; i < tabuser.length; i++) {

        if (tabuser[i].id == idu) {

            console.log(idu);
            console.log(tabuser[i].id);
            document.getElementById("ID").value = tabuser[i].id;
            document.getElementById("firstname").value = tabuser[i].firstname;
            document.getElementById("lastname").value = tabuser[i].lastName;
            document.getElementById("date").value = tabuser[i].date;
            document.getElementById("email").value = tabuser[i].email;
            document.getElementById("pwd").value = tabuser[i].password;


        }

    }

}




function edit() {
    var tabofUsers = JSON.parse(localStorage.getItem("tabofUsers"));

    // affect the new user object to the list
    

    var index = parseInt(document.getElementById("ID").value);
    var newfirstname = document.getElementById("firstname").value;
    var newlastname = document.getElementById("lastname").value;
    var newemail = document.getElementById("email").value;
    var newdateb = document.getElementById("date").value;
    var newpassword = document.getElementById("pwd").value;
    for (i = 0; i < tabofUsers.length; i++) {
        if (tabofUsers[i].id ==index ) {
            var tasks=tabofUsers[i].tasks;
    var user = {
        id: index,
        firstname: newfirstname,
        lastName: newlastname,
        email: newemail,
        date: newdateb,
        password: newpassword,
        tasks:tasks
    };
        }}
    // get the list from localstorage
    //var tabofUsers = JSON.parse(localStorage.getItem("tabofUsers"));

    // affect the new user object to the list
    for (j = 0; j < tabofUsers.length; j++) {
        if (tabofUsers[j].id == index) {
            tabofUsers[j] = user;
        }
    }

    // set the list to the localstorage 

    localStorage.setItem("tabofUsers", JSON.stringify(tabofUsers));

}

/**************************Crud Task****************************** */

function AddTask() {

    var name = document.getElementById("nameTask").value;
    var deadline = document.getElementById("deadline").value;

    var task1 = {
        idTask: generateUid(),
        name: name,
        deadline: deadline
    };



    var idUser = JSON.parse(localStorage.getItem("loggedId"));
    var tabofUsers = JSON.parse(localStorage.getItem("tabofUsers"));

    for (i = 0; i < tabofUsers.length; i++) {

        if (tabofUsers[i].id == idUser) {

            (tabofUsers[i].tasks).push(task1);
            localStorage.setItem("tabofUsers", JSON.stringify(tabofUsers));
            alert("Task added succefuly!");
        }

    }
}


function showTasks() {
    var idlogged = JSON.parse(localStorage.getItem("loggedId"));
    var tabofUsers = JSON.parse(localStorage.getItem("tabofUsers"));

    for (i = 0; i < tabofUsers.length; i++) {
        if (tabofUsers[i].id == idlogged) {

            var tabTasks = tabofUsers[i].tasks;
     
            //tabTasks.sort(sortFunction);
    var list = "<table>";
    list += "<tr><th>idTask</th><th>Name</th><th>Deadline</th><th>Action</th></tr>";
    for (j = 0; j < tabTasks.length; j++) {
         //console.log(tabTasks[j].deadline);

        list += "<tr><td>" + tabTasks[j].idTask + "</td>";
        list += "<td>" + tabTasks[j].name + "</td>";
        list += "<td>" + tabTasks[j].deadline + "</td>";
        list += "<td><button onclick='updateTask(" + tabTasks[j].idTask + ")' class='btnEdit'>Edit</button><button onclick='deleteTask(" + tabTasks[j].idTask + ")' class='btnEdit'>Delete</button></td>";
        list += "</tr>";

    }
}
}
    list += "</table>";

    dvcontainer.innerHTML = list;
}

function updateTask(idT) {
    var tabofUsers = JSON.parse(localStorage.getItem("tabofUsers"));
    for (i = 0; i < tabofUsers.length; i++) {

        var tabTasks = tabofUsers[i].tasks;

    }

    for (j = 0; j < tabTasks.length; j++) {
        if (tabTasks[j].idTask == idT) {
            //console.log(idT);
            //console.log(tabTasks[j].idTask);
            document.getElementById("idT").value = tabTasks[j].idTask;
            // console.log(tabTasks[j].idT);
            document.getElementById("nameTask").value = tabTasks[j].name;
            document.getElementById("deadline").value = tabTasks[j].deadline;
        }

    }


}

function editTask() {


    var idT = document.getElementById("idT").value;
    var nameT = document.getElementById("nameTask").value;
    var deadlineT = document.getElementById("deadline").value;
    var newTask = {
        idTask: idT,
        name: nameT,
        deadline: deadlineT

    };
    var idlogged = JSON.parse(localStorage.getItem("loggedId"));
    var tabofUsers = JSON.parse(localStorage.getItem("tabofUsers"));
    for (i = 0; i < tabofUsers.length; i++) {
        if (tabofUsers[i].id == idlogged) {

            var tabTasks = tabofUsers[i].tasks;

        }
    }

    for (j = 0; j < tabTasks.length; j++) {
        console.log(idT);
        //console.log(tabTasks[j].idTask)
        if (tabTasks[j].idTask == idT) {

            tabTasks[j] = newTask;
        }

    }

    localStorage.setItem("tabofUsers", JSON.stringify(tabofUsers));

}


function deleteTask(idT) {
    var looggedId = JSON.parse(localStorage.getItem("loggedId"));
    var tabofUsers = JSON.parse(localStorage.getItem("tabofUsers"));
    for (i = 0; i < tabofUsers.length; i++) {
        if (tabofUsers[i].id == looggedId) {
            var tabTasks = tabofUsers[i].tasks;
        }
    }
    for (j = 0; j < tabTasks.length; j++) {
        
        if (tabTasks[j].idTask == idT) {
            
            tabTasks.splice(j, 1);
        }
    }
    localStorage.setItem("tabofUsers", JSON.stringify(tabofUsers));
    alert("Task deleted!");
    showTasks();
}

function sortFunction(a,b){  
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;  
}
