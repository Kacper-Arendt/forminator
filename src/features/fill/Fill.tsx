import { Button } from "@/components/ui/button";
import { useFill } from "@/features/fill/useFill";
import { useAppConfig } from "@/features/settings/useAppConfig";
import { TotalCount } from "@/features/stats/TotalCount";
import { useStats } from "@/features/stats/useStats";
import { useState } from "react";

export const Fill = () => {
	const { fillForm } = useFill();
	const { incrementTotal } = useStats();
	const [refreshKey, setRefreshKey] = useState(0);
	const { disableSendStats } = useAppConfig();

	const handleFill = async () => {
		if (!disableSendStats) {
			await incrementTotal();
			setRefreshKey((prevKey) => prevKey + 1);
		}
		await fillForm();
	};

	return (
		<div className="px-2 py-4">
			<Button className="w-full" onClick={handleFill}>
				Fill form
			</Button>
			{!disableSendStats && <TotalCount refreshKey={refreshKey} />}
		</div>
	);
};
