import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	initialTitle: string;
	onSave: (title: string) => void;
	onCancel: () => void;
}
