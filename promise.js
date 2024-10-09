const title = document.getElementById('title');
const button = document.getElementById('changeButton');
const colors = ['red', 'green', 'blue', 'purple', 'orange'];
const texts = ['Text 1', 'Text 2', 'Text 3', 'Text 4', 'Text 5'];

button.addEventListener('click', () => {
  let promise = Promise.resolve();
  for (let i = 0; i < colors.length; i++) {
    promise = promise.then(() => changeBackgroundColorAndTextWithPromise(i));
  }
});

function changeBackgroundColorAndTextWithPromise(index) {
  return new Promise((resolve) => {
    setTimeout(() => {
      title.style.backgroundColor = colors[index];
      title.textContent = texts[index];
      resolve();
    }, 5000);
  });
}
