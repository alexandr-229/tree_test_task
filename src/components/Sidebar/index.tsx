import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import styles from './styles.module.css';
import { Props } from './types';
import { options } from './data';
import { Select } from '../Select';

export const Sidebar = ({
	zoom,
	onCenter,
	setZoom,
	className,
	...props
}: Props) => {
	const handleLessZoom = () => {
		const currentIdx = options.findIndex((option) => option === zoom);

		if (currentIdx < 1){
			return;
		}

		setZoom(options[currentIdx - 1]);
	};

	const handleMoreZoom = () => {
		const currentIdx = options.findIndex((option) => option === zoom);

		if (currentIdx < 0 || currentIdx > options.length - 2){
			return;
		}

		setZoom(options[currentIdx + 1]);
	};

	return (
		<div
			className={cn(styles.wrapper, className)}
			{...props}
		>
			<button className={cn(styles.button, styles.icon)} onClick={onCenter}>
				<FontAwesomeIcon icon={faLocationArrow} />
			</button>
			<button className={styles.button} onClick={handleLessZoom}>-</button>
			<Select
				activeOption={zoom}
				onSelectOption={(option) => setZoom(+option)}
				options={options.map((option) => ({ key: option, value: `${option}%` }))}
			/>
			<button className={styles.button} onClick={handleMoreZoom}>+</button>
		</div>
	);
};
