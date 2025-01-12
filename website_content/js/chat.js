/**
 * Simple Chat UI - JavaScript
 * Copyright (c) 2023 Sajad Hashemian (https://codepen.io/sajadhsm/pen/odaBdd)
 * Licensed under the MIT License (LICENSE.txt)
 */

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "../images/ChatGPT_logo.png";
const PERSON_IMG = "find a logo";
const BOT_NAME = "ChatGPT Portfolio Agent";
const PERSON_NAME = "you";

// document.addEventListener("DOMContentLoaded", () => {
const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");


// Disclaimer
document.getElementById('disclaimer-accept').onclick = function () {
  document.getElementById('disclaimer').style.display = 'none';
}


// Get the current time and display it in the header
window.onload = function () {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  // Pad the minutes with a 0 if it's less than 10
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  document.getElementById('time').textContent = hours + ':' + minutes;
}


msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  // Determine language from the document's lang attribute
  const lang = document.documentElement.lang || "en";

  const tempMessage =
      lang === "de"
        ? "Ihre Nachricht wird gesendet..."
        : "Sending your message...";

  // const tempMessage = "Sending your message...";
  const tempMessageId = "tempMessage";
  appendMessage(BOT_NAME, BOT_IMG, "left", tempMessage, tempMessageId);

  // Save to sessionStorage (done in appendMessage)
  sendToAPIGateway(msgText, tempMessageId);
});


function sendToAPIGateway(msgText, tempMessageId) {
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
      // Append the actual GPT message
      appendMessage(BOT_NAME, BOT_IMG, "left", response.message);

      // Remove the temporary message
      const tempMessageElement = document.getElementById(tempMessageId);
      if (tempMessageElement) tempMessageElement.remove();
    },
    error: function(error) {
      console.error('Error:', error);

      // Optionally remove the temporary message on error
      const tempMessageElement = document.getElementById(tempMessageId);
      if (tempMessageElement) tempMessageElement.remove();
    }
  });
}


function appendMessage(name, img, side, text, id) {
  // Render the message
  renderMessage(name, img, side, text, id);

  // Save to sessionStorage only if it's not a temporary message
  if (!id || id !== "tempMessage") {
    saveMessageToSessionStorage({ name, img, side, text });
  }
}


function saveMessageToSessionStorage(message) {
  const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory')) || [];
  chatHistory.push(message);
  sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}


function renderMessage(name, img, side, text, id) {
  const msgHTML = `
    <div class="msg ${side}-msg dark-font" id="${id || ''}">
      <div class="msg-img dark-font" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name dark-font">${name}</div>
          <div class="msg-info-time dark-font">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text dark-font">${text}</div>
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

function loadChatHistory(lang) {
  const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory')) || [];
  if (!chatHistory.length) {
    const welcomeText =
      lang === "de"
        ? "Hallo und willkommen! Ich bin der persönliche Portfolio-Agent auf dieser Seite. " +
          "Ich nehme an, dass Sie an Daniel Wredes Profil interessiert sind. Wie kann ich Ihnen helfen, " +
          "mehr über Daniel Wrede zu erfahren und seine Eignung für Ihre Anforderungen zu beurteilen?"
        : "Hello and welcome! I am the personal Portfolio Agent on this page. " +
          "How can I help you learn more about Daniel Wrede and assess his suitability for your requirements?";
    appendMessage("Portfolio Agent", "../images/ChatGPT_logo.png", "left", welcomeText);
  } else{
    msgerChat.innerHTML = "";
    chatHistory.forEach(msg => {
      renderMessage(msg.name, msg.img, msg.side, msg.text);
    });
  }
}

function toggleForm() {
  const form = document.getElementById("myForm");
  const toggleButton = document.getElementById("toggleButton");

  const closeText = toggleButton.getAttribute("data-close-text") || "Close";
  const chatText = toggleButton.getAttribute("data-chat-text") || "Chat";

  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
    toggleButton.textContent = closeText;
    toggleButton.classList.add("opened");

    // Determine language from the document's lang attribute
    const lang = document.documentElement.lang || "en";
    // Load chat history into the chat window
    loadChatHistory(lang);
  } else {
    form.style.display = "none";
    toggleButton.textContent = chatText;
    toggleButton.classList.remove("opened");
  }
}
