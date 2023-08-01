let serverAdress = "https://reqres.in/api/users";

    async function getAllUsers(id) {

        let data;
        let resp = await fetch(serverAdress + "?page=" + id);

        clearUsers();

        if (resp.status == 200) {

            data = await resp.json();
            showUsersOnScreen(data);
        }
        else {

            alert("User not found...");
        }
    }

    function showUsersOnScreen(data) {

        let div = document.getElementById("resultDiv");

        let userData = "";

        for (let user of data.data) {

            userData += '<div class="d-flex justify-content-between flex-row mt-5" style="column-gap: 24px; width: 100%">';
            userData += '<div>';
            userData += '<h4>' + user.first_name + " " + user.last_name + '</h4>';
            userData += '<ul>';
            userData += '<li>' + user.id + '</li>';
            userData += '<li>' + user.email + '</li>';
            userData += '</ul>';
            userData += '</div>';
            userData += '<div>';
            userData += '<img style="border-radius: 50%; width: 125px; height: 125px" src=' + user.avatar + '>';
            userData += '</div>';
            userData += '</div>';
        }

        div.innerHTML = userData;
    }

    async function createUser() {

        let _name = document.getElementById("Name").value;
        let _job = document.getElementById("Job").value;

        if (_name != "" && _job != "") {

            let resp = await fetch(serverAdress, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(getDataFromInputs())
            });

            if (resp.status != 201) {
                alert("An Error occurred.");
            }

            clearInputs();
            alert("Status Code: " + resp.status.toString() + "\n" + "User has been created succesfully.");
        }
        else {

            alert("No fields should be left empty");
        }


    }

    function getDataFromInputs() {

        let _name = document.getElementById("Name").value;
        let _job = document.getElementById("Job").value;

        let user = { name: _name, job: _job }

        return user;
    }

    async function searchUser() {

        let _id = document.getElementById("userId").value;

        if(_id != ""){

            let resp = await fetch(serverAdress + "/" + _id);

            if (resp.status == 200) {

                data = await resp.json();
                showOnScreen(data.data);
            }
            else {

                alert("User not found...");
                clearUser();
            }
        }
        else{
            alert("No fields should be left empty");
        }
    }

    function showOnScreen(data) {

        let div = document.getElementById("resultDiv2");

        let userData = "";

        userData += '<div class="d-flex justify-content-between mt-4" style="column-gap: 24px; width: 100%">';
        userData += '<div>';
        userData += '<h4>' + data.first_name + " " + data.last_name + '</h4>';
        userData += '<ul>';
        userData += '<li>' + data.id + '</li>';
        userData += '<li>' + data.email + '</li>';
        userData += '</ul>';
        userData += '</div>';
        userData += '<div>';
        userData += '<img style="border-radius: 50%; width: 125px; height: 125px" src=' + data.avatar + '>';
        userData += '</div>';
        userData += '</div>';

        div.innerHTML = userData;
    }

    function clearInputs() {

        document.getElementById("Name").value = "";
        document.getElementById("Job").value = "";
    }

    function clearUser() {

        document.getElementById("userId").value = "";
        document.getElementById("resultDiv2").innerHTML = "";
    }

    function clearUsers() {

        document.getElementById("Name").value = "";
        document.getElementById("Job").value = "";
        document.getElementById("resultDiv").innerHTML = "";
    }