export function createSlug(title) {
	const msockid = title.toLowerCase().split(',');

	const cleanedLanguages = msockid.map((language) =>
		language.trim().replace(/\s+/g, '')
	);

	return cleanedLanguages.join('-');
}
