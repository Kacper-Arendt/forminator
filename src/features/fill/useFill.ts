import { useRandomText } from "@/features/fill/useRandomText";

export const useFill = () => {
	const { getPhoneNumber, getFirstName, getLastName, getEmail, getText } =
		useRandomText();
	const getCurrentTab = async () => {
		const queryOptions = { active: true, lastFocusedWindow: true };
		// @ts-ignore
		const [tab] = await chrome.tabs.query(queryOptions);
		return tab;
	};

	const fillInput = (input: HTMLInputElement, value: string) => {
		try {
			input.value = value;
		} catch (e) {
			console.log(e);
			return null;
		}
	};

	const sortInputs = (inputs: NodeListOf<HTMLInputElement>) => {
		const categorizedInputs = {
			text: [] as HTMLInputElement[],
			email: [] as HTMLInputElement[],
			phone: [] as HTMLInputElement[],
			other: [] as HTMLInputElement[],
		};

		inputs.forEach((input) => {
			switch (input.type) {
				case "email":
					categorizedInputs.email.push(input);
					break;
				case "tel":
					categorizedInputs.phone.push(input);
					break;
				case "text":
					categorizedInputs.text.push(input);
					break;
				default:
					categorizedInputs.other.push(input);
					break;
			}
		});

		return categorizedInputs;
	};

	const getTextForTextInput = (input: HTMLInputElement) => {
		try {
			switch (input.name) {
				case "phone":
				case "phone_number":
				case "phone-number":
					return getPhoneNumber();
				case "first_name":
				case "name":
				case "first-name":
				case "user-name":
				case "username":
					return getFirstName();

				case "last_name":
				case "surname":
				case "last-name":
					return getLastName();
				default:
					return getText();
			}
		} catch (e) {
			console.log(e);
			return getText();
		}
	};

	const fillInputs = (inputs: NodeListOf<HTMLInputElement>) => {
		try {
			if (!inputs || inputs?.length === 0) return null;

			const categorizedInputs = sortInputs(inputs);

			categorizedInputs.text.forEach((e) =>
				fillInput(e, getTextForTextInput(e)),
			);
			categorizedInputs.email.forEach((e) => fillInput(e, getEmail()));
			categorizedInputs.phone.forEach((e) => fillInput(e, getPhoneNumber()));
			categorizedInputs.other.forEach((e) => fillInput(e, getText()));
		} catch (e) {
			console.log(e);
			return null;
		}
	};

	const fillForm = async () => {
		try {
			const tab = await getCurrentTab();
			console.log("tab", tab);

			if (!tab?.id) return;

			// @ts-ignore
			await chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: () => {
					const inputs = document.querySelectorAll("input");
					console.log("inputs", inputs);
					fillInputs(inputs);
				},
			});
		} catch (e) {
			console.log(e);
		}
	};

	return {
		fillForm,
	};
};
