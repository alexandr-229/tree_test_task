import { useState } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './styles.module.css';
import { Props } from './types';

export const EditingItem = ({ className, initialTitle, onCancel, onSave, ...props }: Props) => {
	const [value, setValue] = useState<string>(initialTitle);

	return (
		<div
			className={cn(styles.wrapper, className)}
			{...props}
		>
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className={styles.input}
			/>
			<button className={cn(styles.button, styles.yellow)} onClick={onCancel}>
				<FontAwesomeIcon icon={faXmark} />
			</button>
			<button className={cn(styles.button, styles.green)} onClick={() => onSave(value)}>
				<FontAwesomeIcon icon={faCheck} />
			</button>
		</div>
	)
};
