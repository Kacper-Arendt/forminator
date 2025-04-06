import { Button } from "@/components/ui/button";
import { useFill } from "@/features/fill/useFill";

export const Fill = () => {
	const { fillForm } = useFill();

	return (
		<div className="px-2 py-4">
			<Button className="w-full" onClick={fillForm}>
				Fill form
			</Button>
		</div>
	);
};
