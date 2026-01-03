const { User } = require('./models');

async function listUsers() {
    try {
        const users = await User.findAll();
        console.log('Current Users in DB:', users.map(u => ({ id: u.id, email: u.email })));
    } catch (error) {
        console.error('Error listing users:', error);
    } finally {
        process.exit();
    }
}

listUsers();
