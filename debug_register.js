const { User } = require('./models');
const bcrypt = require('bcryptjs');

async function testRegister() {
    try {
        const username = 'testuser_' + Date.now();
        const email = `test_${Date.now()}@example.com`;
        const password = 'password123';

        console.log(`Attempting to create user: ${username}, ${email}`);

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        console.log('User created successfully:', user.toJSON());
    } catch (error) {
        console.error('Register failed:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
    } finally {
        process.exit();
    }
}

testRegister();
