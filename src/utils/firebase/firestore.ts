// Lib Imports.
import { collection, doc, getDoc, addDoc, DocumentData } from 'firebase/firestore';

// Local Imports.
import { firestore } from '@/configs/firebase';

/*
  This function accepts two premeters, path & doc.
  And uploads the provided doc to the provided path inside of firestore.
  Returns doc id of the uploaded document.
*/
export async function uploadDoc(path: string, doc: Record<string, any>): Promise<string> {
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
