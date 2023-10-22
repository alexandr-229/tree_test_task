import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Tree } from '../../types/tree';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	tree: Tree;
	zoom: number;

	onAdd: (title: string, parentId: number) => void;
	onEdit: (id: number, title: string) => void;
	onDelete: (id: number) => void;
	forceRerender: () => void;
}
