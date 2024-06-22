// Lib Imports.
import {
  doc,
  query,
  collection,
  where,
  orderBy,
  limit,
  startAfter,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  Query,
  DocumentData,
  DocumentSnapshot,
  setDoc,
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
  This function accepts two premeters, path & doc.
  And updates the doc at the provided path inside of firestore.
*/
export async function updateDoc(path: string, docId: string, data: Dictionary) {
  const collectionRef = collection(firestore, path);
  const docRef = doc(collectionRef, docId);

  await setDoc(docRef, data, { merge: true });
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

  if (snapshot.empty) return [];

  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

/*
  This function is solely used for projects infite scroll.
  It accepts only one paremeter, lastDoc, which is a snapshot of the last document that was fetched.
  it returns the next set of 9 snapshots of projects.
*/
export async function fetchPage(lastDoc: DocumentSnapshot | null) {
  const projectsQ = lastDoc
    ? query(
        collection(firestore, 'projects'),
        where('lifecycleStatus', '==', 'Published'),
        orderBy('createdAt', 'desc'),
        limit(9),
        startAfter(lastDoc)
      )
    : query(
        collection(firestore, 'projects'),
        where('lifecycleStatus', '==', 'Published'),
        orderBy('createdAt', 'desc'),
        limit(9)
      );

  return await getDocs(projectsQ);
}

/*
  This function accepts two premeters, collectionName & docId.
  It deletes the specified document from firestore.
*/
export async function removeDoc(collectionName: string, docId: string) {
  const reference = doc(firestore, collectionName, docId);
  await deleteDoc(reference);
}
