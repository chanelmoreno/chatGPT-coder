import bot from './assets/bot.svg'
import user from './assets/user.svg'


const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loadInterval(element) {
  element.textContent = ''; //set content to empty 

  loadInterval = setInterval(() => {
    element.textContent += '.'; // keep adding a .


    if (element.textContent === '....') {
      element.textContent = '';
    };

  }, 300);
};

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.chartAt(index);
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)
};

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
};

function chatStripe(isAI, value, uniqueId) {
  return (
    `
    <div class="wrapper ${isAI && 'ai'}">
      <div class="chat">
        <div class="profile">
          <img 
            src="${isAI ? bot : user}"
            alt="${isAI ? 'bot' : 'user'}"
          />
        </div>
        <div class="message" id-${uniqueId}>${value}</div>
      </div>
    
    </div>
    `
  )
};


const handleSubmit = async (e) => {
  e.preventDefault(); //prevents default on page reloading

  const data = new FormData(form);

  // user chat stripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
  form.reset();

  // bot chat stripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loadInterval(messageDiv);
};


form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.key === '13') { //13 is the enter key
    handleSubmit(e)
  }
})