import SQLite, {
  ResultSet,
  SQLiteDatabase,
  Transaction,
} from 'react-native-sqlite-storage';
import {IContact} from '../store/types';

let db: SQLiteDatabase;

const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabase({
      name: 'ContactsDatabase.db',
      location: 'default',
    });
  }
  return db;
};

const createContactsTable = async (): Promise<void> => {
  const database = await getDB();
  database.transaction((txn: Transaction) => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100),
        surname VARCHAR(500),
        phone TEXT,
        email VARCHAR(500),
        address VARCHAR(500),
        job VARCHAR(500)
      )`,
      [],
      (_: Transaction, _res: ResultSet) => {
        console.log('Tablo başarıyla oluşturuldu');
      },
      (_: Transaction, error: SQLite.SQLError): boolean => {
        console.error('Tablo oluşturulurken hata:', error);
        return false;
      },
    );
  });
};

const getContacts = async (): Promise<IContact[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await getDB();
      database.transaction((txn: Transaction) => {
        txn.executeSql(
          'SELECT * FROM users',
          [],
          (_: Transaction, res: ResultSet) => {
            const rows = [];
            for (let i = 0; i < res.rows.length; i++) {
              rows.push(res.rows.item(i));
            }
            console.log('Veritabanından gelen veriler:', rows);
            resolve(rows); // if kontrolünü kaldırdık
          },
          (_: Transaction, error: SQLite.SQLError): boolean => {
            console.error('SQL sorgu hatası:', error);
            reject(error);
            return false;
          },
        );
      });
    } catch (error) {
      console.error('Genel veritabanı hatası:', error);
      reject(error);
    }
  });
};

const addNewContact = async (
  name: string,
  surname: string,
  phone: string,
  email: string,
  address: string,
  job: string,
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await getDB();
      database.transaction(
        (txn: Transaction) => {
          console.log('Transaction başladı'); // Debug log
          console.log('Eklenecek veriler:', {
            name,
            surname,
            phone,
            email,
            address,
            job,
          }); // Debug log

          txn.executeSql(
            'INSERT INTO users (name, surname, phone, email, address, job) VALUES (?, ?, ?, ?, ?, ?)',
            [name, surname, phone, email, address, job],
            (_: Transaction, _res: ResultSet) => {
              console.log('Kişi başarıyla eklendi');
              resolve();
            },
            (_: Transaction, error: SQLite.SQLError): boolean => {
              console.error('SQL sorgu hatası:', error);
              reject(error);
              return false;
            },
          );
        },
        error => {
          console.error('Transaction hatası:', error); // Transaction hatası log'u
          reject(error);
        },
        () => {
          console.log('Transaction başarılı'); // Transaction başarı log'u
        },
      );
    } catch (error) {
      console.error('Genel veritabanı hatası:', error);
      reject(error);
    }
  });
};

const resetDatabase = async (): Promise<void> => {
  const database = await getDB();
  return new Promise((resolve, reject) => {
    database.transaction((txn: Transaction) => {
      txn.executeSql(
        'DROP TABLE IF EXISTS users',
        [],
        () => {
          console.log('Tablo silindi');
          createContactsTable().then(resolve).catch(reject);
        },
        (_, error) => {
          console.error('Tablo silinirken hata:', error);
          reject(error);
          return false;
        },
      );
    });
  });
};

export {createContactsTable, getContacts, addNewContact, resetDatabase};
