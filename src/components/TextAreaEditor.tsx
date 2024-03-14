import { useEffect, useState } from 'react';
import RichTextEditor, { EditorValue } from 'react-rte';

interface TextAreaEditorProps {
    onChange?: (val: string) => void;
    initialValue?: string;
}

const TextAreaEditor: React.FC<TextAreaEditorProps> = ({ onChange, initialValue }) => {
    const defaultValue = initialValue || '';
    const [value, setValue] = useState<EditorValue>(RichTextEditor.createEmptyValue());
    const _onChange = (val: EditorValue) => {
        setValue(val);
        onChange && onChange(val.toString('html'));
    };

    useEffect(() => {
        setValue(RichTextEditor.createValueFromString(defaultValue, 'html'));
    }, [defaultValue]);

    return (
        <RichTextEditor
            editorClassName="h-[200px] overflow-y-auto"
            value={value}
            onChange={_onChange}
        />
    );
};

export default TextAreaEditor;
