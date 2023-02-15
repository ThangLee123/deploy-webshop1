// import { Alert, Radio, Space, Spin } from 'antd';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import styles from './SearchScreen1.module.scss';
import classNames from 'classnames/bind';
import { StarIcon } from '~/components/Icons';
import { Alert, Pagination, Rate, Select, Spin } from 'antd';
import { StarFilled } from '@ant-design/icons';
import SearchProductBreadcrumb from '../Product/components/SearchProductBreadcrumb';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '~/redux/actions/productActions';
import { useState } from 'react';
import useAlan from '../../components/hooks/useAlan';
const cx = classNames.bind(styles);

export default function SearchScreen1() {
    const navigate = useNavigate();
    const { name = 'all', category = 'all', min = 0, max = 0, rating = 0, order = 'newest' } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages, totalProductsCount } = productList;

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    const [selectOption, setSelectOption] = useState(order ? order : 'Choose Options');
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        dispatch(
            listProducts({
                name: name !== 'all' ? name : '',
                category: category !== 'all' ? category : '',
                currentPage,
                itemsPerPage,
                min,
                max,
                rating,
                order,
            }),
        );
    }, [dispatch, name, category, currentPage, min, max, rating, order]);
    const handleChangePage = (page) => {
        // console.log('page', page);
        setCurrentPage(page);
    };

    const getFilterUrl = (filter) => {
        // console.log('filter', filter);
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
    };
    useAlan();
    return (
        <div style={{ backgroundColor: '#f5f5fa', marginTop: 'var(--subHeader-height)' }}>
            <SearchProductBreadcrumb />
            {loading ? (
                <Spin size="large" />
            ) : error ? (
                <Alert message="Error" description={error} type="error" showIcon />
            ) : (
                <>
                    <div className={cx('grid wide')}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                {products.length} {products.length > 1 ? `Results` : `Result`}
                            </div>
                            <div>
                                Filter by {''}
                                {/* <select value={order} onChange={(e) => navigate(getFilterUrl({ order: e.target.value }))}>
                                <option value="newest">Newest Arrivals</option>
                                <option value="lowest">Price: Low to High</option>
                                <option value="highest">Price: High to Low</option>
                                <option value="toprated">Avg. Customer Reviews</option>
                            </select> */}
                                <Select
                                    defaultValue={selectOption}
                                    style={{ width: '180px' }}
                                    onChange={(value) => {
                                        setSelectOption(value);
                                        navigate(getFilterUrl({ order: value }));
                                    }}
                                    options={[
                                        {
                                            value: 'newest',
                                            label: 'Newest',
                                        },
                                        {
                                            value: 'lowest',
                                            label: 'Lowest',
                                        },
                                        {
                                            value: 'highest',
                                            label: 'Highest',
                                        },
                                        {
                                            value: 'toprated',
                                            label: 'Top-rated',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        {loading ? (
                            <Spin size="large" />
                        ) : error ? (
                            <Alert message="Error" description={error} type="error" showIcon />
                        ) : (
                            <div className="row">
                                <div
                                    className="col l-2"
                                    style={{ boxShadow: '0 0 0 6px #f5f5fa inset', backgroundColor: 'white' }}
                                >
                                    <div className={cx('SideBar')}>
                                        <div className={cx('block')}>
                                            <div>
                                                <h4 className={cx('title')}>Product Category</h4>
                                                {loadingCategories ? (
                                                    <Spin size="large" />
                                                ) : errorCategories ? (
                                                    <Alert
                                                        message="Error"
                                                        description={errorCategories}
                                                        type="error"
                                                        showIcon
                                                    />
                                                ) : (
                                                    <div className={cx('list collapsed')}>
                                                        {categories.map((c, index) => (
                                                            <div key={index}>
                                                                <Link
                                                                    className={cx(
                                                                        'item',
                                                                        'item--category',
                                                                        // c === category ? 'active' : '',
                                                                    )}
                                                                    style={{
                                                                        paddingLeft: '0px',
                                                                        paddingBottom: '10px',
                                                                        fontWeight: c === category && 'bold',
                                                                        fontSize: c === category && `calc(100% + 1px)`,
                                                                        color: c === category && `rgb(247, 143, 94)`,
                                                                    }}
                                                                    to={getFilterUrl({ category: c })}
                                                                >
                                                                    {c}
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className={cx('block')}>
                                            <h4 className={cx('title')}>Rating</h4>
                                            <div className={cx('rating-list')}>
                                                <div className={cx('item')}>
                                                    <Link to={getFilterUrl({ rating: 5 })}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div className={cx('Stars__Wrapper')}>
                                                                <StarIcon />
                                                                <StarIcon />
                                                                <StarIcon />
                                                                <StarIcon />
                                                                <StarIcon />
                                                            </div>
                                                            <span
                                                                className={cx('text')}
                                                                style={{
                                                                    fontWeight: `${rating}` === `5` && 'bold',
                                                                    fontSize: `${rating}` === `5` && `calc(100% + 1px)`,
                                                                    color: `${rating}` === `5` && `rgb(247, 143, 94)`,
                                                                }}
                                                            >
                                                                5 stars
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className={cx('item')}>
                                                    <Link to={getFilterUrl({ rating: 4 })}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div className={cx('Stars__Wrapper')}>
                                                                <StarIcon />
                                                                <StarIcon />
                                                                <StarIcon />
                                                                <StarIcon />
                                                            </div>
                                                            <span
                                                                className={cx('text')}
                                                                style={{
                                                                    fontWeight: `${rating}` === '4' && 'bold',
                                                                    fontSize: `${rating}` === '4' && `calc(100% + 1px)`,
                                                                    color: `${rating}` === '4' && `rgb(247, 143, 94)`,
                                                                }}
                                                            >
                                                                4 stars
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className={cx('item')}>
                                                    <Link to={getFilterUrl({ rating: 3 })}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div className={cx('Stars__Wrapper')}>
                                                                <StarIcon />
                                                                <StarIcon />
                                                                <StarIcon />
                                                            </div>
                                                            <span
                                                                className={cx('text')}
                                                                style={{
                                                                    fontWeight: `${rating}` === '3' && 'bold',
                                                                    fontSize: `${rating}` === '3' && `calc(100% + 1px)`,
                                                                    color: `${rating}` === '3' && `rgb(247, 143, 94)`,
                                                                }}
                                                            >
                                                                3 stars
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className={cx('item')}>
                                                    <Link to={getFilterUrl({ rating: 2 })}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div className={cx('Stars__Wrapper')}>
                                                                <StarIcon />
                                                                <StarIcon />
                                                            </div>
                                                            <span
                                                                className={cx('text')}
                                                                style={{
                                                                    fontWeight: `${rating}` === '2' && 'bold',
                                                                    fontSize: `${rating}` === '2' && `calc(100% + 1px)`,
                                                                    color: `${rating}` === '2' && `rgb(247, 143, 94)`,
                                                                }}
                                                            >
                                                                2 stars
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className={cx('item')}>
                                                    <Link to={getFilterUrl({ rating: 1 })}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div className={cx('Stars__Wrapper')}>
                                                                <StarIcon />
                                                            </div>
                                                            <span
                                                                className={cx('text')}
                                                                style={{
                                                                    fontWeight: `${rating}` === '1' && 'bold',
                                                                    fontSize: `${rating}` === '1' && `calc(100% + 1px)`,
                                                                    color: `${rating}` === '1' && `rgb(247, 143, 94)`,
                                                                }}
                                                            >
                                                                1 star
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={cx('block')}>
                                            <h4 className={cx('title')}>Price</h4>
                                            <div className={cx('fast-price-filter')}>
                                                <div
                                                    className={cx('item')}
                                                    style={{
                                                        paddingLeft: '0px',
                                                        paddingBottom: '10px',
                                                        fontWeight: `${min}-${max}` === `1-10` && 'bold',
                                                        fontSize: `${min}-${max}` === `1-10` && `calc(100% + 1px)`,
                                                        color: `${min}-${max}` === `1-10` && `rgb(247, 143, 94)`,
                                                    }}
                                                >
                                                    <Link to={getFilterUrl({ min: 1, max: 10 })}>
                                                        <span>{`From 1$ -> 10$`}</span>
                                                    </Link>
                                                </div>
                                                <div
                                                    className={cx('item')}
                                                    style={{
                                                        paddingLeft: '0px',
                                                        paddingBottom: '10px',
                                                        fontWeight: `${min}-${max}` === `10-100` && 'bold',
                                                        fontSize: `${min}-${max}` === `10-100` && `calc(100% + 1px)`,
                                                        color: `${min}-${max}` === `10-100` && `rgb(247, 143, 94)`,
                                                    }}
                                                >
                                                    <Link to={getFilterUrl({ min: 10, max: 100 })}>
                                                        <span className={cx('')}>{`From 10$ -> 100$`}</span>
                                                    </Link>
                                                </div>
                                                <div
                                                    className={cx('item')}
                                                    style={{
                                                        paddingLeft: '0px',
                                                        paddingBottom: '10px',
                                                        fontWeight: `${min}-${max}` === `100-1000` && 'bold',
                                                        fontSize: `${min}-${max}` === `100-1000` && `calc(100% + 1px)`,
                                                        color: `${min}-${max}` === `100-1000` && `rgb(247, 143, 94)`,
                                                    }}
                                                >
                                                    <Link to={getFilterUrl({ min: 100, max: 1000 })}>
                                                        <span className={cx('')}>{`From 100$ -> 1000$`}</span>
                                                    </Link>
                                                </div>
                                                <div
                                                    className={cx('item')}
                                                    style={{
                                                        paddingLeft: '0px',
                                                        paddingBottom: '10px',
                                                        fontWeight:
                                                            `${min}-${max}` === `1000-999999999999999` && 'bold',
                                                        fontSize:
                                                            `${min}-${max}` === `1000-999999999999999` &&
                                                            `calc(100% + 1px)`,
                                                        color:
                                                            `${min}-${max}` === `1000-999999999999999` &&
                                                            `rgb(247, 143, 94)`,
                                                    }}
                                                >
                                                    <Link to={getFilterUrl({ min: 1000, max: 999999999999999 })}>
                                                        <span className={cx('')}>{`Above 1000$`}</span>
                                                    </Link>
                                                </div>
                                            </div>
                                            {/* <div className={cx('price-small-text')}>Chọn khoảng giá</div>
                                            <div className={cx('input-group')}>
                                                <input pattern="[0-9]*" placeholder="Giá từ" value="0"></input>
                                                <input></input>
                                                <span>-</span>
                                                <input pattern="[0-9]*" placeholder="Giá đến" value="0"></input>
                                                <input></input>
                                            </div>
                                            <button>Áp dụng</button> */}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col l-10"
                                    style={{ boxShadow: '0 0 0 6px #f5f5fa inset', backgroundColor: 'white' }}
                                >
                                    <div className={cx('banner-search-container')}>
                                        <div className={cx('banner-search__header')}>
                                            <div className={cx('banner-search__header-ads')}>
                                                <div className={cx('banner-search__header-left')}>
                                                    <img
                                                        className={cx('banner-search__header-left-logo')}
                                                        src="https://salt.tikicdn.com/ts/tka/bd/dc/18/67ae1da2a4b28846f0f154f3a48bef84.png"
                                                        alt="LG Official Store"
                                                    ></img>
                                                    <div className={cx('banner-search__header-left-logo-detail')}>
                                                        <div
                                                            className={cx(
                                                                'banner-search__header-left-logo-detail-text1',
                                                            )}
                                                        >
                                                            Socking Price With LG
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                'banner-search__header-left-logo-detail-text2',
                                                            )}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    'banner-search__header-left-logo-detail-text2-a',
                                                                )}
                                                            >
                                                                Sponsored By
                                                            </span>{' '}
                                                            LG Official Store
                                                            <img
                                                                src="https://salt.tikicdn.com/ts/upload/5d/4c/f7/a947733a6dc83eca57abd15ec1560d8e.png"
                                                                alt="official store"
                                                                className={cx(
                                                                    'banner-search__header-left-logo-detail-text2-img',
                                                                )}
                                                            ></img>
                                                            <span
                                                                className={cx(
                                                                    'banner-search__header-left-logo-detail-text2-rate',
                                                                )}
                                                            >
                                                                {' '}
                                                                4.7/5 stars
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('banner-search__header-right')}>
                                                    <img
                                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/9d/b2/de/735d17158fa27e9ab548d9c415a0c010.png"
                                                        alt="404"
                                                    ></img>
                                                    <img
                                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/9d/b2/de/735d17158fa27e9ab548d9c415a0c010.png"
                                                        alt="404"
                                                        style={{ marginLeft: '8px' }}
                                                    ></img>
                                                    <img
                                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/9d/b2/de/735d17158fa27e9ab548d9c415a0c010.png"
                                                        alt="404"
                                                        style={{ marginLeft: '8px' }}
                                                    ></img>
                                                </div>
                                            </div>
                                            <div className={cx('banner-search__header-ads-button-container')}>
                                                <div
                                                    className={cx('banner-search__header-ads-button')}
                                                    onClick={() => navigate('/search/name/')}
                                                >
                                                    More
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('product-list-container')}>
                                        <div className={cx('row')}>
                                            {products.length === 0 && (
                                                <Alert
                                                    message={
                                                        <div style={{ marginBottom: '298px' }}>No Product Found.</div>
                                                    }
                                                    type="info"
                                                    showIcon
                                                />
                                            )}
                                            {products.map((product, index) => (
                                                <div className="col l-2-4 m-6 c-12" key={index}>
                                                    <div className={cx('product-item')} style={{ height: '100%' }}>
                                                        <div className={cx('thumbnail')}>
                                                            <img
                                                                src="https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png"
                                                                alt="404"
                                                                className={cx('StyledDynamicIconBadge')}
                                                                style={{
                                                                    width: '68px',
                                                                    height: '14px',
                                                                    top: '0px',
                                                                    left: '0px',
                                                                }}
                                                            ></img>
                                                            <div className={cx('product-image-container')}>
                                                                <Link to={`/product/${product._id}`}>
                                                                    <picture className={cx('product-image')}>
                                                                        <img
                                                                            src={product.image1}
                                                                            alt="Product Item"
                                                                            className={cx('WebImg')}
                                                                        ></img>
                                                                    </picture>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className={cx('info')}>
                                                            <div className={cx('name')} style={{ marginTop: '10px' }}>
                                                                <Link to={`/product/${product._id}`}>
                                                                    <h3 className={cx('picture-product')}>
                                                                        {product.name}
                                                                    </h3>
                                                                </Link>
                                                            </div>

                                                            <div className={cx('price-discount')}>
                                                                <div className={cx('price-discount__price')}>
                                                                    {product.price} <sup> $ </sup>
                                                                </div>
                                                            </div>

                                                            <div className={cx('badge-under-rating')}>
                                                                <div className={cx('itembox')}>
                                                                    <span>New+</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className={cx('badge-delivery')}>
                                                            <span
                                                                style={{
                                                                    color: 'rgb(128, 128, 137)',
                                                                    fontSize: '12px',
                                                                }}
                                                            >
                                                                Giao thứ 7, ngày 03/12
                                                            </span>
                                                        </div> */}
                                                        <div className={cx('star-review')}>
                                                            <span>
                                                                {product.rating}
                                                                <StarFilled style={{ color: '#fadb14' }} />
                                                                {product.numReviews <= 1
                                                                    ? ` ${product.numReviews} review `
                                                                    : ` ${product.numReviews} reviews`}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div
                                        className={'container-pagination'}
                                        style={{ marginTop: '0px', paddingBottom: '21px', backgroundColor: '#f5f5fa' }}
                                    >
                                        <Pagination
                                            current={currentPage}
                                            onChange={handleChangePage}
                                            pageSize={itemsPerPage}
                                            total={totalProductsCount}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
        // </div>
    );
}
