import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) {
    console.error('Failed to connect to the database', err.message);
  } else {
    console.log('Connected to the SQLite database');
  }
});

export default db;