import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Ingredient as IngredientType } from "../../model/ingredient";
import { PagePropsType } from "../../model/page-props-type";
import styles from './feed-order.module.css';
import { FC, useEffect } from "react";
import { showFeedOrderDetail } from "../../services/actions/feedOrderDetailActions";
import FeedOrderDetail from "../../components/feed-order-detail/feed-order-detail";

const FeedOrder: FC<PagePropsType> = () => {

    const {order} = useSelector((store: any) => store.feedOrderDetail);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(showFeedOrderDetail(order, false));
    }, []);

    return (
        <>
            <div className={styles.feedtWrap}>
                <div className={styles.title}>#{order.number}</div>
                <FeedOrderDetail />
            </div>
        </>
    )
}
export default FeedOrder;