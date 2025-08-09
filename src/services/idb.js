import { openDB } from 'idb'

export async function openAppDB(){
  const db = await openDB('premium-portfolio-db', 1, {
    upgrade(db){
      db.createObjectStore('files', { keyPath: 'id' });
      db.createObjectStore('normalized', { keyPath: 'id' });
    }
  });
  return db;
}
