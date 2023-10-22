export enum ItemType {
	Parent = 'Parent',
	Children = 'Children',
}

export interface ListItem {
	id: number;
	title: string;
	type: ItemType;
	children: number[];
}

export interface Tree extends Omit<ListItem, 'children'> {
	children: Tree[];
}

export interface TreeWrapperRef {
	onCenter: () => void;
}
