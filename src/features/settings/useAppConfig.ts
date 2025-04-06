import {
	EMAIL_DOMAIN_KEY,
	SUBMIT_FORM_KEY,
} from "@/features/settings/storageKeys";
import { useEffect, useState } from "react";

export const useAppConfig = () => {
	const [domain, setDomain] = useState("");
	const [submitForm, setSubmitForm] = useState(false);

	useEffect(() => {
		const savedDomain = localStorage.getItem(EMAIL_DOMAIN_KEY);
		const savedSubmitForm = localStorage.getItem(SUBMIT_FORM_KEY);

		if (savedDomain) setDomain(savedDomain);
		if (savedSubmitForm) setSubmitForm(savedSubmitForm === "true");
	}, []);

	const handleDomainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newDomain = event.target.value;
		setDomain(newDomain);
		localStorage.setItem(EMAIL_DOMAIN_KEY, newDomain);
	};

	const handleSubmitFormChange = (value: boolean) => {
		setSubmitForm(value);
		localStorage.setItem(SUBMIT_FORM_KEY, value.toString());
	};

	return {
		domain,
		submitForm,
		handleDomainChange,
		handleSubmitFormChange,
	};
};
