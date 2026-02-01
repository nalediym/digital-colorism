async function testSendEmail() {
    try {
        const message = {
            to: 'naniiikekana+spam@gmail.com',
            subject: 'Test Email',
            message: 'This is a test email from the contact form'
        };

        // Create the email content
        const email = [
            'Content-Type: text/plain; charset="UTF-8"\n',
            'MIME-Version: 1.0\n',
            'Content-Transfer-Encoding: 7bit\n',
            'to: ', message.to, '\n',
            'subject: ', message.subject, '\n\n',
            message.message
        ].join('');

        // Encode the email
        const encodedEmail = btoa(email).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

        // Send the email
        const result = await gapi.client.gmail.users.messages.send({
            'userId': 'me',
            'resource': {
                'raw': encodedEmail
            }
        });

        console.log('Email sent:', result);
        alert('Test email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Error sending test email: ' + error.message);
    }
}

// Add a test button to your HTML
document.getElementById('testButton').addEventListener('click', testSendEmail);