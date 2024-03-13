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

    return (
        <section
            ref={el}
            className={`mt-4 flex gap-[10px] transition-all duration-500 sm:mt-0 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <div className="relative w-full md:w-[65%] lg:w-[510px]">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination]}
                    pagination={{ el: '.swiper-pagination', clickable: true }}>
                    {data &&
                        data.length > 3 &&
                        data.slice(0, 3).map((item) => (
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
            <div className="hidden flex-1 flex-shrink-0 grid-cols-6 gap-[10px] md:grid">
                <div className="col-span-6 flex flex-col items-center gap-[10px] lg:flex-row">
                    {data &&
                        data.length > 5 &&
                        data.slice(3, 5).map((item) => (
                            <Link
                                key={item._id}
                                to={`${APP_PATH.comics}/${item._id}`}
                                title={item.title}
                                className="h-[185px] w-full overflow-hidden">
                                <p
                                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${item.thumbnail})`,
                                    }}
                                />
                            </Link>
                        ))}
                </div>
                <div className="col-span-6 items-center gap-[10px] md:hidden lg:flex">
                    {data &&
                        data.length > 8 &&
                        data.slice(5, 8).map((item) => (
                            <Link
                                key={item._id}
                                title={item.title}
                                to={`${APP_PATH.comics}/${item._id}`}
                                className="h-[185px] w-[221px] overflow-hidden">
                                <p
                                    className="h-full w-full bg-cover bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${item.thumbnail})`,
                                    }}
                                />
                            </Link>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default Banner;
