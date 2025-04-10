import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_URL,
	authDomain: "formtripper.firebaseapp.com",
	projectId: "formtripper",
	storageBucket: "formtripper.firebasestorage.app",
	messagingSenderId: "937331296549",
	appId: "1:937331296549:web:5c96c431558e5efd78f2cc",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
