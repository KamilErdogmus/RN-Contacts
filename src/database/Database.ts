import SQLite, {
  ResultSet,
  SQLiteDatabase,
  Transaction,
} from 'react-native-sqlite-storage';

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
        phone TEXT UNIQUE,
        email VARCHAR(500),
        address VARCHAR(500),
        job VARCHAR(500)
      )`,
      [],
      (_: Transaction, _res: ResultSet) => {
        console.log('Contacts tablo başarıyla oluşturuldu');
      },
      (_: Transaction, error: SQLite.SQLError): boolean => {
        console.error('Tablo oluşturulurken hata:', error);
        return false;
      },
    );
  });
};

const createRecentsTable = async (): Promise<void> => {
  const database = await getDB();
  database.transaction((txn: Transaction) => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS recents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        recent_id INTEGER,
        callType VARCHAR(50) DEFAULT 'outgoing',
        duration INTEGER DEFAULT 0,
        FOREIGN KEY (recent_id) REFERENCES users(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
      )`,
      [],
      (_: Transaction, _res: ResultSet) => {
        console.log('Recents tablo başarıyla oluşturuldu');
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
            resolve(rows);
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

const getRecents = async (): Promise<(Recent & IContact)[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await getDB();
      database.transaction((txn: Transaction) => {
        txn.executeSql(
          `SELECT 
            r.id,
            r.date,
            r.recent_id,
            r.callType,
            r.duration,
            u.name,
            u.surname,
            u.phone
           FROM recents r
           JOIN users u ON r.recent_id = u.id
           ORDER BY r.date DESC`,
          [],
          (_: Transaction, res: ResultSet) => {
            const rows = [];
            for (let i = 0; i < res.rows.length; i++) {
              rows.push(res.rows.item(i));
            }
            resolve(rows);
          },
          (_: Transaction, error: SQLite.SQLError): boolean => {
            reject(error);
            return false;
          },
        );
      });
    } catch (error) {
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

      // Debug: Parametre kontrolü
      console.log('Eklenecek veriler:', {
        name,
        surname,
        phone,
        email,
        address,
        job,
      });

      database.transaction(
        (txn: Transaction) => {
          const query =
            'INSERT INTO users (name, surname, phone, email, address, job) VALUES (?, ?, ?, ?, ?, ?)';
          const params = [name, surname, phone, email, address, job];

          // Debug: SQL sorgusu
          console.log('SQL Query:', query);
          console.log('Parameters:', params);

          txn.executeSql(
            query,
            params,
            (_: Transaction, result: ResultSet) => {
              // Debug: Başarılı sonuç
              console.log('Insert result:', result);
              console.log('Inserted ID:', result.insertId);
              resolve();
            },
            (_: Transaction, error: SQLite.SQLError): boolean => {
              // Debug: SQL hatası
              console.error('SQL Error:', {
                code: error.code,
                message: error.message,
                query,
                params,
              });
              reject(error);
              return false;
            },
          );
        },
        error => {
          // Debug: Transaction hatası
          console.error('Transaction Error:', error);
          reject(error);
        },
        () => {
          console.log('Transaction successful');
        },
      );
    } catch (error) {
      console.error('General Error:', error);
      reject(error);
    }
  });
};

const checkTableStructure = async () => {
  const database = await getDB();
  return new Promise((resolve, reject) => {
    database.transaction(txn => {
      txn.executeSql(
        "PRAGMA table_info('users')",
        [],
        (_, result) => {
          console.log('Tablo yapısı:', result.rows.raw());
          resolve(result.rows.raw());
        },
        (_, error) => {
          console.error('Tablo yapısı kontrol hatası:', error);
          reject(error);
          return false;
        },
      );
    });
  });
};

const addRecentCall = async (
  recent_id: number,
  callType: CallType = 'outgoing',
  duration: number = 0,
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await getDB();
      database.transaction(
        (txn: Transaction) => {
          txn.executeSql(
            'INSERT INTO recents (recent_id, callType, duration) VALUES (?, ?, ?)',
            [recent_id, callType, duration],
            (_: Transaction, _res: ResultSet) => {
              console.log('Arama geçmişine eklendi');
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
          console.error('Transaction hatası:', error);
          reject(error);
        },
        () => {
          console.log('Transaction başarılı');
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

const resetRecentsTable = async (): Promise<void> => {
  const database = await getDB();
  return new Promise((resolve, reject) => {
    database.transaction((txn: Transaction) => {
      txn.executeSql(
        'DROP TABLE IF EXISTS recents',
        [],
        () => {
          console.log('Recents tablosu silindi');
          createRecentsTable().then(resolve).catch(reject);
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

const getContactById = async (id: number): Promise<IContact> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await getDB();
      database.transaction((txn: Transaction) => {
        txn.executeSql(
          'SELECT * FROM users WHERE id = ?',
          [id],
          (_: Transaction, res: ResultSet) => {
            if (res.rows.length > 0) {
              resolve(res.rows.item(0));
            } else {
              reject(new Error('Contact not found'));
            }
          },
          (_: Transaction, error: SQLite.SQLError): boolean => {
            reject(error);
            return false;
          },
        );
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteRecent = async (id: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await getDB();
      database.transaction((txn: Transaction) => {
        txn.executeSql(
          'DELETE FROM recents WHERE id = ?',
          [id],
          () => resolve(),
          (_, error) => {
            reject(error);
            return false;
          },
        );
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateContact = async (id: number, values: IContact): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await getDB();
      database.transaction((txn: Transaction) => {
        txn.executeSql(
          `UPDATE users 
           SET name = ?, surname = ?, phone = ?, email = ?, address = ?, job = ?
           WHERE id = ?`,
          [
            values.name,
            values.surname,
            values.phone,
            values.email,
            values.address,
            values.job,
            id,
          ],
          (_: Transaction, _res: ResultSet) => {
            console.log('Contact updated successfully');
            resolve();
          },
          (_: Transaction, error: SQLite.SQLError): boolean => {
            console.error('SQL update error:', error);
            reject(error);
            return false;
          },
        );
      });
    } catch (error) {
      console.error('General database error:', error);
      reject(error);
    }
  });
};
export {
  createContactsTable,
  createRecentsTable,
  getContacts,
  addNewContact,
  addRecentCall,
  getRecents,
  getContactById,
  resetDatabase,
  resetRecentsTable,
  deleteRecent,
  updateContact,
  checkTableStructure,
};
