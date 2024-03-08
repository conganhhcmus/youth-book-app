import useTranslation from '@/hooks/useTranslation';

export function NotFound() {
    const locale = 'en';
    const translate = useTranslation(locale);
    return (
        <div
            role="status"
            className="flex h-screen flex-col items-center justify-center gap-4">
            <h2 className="text-7xl font-black text-primary md:text-9xl">404</h2>
            <p className="text-3xl text-black dark:text-white">{translate('NotFoundPage')}</p>
        </div>
    );
}
