// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8jjWX2PIMy3qWE8ZE70eS3GCRKcIIAYw",
  authDomain: "movie-mania-832f0.firebaseapp.com",
  projectId: "movie-mania-832f0",
  storageBucket: "movie-mania-832f0.appspot.com",
  messagingSenderId: "263372930187",
  appId: "1:263372930187:web:c70bea9dd0051ba615a88e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
const signup=async(name,email,password)=>{
try{
   const res= await createUserWithEmailAndPassword(auth,email,password);
   const user=res.user;
   await addDoc(collection(db,"user"),{
    uid:user.uid,
    name,
    authProvider:"local",
    email,
   });
}catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const login=async(email,password)=>{
try{
    await signInWithEmailAndPassword(auth,email,password);

}catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const logout= ()=>{
    signOut(auth);
}
export{auth,db,login,signup,logout};