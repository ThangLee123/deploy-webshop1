import { HomeOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchProductBreadcrumb.module.scss';
import { Link, useParams } from 'react-router-dom';
import data from '~/data';

const cx = classNames.bind(styles);

function SearchProductBreadcrumb() {
    return (
        <div className={cx('product-breadcrumb')}>
            <div className={cx('product-breadcrumb__link')}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">
                            <HomeOutlined />
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <ShoppingOutlined />
                        <Link to="/search/name">
                            <span className={cx('all-products-btn')}>All Products</span>
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </div>
    );
}

// ProductBreadcrumb.propTypes = {
//     children: PropTypes.node.isRequired,
// };

export default SearchProductBreadcrumb;
