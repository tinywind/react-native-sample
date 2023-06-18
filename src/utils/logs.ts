import * as SQLite from 'expo-sqlite';
import { DATABASE_FILE } from '../constants';

const database = SQLite.openDatabase(DATABASE_FILE);

database.transaction(async tx => await tx.executeSql('CREATE TABLE IF NOT EXISTS log (id INTEGER PRIMARY KEY AUTOINCREMENT, log TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);'));

export function insertLog(log: string) {
  database.transaction(tx => tx.executeSql('INSERT INTO log (log) VALUES (?)', [log]));
}

export function getLogs(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    database.transaction(tx =>
      tx.executeSql(
        'SELECT * FROM log ORDER BY id DESC',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => {
          reject(error);
          return true;
        },
      ),
    );
  });
}
