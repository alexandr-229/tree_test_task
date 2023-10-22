import { ItemType, ListItem, Tree as ITree, Tree } from './types/tree';

export class TreeConstructor {
	private list: ListItem[] = [];
	public parentId: number = 0;

	constructor() {
		const id = Math.random();

		this.list.push({
			id,
			title: 'Categories',
			type: ItemType.Parent,
			children: [],
		});
		this.parentId = id;
	}

	get tree() {
		return this.getTree();
	}

	private getTree() {
		const defaultTree: ITree = {
			...this.list[0],
			children: [],
		};

		const parentItem = this.list.find((item) => item.id === this.parentId);

		if (!parentItem) {
			return defaultTree;
		}

		const result: Tree = {
			...parentItem,
			children: this.getChildren(parentItem.children)
		};

		return result;
	}

	private getChildren(childrenIds: number[]) {
		const result: Tree[] = this.list
			.filter((item) => childrenIds.includes(item.id))
			.map((item) => ({
				...item,
				children: this.getChildren(item.children),
			}));

		return result;
	}

	public addItem(title: string, parentId: number) {
		const newItem: ListItem = {
			id: Math.random(),
			title,
			type: ItemType.Children,
			children: [],
		};

		this.list = this.list
			.map((item) => {
				if (item.id === parentId) {
					item.children.push(newItem.id);
				}
				return item;
			})
			.concat(newItem);
	}

	public deleteItem(id: number) {
		this.list = this.list.filter((item) => item.id !== id);
	}

	public editItem(id: number, title: string) {
		this.list = this.list.map((item) => {
			if (item.id === id) {
				item.title = title;
			}
			return item;
		})
	}
}
