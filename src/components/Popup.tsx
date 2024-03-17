import { useAppSelector } from '@/hooks/reduxHook';
import useTranslation from '@/hooks/useTranslation';
import { selectLanguage } from '@/redux/slices/settings';
import { ReactNode, useEffect, useState } from 'react';

interface PopupProps {
    closeHandle: () => void;
    submitHandle?: (e?: unknown) => void;
    cancelHandle?: (e?: unknown) => void;
    title: string;
    content: ReactNode;
    cancel?: boolean;
    submit?: boolean;
}

const Popup = ({ closeHandle, title, content, submit = true, cancel = true, submitHandle, cancelHandle }: PopupProps) => {
    const [contentRender, setContentRender] = useState<ReactNode>();
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    useEffect(() => {
        setContentRender(content);
    }, [content]);
    return (
        <div
            id="static-modal"
            data-modal-backdrop="static"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0">
            <div className="relative left-[50%] top-[50%] max-h-full w-full max-w-[800px] translate-x-[-50%] translate-y-[-50%] transform p-4">
                <div className="relative rounded-lg border-2 bg-white shadow dark:bg-gray-700 ">
                    <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5">
                        <h3 className="text-xl font-semibold capitalize text-gray-900 dark:text-white">{title}</h3>
                        <button
                            type="button"
                            onClick={() => closeHandle()}
                            className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="static-modal">
                            <svg
                                className="h-3 w-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="max-h-[500px] space-y-4 overflow-y-auto p-4 md:p-5">{contentRender}</div>
                    <div className="flex items-center justify-end gap-4 rounded-b border-t border-gray-200 p-4 dark:border-gray-600 md:p-5">
                        {cancel && (
                            <button
                                onClick={() => cancelHandle && cancelHandle()}
                                data-modal-hide="static-modal"
                                type="button"
                                className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                {translate('cancel')}
                            </button>
                        )}
                        {submit && (
                            <button
                                onClick={() => submitHandle && submitHandle()}
                                data-modal-hide="static-modal"
                                type="button"
                                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {translate('save')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
