import { selectLanguage } from '@/redux/slices/settings';
import { useAppSelector } from './reduxHook';
import useTranslation from './useTranslation';
import useAxiosRequest from './useAxiosRequest';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import paymentApis from '@/apis/payment';
import { Chapter } from '@/types/comic';
import { isEnabledRead } from '@/utils/comic';
import Swal from 'sweetalert2';
import { APP_PATH } from '@/constants/path';
import { formatCurrency } from '@/utils/format';
import { selectAccessToken } from '@/redux/slices/token';
import { decodeJWTToken } from '@/utils/token';
import moment from 'moment';

const useReadChapter = () => {
    const lang = useAppSelector((state) => selectLanguage(state.settings));
    const translate = useTranslation(lang);
    const token = useAppSelector((state) => selectAccessToken(state.token));
    const userInfoPayload = decodeJWTToken(token);

    const { callRequest } = useAxiosRequest();
    const navigate = useNavigate();

    const { data: transactionDataResult } = useQuery({
        queryKey: ['getAllBuyTransactionByUser', moment().toLocaleString],
        queryFn: () => paymentApis.getAllBuyTransactionByUser(userInfoPayload?._id),
        enabled: !!userInfoPayload,
    });

    const transactionList = transactionDataResult?.data;

    const handleBuyChapter = (chapterId: string, price: number) => {
        callRequest(paymentApis.buy(chapterId, price), (res) => {
            console.log(res);
            Swal.fire({
                title: translate('bought'),
                text: translate('chapter-bought'),
                icon: 'success',
            }).then(() => {
                window.location.href = `${APP_PATH.comics_chapters}/${chapterId}`;
            });
        });
    };

    const handleReadChapter = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, chapter: Chapter) => {
        if (!chapter) return event.preventDefault();

        if (isEnabledRead(chapter, transactionList)) return;

        event.preventDefault();

        if (!userInfoPayload) {
            Swal.fire({
                title: translate('not-logged'),
                text: translate('login-noted'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#76787a',
                cancelButtonText: translate('cancel'),
                confirmButtonText: translate('login'),
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(APP_PATH.login);
                }
            });
        } else if (userInfoPayload.wallet < chapter.price) {
            Swal.fire({
                title: translate('dont-have-money'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#76787a',
                cancelButtonText: translate('cancel'),
                confirmButtonText: translate('deposit'),
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(APP_PATH.payment_deposit);
                }
            });
        } else {
            Swal.fire({
                title: translate('want-buy-chapter'),
                text: `${translate('chapter-price')}: ${formatCurrency(chapter.price)}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#76787a',
                cancelButtonText: translate('cancel'),
                confirmButtonText: translate('yes-buy-it'),
            }).then((result) => {
                if (result.isConfirmed) {
                    return handleBuyChapter(chapter._id, chapter.price);
                }
            });
        }
    };

    const handleBuyEvent = (chapter: Chapter) => {
        if (isEnabledRead(chapter, transactionList)) return;

        if (!userInfoPayload) {
            Swal.fire({
                title: translate('not-logged'),
                text: translate('login-noted'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#76787a',
                cancelButtonText: translate('cancel'),
                confirmButtonText: translate('login'),
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(APP_PATH.login);
                }
            });
        } else if (userInfoPayload.wallet < chapter.price) {
            Swal.fire({
                title: translate('dont-have-money'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#76787a',
                cancelButtonText: translate('cancel'),
                confirmButtonText: translate('deposit'),
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(APP_PATH.payment_deposit);
                }
            });
        } else {
            Swal.fire({
                title: translate('want-buy-chapter'),
                text: `${translate('chapter-price')}: ${formatCurrency(chapter.price)}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#76787a',
                cancelButtonText: translate('cancel'),
                confirmButtonText: translate('yes-buy-it'),
            }).then((result) => {
                if (result.isConfirmed) {
                    return handleBuyChapter(chapter._id, chapter.price);
                }
            });
        }
    };

    return { handleReadChapter, handleBuyEvent, transactionList };
};

export default useReadChapter;
