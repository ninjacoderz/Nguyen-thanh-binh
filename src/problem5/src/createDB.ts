import db from './db';

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS resources (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT)');
  console.log('Database and table created.');
});
