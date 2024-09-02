// Assuming you have an HTML form with an id of 'registerForm'
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        // Optionally, update the UI to show success
    })
    .catch(error => {
        console.error('Error:', error);
        // Optionally, update the UI to show error message
    });
});

    // Get All Users
    document.getElementById("getUsersBtn").addEventListener("click", function() {
        fetch('http://localhost:3000/api/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                document.getElementById("usersList").textContent = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                document.getElementById("usersList").textContent = "Error: " + error.message;
            });
    });

    // Update User
    document.getElementById("updateForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const id = document.getElementById("userIdUpdate").value;
        const username = document.getElementById("usernameUpdate").value;
        const email = document.getElementById("emailUpdate").value;
        const password = document.getElementById("passwordUpdate").value;

        fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("updateResult").textContent = "User updated successfully: " + JSON.stringify(data);
        })
        .catch(error => {
            document.getElementById("updateResult").textContent = "Error: " + error.message;
        });
    });

    // Delete User
    document.getElementById("deleteForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const id = document.getElementById("userIdDelete").value;

        fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("deleteResult").textContent = "User deleted successfully: " + JSON.stringify(data);
        })
        .catch(error => {
            document.getElementById("deleteResult").textContent = "Error: " + error.message;
        });
    });
