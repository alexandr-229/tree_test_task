import { forwardRef, ForwardedRef } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import styles from './styles.module.css';
import { ChildRef, Props } from './types';
import { EditingItem } from '../EditingItem';
import { ReadItem } from '../ReadItem';
import { ItemType } from '../../types/tree';
import { useTree } from './useTree';

export const Tree = forwardRef((props: Props, parentRef: ForwardedRef<ChildRef>) => {
	const {
		tree,
		zoom,
		initialPosition,
		onAdd,
		onDelete,
		onEdit,
		forceTreeRerender,
	} = props;
	const {
		save,
		cancel,
		setEditing,
		arrowRef,
		editing,
		childrenRefs,
		horizontalLineCoords,
	} = useTree(props, parentRef);

	const add = () => {
		onAdd('', tree.id);
		forceTreeRerender()
	}

	return (
		<div {...props}>
			{tree.children.length > 1 && (
				<div
					className={cn(styles.horizontalLine, styles.arrowUp)}
					style={{
						width: horizontalLineCoords.width,
						top: horizontalLineCoords.top,
						left: horizontalLineCoords.left,
					}}
				/>
			)}
			<div className={styles.treeItem}>
				{tree.type === ItemType.Children && (
					<div
						ref={arrowRef}
						className={cn(styles.line, styles.lineUp)}
					/>
				)}
				{!!tree.children.length && (
					<div className={cn(styles.line, styles.lineDown)} />
				)}
				{editing ? (
					<EditingItem
						initialTitle={tree.title}
						onCancel={cancel}
						onSave={save}
					/>
				) : (
					<ReadItem
						title={tree.title}
						type={tree.type}
						onAdd={add}
						onDelete={() => onDelete(tree.id)}
						onEdit={() => setEditing(true)}
					/>
				)}
			</div>
			<div className={styles.children}>
				{tree.children.map((child, index) => (
					<Tree
						ref={(childRef: ChildRef) => childrenRefs.current[index] = childRef}
						zoom={zoom}
						initialPosition={initialPosition}
						key={child.id.toString()}
						forceTreeRerender={forceTreeRerender}
						tree={child}
						onAdd={onAdd}
						onDelete={onDelete}
						onEdit={onEdit}
					/>
				))}
			</div>
		</div>
	);
});
