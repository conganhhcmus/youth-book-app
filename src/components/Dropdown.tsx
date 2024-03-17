import { useState } from 'react';

interface DropDownPros {
    data: { id: string; value: string; title: string }[] | undefined;
    text: string;
    value?: string[];
    onChange?: (val: string, checked: boolean) => void;
}

const DropDown = ({ text, data, value, onChange }: DropDownPros) => {
    const [isHidden, setIsHidden] = useState<boolean>(true);

    const handleCheck = (val: string, checked: boolean) => {
        onChange && onChange(val, checked);
    };

    return (
        <div className="relative h-full w-full">
            <button
                onClick={() => setIsHidden((prev) => !prev)}
                id="dropdownBgHoverButton"
                data-dropdown-toggle="dropdownBgHover"
                className="inline-flex w-44 items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">
                {text}
                <svg
                    className=" ms-3 h-2.5 w-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            <div
                id="dropdownBgHover"
                className={`${isHidden ? 'hidden' : ''} z-20 w-44 rounded-lg bg-white shadow dark:bg-gray-700`}>
                <ul
                    className="max-h-32 w-44 space-y-1 overflow-auto p-3 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownBgHoverButton">
                    {data &&
                        data.map((e) => (
                            <li key={e.id}>
                                <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input
                                        key={e.id}
                                        id={e.id}
                                        onClick={(element) => handleCheck(e.value, element.currentTarget.checked)}
                                        type="checkbox"
                                        defaultChecked={value && value.includes(e.value)}
                                        value={e.value}
                                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                                    />
                                    <label
                                        htmlFor={e.id}
                                        className="ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300">
                                        {e.title}
                                    </label>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default DropDown;
