/**
 * Simple Chat UI - JavaScript
 * Copyright (c) 2023 Sajad Hashemian (https://codepen.io/sajadhsm/pen/odaBdd)
 * Licensed under the MIT License (LICENSE.txt)
 */


const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "AI Chatbot";
const PERSON_NAME = "you";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  const tempMessage = "Sending your message...";
  appendMessage(BOT_NAME, BOT_IMG, "left", tempMessage);

  sendToAPIGateway(msgText);
});

// Applying AWS API Gateway with Lambda function
function sendToAPIGateway(msgText) {
  const chatApiGatewayUrl = 'https://zlxbi3wpcj.execute-api.eu-central-1.amazonaws.com/chat_api_stage/chat';
  const uuid = sessionStorage.getItem('uuid') || crypto.randomUUID(); // Retrieve UUID or generate a new one if not found
  sessionStorage.setItem('uuid', uuid); // Save the UUID to sessionStorage

  $.ajax({
    url: chatApiGatewayUrl,
    type: 'POST',
    data: `uuid=${encodeURIComponent(uuid)}&message=${encodeURIComponent(msgText)}`,
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json', //'json'/'text'
    success: function(response) {
      appendMessage(BOT_NAME, BOT_IMG, 'left', response.message);
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}
// curl -X POST -H "Content-Type: text/plain; charset=utf-8" -H "Origin: https://www.daniel-wrede.de" -d "Your message text here" 'https://jk348hof93.execute-api.eu-central-1.amazonaws.com/chat_api_stage/message'


function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
