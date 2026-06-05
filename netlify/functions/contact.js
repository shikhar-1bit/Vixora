const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, "project-type": projectType, message } = JSON.parse(event.body);
    const { BOT_TOKEN, CHAT_ID } = process.env;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Missing BOT_TOKEN or CHAT_ID');
      return { statusCode: 500, body: 'Server configuration error' };
    }

    const text = `
✨ *New Contact Form Submission*

👤 *Name:* ${name}
📧 *Email:* ${email}
💼 *Project:* ${projectType}
📝 *Message:*
${message}
    `;

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success' })
      };
    } else {
      const err = await response.text();
      console.error('Telegram API error:', err);
      return {
        statusCode: 500,
        body: 'Failed to send message'
      };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: 'Internal server error'
    };
  }
};
