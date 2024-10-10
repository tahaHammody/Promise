const usersURL = 'https://jsonplaceholder.typicode.com/users';
const postsURL = 'https://jsonplaceholder.typicode.com/posts';

function fetchUsersAndPosts() {
    const usersPromise = fetch(usersURL).then(function(response) {
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    });

    const postsPromise = fetch(postsURL).then(function(response) {
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return response.json();
    });

    Promise.all([usersPromise, postsPromise])
        .then(function([users, posts]) {
            const usersContainer = document.getElementById('users');
            const postsContainer = document.getElementById('posts');

            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                const userDiv = document.createElement('div');
                userDiv.classList.add('item');
                userDiv.innerHTML = `<strong>${user.name}</strong><br>${user.email}`;
                usersContainer.appendChild(userDiv);
            }

            for (let j = 0; j < posts.length; j++) {
                const post = posts[j];
                const postDiv = document.createElement('div');
                postDiv.classList.add('item');
                postDiv.innerHTML = `<strong>${post.title}</strong><br>${post.body}`;
                postsContainer.appendChild(postDiv);
            }
        })
        .catch(function(error) {
            console.error(error);
            const errorContainer = document.getElementById('error');
            errorContainer.textContent = 'An error occurred: ' + error.message + '. Please try again later.';
        });
}

fetchUsersAndPosts();
