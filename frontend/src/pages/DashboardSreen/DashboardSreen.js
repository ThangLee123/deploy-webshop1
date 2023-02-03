import React from 'react';
import Chart from 'react-google-charts';
import styles from './DashboardSreen.module.scss';
import classNames from 'classnames/bind';
import { UserOutlined, ShoppingCartOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { Alert, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { summaryOrder } from '~/redux/actions/orderActions';

const cx = classNames.bind(styles);

function DashboardSreen() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const orderSummary = useSelector((state) => state.orderSummary);
    const { loading, summary, error } = orderSummary;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userSignin.userInfo) {
            dispatch(summaryOrder());
        }
    }, [dispatch, userSignin.userInfo]);
    return (
        <div style={{ marginTop: `var(--header-height)` }}>
            <h1 style={{ marginLeft: '20px' }}>Dashboard</h1>
            {loading ? (
                <Spin size="large" />
            ) : error ? (
                <Alert message="Error" description={error} type="error" showIcon />
            ) : (
                <>
                    <ul className={cx('row', 'summary')}>
                        <li>
                            <div className={cx('summary-title', 'color1')}>
                                <span>
                                    <UserOutlined /> Users
                                </span>
                            </div>
                            <div className={cx('summary-body')}>{summary.users[0].numUsers}</div>
                        </li>
                        <li>
                            <div className={cx('summary-title', 'color2')}>
                                <span>
                                    <ShoppingCartOutlined /> Orders
                                </span>
                            </div>
                            <div className={cx('summary-body')}>
                                {summary.orders[0] ? summary.orders[0].numOrders : 0}
                            </div>
                        </li>
                        <li>
                            <div className={cx('summary-title', 'color3')}>
                                <span>
                                    <MoneyCollectOutlined /> Sales
                                </span>
                            </div>
                            <div className={cx('summary-body')}>
                                ${summary.orders[0] ? summary.orders[0].totalSales.toFixed(2) : 0}
                            </div>
                        </li>
                    </ul>
                    <div>
                        <div>
                            <h2 style={{ marginLeft: '20px' }}>Sales</h2>
                            {summary.dailyOrders.length === 0 ? (
                                <Alert message={<div>No Sale</div>} type="info" showIcon />
                            ) : (
                                <Chart
                                    width="100%"
                                    height="400px"
                                    chartType="AreaChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[['Date', 'Sales'], ...summary.dailyOrders.map((x) => [x._id, x.sales])]}
                                ></Chart>
                            )}
                        </div>
                    </div>
                    <div>
                        <div>
                            <h2 style={{ marginLeft: '20px' }}>Categories</h2>
                            {summary.productCategories.length === 0 ? (
                                <Alert message={<div>No Category</div>} type="info" showIcon />
                            ) : (
                                <Chart
                                    width="100%"
                                    height="400px"
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Category', 'Products'],
                                        ...summary.productCategories.map((x) => [x._id, x.count]),
                                    ]}
                                ></Chart>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default DashboardSreen;
