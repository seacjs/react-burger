import { useParams } from "react-router-dom";
import { Ingredient as IngredientType } from "../../model/ingredient";
import { PagePropsType } from "../../model/page-props-type";
import styles from './profile-order.module.css';
import { FC, useEffect } from "react";
import { getFeedOrderDetail, showFeedOrderDetail } from "../../services/actions/feedOrderDetailActions";
import FeedOrderDetail from "../../components/feed-order-detail/feed-order-detail";
import { useSelector, useDispatch } from "../../hooks/hooks";

const ProfileOrder: FC<PagePropsType> = () => {

    const {order} = useSelector(store => store.feedOrderDetail);
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFeedOrderDetail(id as string));
    }, []);

    useEffect(() => {
        if(order) {
            dispatch(showFeedOrderDetail(order, false));
        }
    }, [order]);

    return (
        <>
            {order &&
                <div className={styles.feedtWrap}>
                    <div className={styles.title}>#{order.number}</div>
                    <FeedOrderDetail />
                </div>
            }
        </>
    )
}
export default ProfileOrder;