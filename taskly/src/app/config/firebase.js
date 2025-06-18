
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWv29bl4DLW4iqOj0gykxpj3Zt6-Lew2w",
  authDomain: "taskly-d4c08.firebaseapp.com",
  projectId: "taskly-d4c08",
  storageBucket: "taskly-d4c08.firebasestorage.app",
  messagingSenderId: "191970358271",
  appId: "1:191970358271:web:8df67e6f33864238f92dca",
  measurementId: "G-HCZMCZ6F28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// const analytics = getAnalytics(app);

export const auth = getAuth();