'use client';

import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import useTheme from '@/modules/theme/theme-provider';
import { useLocalization } from '@/modules/translation/use-localization';
import { useTranslation } from '@/modules/translation/use-translation';
import Link from 'next/link';
import { strings } from '../../translation/strings';

export const DashboardHeader = () => {
	const { toggle, theme } = useTheme();
	const { t } = useTranslation(strings);
	const { nextLanguage, language } = useLocalization();

	return (
		<div className="flex flex-row justify-between">
			<Link href="/">
				<h1 className="title-2">EnergyCom</h1>
			</Link>
			<div className="flex flex-row gap-2">
				<Button variant="ghost" theme="neutral" onClick={toggle} size="sm">
					{t.general.theme}: {theme}
					<Icon icon="theme" size={16} />
				</Button>
				<Button
					variant="ghost"
					theme="neutral"
					size="sm"
					onClick={nextLanguage}>
					{t.general.language}: {language}
					<Icon icon="language" size={16} />
				</Button>
			</div>
		</div>
	);
};
