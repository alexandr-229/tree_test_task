import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import styles from './styles.module.css'
import { Props } from './types';

export const Select = ({
	className,
	options,
	activeOption,
	onSelectOption,
	...props
}: Props) => {
	const [open, setOpen] = useState<boolean>(false);

	const title = options.find((option) => option.key === activeOption)?.value || 'Select';
	const bodyRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.addEventListener('mousedown', closeModal, false);

		return () => {
			document.removeEventListener('mousedown', closeModal, false);
		};
	}, []);

	const closeModal = (event: MouseEvent) => {
		if (!bodyRef.current?.contains(event.target as Node)) {
			setOpen(false);
		}
	};

	const select = (option: string | number) => {
		onSelectOption(option);
		setOpen(false);
	};

	return (
		<div className={cn(styles.wrapper, className)} {...props}>
			<div className={styles.header} onClick={() => setOpen(!open)}>
				<p>{title}</p>
			</div>
			<div
				ref={bodyRef}
				className={styles.body}
				style={{
					height: open ? options.length * 30 : 0,
				}}
			>
				{options.map((option) => (
					<div
						key={option.key}
						className={styles.option}
						onClick={() => select(option.key)}
					>
						<p>{option.value}</p>
						{option.key === activeOption && <FontAwesomeIcon icon={faCheck} />}
					</div>
				))}
			</div>
		</div>
	)
};
