import { forwardRef, useImperativeHandle, ForwardedRef } from 'react';
import styles from './styles.module.css';
import { Tree } from '../Tree';
import { Props } from './types';
import { useWrapper } from './useWrapper';
import { TreeWrapperRef } from '../../types/tree';

export const Wrapper = forwardRef(({
	tree,
	zoom,
	onAdd,
	onDelete,
	onEdit,
	forceRerender,
}: Props, ref: ForwardedRef<TreeWrapperRef>) => {
	const {
		position,
		wrapperRef,
		initialCoors,
		treeWrapperRef,
		handleMouseMove,
		handleMouseDown,
		handleMouseUp,
		onCenter,
	} = useWrapper(zoom, tree);

	useImperativeHandle<TreeWrapperRef, TreeWrapperRef>(ref, () => ({
		onCenter,
	}));

	return (
		<div
			ref={wrapperRef}
			className={styles.wrapper}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
		>
			<div
				className={styles.tree}
				onMouseDown={handleMouseDown}
				ref={treeWrapperRef}
				style={{
					left: Math.max(position.x, 0),
					top: Math.max(position.y, 0),
					transform: `scale(${zoom / 100})`,
				}}
			>
				<Tree
					tree={tree}
					zoom={zoom / 100}
					initialPosition={initialCoors}
					onAdd={onAdd}
					onDelete={onDelete}
					onEdit={onEdit}
					forceTreeRerender={forceRerender}
				/>
			</div>
		</div>
	);
});
