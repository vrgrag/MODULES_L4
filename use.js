const path = require('path');
const { writeFileSync, createCatalogSync } = require('./src/modules/file_system');
const { fetchData } = require('./src/modules/loading_data');
const { sortstring } = require('./src/modules/sort_string');

async function processUsers() {
    try {
        const result = await fetchData('https://jsonplaceholder.typicode.com/users');
        if (result.error) {
            throw new Error(result.error);
        }
        if (result.isLoading) {
            console.log('Данные ещё загружаются...');
            return;
        }
        const users = result.data;
        const sortedUsers = sortstring(users, 'name');
        const usersDir = path.join(__dirname, 'users');
        createCatalogSync(usersDir);
        const namesContent = sortedUsers.map(user => user.name).join('\n');
        const emailsContent = sortedUsers.map(user => user.email).join('\n');
        writeFileSync(path.join(usersDir, 'names.txt'), namesContent);
        writeFileSync(path.join(usersDir, 'emails.txt'), emailsContent);
        console.log('Операция завершена успешно!');
    } catch (error) {
        console.error('Ошибка в процессе выполнения:', error.message);
    }
}

processUsers();