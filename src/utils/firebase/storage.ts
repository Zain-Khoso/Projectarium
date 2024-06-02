// Lib Imports.
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as UUID4 } from 'uuid';

// Local Imports.
import { storage } from '@/configs/firebase';

/*
  This function accepts two premeters, path & File.
  And uploads the provided file to the provided path inside of cloud storage, 
  with the file name being a UUID4.
  Returns download url of the image.
*/
export async function uploadFile(path: string, file: File): Promise<string> {
  const extension = file.name.substring(file.name.lastIndexOf('.'));
  const metadata = {
    contentType: file.type,
  };

  const uploadRef = ref(storage, `${path}/${UUID4()}${extension}`);

  const snapshot = await uploadBytes(uploadRef, file, metadata);

  return await getDownloadURL(snapshot.ref);
}
