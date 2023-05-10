document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contact-form').addEventListener('submit', submitContactForm);
});


function submitContactForm(event) {
    event.preventDefault();

    const apiUrl = 'https://x8n9q9d4mg.execute-api.eu-central-1.amazonaws.com/chat_api_stage/contact';

    const name = document.getElementById('cname').value;
    const email = document.getElementById('cemail').value;
    const message = document.getElementById('cmessage').value;

    $.ajax({
        url: apiUrl,
        type: 'POST',
        data: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`,
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            console.log('Message sent successfully:', response);
            // You can add any additional logic here, e.g., display a success message or reset the form
        },
        error: function (error) {
            console.error('Error:', error);
            // You can add any additional logic here, e.g., display an error message
        }
    });
}
