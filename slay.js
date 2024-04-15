$(document).ready(function() {
    function loadMainContent() {
        const mainContent = `
        <head>
        <link rel="stylesheet" href="loginstyle.css"> 
        <h1>PassShield</h1> 
        </head>
        <div class="container">
        <body>
        <style>
            body {
              background-image: url('background3.jpg');
              background-repeat: no-repeat;
            }
            </style>
            </body>
        <div class="password-generator">
            <h3>Generate Password</h3>
            <div>
                <label for="passwordLength">Length:</label>
                <input type="number" id="passwordLength" value="12" min="4" max="32">
            </div>
            <div>
                <input type="checkbox" id="includeLowercase" checked>
                <label for="includeLowercase">Include Lowercase</label>
            </div>
            <div>
                <input type="checkbox" id="includeUppercase" checked>
                <label for="includeUppercase">Include Uppercase</label>
            </div>
            <div>
                <input type="checkbox" id="includeNumbers" checked>
                <label for="includeNumbers">Include Numbers</label>
            </div>
            <div>
                <input type="checkbox" id="includeSymbols" checked>
                <label for="includeSymbols">Include Symbols</label>
            </div>
            <button id="generatePasswordBtn">Generate Password</button>
            <input type="text" id="generatedPassword" readonly>
        </div>
        <div class="table-container">
            <button id="addRowBtn">Add New Password</button>
            <table id="mainTable">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Rows will be added dynamically here -->
                </tbody>
            </table>
            <button id="logoutBtn">Log Out</button>
            <button id="deleteaccBtn">Delete User</button>
            
        </div>
    </div>
        `;
        $("body").html(mainContent);
        const cssLink = $("<link rel='stylesheet' type='text/css' href='loginstyle.css'>");
        $("head").append(cssLink);
        $("#addRowBtn").on("click", addRowToTable);
        $("#logoutBtn").on("click", logout);
        $("#deleteaccBtn").on("click", deleteAccount);
    
    }

    function addRowToTable() {
        const tableBody = $("#mainTable tbody");
        const newRow = $("<tr>");
        newRow.append(`<td><input type="text" class="usernameInput" placeholder="Enter Username"><button class="SaveInTableButton">Save</button></td>`);
        newRow.append(`<td><input type="password" class="passwordInput" placeholder="Enter Password"><button class="togglePassword">Show</button><button class="SaveInTableButton">Save</button></td>`);
        newRow.append(`<td><input type="text" class="websiteInput" placeholder="Enter Website"><button class="SaveInTableButton">Save</button></td>`);
        tableBody.append(newRow);
        $(".usernameInput, .passwordInput, .websiteInput").on("input", function() {
            const username = $(this).closest("tr").find(".usernameInput").val();
            const password = $(this).closest("tr").find(".passwordInput").val();
            const website = $(this).closest("tr").find(".websiteInput").val();
            $(this).closest("tr").find("td:eq(0)").val(username);
            $(this).closest("tr").find("td:eq(1)").val(password);
            $(this).closest("tr").find("td:eq(2)").val(website);
        });
        newRow.find(".togglePassword").click(function() {
            const passwordInput = $(this).prev(".passwordInput");
            const type = passwordInput.attr("type") === "password" ? "text" : "password";
            passwordInput.attr("type", type);
            $(this).text(type === "password" ? "Show" : "Hide");
        });    
        $(document).on("click", ".SaveInTableButton", function() {
            const newRow = $(this).closest("tr");
            const username = newRow.find(".usernameInput").val();
            const password = newRow.find(".passwordInput").val();
            const website = newRow.find(".websiteInput").val();
    
            const rowData = {
                "username": username,
                "password": password,
                "website": website
            };
    
            // Send data to the server
            $.ajax({
                type: "POST",
                url: "/saveData", // Replace with your server's endpoint to save data
                contentType: "application/json",
                data: JSON.stringify(rowData),
                success: function(response) {
                    console.log("Data saved successfully");
                    // You can handle success response as needed
                },
                error: function(xhr, status, error) {
                    console.error("Error saving data:", error);
                    // Display error message to user or handle as needed
                }
            });
        });
    }
    
    function logout() {
        location.reload();
    }

    function deleteAccount() {
        // Prompt the user to enter their username
        const username = prompt("Please enter your username:");
        if (!username) {
            // If the user cancels or leaves the input empty, do nothing
            return;
        }
        // Assuming your server expects a DELETE request for account deletion
        $.ajax({
            type: "DELETE",
            url: "/deleteAccount", // Replace with your server's delete account endpoint
            contentType: "application/json",
            data: JSON.stringify({ username: username }), // Pass the entered username in the request body
            success: function(response) {
                // Redirect the user to the login page or any other appropriate action
                window.location.href = "/login.html"; // Redirect to login page
            },
            error: function(xhr, status, error) {
                console.error("Account deletion failed:", error);
                // Display error message to user or handle as needed
            }
        });
    }
    
    
    function generatePassword(length, lower, upper, number, symbol) {
        let charset = '';
        let generatedPassword = '';

        if (lower) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (number) charset += '0123456789';
        if (symbol) charset += '!@#$%^&*(){}[]=<>/,.';

        if (charset.length === 0) {
            return 'Please select at least one character type.';
        }

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            generatedPassword += charset[randomIndex];
        }

        return generatedPassword;
    }

    $(document).on("click", "#generatePasswordBtn", function() {
        const length = +$("#passwordLength").val();
        const lower = $("#includeLowercase").is(":checked");
        const upper = $("#includeUppercase").is(":checked");
        const number = $("#includeNumbers").is(":checked");
        const symbol = $("#includeSymbols").is(":checked");

        const password = generatePassword(length, lower, upper, number, symbol);
        $("#generatedPassword").val(password);
    });

    $(document).on("click", "#generatePasswordBtn", function() {
        const length = +$("#passwordLength").val();
        $("#generatedPassword").val(password);
    });

    // Function to send login credentials to server for authentication
    $("form[action='#login']").submit(function(event) {
        event.preventDefault();
        const form = $(this);
        const username = form.find('input[name="username"]').val();
        const password = form.find('input[name="password"]').val();

        $.ajax({
            type: "POST",
            url: "/login", // Replace with your server's login endpoint
            contentType: "application/json",
            data: JSON.stringify({ username: username, password: password }),
            success: function(response) {
                console.log("Login successful");
                loadMainContent(); // Load main content upon successful login
            },
            error: function(xhr, status, error) {
                console.error("Login failed:", error);
                // Display error message to user or handle as needed
            }
        });
    });
    $(".button-container button").on("click", function() {
        const page = $(this).data("page");
        if (page === "register") {
            $(".login-container").hide();
            $(".registration-container").show();
        } else if (page === "login") {
            $(".registration-container").hide();
            $(".login-container").show();
        }
    });
    // Function to send registration data to server for processing
    
    $("form[action='#register']").submit(function(event) {
        event.preventDefault();
        const form = $(this);
        const username = form.find('input[name="username"]').val();
        const password = form.find('input[name="password"]').val();
        const confirmPassword = form.find('input[name="confirm-password"]').val();

        const errorContainer = form.find('.error-message');

        if (password !== confirmPassword) {
            // Show error message if passwords do not match
            errorContainer.text("Passwords do not match");
            return; // Exit the function early
        } else {
            // Clear any existing error message
            errorContainer.text("");
        }

        $.ajax({
            type: "POST",
            url: "/register", // Replace with your server's registration endpoint
            contentType: "application/json",
            data: JSON.stringify({ username: username, password: password }),
            success: function(response) {
                console.log("Registration successful");
                loadMainContent(); // Load main content upon successful registration
            },
            error: function(xhr, status, error) {
                console.error("Registration failed:", error);
                // Display error message to user or handle as needed
            }
        });
    });

    // Other functions and event handlers...
});
