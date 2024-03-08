import useTranslation from '@/hooks/useTranslation';

export function ErrorBoundary() {
    const locale = 'en';
    const translate = useTranslation(locale);
    return (
        <main
            role="status"
            className="flex h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-7xl font-black text-primary md:text-9xl">500</h1>
            <p className="text-3xl text-black dark:text-white">{translate('ErrorOccurred')}</p>
            <a
                href="/"
                className="bg-orange mt-4 rounded-lg bg-primary px-6 py-2 text-xl text-white shadow">
                {translate('GoBackHome')}
            </a>
        </main>
    );
}
