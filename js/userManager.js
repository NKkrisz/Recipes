//Redirect user/guest to main page once user selects an option
if(localStorage.getItem("status")){
    window.location.href = "index.html";
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', authentication);
});

function checkPassword(password){
    return password.length < 5 
}

function checkUsername(username){
    return username.length < 5
}

if (typeof module === 'object') {
    module.exports = {checkPassword, checkUsername}
}

function authentication(e){
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let status = JSON.parse(localStorage.getItem("status"));
    
    // Register handling
    if(e.target.textContent == "Register"){
        if(checkUsername(username) || checkPassword(password)){
            alert("Username or password must be at least 6 characters.");
            return;
        };

        if(users.find((user) => user["username"] === username)){
            alert("User Already Exists");
            return;
        };

        users.push({username, password});
        localStorage.setItem("users", JSON.stringify(users));
        alert("User Successfully Registered");
    
    // Login handling
    } else if (e.target.textContent == "Login") {
        let isValidUser = users.find(user => user.username === username && user.password === password);
        alert(isValidUser ? "User authenticated" : "Invalid credentials");
        isValidUser ? status = "Authenticated" : status = "";
        localStorage.setItem("currentUser", username)
    } else {
        alert("Guest user");
        status = "Guest";
    }
    if(!status) return;
    localStorage.setItem("status", JSON.stringify(status));
};

