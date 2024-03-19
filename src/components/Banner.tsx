import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ComicBase } from '@/types/comic';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_PATH } from '@/constants/path';
import 'swiper/css';
import 'swiper/css/pagination';

interface BannerProps {
    data: ComicBase[];
}
const Banner = ({ data }: BannerProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const el = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (el.current) {
            setIsLoading(false);
        }
    }, []);

    const maxLength = data && data.length > 10 ? 10 : (data && data.length) || 0;

    return (
        <section
            ref={el}
            className={`mt-4 flex gap-[10px] transition-all duration-500 sm:mt-0 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative w-full">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination]}
                    pagination={{ el: '.swiper-pagination', clickable: true }}>
                    {maxLength > 0 &&
                        data.slice(-maxLength).map((item) => (
                            <SwiperSlide key={item._id}>
                                <Link
                                    to={`${APP_PATH.comics}/${item._id}`}
                                    title="One Piece">
                                    <div
                                        className="h-[260px] w-full bg-cover bg-top bg-no-repeat md:h-[380px] md:bg-center"
                                        style={{
                                            backgroundImage: `url('${item.thumbnail}')`,
                                        }}
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                </Swiper>
                <div
                    id="swiper-banner-pagination"
                    className="swiper-pagination bottom-[2px_!important] right-0"
                />
            </div>
        </section>
    );
};

export default Banner;
