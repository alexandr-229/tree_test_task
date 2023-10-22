import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	options: { key: string | number; value: string }[];
	activeOption: string | number;
	onSelectOption: (option: string | number) => void;
}
