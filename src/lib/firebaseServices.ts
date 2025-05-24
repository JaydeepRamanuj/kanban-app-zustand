import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseSetup";
import type { TaskType } from "../stores/useKanbanStore";

export async function saveUserData(
  uid: string,
  username?: string | null,
  email?: string | null
) {
  try {
    const userRef = doc(db, "users", uid);
    const userData = { uid, email, username, createdAt: Date.now(), tasks: [] };
    await setDoc(userRef, userData);
  } catch (error) {
    console.log("Error saving user data", error);
  }
}
export async function getUserData(uid: string) {
  try {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot) {
      return userSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error getting user data", error);
  }
}
export async function updateData(uid: string, newData: TaskType[]) {
  const userRef = doc(db, "users", uid);
  try {
    await updateDoc(userRef, { tasks: newData });
  } catch (error) {
    console.error("Error updating user data:", error);
  }
}
