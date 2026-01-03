const { sequelize } = require('./models');

async function fixSchema() {
    try {
        console.log('Attempting to sync database schema with { force: true } (DROPPING TABLES)...');
        await sequelize.sync({ force: true });
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Sync failed:', error);
    } finally {
        process.exit();
    }
}

fixSchema();
