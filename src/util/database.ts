import { doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { database, storage } from "./firebase";

export async function updateHeading(heading: string) {
  const homepageRef = doc(database, "content", "homepage");
  await updateDoc(homepageRef, {
    heading,
  });
}

export async function updateImage(file: File, oldPath: string) {
  // delete the old image
  const oldRef = ref(storage, oldPath);
  await deleteObject(oldRef);

  // upload the new one
  const extension = file.name.slice(file.name.lastIndexOf('.'));
  const newPath = `image${extension}`;
  const imageRef = ref(storage, newPath);
  await uploadBytes(imageRef, file);


  // update database with the new image info
  const homepageRef = doc(database, "content", "homepage");
  const imageURL = await getDownloadURL(ref(imageRef));
  await updateDoc(homepageRef, {
    imagePath: newPath,
    imageURL,
  });
}

export async function updateText(text: string) {
  const homepageRef = doc(database, "content", "homepage");
  await updateDoc(homepageRef, {
    text,
  });
}
