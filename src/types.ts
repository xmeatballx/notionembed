export type Block = {
	propertyType: string;
	previewElement: string;
	propertyId: string;
	order: number;
};

export interface State {
	user_id: string;
	database_id: string;
	database_name: string;
	page_ids: string[];
	preview_as_id: string;
	page_properties: any;
	blocks: Array<Block> | [];
}

export type StateValue = string & (Array<Block> | []);
