import { INDEXED_DB } from '@/constants/settings';
import { Collection } from '@/types/indexedDB';

declare global {
    interface Window {
        db: IDBDatabase;
    }
}

export const initLocalDb = (collection: Collection) => {
    const indexedDB = window.indexedDB;

    if (!indexedDB) return;

    const localDb = indexedDB.open(INDEXED_DB.db, 1);

    localDb.onupgradeneeded = () => {
        const db = localDb.result;
        const store = db.createObjectStore(collection.name, {
            keyPath: 'id',
            autoIncrement: false,
        });
        collection.index.forEach((index) => {
            store.createIndex(index, index, { unique: true });
        });
    };

    localDb.onsuccess = (e: Event) => {
        const target = e.target as IDBOpenDBRequest;
        if (target) {
            const db = target.result;
            window.db = db;
        }
    };

    localDb.onerror = () => {
        console.error(localDb.error);
    };
};

export const getLocalDbByKey = (key: string, collection: Collection) => {
    const db = window.db;
    const trans = db.transaction(collection.name, 'readwrite');
    const store = trans.objectStore(collection.name);
    return store.get(key);
};

export const addLocalDb = (data: object, collection: Collection) => {
    const db = window.db;
    const trans = db.transaction(collection.name, 'readwrite');
    const store = trans.objectStore(collection.name);
    store.put({ ...data });
};

export const deleteLocalDbByKey = (key: string, collection: Collection) => {
    const db = window.db;
    const trans = db.transaction(collection.name, 'readwrite');
    const store = trans.objectStore(collection.name);
    store.delete(key);
};

export const deleteAllLocalDb = (collection: string) => {
    const db = window.db;
    const trans = db.transaction(collection, 'readwrite');
    const store = trans.objectStore(collection);
    store.clear();
};
