import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Tree } from '../../types/tree';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	tree: Tree;
	zoom: number;
	initialPosition: { x: number; y: number; };

	onAdd: (title: string, parentId: number) => void;
	onDelete: (id: number) => void;
	onEdit: (id: number, title: string) => void;
	forceTreeRerender: () => void;
}

export interface ChildRef {
	getArrowCoords: () => {
		x: number;
		y: number;
	};
}
