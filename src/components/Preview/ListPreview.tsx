import { Comic } from '@/types/comic';
import { ComicVertical } from '../Comics';

interface ListPreviewProps {
    data: Comic[];
    className?: string;
}

const ListPreview = ({ data, className }: ListPreviewProps) => {
    return (
        <ul className={className || 'mt-5 grid grid-cols-3 gap-3 gap-y-5 sm:grid-cols-4 md:grid-cols-5'}>
            {data &&
                data.map((item) => (
                    <li key={item._id}>
                        <ComicVertical data={item} />
                    </li>
                ))}
        </ul>
    );
};

export default ListPreview;
