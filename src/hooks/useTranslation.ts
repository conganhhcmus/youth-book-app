import { getLanguageResource } from '@/apis/lang';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useTranslation = (locale: string) => {
    const [translations, setTranslations] = useState();

    const translate = (key: string) => {
        return (translations && translations[key]) || key;
    };

    const { data: langResource } = useQuery({
        queryKey: ['language', locale],
        queryFn: () => getLanguageResource(locale),
        keepPreviousData: true,
        staleTime: 3 * 60 * 1000,
        enabled: locale !== '',
    });

    useEffect(() => {
        setTranslations(langResource?.data);
    }, [langResource]);

    return translate;
};

export default useTranslation;
