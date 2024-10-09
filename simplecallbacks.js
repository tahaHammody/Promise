const title = document.getElementById('title');
const button = document.getElementById('changeButton');
const colors = ['red', 'green', 'blue', 'purple', 'orange'];
const texts = ['Text 1', 'Text 2', 'Text 3', 'Text 4', 'Text 5'];

button.addEventListener('click', () => {
  changeBackgroundColorAndText(0);
});

function changeBackgroundColorAndText(index) {
  if (index < colors.length) {
    setTimeout(() => {
      title.style.backgroundColor = colors[index];
      title.textContent = texts[index];
      changeBackgroundColorAndText(index + 1);
    }, 5000);
  }
}
