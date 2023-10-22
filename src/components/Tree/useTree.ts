import { useState, useRef, useEffect, useImperativeHandle, ForwardedRef } from 'react';
import { ItemType } from '../../types/tree';
import { ChildRef, Props } from './types';

export const useTree = ({
	tree,
	zoom,
	initialPosition,
	onEdit,
	onDelete,
	forceTreeRerender,
}: Props, parentRef: ForwardedRef<ChildRef>) => {
	const [editing, setEditing] = useState<boolean>(tree.type === ItemType.Children);
	const arrowRef = useRef<HTMLDivElement>(null);
	const childrenRefs = useRef<ChildRef[]>([]);

	useEffect(() => {
		forceTreeRerender();
	}, [editing]);

	useEffect(() => {
		return () => {
			forceTreeRerender();
		};
	}, []);

	useImperativeHandle<ChildRef, ChildRef>(parentRef, () => ({
		getArrowCoords: () => {
			const {
				x = 0,
				y = 0,
			} = arrowRef.current?.getBoundingClientRect() || {};

			return { x, y };
		},
	}));

	const save = (title: string) => {
		onEdit(tree.id, title);
		setEditing(false);
	};

	const cancel = () => {
		setEditing(false);
		if (!tree.title.trim().length) {
			onDelete(tree.id);
		}
	};

	const horizontalLineCoords = (() => {
		const startCoords = childrenRefs.current[0]?.getArrowCoords() || { x: 0, y: 0 };
		const endCoords = childrenRefs.current[childrenRefs.current.length - 1]?.getArrowCoords() || { x: 0, y: 0 };

		const width = (endCoords.x - startCoords.x) / zoom;
		const left = (startCoords.x - initialPosition.x) / zoom;
		const top = (startCoords.y - initialPosition.y) / zoom;

		return {
			width,
			left,
			top,
		};
	})();

	return {
		save,
		cancel,
		setEditing,
		arrowRef,
		editing,
		childrenRefs,
		horizontalLineCoords,
	}
};
