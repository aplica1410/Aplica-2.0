const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// 1️⃣ Generate Google OAuth URL
const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/gmail.readonly'
    ],
    prompt: 'consent',
  });
};

// 2️⃣ Exchange code → tokens
const getGmailTokens = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

// 3️⃣ Get authenticated Gmail client
const getGmailClient = (tokens) => {
  oauth2Client.setCredentials(tokens);

  return google.gmail({
    version: 'v1',
    auth: oauth2Client,
  });
};

module.exports = {
  getAuthUrl,
  getGmailTokens,
  getGmailClient,
};
