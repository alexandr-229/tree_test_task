import { useState, MouseEvent, useRef, useMemo, useEffect } from 'react';
import { Tree } from '../../types/tree';

export const useWrapper = (zoom: number, tree: Tree) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

	const treeWrapperRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setPosition({...position});
	}, [zoom, tree]);

	const initialCoors = useMemo(() => {
		const {
			x = 0,
			y = 0,
			width = 0,
			height = 0,
		} = treeWrapperRef.current?.getBoundingClientRect() || {};

		return { x, y, width, height };
	}, [treeWrapperRef, position]);

	const handleMouseDown = (event: MouseEvent) => {
		setIsDragging(true);
		setDragStart({
			x: event.clientX - position.x,
			y: event.clientY - position.y,
		});
	};

	const handleMouseMove = (event: MouseEvent) => {
		if (isDragging) {
			const x = event.clientX - dragStart.x;
			const y = event.clientY - dragStart.y;
			setPosition({ x, y });
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const onCenter = () => {
		const {
			width: wrapperWidth = 0,
			height: wrapperHeight = 0,
		} = wrapperRef.current?.getBoundingClientRect() || {};
	
		const absoluteZoom = zoom / 100;
	
		const treeWidth = initialCoors.width / absoluteZoom;
		const treeHeight = initialCoors.height / absoluteZoom;
		const buttonsWidth = 60 * absoluteZoom;
		
		const x = ((wrapperWidth - treeWidth) / 2) + buttonsWidth;
		const y = (wrapperHeight - treeHeight) / 2;

		setPosition({ x, y });
	};

	return {
		position,
		wrapperRef,
		initialCoors,
		treeWrapperRef,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		onCenter,
	}
};
