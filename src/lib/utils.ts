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
	if (
		propertyType == 'rich_text' ||
		propertyType == 'title' ||
		propertyType == 'select' ||
		propertyType == 'number' ||
		propertyType == 'rollup' ||
		propertyType == 'people' ||
		propertyType == 'unique_id' ||
		propertyType == 'phone_number'
	) {
		return 'h1';
	} else if (propertyType == 'multi_select') {
		return 'ul';
	} else if (
		propertyType == 'url' ||
		propertyType == 'relation' 
	) {
		return 'a';
	} else if (propertyType == 'status') {
		return 'status';
	} else if (
		propertyType == 'date' ||
		propertyType == 'created_time' ||
		propertyType == 'last_edited_time'
	) {
		return 'short';
	} else if (propertyType == 'checkbox') {
		return 'checkbox';
	} else {
		return 'n/a';
	}
}

export { getFirstProp, getDefaultBlockType };
