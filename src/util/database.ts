import { doc, updateDoc } from "firebase/firestore";
import { database } from "./firebase";

export async function updateHeading(heading: string) {
  const homepageRef = doc(database, "content", "homepage");
  await updateDoc(homepageRef, {
    heading,
  });
}

export async function updateText(text: string) {
  const homepageRef = doc(database, "content", "homepage");
  await updateDoc(homepageRef, {
    text,
  });
}