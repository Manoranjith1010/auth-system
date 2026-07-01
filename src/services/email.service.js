const sendEmail = async ({ to, subject, text, html }) => {
  console.log(`[Email] To: ${to}`);
  console.log(`[Email] Subject: ${subject}`);
  console.log(text || html || 'No message body supplied');
  return true;
};

module.exports = sendEmail;
