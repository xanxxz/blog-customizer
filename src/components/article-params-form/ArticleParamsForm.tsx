import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
	onApply: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formData, setFormData] =
		useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		onChange: setIsMenuOpen,
		rootRef: asideRef,
	});

	const handleChange = <K extends keyof ArticleStateType>(
		field: K,
		value: ArticleStateType[K]
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const onReset = () => {
		setFormData(defaultArticleState);
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formData);
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen((prev) => !prev)}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={onSubmit}>
					<div className={styles.topContainer}>
						<h1 className={styles.formTitle}>Задайте параметры</h1>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formData.fontFamilyOption}
							onChange={(value) => handleChange('fontFamilyOption', value)}
						/>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formData.fontSizeOption}
							onChange={(value) => handleChange('fontSizeOption', value)}
						/>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formData.fontColor}
							onChange={(value) => handleChange('fontColor', value)}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formData.backgroundColor}
							onChange={(value) => handleChange('backgroundColor', value)}
						/>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formData.contentWidth}
							onChange={(value) => handleChange('contentWidth', value)}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={onReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
