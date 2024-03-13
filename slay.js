
$(document).ready(function() {
    function loadMainContent() {
        $(".container").html(`
            <div>
                <h2>Welcome to PassShield Main Page</h2>
                <!-- Add your main content and functionality here -->
            </div>
        `);
    }

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