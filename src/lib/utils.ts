function getFirstProp(object: any) {
	let i = 0;
	for (const prop in object) {
		if (i != 0) {
			break;
		} else {
			i++;
			return object[prop];
		}
	}
}

function getDefaultBlockType(propertyType: string) {
	if (propertyType == 'rich_text' || propertyType == 'title' || propertyType == 'select') {
		return 'h1';
	} else if (propertyType == 'multi_select') {
		return 'ul';
	} else if (propertyType == 'url') {
		return 'a';
	} else {
		return 'n/a';
	}
}

export { getFirstProp, getDefaultBlockType };
