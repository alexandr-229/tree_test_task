import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ItemType } from '../../types/tree';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string;
	type: ItemType;
	onAdd: () => void;
	onEdit: () => void;
	onDelete: () => void;
}
