var baseURL = 'https://jsonplaceholder.typicode.com';

function fetchUsersAndPosts() {
    fetch(baseURL + '/users')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        })
        .then(function(users) {
            let usersContainer = document.getElementById('users');

            for (let i = 0; i < users.length; i++) {
                let user = users[i];

                let userDiv = document.createElement('div');
                userDiv.className = 'user';
                userDiv.innerHTML = 
                    '<h2>' + user.name + '</h2>' +
                    '<p><strong>Email:</strong> ' + user.email + '</p>' +
                    '<div class="posts"><h3>Posts:</h3></div>';

                usersContainer.appendChild(userDiv);

                fetch(baseURL + '/posts?userId=' + user.id)
                    .then(function(response) {
                        if (!response.ok) {
                            throw new Error('Failed to fetch posts for user ' + user.id);
                        }
                        return response.json();
                    })
                    .then(function(posts) {
                        let postsContainer = userDiv.querySelector('.posts');
                        
                        for (let j = 0; j < posts.length; j++) {
                            let post = posts[j];

                            let postDiv = document.createElement('div');
                            postDiv.className = 'post';
                            postDiv.innerHTML = 
                                '<strong>' + post.title + '</strong><br>' +
                                post.body;
                            
                            postsContainer.appendChild(postDiv);
                        }
                    })
                    .catch(function(error) {
                        console.error(error);
                        let postsContainer = userDiv.querySelector('.posts');
                        postsContainer.innerHTML += '<p>Failed to load posts.</p>';
                    });
            }
        })
        .catch(function(error) {
            console.error(error);
            let usersContainer = document.getElementById('users');
            usersContainer.innerHTML = '<p>Failed to load users.</p>';
        });
}

fetchUsersAndPosts();
