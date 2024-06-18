// Lib Imports.
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
  DocumentData,
  Query,
} from 'firebase/firestore';

// Local Imports.
import { firestore } from '@/configs/firebase';

/*
  This function accepts two premeters, path & doc.
  And uploads the provided doc to the provided path inside of firestore.
  Returns doc id of the uploaded document.
*/
export async function uploadDoc(path: string, doc: Dictionary): Promise<string> {
  const collectionRef = collection(firestore, path);

  const snapshot = await addDoc(collectionRef, doc);

  return snapshot.id;
}

/*
  This function accepts two premeters, collectionName & docId.
  It returns the specified document or null.
*/
export async function fetchDoc(
  collectionName: string,
  docId: string
): Promise<DocumentData | undefined> {
  const reference = doc(firestore, collectionName, docId);
  const snapshot = await getDoc(reference);

  return snapshot.data();
}

/*
  This function accepts a premeter, a firestore query.
  It returns all the documents that satisfy the query.
*/
export async function fetchDocs(Q: Query): Promise<Dictionary[]> {
  const snapshot = await getDocs(Q);

  if (snapshot.empty) throw new Error('projects-not-found');

  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

/*
  This function accepts two premeters, collectionName & docId.
  It deletes the specified document from firestore.
*/
export async function removeDoc(collectionName: string, docId: string) {
  const reference = doc(firestore, collectionName, docId);
  await deleteDoc(reference);
}
