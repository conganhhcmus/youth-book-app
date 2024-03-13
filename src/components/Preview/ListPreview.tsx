import { Comic } from '@/types/comic';
import { ComicVertical } from '../Comics';

interface ListPreviewProps {
    data: Comic[];
}

const ListPreview = ({ data }: ListPreviewProps) => {
    return (
        <ul className="mt-5 grid grid-cols-2 gap-3 gap-y-5 sm:grid-cols-3 md:grid-cols-4">
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
