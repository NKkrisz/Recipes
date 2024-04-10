//Redirect user/guest to main page once user selects an option
if(localStorage.getItem("status")){
    window.location.href = "index.html";
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', authentication);
});

function authentication(e){
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let status = JSON.parse(localStorage.getItem("status"));
    
    // Register handling
    if(e.target.textContent == "Register"){
        if(username.length === 0 || password.length === 0){
            alert("Please Fill In All Fields");
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
    } else {
        alert("Guest user");
        status = "Guest";
    }
    if(!status) return;
    localStorage.setItem("status", JSON.stringify(status));
};