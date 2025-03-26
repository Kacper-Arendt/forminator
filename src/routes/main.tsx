import {BaseLayout} from "@/components/layouts/BaseLayout";
import {Button} from "@/components/ui/button";

export const Main = () => {
	return (
		<BaseLayout height={100}>
			<p className="text-primary">Main</p>
			<Button className="w-full">Fill form</Button>
		</BaseLayout>
	);
};
