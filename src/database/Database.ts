import SQLite, {
  ResultSet,
  SQLError,
  SQLiteDatabase,
  Transaction,
} from 'react-native-sqlite-storage';
import {celebrities} from '../constants/sampleData';

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
      (_: Transaction, _res: ResultSet) => {},
      (_: Transaction, _error: SQLite.SQLError): boolean => {
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
      (_: Transaction, _res: ResultSet) => {},
      (_: Transaction, _error: SQLite.SQLError): boolean => {
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

const addNewContact = async (contact: IContact): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await getDB();

      database.transaction(
        (txn: Transaction) => {
          const query =
            'INSERT INTO users (name, surname, phone, email, address, job) VALUES (?, ?, ?, ?, ?, ?)';
          const params = [
            contact.name,
            contact.surname,
            contact.phone,
            contact.email,
            contact.address,
            contact.job,
          ];

          txn.executeSql(
            query,
            params,
            (_: Transaction) => {
              resolve();
            },
            (_: Transaction, error: SQLError): boolean => {
              reject(error);
              return false;
            },
          );
        },
        error => {
          reject(error);
        },
        () => {},
      );
    } catch (error) {
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
          resolve(result.rows.raw());
        },
        (_, error) => {
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
              resolve();
            },
            (_: Transaction, error: SQLite.SQLError): boolean => {
              reject(error);
              return false;
            },
          );
        },
        error => {
          reject(error);
        },
        () => {},
      );
    } catch (error) {
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
          createContactsTable().then(resolve).catch(reject);
        },
        (_, error) => {
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
          createRecentsTable().then(resolve).catch(reject);
        },
        (_, error) => {
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

const updateContact = async (id: number, contact: IContact): Promise<void> => {
  return new Promise((resolve, reject) => {
    getDB()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE users SET name = ?, surname = ?, phone = ?, email = ?, address = ?, job = ? WHERE id = ?',
            [
              contact.name,
              contact.surname,
              contact.phone,
              contact.email,
              contact.address,
              contact.job,
              id,
            ],
            (_, _result) => {
              resolve();
            },
            (_, error) => {
              reject(error);
              return false;
            },
          );
        });
      })
      .catch(reject);
  });
};

const deleteContact = async (id: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await getDB();
      database.transaction((txn: Transaction) => {
        txn.executeSql(
          'DELETE FROM users WHERE id = ?',
          [id],
          (_: Transaction, _res: ResultSet) => {
            resolve();
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

const createFavoritesTable = async (): Promise<void> => {
  const database = await getDB();
  database.transaction((txn: Transaction) => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER UNIQUE,
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
      )`,
      [],
      (_: Transaction, _res: ResultSet) => {},
      (_: Transaction, _error: SQLite.SQLError): boolean => {
        return false;
      },
    );
  });
};

const addToFavorites = async (userId: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await getDB();
      database.transaction((txn: Transaction) => {
        txn.executeSql(
          'INSERT OR IGNORE INTO favorites (user_id) VALUES (?)',
          [userId],
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

const removeFromFavorites = async (userId: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await getDB();
      database.transaction((txn: Transaction) => {
        txn.executeSql(
          'DELETE FROM favorites WHERE user_id = ?',
          [userId],
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

const getFavorites = async (): Promise<IContact[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await getDB();
      database.transaction((txn: Transaction) => {
        txn.executeSql(
          `SELECT u.* FROM users u
           INNER JOIN favorites f ON u.id = f.user_id`,
          [],
          (_, result) => {
            const favorites = [];
            for (let i = 0; i < result.rows.length; i++) {
              favorites.push(result.rows.item(i));
            }
            resolve(favorites);
          },
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

const insertSampleData = async (): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await getDB();
      database.transaction((txn: Transaction) => {
        txn.executeSql('DROP TABLE IF EXISTS recents', [], () => {
          txn.executeSql('DROP TABLE IF EXISTS users', [], () => {
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
              () => {
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
                  () => {
                    let insertedCount = 0;
                    celebrities.forEach(celebrity => {
                      txn.executeSql(
                        'INSERT INTO users (name, surname, phone, email, address, job) VALUES (?, ?, ?, ?, ?, ?)',
                        [
                          celebrity.name,
                          celebrity.surname,
                          celebrity.phone,
                          celebrity.email,
                          celebrity.address,
                          celebrity.job,
                        ],
                        () => {
                          insertedCount++;
                          if (insertedCount === celebrities.length) {
                            txn.executeSql(
                              'SELECT id FROM users',
                              [],
                              (_, res: ResultSet) => {
                                const users = [];
                                for (let i = 0; i < res.rows.length; i++) {
                                  users.push(res.rows.item(i));
                                }

                                let recentCallsCount = 0;
                                const numberOfRecentCalls = 20;

                                for (let i = 0; i < numberOfRecentCalls; i++) {
                                  const randomUser =
                                    users[
                                      Math.floor(Math.random() * users.length)
                                    ];
                                  const randomDuration = Math.floor(
                                    Math.random() * 300,
                                  );
                                  const randomDate = new Date(
                                    Date.now() -
                                      Math.random() * 30 * 24 * 60 * 60 * 1000,
                                  ).toISOString();
                                  const callTypes = [
                                    'incoming',
                                    'outgoing',
                                    'missed',
                                  ];
                                  const randomCallType =
                                    callTypes[
                                      Math.floor(
                                        Math.random() * callTypes.length,
                                      )
                                    ];

                                  txn.executeSql(
                                    'INSERT INTO recents (recent_id, date, callType, duration) VALUES (?, ?, ?, ?)',
                                    [
                                      randomUser.id,
                                      randomDate,
                                      randomCallType,
                                      randomDuration,
                                    ],
                                    () => {
                                      recentCallsCount++;
                                      if (
                                        recentCallsCount === numberOfRecentCalls
                                      ) {
                                        resolve(true);
                                      }
                                    },
                                    (_, error: SQLite.SQLError): boolean => {
                                      reject(error);
                                      return false;
                                    },
                                  );
                                }
                              },
                              (_, error: SQLite.SQLError): boolean => {
                                reject(error);
                                return false;
                              },
                            );
                          }
                        },
                        (_, error: SQLite.SQLError): boolean => {
                          reject(error);
                          return false;
                        },
                      );
                    });
                  },
                  (_, error: SQLite.SQLError): boolean => {
                    reject(error);
                    return false;
                  },
                );
              },
              (_, error: SQLite.SQLError): boolean => {
                reject(error);
                return false;
              },
            );
          });
        });
      });
    } catch (error) {
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
  deleteContact,
  deleteRecent,
  updateContact,
  getFavorites,
  addToFavorites,
  createFavoritesTable,
  removeFromFavorites,
  checkTableStructure,
  insertSampleData,
};
