const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	phoneNumber: String,
	birthday: Date, // Store as Date type
});

const User = mongoose.model('User', userSchema);

app.post('/api/register', async (req, res) => {
	const { name, phoneNumber, birthday } = req.body;
	try {
		const newUser = new User({ name, phoneNumber, birthday });
		await newUser.save();
		res.status(201).send('User registered successfully');
	} catch (err) {
		res.status(500).send('Error saving user');
	}
});
