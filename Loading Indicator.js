const usersURL = 'https://jsonplaceholder.typicode.com/users';

function fetchUsersWithLoadingIndicator() {
    const usersContainer = document.getElementById('users');
    const loadingIndicator = document.getElementById('loading-indicator');

    loadingIndicator.style.display = 'block';

    fetch(usersURL)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        })
        .then(function(users) {
            loadingIndicator.style.display = 'none';

            for (var i = 0; i < users.length; i++) {
                const user = users[i];
                const userDiv = document.createElement('div');
                userDiv.classList.add('item');
                userDiv.innerHTML = `<strong>${user.name}</strong><br>${user.email}`;
                usersContainer.appendChild(userDiv);
            }
        })
        .catch(function(error) {
            console.error(error);
            loadingIndicator.style.display = 'none';
            usersContainer.innerHTML = '<p>An error occurred while fetching users. Please try again later.</p>';
        });
}

// Call the function to fetch users with loading indicator
fetchUsersWithLoadingIndicator();
