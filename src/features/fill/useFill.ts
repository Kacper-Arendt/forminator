export const useFill = () => {
	// const getBrowserInstance = (): typeof chrome => {
	// 	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// 	const browserInstance = window.chrome || (window as any).browser;
	// 	return browserInstance;
	// };

	const getCurrentTab = async () => {
		const queryOptions = { active: true, lastFocusedWindow: true };
		const [tab] = await chrome.tabs.query(queryOptions);
		return tab;
	};

	const fillForm = async () => {
		try {
			const tab = await getCurrentTab();
			if (!tab?.id) {
				console.log("No tab found");
				return;
			}

			await chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: () => {
					const firstNames = ["John", "Jane", "Alice", "Bob", "Monika"];
					const lastNames = ["Doe", "Smith", "Johnson", "Brown"];
					const phoneNumbers = [
						"1234567890",
						"9876543210",
						"5555555555",
						"4444444444",
					];
					const texts = ["Hello", "World", "Foo", "Bar"];

					const getRandomItem = (array: string[]) =>
						array[Math.floor(Math.random() * array.length)];

					const getText = () => getRandomItem(texts);
					const getFirstName = () => getRandomItem(firstNames);
					const getLastName = () => getRandomItem(lastNames);
					const getPhoneNumber = () => getRandomItem(phoneNumbers);
					const getEmail = (domain = "formtripper.com") => {
						const firstName = getFirstName().toLowerCase();
						const lastName = getLastName().toLowerCase();
						return `${firstName}.${lastName}@${domain}`;
					};

					const fillInput = (input: HTMLInputElement, value: string) => {
						try {
							input.focus();
							input.setAttribute("value", value);
							input.dispatchEvent(new Event("change", { bubbles: true }));
							input.dispatchEvent(new Event("blur", { bubbles: true }));
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
							categorizedInputs.phone.forEach((e) =>
								fillInput(e, getPhoneNumber()),
							);
							categorizedInputs.other.forEach((e) => fillInput(e, getText()));
						} catch (e) {
							console.log(e);
							return null;
						}
					};

					// const fillEmailInput = () => {
					// 	const emailInput = document.querySelector(
					// 		'input[type="email"]',
					// 	) as HTMLInputElement;
					// 	if (emailInput) {
					// 		console.log("emailInput", emailInput);
					// 		emailInput.focus();
					// 		emailInput.setAttribute("value", "dupa@dupa.com");
					// 		emailInput.dispatchEvent(new Event("change", { bubbles: true }));
					// 		emailInput.dispatchEvent(new Event("blur", { bubbles: true }));
					// 	} else {
					// 		console.log("No email input found");
					// 	}
					// };

					const inputs = document.querySelectorAll("input");
					fillInputs(inputs);

					// fillEmailInput();
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
