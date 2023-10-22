import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	zoom: number;
	setZoom: (zoom: number) => void;
	onCenter: () => void;
}
