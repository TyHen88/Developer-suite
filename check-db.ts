import { db } from './lib/db';
import { users } from './db/schema';

async function checkUsers() {
    try {
        const allUsers = await db.select().from(users);
        console.log('Total users in DB:', allUsers.length);
        console.log('Users:', JSON.stringify(allUsers, null, 2));
    } catch (error) {
        console.error('Error checking users:', error);
    }
}

checkUsers();
