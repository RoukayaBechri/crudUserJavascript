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

    var user = {
        id: generateUid(),
        firstname: firstname,
        lastName: lastname,
        email: email,
        date: dateb,
        password: password
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

    var index = document.getElementById("ID").value
    var newfirstname = document.getElementById("firstname").value;
    var newlastname = document.getElementById("lastname").value;
    var newemail = document.getElementById("email").value;
    var newdateb = document.getElementById("date").value;
    var newpassword = document.getElementById("pwd").value;
    var user = {
        id: index,
        firstname: newfirstname,
        lastName: newlastname,
        email: newemail,
        date: newdateb,
        password: newpassword
    };

    // get the list from localstorage
    var tabofUsers = JSON.parse(localStorage.getItem("tabofUsers"));

    // affect the new user object to the list
    for (i = 0; i < tabofUsers.length; i++) {
        if (tabofUsers[i].id == index) {
            tabofUsers[i] = user;
        }
    }

    // set the list to the localstorage 

    localStorage.setItem("tabofUsers", JSON.stringify(tabofUsers));

}

