import { Button } from "@/components/ui/button";
import { useFill } from "@/features/fill/useFill";

export const Fill = () => {
	const { fillForm } = useFill();

	return (
		<>
			<p className="text-primary">Main</p>
			<Button className="w-full" onClick={fillForm}>
				Fill form
			</Button>
		</>
	);
};
