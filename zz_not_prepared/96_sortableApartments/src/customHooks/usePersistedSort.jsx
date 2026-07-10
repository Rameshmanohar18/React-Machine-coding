// ─── Custom Hook: Persisted Sort State ───
import { useState, useCallback } from 'react';

// ─── Storage Wrapper (localStorage ) ───
const memoryStore = {};
const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return memoryStore[key] ?? null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      memoryStore[key] = value;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      delete memoryStore[key];
    }
  },
};

export default function usePersistedSort() {
  const [sortKey, _setSortKey] = useState(() =>
    storage.get('apartmentSortKey')
  );
  const [sortDirection, _setSortDirection] = useState(
    () => storage.get('apartmentSortDirection') || 'asc'
  );

  const setSortKey = useCallback((key) => {
    _setSortKey(key);
    if (key) storage.set('apartmentSortKey', key);
    else storage.remove('apartmentSortKey');
  }, []);

  const setSortDirection = useCallback((dir) => {
    _setSortDirection(dir);
    storage.set('apartmentSortDirection', dir);
  }, []);

  const clearSort = useCallback(() => {
    _setSortKey(null);
    _setSortDirection('asc');
    storage.remove('apartmentSortKey');
    storage.remove('apartmentSortDirection');
  }, []);

  return { sortKey, sortDirection, setSortKey, setSortDirection, clearSort };
}
