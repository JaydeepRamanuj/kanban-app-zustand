import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseSetup";

const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

const googleSignIn = () => signInWithPopup(auth, new GoogleAuthProvider());

const signout = () => signOut(auth);

export { signIn, register, googleSignIn, signout };
