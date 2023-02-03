import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ProductOutroImage.module.scss';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function ProductOutroImage() {
    const navigate = useNavigate();
    return (
        <div className={cx('grid wide')}>
            <div className={cx('product-footer-banner')}>
                <div className={cx('product-footer-banner__overlay')}></div>
                <div className={cx('product-footer-banner__content')}>
                    <h2>WELCOME TO OUR SHOP</h2>
                    <p>
                        Welcome our lovely customer, We are very happy when u trust on us to choose and buying your
                        product. Hope you have a happy time when shopping on our store and find the lovely product you
                        want.
                    </p>
                    <button
                        className={cx('product-footer-banner__content-button')}
                        onClick={() => navigate('/search/name/')}
                    >
                        View Collections
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductOutroImage;
