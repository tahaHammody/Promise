document.getElementById('triggerPromise').addEventListener('click', () => {
    const messageElement = document.getElementById('message');
    const isRejected = document.getElementById('triggerRejection').checked;
  
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isRejected) {
          reject('The Promise has been rejected!');
        } else {
          resolve('The Promise has been resolved!');
        }
      }, 1000);
    });
  
    promise
      .then((message) => {
        messageElement.textContent = message;
        messageElement.classList.add('resolved');
        messageElement.classList.remove('rejected');
      })
      .catch((error) => {
        messageElement.textContent = error;
        messageElement.classList.add('rejected');
        messageElement.classList.remove('resolved');
      });
  });
  