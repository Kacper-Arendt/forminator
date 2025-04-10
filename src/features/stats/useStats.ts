import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "./firebaseInit";

export const useStats = () => {
	const incrementTotal = async () => {
		const docRef = doc(db, "counts", "formtripper");

		try {
			await updateDoc(docRef, {
				total: increment(1),
			});
		} catch (e) {
			console.log("Transaction failed: ", e);
		}
	};

	return { incrementTotal };
};
