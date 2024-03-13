

$(document).ready(function() {
    function loadMainContent() {
        $(".container").html(`
        <div>
        <h2>{Password Manager}</h2>
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
    </div>

        `);
    $("#addRowBtn").on("click", addRowToTable);
    }
    function addRowToTable() {
        // Get the table body
        const tableBody = $("#mainTable tbody");

        // Create a new row with three cells
        const newRow = $("<tr>");
        newRow.append("<td>New Data 1</td>");
        newRow.append("<td>New Data 2</td>");
        newRow.append("<td>New Data 3</td>");

        // Append the new row to the table body
        tableBody.append(newRow);
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