import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames';
import styles from './styles.module.css';
import { Props } from './types';
import { ItemType } from '../../types/tree';

export const ReadItem = ({ title, className, type, onAdd, onDelete, onEdit, ...props }: Props) => {
	return (
		<div className={cn(styles.wrapper, className)} {...props}>
			<div className={styles.card}>
				{title}
			</div>
			<button className={styles.button} onClick={onAdd}>
				<FontAwesomeIcon icon={faPlus} />
			</button>
			{type === ItemType.Children ? (
				<>
					<button className={styles.button} onClick={onEdit}>
						<FontAwesomeIcon icon={faPen} />
					</button>
					<button className={cn(styles.button, styles.red)} onClick={onDelete}>
						<FontAwesomeIcon icon={faXmark} />
					</button>
				</>
			) : (
				<div style={{ width: 60 }} />
			)}
		</div>
	)
};
