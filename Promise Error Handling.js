function fetchUsersWithErrorHandling() {
    let usersContainer = document.getElementById('users');
    let errorContainer = document.getElementById('error');

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Failed to fetch users. Status: ' + response.status);
            }
            return response.json();
        })
        .then(function(users) {
         
            for (let i = 0; i < users.length; i++) {
                let user = users[i];
                
                let userDiv = document.createElement('div');
                userDiv.className = 'user';
                userDiv.innerHTML = 
                    '<h2>' + user.name + '</h2>' +
                    '<p><strong>Email:</strong> ' + user.email + '</p>';
                
                usersContainer.appendChild(userDiv);
            }
        })
        .catch(function(error) {
            console.error(error);
            errorContainer.textContent = 'An error occurred: ' + error.message + '. Please try again later.';
        });
}

fetchUsersWithErrorHandling();
