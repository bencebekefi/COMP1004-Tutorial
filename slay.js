

$(document).ready(function() {
    function loadMainContent() {
        $(".container").html(`
        <div>
        <h2>"Password Manager"</h2>
        <button id="addRowBtn">Add Row</button>
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
    </div>

        `);
    $("#addRowBtn").on("click", addRowToTable);

    $("#logoutBtn").on("click", logout);
    }
    
    function addRowToTable() {
        // Get the table body
        const tableBody = $("#mainTable tbody");

        // Create a new row with three cells
        const newRow = $("<tr>");

        // Add input fields to each cell
        newRow.append(`<td><input type="text" class="usernameInput" placeholder="Enter Username"></td>`);
        newRow.append(`<td><input type="password" class="passwordInput" placeholder="Enter Password"></td>`);
        newRow.append(`<td><input type="text" class="websiteInput" placeholder="Enter Website"></td>`);

        // Append the new row to the table body
        tableBody.append(newRow);

        // and update the row content dynamically
        $(".usernameInput, .passwordInput, .websiteInput").on("input", function() {
            const username = $(this).closest("tr").find(".usernameInput").val();
            const password = $(this).closest("tr").find(".passwordInput").val();
            const website = $(this).closest("tr").find(".websiteInput").val();

            // Update the content of the current row using val() instead of text()
            $(this).closest("tr").find("td:eq(0)").val(username);
            $(this).closest("tr").find("td:eq(1)").val(password);
            $(this).closest("tr").find("td:eq(2)").val(website);
        });
    }
    function logout() {
        // Clear the stored user data in localStorage and redirect to the login page
        localStorage.removeItem('userData');
        // Redirect to the login page or perform other necessary actions
        // For now, let's reload the page to simulate a logout
        location.reload();
    }

    $("form").submit(function(event) {
        // ... (your existing form submission logic remains unchanged) ...
    });

    $(".button-container button").on("click", function() {
        // ... (your existing button click logic remains unchanged) ...
    });

    $("#confirm-password").on("input", function() {
        // ... (your existing password confirmation logic remains unchanged) ...
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
            const confirm_password = form.find('input[name="confirm-password"]').val();

            if (password === confirm_password) {
                const userData = {
                    username: username,
                    password: password
                };

                localStorage.setItem('userData', JSON.stringify(userData));
                console.log('Registration successful');
                loadMainContent();
            } else {
                console.log('Password confirmation failed');
                // Handle password confirmation failure
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