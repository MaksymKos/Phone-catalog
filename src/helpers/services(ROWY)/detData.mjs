import { getDocs, collection } from 'firebase/firestore';
import { getDb } from './db.mjs';

const collectionNamePhones = 'phone-list';

export const findAll = async () => {
  const docRefs = await getDocs(collection(getDb(), collectionNamePhones));

  const res = [];

  docRefs.forEach(phone => {
    res.push({
      ...phone.data(),
    });
  });

  return res;
};

const collectionNameDetails = 'phone-details';

export const findDetails = async () => {
  const docRefs = await getDocs(collection(getDb(), collectionNameDetails));

  const res = [];

  docRefs.forEach(details => {
    res.push({
      ...details.data(),
    });
  });

  return res;
};
