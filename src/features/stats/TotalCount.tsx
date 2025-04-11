import { db } from "@/features/stats/firebaseInit";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const TotalCount = ({ refreshKey }: { refreshKey: number }) => {
	const [total, setTotal] = useState<number | undefined>(undefined);
	const [loading, setLoading] = useState(true);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const docRef = doc(db, "counts", "formtripper");
				const docSnap = await getDoc(docRef);
				setTotal(docSnap.data()?.total);
			} catch (e) {
				console.error("Error fetching total count: ", e);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [refreshKey]);

	return (
		<p className="mt-2 min-h-5">
			{total === undefined ? (
				""
			) : (
				<>
					Total count:{" "}
					{loading ? <span className="animate-ping">{total}</span> : total}
				</>
			)}
		</p>
	);
};
