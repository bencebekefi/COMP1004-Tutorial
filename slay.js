$(document).ready(function() {
    function loadMainContent() {
        const mainContent = `
        <head>
        <link rel="stylesheet" href="loginstyle.css">
        </head>
            <div class="container">
                <div>
                    <h2>Password Manager</h2>
                    <button id="addRowBtn">Add New Password</button>
                    <table border="1" id="mainTable">
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
                    <hr>
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
            </div>
        `;
        $("body").html(mainContent);
        const cssLink = $("<link rel='stylesheet' type='text/css' href='loginstyle.css'>");
        $("head").append(cssLink);
        $("#addRowBtn").on("click", addRowToTable);
        $("#logoutBtn").on("click", logout);
    }

    function addRowToTable() {
        const tableBody = $("#mainTable tbody");
        const newRow = $("<tr>");
        newRow.append(`<td><input type="text" class="usernameInput" placeholder="Enter Username"></td>`);
        newRow.append(`<td><input type="password" class="passwordInput" placeholder="Enter Password"></td>`);
        newRow.append(`<td><input type="text" class="websiteInput" placeholder="Enter Website"></td>`);
        tableBody.append(newRow);
        $(".usernameInput, .passwordInput, .websiteInput").on("input", function() {
            const username = $(this).closest("tr").find(".usernameInput").val();
            const password = $(this).closest("tr").find(".passwordInput").val();
            const website = $(this).closest("tr").find(".websiteInput").val();
            $(this).closest("tr").find("td:eq(0)").val(username);
            $(this).closest("tr").find("td:eq(1)").val(password);
            $(this).closest("tr").find("td:eq(2)").val(website);
        });
    }

    function logout() {
        location.reload();
    }

    function deleteAccount() {
        localStorage.removeItem('userData');
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

    // Delegate event handling to the document level
    $(document).on("click", "#generatePasswordBtn", function() {
        const length = +$("#passwordLength").val();
        const hasLower = $("#includeLowercase").is(":checked");
        const hasUpper = $("#includeUppercase").is(":checked");
        const hasNumber = $("#includeNumbers").is(":checked");
        const hasSymbol = $("#includeSymbols").is(":checked");

        const password = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
        $("#generatedPassword").val(password);
    });
    $("form").submit(function(event) {
        event.preventDefault();
        const form = $(this);
        const username = form.find('input[name="username"]').val();
        const password = form.find('input[name="password"]').val();
        if (form.attr("action") === "#login") {
            const storedUser = JSON.parse(localStorage.getItem('userData'));
            if (storedUser && storedUser.username === username && storedUser.password === password) {
                console.log('Login successful');
                loadMainContent();
            } else {
                console.log('Login failed');
            }
        } else if (form.attr("action") === "#register") {
            const confirmPassword = form.find('input[name="confirm-password"]').val();
            if (password === confirmPassword) {
                const userData = {
                    username: username,
                    password: password
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                console.log('Registration successful');
                loadMainContent();
            } else {
                console.log('Password confirmation failed');
            }
        }
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

    $("#confirm-password").on("input", function() {
        const password = $(this).closest("form").find("#password").val();
        const confirmPassword = $(this).val();
        const errorContainer = $(this).closest("form").find(".error-message");
        if (password !== confirmPassword) {
            errorContainer.text("Passwords do not match");
        } else {
            errorContainer.text("");
        }
    });
    
});
