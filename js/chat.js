/**
 * Simple Chat UI - JavaScript
 * Copyright (c) 2023 Sajad Hashemian (https://codepen.io/sajadhsm/pen/odaBdd)
 * Licensed under the MIT License (LICENSE.txt)
 */


const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [
  "Hi, how are you?",
  "Ohh... I can't understand what you trying to say. Sorry!",
  "I like to play games... But I don't know how to play!",
  "Sorry if my answers are not relevant. :))",
  "I feel sleepy! :("
];

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "BOT";
const PERSON_NAME = "Sajad";

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
  const apiUrl = 'https://1g35nmhfbh.execute-api.eu-central-1.amazonaws.com/chat_api_stage';

  $.ajax({
    url: apiUrl,
    type: 'POST',
    data: JSON.stringify({ message: msgText }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: {
      'x-api-key': 'BaLULOA67K4zLcUnZgSnF2RkfSjedCkY1ZP9UTAR'
    },
    success: function(response) {
      appendMessage(BOT_NAME, BOT_IMG, 'left', response.message);
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
}


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
