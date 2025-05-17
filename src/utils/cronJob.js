const cron = require('node-cron');
const axios = require('axios');
const moment = require('moment');
const User = mongoose.model('User', userSchema);

// https://developers.facebook.com/docs/whatsapp
// Daily at 9:00 AM
cron.schedule('0 9 * * *', async () => {
	console.log('Checking for birthdays...');
	const today = moment().format('YYYY-MM-DD'); // Format: 2024-12-23
	const users = await User.find({ birthday: today });

	users.forEach((user) => {
		sendWhatsAppMessage(user.phoneNumber, `Happy Birthday, ${user.name}! 🎉`);
	});
});

const sendWhatsAppMessage = async (phoneNumber, message) => {
	const whatsappApiUrl =
		'https://graph.facebook.com/v17.0/PHONE_NUMBER_ID/messages';
	const token = 'YOUR_ACCESS_TOKEN'; // Get this from your WhatsApp API provider

	try {
		await axios.post(
			whatsappApiUrl,
			{
				messaging_product: 'whatsapp',
				to: phoneNumber,
				type: 'text',
				text: { body: message },
			},
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		console.log(`Message sent to ${phoneNumber}`);
	} catch (error) {
		console.error(
			'Error sending WhatsApp message:',
			error.response?.data || error.message
		);
	}
};
