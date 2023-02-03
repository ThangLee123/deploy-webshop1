// import { Alert, Radio, Space, Spin } from 'antd';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import styles from './SearchScreen.module.scss';
import classNames from 'classnames/bind';
import { StarIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

export default function SearchScreen() {
    return (
        <div className={cx('grid wide')}>
            <div className={cx('CategoryViewstyle')}>
                <div className={cx('SideBar')}>
                    <div className={cx('block')}>
                        <div>
                            <h4 className={cx('title')}>Danh Mục Sản Phẩm</h4>
                            <div className={cx('list collapsed')}>
                                <div className={cx('item', 'item--category')} style={{ paddingLeft: '0px' }}>
                                    Laptop Gaming
                                </div>
                                <div className={cx('item', 'item--category')} style={{ paddingLeft: '0px' }}>
                                    Laptop Truyền Thống
                                </div>
                                <div className={cx('item', 'item--category')} style={{ paddingLeft: '0px' }}>
                                    Bàn Phím Thay Thế Laptop
                                </div>
                                <div className={cx('item', 'item--category')} style={{ paddingLeft: '0px' }}>
                                    Adapter Sạc Laptop
                                </div>
                                <div className={cx('item', 'item--category')} style={{ paddingLeft: '0px' }}>
                                    Pin Thay Thế Laptop
                                </div>
                                <div className={cx('item', 'item--category')} style={{ paddingLeft: '0px' }}>
                                    Skin và Decal Dán Laptop
                                </div>
                                <div className={cx('item', 'item--category')} style={{ paddingLeft: '0px' }}>
                                    Túi xách &amp; Balo
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('block')}>
                        <h4 className={cx('title')}>Đánh giá</h4>
                        <div className={cx('rating-list')}>
                            <div className={cx('item')}>
                                <div className={cx('Stars__Wrapper')}>
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                </div>
                                <span className={cx('text')}>từ 5 sao</span>
                            </div>

                            <div className={cx('item')}>
                                <div className={cx('Stars__Wrapper')}>
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                </div>
                                <span className={cx('text')}>từ 4 sao</span>
                            </div>

                            <div className={cx('item')}>
                                <div className={cx('Stars__Wrapper')}>
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                </div>
                                <span className={cx('text')}>từ 3 sao</span>
                            </div>

                            <div className={cx('item')}>
                                <div className={cx('Stars__Wrapper')}>
                                    <StarIcon />
                                    <StarIcon />
                                </div>
                                <span className={cx('text')}>từ 2 sao</span>
                            </div>

                            <div className={cx('item')}>
                                <div className={cx('Stars__Wrapper')}>
                                    <StarIcon />
                                </div>
                                <span className={cx('text')}>từ 1 sao</span>
                            </div>
                        </div>
                    </div>

                    <div className={cx('block')}>
                        <h4 className={cx('title')}>Giá</h4>
                        <div className={cx('fast-price-filter')}>
                            <div className={cx('item')}>
                                <span>Dưới 20.000.000</span>
                            </div>
                            <div className={cx('item')}>
                                <span className={cx('')}>{`20.000.000 -> 27.000.000`}</span>
                            </div>
                            <div className={cx('item')}>
                                <span className={cx('')}>{`27.000.000 -> 46.000.000`}</span>
                            </div>
                            <div className={cx('item')}>
                                <span className={cx('')}>Trên 46.000.000</span>
                            </div>
                        </div>
                        <div className={cx('price-small-text')}>Chọn khoảng giá</div>
                        <div className={cx('input-group')}>
                            {/* <input pattern="[0-9]*" placeholder="Giá từ" value="0"></input> */}
                            <input></input>
                            <span>-</span>
                            {/* <input pattern="[0-9]*" placeholder="Giá đến" value="0"></input> */}
                            <input></input>
                        </div>
                        <button>Áp dụng</button>
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    <div className={cx('inner')}>
                        <div className={cx('search-summary')}>
                            <div>
                                <div>
                                    <div className={cx('StoreAdWidgetWrapper')}>
                                        <div className={cx('StoreInfoWrapper')}>
                                            <div className={cx('Logo')}>
                                                <div className={cx('PictureV2__StyledWrapImage')}>
                                                    <img
                                                        src="https://salt.tikicdn.com/ts/tka/bd/dc/18/67ae1da2a4b28846f0f154f3a48bef84.png"
                                                        alt="LG Official Store"
                                                        className={cx('PictureV2__StyledImage-sc-tfuu67-1 dcItBv')}
                                                        style={{ width: '280px', height: '280px' }}
                                                    ></img>
                                                </div>
                                            </div>
                                            <div className={cx('StoreTitleBox')}>
                                                <h4 className={cx('Title')}>Giá Sock Sập Sàn Cùng LG</h4>
                                                <div className={cx('store-name')}>
                                                    <span className={cx('SponsorText')}>Tài trợ bởi</span>
                                                    &nbsp; <span className={cx('StoreName')}>LG Official Store</span>
                                                    <img
                                                        src="https://salt.tikicdn.com/ts/upload/5d/4c/f7/a947733a6dc83eca57abd15ec1560d8e.png"
                                                        alt="official store"
                                                        className={cx('StoreIcon')}
                                                    ></img>
                                                    <div className={cx('vertical-align-middle')}>
                                                        4.7/5&nbsp;{' '}
                                                        <i
                                                            className={cx('icomoon icomoon-star')}
                                                            style={{ fontSize: '16px', color: 'yellow' }}
                                                        ></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('StyledRightBlock')}>
                                            <div className={cx('FeaturedProductsWrapper_containner')}>
                                                <div className={cx('FeaturedProductWrapper_01')}>
                                                    <div className={cx('ProductImg')}>
                                                        <div className={cx('PictureV2__StyledWrapImage')}>
                                                            <img
                                                                src="https://salt.tikicdn.com/cache/280x280/media/catalog/product/tmp/22/54/1f/d2936f1471a25647937b4d29f784b712.png"
                                                                alt=""
                                                                className={cx(
                                                                    'PictureV2__StyledImage-sc-tfuu67-1 dcItBv',
                                                                )}
                                                            ></img>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={cx('style__FeaturedProductWrapper-sc-1ezwll2-7 kkwJfz')}
                                                >
                                                    <div className={cx('style__ProductImg-sc-1ezwll2-8 cRRpdw')}>
                                                        <div
                                                            className={cx(
                                                                'PictureV2__StyledWrapImage-sc-tfuu67-0 CFwPI',
                                                            )}
                                                        >
                                                            <img
                                                                src="https://salt.tikicdn.com/cache/280x280/ts/product/9d/b2/de/735d17158fa27e9ab548d9c415a0c010.png"
                                                                alt=""
                                                                className={cx(
                                                                    'PictureV2__StyledImage-sc-tfuu67-1 dcItBv',
                                                                )}
                                                            ></img>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={cx('style__FeaturedProductWrapper-sc-1ezwll2-7 kkwJfz')}
                                                >
                                                    <div className={cx('style__ProductImg-sc-1ezwll2-8 cRRpdw')}>
                                                        <div
                                                            className={cx(
                                                                'PictureV2__StyledWrapImage-sc-tfuu67-0 CFwPI',
                                                            )}
                                                        >
                                                            <img
                                                                src="https://salt.tikicdn.com/cache/280x280/media/catalog/product/tmp/5f/dc/47/a142841e2491a69f62d3056eebb44497.png"
                                                                alt=""
                                                                className={cx(
                                                                    'PictureV2__StyledImage-sc-tfuu67-1 dcItBv',
                                                                )}
                                                            ></img>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('style__StyledMoreInfoGroup-sc-1ezwll2-16 klNMoQ')}>
                                                <div
                                                    className={cx('style__StyledButtonShopDetail-sc-1ezwll2-17 RTZxO')}
                                                >
                                                    Xem thêm
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('style__Divide-sc-1ezwll2-1 jkMZHS')}></div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('ProductList')} style={{ display: 'flex' }}>
                        <div>
                            <div className={cx('product-item')} style={{ height: '100%' }}>
                                <span className={cx('style__StyledItem-sc-18svp8n-0 fkDgwT')}>
                                    <div>
                                        <div className={cx('thumbnail')}>
                                            <img
                                                src="https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png"
                                                className={cx('styles__StyledDynamicIconBadge-sc-cxexs7-0 hdozRK')}
                                                style={{ width: '68px', height: '14px', top: '0px', left: '0px' }}
                                            ></img>
                                            <div className={cx('image-wrapper')}>
                                                <picture className={cx('webpimg-container')}>
                                                    <source
                                                        type="image/webp"
                                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/98/be/bf/1aac569c57f9d5db7dd7371330676c3c.jpg.webp 1x"
                                                    ></source>
                                                    <img
                                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/98/be/bf/1aac569c57f9d5db7dd7371330676c3c.jpg"
                                                        alt="Laptop Asus TUF Gaming F15 FX507ZC-HN124W (Core i7-12700H/8GB/512GB/RTX 3050 4GB/15.6-inch FHD/Win 11/Jaeger Gray)-Hàng chính hãng"
                                                        className={cx('WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo')}
                                                    ></img>
                                                </picture>
                                            </div>
                                        </div>
                                        <div className={cx('info')}>
                                            <div className={cx('name')}>
                                                <h3>
                                                    Laptop Asus TUF Gaming F15 FX507ZC-HN124W (Core
                                                    i7-12700H/8GB/512GB/RTX 3050 4GB/15.6-inch FHD/Win 11/Jaeger
                                                    Gray)-Hàng chính hãng
                                                </h3>
                                            </div>
                                            <div className={cx('styles__EmptyRating-sc-732h27-3 kYvTKq')}></div>
                                            <div className={cx('price-discount')}>
                                                <div className={cx('price-discount__price')}>
                                                    28.990.000 <sup> ₫</sup>
                                                </div>
                                            </div>
                                            <div
                                                className={cx('badge-under-price')}
                                                style={{ color: 'rgb(128, 128, 137)' }}
                                            >
                                                Tặng tới 3189 ASA (1tr ₫)
                                                {/* <br>≈ 3.5% hoàn tiền</br> */}
                                            </div>
                                            <div className={cx('badge-under-rating')}>
                                                <div className={cx('item')}>
                                                    <span>Freeship+</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('badge-delivery')}>
                                            <span style={{ color: 'rgb(128, 128, 137)' }}>Giao thứ 7, ngày 03/12</span>
                                        </div>
                                    </div>
                                </span>
                            </div>

                            <div className={cx('product-item')}>
                                <span className={cx('style__StyledItem-sc-18svp8n-0 fkDgwT')}>
                                    <div>
                                        <div className={cx('thumbnail')}>
                                            <img
                                                src="https://i.kym-cdn.com/entries/icons/original/000/028/692/cat.jpg"
                                                alt="404"
                                                className={cx('styles__StyledDynamicIconBadge-sc-cxexs7-0 hdozRK')}
                                                style={{ width: '68px', height: '14px', top: '0px', left: '0px' }}
                                            ></img>
                                            <div className={cx('image-wrapper')}>
                                                <picture className={cx('webpimg-container')}>
                                                    <source
                                                        type="image/webp"
                                                        src="https://i.kym-cdn.com/entries/icons/original/000/028/692/cat.jpg"
                                                    ></source>
                                                    <img
                                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/15/9a/ff/f9d397da1b44f6122c28d141e70482da.png"
                                                        alt="Laptop Lenovo IdeaPad Gaming 3 15ACH6 (82K200T0VN) R5 5600H/8GB/512GB/15.6”/RTX 3050/Win 11-Hàng chính hãng"
                                                        className={cx('WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo')}
                                                    ></img>
                                                </picture>
                                            </div>
                                            <div className={cx('badge-astra')}>
                                                <div className={cx('group-astra')}>
                                                    <img
                                                        width="53"
                                                        height="20"
                                                        src="https://salt.tikicdn.com/ts/upload/d6/51/17/cde193f3d0f6da18147a739247c95c93.png"
                                                        alt="icon-astra"
                                                    ></img>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('info')}>
                                            <div className={cx('name')}>
                                                <h3>
                                                    Laptop Lenovo IdeaPad Gaming 3 15ACH6 (82K200T0VN) R5
                                                    5600H/8GB/512GB/15.6”/RTX 3050/Win 11-Hàng chính hãng
                                                </h3>
                                            </div>
                                            <div
                                                className={cx('styles__StyledRatingQtySold-sc-732h27-0 uDeVr')}
                                                style={{ marginBottom: '6px' }}
                                            >
                                                <div className={cx('styles__StyledQtySold-sc-732h27-2 fCfYNm')}>
                                                    Đã bán 2
                                                </div>
                                            </div>
                                            <div className={cx('price-discount')}>
                                                <div className={cx('price-discount__price')}>
                                                    23.990.000 <sup> ₫</sup>
                                                </div>
                                            </div>
                                            <div
                                                className={cx('badge-under-price')}
                                                style={{ color: 'rgb(128, 128, 137)' }}
                                            >
                                                Tặng tới 2699 ASA (868k ₫)
                                                {/* <br>≈ 3.6% hoàn tiền</br> */}
                                            </div>
                                            <div className={cx('badge-under-rating')}>
                                                <div className={cx('item')}>
                                                    <span>Trả góp</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('badge-delivery')}>
                                            <span style={{ color: 'rgb(128, 128, 137)' }}>Giao thứ 7, ngày 03/12</span>
                                        </div>
                                    </div>
                                </span>
                            </div>

                            <div className={cx('product-item')}>
                                <span className={cx('style__StyledItem-sc-18svp8n-0 fkDgwT')}>
                                    <div>
                                        <div className={cx('thumbnail')}>
                                            <img
                                                src="https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png"
                                                className={cx('styles__StyledDynamicIconBadge-sc-cxexs7-0 hdozRK')}
                                                style={{ width: '68px', height: '14px', top: '0px', left: '0px' }}
                                            ></img>
                                            <div className={cx('image-wrapper')}>
                                                <picture className={cx('webpimg-container')}>
                                                    <source
                                                        type="image/webp"
                                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/98/be/bf/1aac569c57f9d5db7dd7371330676c3c.jpg.webp 1x, https://salt.tikicdn.com/cache/280x280/ts/product/98/be/bf/1aac569c57f9d5db7dd7371330676c3c.jpg.webp 2x"
                                                    ></source>
                                                    <img
                                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/98/be/bf/1aac569c57f9d5db7dd7371330676c3c.jpg"
                                                        alt="Laptop Asus TUF Gaming F15 FX507ZC-HN124W (Core i7-12700H/8GB/512GB/RTX 3050 4GB/15.6-inch FHD/Win 11/Jaeger Gray)-Hàng chính hãng"
                                                        className={cx('WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo')}
                                                    ></img>
                                                </picture>
                                            </div>
                                        </div>
                                        <div className={cx('info')}>
                                            <div className={cx('name')}>
                                                <h3>
                                                    Laptop Asus TUF Gaming F15 FX507ZC-HN124W (Core
                                                    i7-12700H/8GB/512GB/RTX 3050 4GB/15.6-inch FHD/Win 11/Jaeger
                                                    Gray)-Hàng chính hãng
                                                </h3>
                                            </div>
                                            <div className={cx('styles__EmptyRating-sc-732h27-3 kYvTKq')}></div>
                                            <div className={cx('price-discount')}>
                                                <div className={cx('price-discount__price')}>
                                                    28.990.000 <sup> ₫</sup>
                                                </div>
                                            </div>
                                            <div
                                                className={cx('badge-under-price')}
                                                style={{ color: 'rgb(128, 128, 137)' }}
                                            >
                                                Tặng tới 3189 ASA (1tr ₫)
                                                {/* <br>≈ 3.5% hoàn tiền</br> */}
                                            </div>
                                            <div className={cx('badge-under-rating')}>
                                                <div className={cx('item')}>
                                                    <span>Freeship+</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('badge-delivery')}>
                                            <span style={{ color: 'rgb(128, 128, 137)' }}>Giao thứ 7, ngày 03/12</span>
                                        </div>
                                    </div>
                                </span>
                            </div>

                            <div className={cx('product-item')}>
                                <span className={cx('style__StyledItem-sc-18svp8n-0 fkDgwT')}>
                                    <div>
                                        <div className={cx('thumbnail')}>
                                            <img
                                                src="https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png"
                                                className={cx('styles__StyledDynamicIconBadge-sc-cxexs7-0 hdozRK')}
                                                style={{ width: '68px', height: '14px', top: '0px', left: '0px' }}
                                            ></img>
                                            <div className={cx('image-wrapper')}>
                                                <picture className={cx('webpimg-container')}>
                                                    <source
                                                        type="image/webp"
                                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/a5/af/7d/c2e7398856394743517f89ff2bf15f4e.jpg.webp 1x, https://salt.tikicdn.com/cache/280x280/ts/product/a5/af/7d/c2e7398856394743517f89ff2bf15f4e.jpg.webp 2x"
                                                    ></source>
                                                    <img
                                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/a5/af/7d/c2e7398856394743517f89ff2bf15f4e.jpg"
                                                        alt="Laptop Asus TUF Gaming F15 FX506LHB i5-10300H/8GB/512GB/Win11 HN188W - Hàng chính hãng"
                                                        className={cx('WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo')}
                                                    ></img>
                                                </picture>
                                            </div>
                                        </div>
                                        <div className={cx('info')}>
                                            <div className={cx('name')}>
                                                <h3>
                                                    Laptop Asus TUF Gaming F15 FX506LHB i5-10300H/8GB/512GB/Win11 HN188W
                                                    - Hàng chính hãng
                                                </h3>
                                            </div>
                                            <div className={cx('styles__EmptyRating-sc-732h27-3 kYvTKq')}></div>
                                            <div className={cx('price-discount has-discount')}>
                                                <div className={cx('price-discount__price')}>
                                                    16.890.000 <sup> ₫</sup>
                                                </div>
                                                <div className={cx('price-discount__discount')}>-16%</div>
                                            </div>
                                            <div
                                                className={cx('badge-under-price')}
                                                style={{ color: 'rgb(128, 128, 137)' }}
                                            >
                                                Tặng tới 1858 ASA (598k ₫)
                                                {/* <br>≈ 3.5% hoàn tiền </br> */}
                                            </div>
                                            <div className={cx('badge-under-rating')}>
                                                <div className={cx('item')}>
                                                    <span>Freeship+</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('badge-delivery')}>
                                            <span style={{ color: 'rgb(128, 128, 137)' }}>Giao thứ 5, ngày 01/12</span>
                                        </div>
                                    </div>
                                </span>
                            </div>

                            <div className={cx('product-item')}>
                                <span className={cx('style__StyledItem-sc-18svp8n-0 fkDgwT')}>
                                    <div>
                                        <div className={cx('thumbnail')}>
                                            <img
                                                src="https://salt.tikicdn.com/ts/upload/e8/6a/e3/7f998ef1eb5ab0536aac53f02a698c8a.png"
                                                className={cx('styles__StyledDynamicIconBadge-sc-cxexs7-0 hdozRK')}
                                                style={{ width: '68px', height: '14px', top: '0px', left: '0px' }}
                                            ></img>
                                            <div className={cx('image-wrapper')}>
                                                <picture className={cx('webpimg-container')}>
                                                    <source
                                                        type="image/webp"
                                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/30/b2/df/7d074b54a6a1f4c940bcd3340031c28d.jpg.webp 1x, https://salt.tikicdn.com/cache/280x280/ts/product/30/b2/df/7d074b54a6a1f4c940bcd3340031c28d.jpg.webp 2x"
                                                    ></source>
                                                    <img
                                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/30/b2/df/7d074b54a6a1f4c940bcd3340031c28d.jpg"
                                                        alt='Laptop Lenovo 100e Gen 2 N4020/4GB/64GB eMMC/Intel UHD Graphics 600/11.6"HD/Win 10 Pro - HÀNG CHÍNH HÃNG'
                                                        className={cx('WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo')}
                                                    ></img>
                                                </picture>
                                            </div>
                                            <div className={cx('badge-astra')}>
                                                <div className={cx('group-astra')}>
                                                    <img
                                                        width="53"
                                                        height="20"
                                                        src="https://salt.tikicdn.com/ts/upload/d6/51/17/cde193f3d0f6da18147a739247c95c93.png"
                                                        alt="icon-astra"
                                                    ></img>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('info')}>
                                            <div className={cx('name')}>
                                                <h3>
                                                    Laptop Lenovo 100e Gen 2 N4020/4GB/64GB eMMC/Intel UHD Graphics
                                                    600/11.6"HD/Win 10 Pro - HÀNG CHÍNH HÃNG
                                                </h3>
                                            </div>
                                            <div
                                                className={cx('styles__StyledRatingQtySold-sc-732h27-0 uDeVr')}
                                                style={{ marginBottom: '6px' }}
                                            >
                                                <div className={cx('full-rating')}>
                                                    <div className={cx('total')}>
                                                        <span>5</span>
                                                        <svg
                                                            stroke="currentColor"
                                                            fill="currentColor"
                                                            strokeWidth="0"
                                                            viewBox="0 0 24 24"
                                                            size="14"
                                                            color="#fdd836"
                                                            height="14"
                                                            width="14"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            style={{ color: 'rgb(253, 216, 54) ' }}
                                                        >
                                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className={cx('styles__StyledSeparator-sc-732h27-1 gcwbHk')}></div>
                                                <div className={cx('styles__StyledQtySold-sc-732h27-2 fCfYNm')}>
                                                    Đã bán 7
                                                </div>
                                            </div>
                                            <div className={cx('price-discount has-discount')}>
                                                <div className={cx('price-discount__price')}>
                                                    4.647.258 <sup> ₫</sup>
                                                </div>
                                                <div className={cx('price-discount__discount')}>-3%</div>
                                            </div>
                                            <div
                                                className={cx('badge-under-price')}
                                                style={{ color: 'rgb(128, 128, 137)' }}
                                            >
                                                Tặng tới 571 ASA (184k ₫)
                                                {/* <br>≈ 4.0% hoàn tiền </br> */}
                                            </div>
                                            <div className={cx('badge-under-rating')}>
                                                <div className={cx('item')}>
                                                    <span>Freeship+</span>
                                                </div>
                                                <div className={cx('item')}>
                                                    <span>Trả góp</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('badge-delivery')}>
                                            <span style={{ color: 'rgb(128, 128, 137)' }}>Giao thứ 6, ngày 02/12</span>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className={cx('product-item')} style={{ height: '100%' }}>
                                <span className={cx('style__StyledItem-sc-18svp8n-0 fkDgwT')}>
                                    <div>
                                        <div className={cx('thumbnail')}>
                                            <img
                                                src="https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png"
                                                className={cx('styles__StyledDynamicIconBadge-sc-cxexs7-0 hdozRK')}
                                                style={{ width: '68px', height: '14px', top: '0px', left: '0px' }}
                                            ></img>
                                            <p
                                                style={{
                                                    background: 'rgb(235, 235, 240)',
                                                    display: 'inline-block',
                                                    padding: '0px 4px',
                                                    fontSize: '12px',
                                                    margin: '0px',
                                                    position: 'absolute',
                                                    top: '4px',
                                                    right: '4px',
                                                    zIndex: '1',
                                                    borderRadius: '2px',
                                                    color: 'rgb(56, 56, 61)',
                                                }}
                                            >
                                                QC
                                            </p>
                                            <div className={cx('image-wrapper')}>
                                                <picture className={cx('webpimg-container')}>
                                                    <source
                                                        type="image/webp"
                                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/f1/53/f6/2ed9cb2f883df319ddca546390d6fd21.jpg.webp 1x, https://salt.tikicdn.com/cache/280x280/ts/product/f1/53/f6/2ed9cb2f883df319ddca546390d6fd21.jpg.webp 2x"
                                                    ></source>
                                                    <img
                                                        src="https://salt.tikicdn.com/cache/280x280/ts/product/f1/53/f6/2ed9cb2f883df319ddca546390d6fd21.jpg"
                                                        alt="Laptop Acer Gaming Nitro 5 AN515-45-R86D (NH.QBCSV.005) (R7 5800H/8GB Ram/512GB SSD/RTX3060 6G/15.6 inch FHD 144Hz/Win 11/Đen) Hàng chính hãng"
                                                        className={cx('WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo')}
                                                    ></img>
                                                </picture>
                                            </div>
                                        </div>
                                        <div className={cx('info')}>
                                            <div className={cx('name')}>
                                                <h3>
                                                    Laptop Acer Gaming Nitro 5 AN515-45-R86D (NH.QBCSV.005) (R7
                                                    5800H/8GB Ram/512GB SSD/RTX3060 6G/15.6 inch FHD 144Hz/Win 11/Đen)
                                                    Hàng chính hãng
                                                </h3>
                                            </div>
                                            <div className={cx('styles__EmptyRating-sc-732h27-3 kYvTKq')}></div>
                                            <div className={cx('price-discount')}>
                                                <div className={cx('price-discount__price')}>
                                                    27.990.000 <sup> ₫</sup>
                                                </div>
                                            </div>
                                            <div
                                                className={cx('badge-under-price')}
                                                style={{ color: 'rgb(128, 128, 137)' }}
                                            >
                                                Tặng tới 3079 ASA (990k ₫)
                                                {/* <br>≈ 3.5% hoàn tiền </br> */}
                                            </div>
                                            <div className={cx('badge-under-rating')}>
                                                <div className={cx('item')}>
                                                    <span>Freeship+</span>
                                                </div>
                                                <div className={cx('item')}>
                                                    <span>Trả góp</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('badge-delivery')}>
                                            <span>Giao tiết kiệm</span>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div className={cx('product-item')}>
                            <span className={cx('style__StyledItem-sc-18svp8n-0 fkDgwT')}>
                                <div>
                                    <div className={cx('thumbnail')}>
                                        <img
                                            src="https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png"
                                            className={cx('styles__StyledDynamicIconBadge-sc-cxexs7-0 hdozRK')}
                                            style={{ width: '68px', height: '14px', top: '0px', left: '0px' }}
                                        ></img>
                                        <div className={cx('image-wrapper')}>
                                            <picture className={cx('webpimg-container')}>
                                                <source
                                                    type="image/webp"
                                                    src="https://salt.tikicdn.com/cache/280x280/ts/product/f1/53/f6/2ed9cb2f883df319ddca546390d6fd21.jpg.webp 1x, https://salt.tikicdn.com/cache/280x280/ts/product/f1/53/f6/2ed9cb2f883df319ddca546390d6fd21.jpg.webp 2x"
                                                ></source>
                                                <img
                                                    src="https://salt.tikicdn.com/cache/280x280/ts/product/f1/53/f6/2ed9cb2f883df319ddca546390d6fd21.jpg"
                                                    alt="Laptop Acer Gaming Nitro 5 AN515-45-R86D (NH.QBCSV.005) (R7 5800H/8GB Ram/512GB SSD/RTX3060 6G/15.6 inch FHD 144Hz/Win 11/Đen) Hàng chính hãng"
                                                    className={cx('WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo')}
                                                ></img>
                                            </picture>
                                        </div>
                                    </div>
                                    <div className={cx('info')}>
                                        <div className={cx('name')}>
                                            <h3>
                                                Laptop Acer Gaming Nitro 5 AN515-45-R86D (NH.QBCSV.005) (R7 5800H/8GB
                                                Ram/512GB SSD/RTX3060 6G/15.6 inch FHD 144Hz/Win 11/Đen) Hàng chính hãng
                                            </h3>
                                        </div>
                                        <div className={cx('styles__EmptyRating-sc-732h27-3 kYvTKq')}></div>
                                        <div className={cx('price-discount')}>
                                            <div className={cx('price-discount__price')}>
                                                27.990.000 <sup> ₫</sup>
                                            </div>
                                        </div>
                                        <div
                                            className={cx('badge-under-price')}
                                            style={{ color: 'rgb(128, 128, 137)' }}
                                        >
                                            Tặng tới 3079 ASA (990k ₫)
                                            {/* <br>≈ 3.5% hoàn tiền </br> */}
                                        </div>
                                        <div className={cx('badge-under-rating')}>
                                            <div className={cx('item')}>
                                                <span>Freeship+</span>
                                            </div>
                                            <div className={cx('item')}>
                                                <span>Trả góp</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('badge-delivery')}>
                                        <span>Giao tiết kiệm</span>
                                    </div>
                                </div>
                            </span>
                        </div>

                        <div className={cx('product-item')}>
                            <span className={cx('style__StyledItem-sc-18svp8n-0 fkDgwT')}>
                                <div>
                                    <div className={cx('thumbnail')}>
                                        <img
                                            src="https://salt.tikicdn.com/ts/upload/e8/6a/e3/7f998ef1eb5ab0536aac53f02a698c8a.png"
                                            className={cx('styles__StyledDynamicIconBadge-sc-cxexs7-0 hdozRK')}
                                            style={{ width: '68px', height: '14px', top: '0px', left: '0px' }}
                                        ></img>
                                        <div className={cx('image-wrapper')}>
                                            <picture className={cx('webpimg-container')}>
                                                <source
                                                    type="image/webp"
                                                    src="https://salt.tikicdn.com/cache/280x280/ts/product/d9/9a/ef/4787f4dfb66ebfde46ec8d7df83c54d0.jpg.webp 1x, https://salt.tikicdn.com/cache/280x280/ts/product/d9/9a/ef/4787f4dfb66ebfde46ec8d7df83c54d0.jpg.webp 2x"
                                                ></source>
                                                <img
                                                    src="https://salt.tikicdn.com/cache/280x280/ts/product/d9/9a/ef/4787f4dfb66ebfde46ec8d7df83c54d0.jpg"
                                                    alt="Laptop Gaming Acer Aspire 7 A715-42G-R4XX NH.QAYSV.003- Hàng chính hãng"
                                                    className={cx('WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo')}
                                                ></img>
                                            </picture>
                                        </div>
                                    </div>
                                    <div className={cx('info')}>
                                        <div className={cx('name')}>
                                            <h3>
                                                Laptop Gaming Acer Aspire 7 A715-42G-R4XX NH.QAYSV.003- Hàng chính hãng
                                            </h3>
                                        </div>
                                        <div className={cx('styles__EmptyRating-sc-732h27-3 kYvTKq')}></div>
                                        <div className={cx('price-discount')}>
                                            <div className={cx('price-discount__price')}>
                                                14.910.000 <sup> ₫</sup>
                                            </div>
                                        </div>
                                        <div
                                            className={cx('badge-under-price')}
                                            style={{ color: 'rgb(128, 128, 137)' }}
                                        >
                                            Tặng tới 373 ASA (120k ₫)
                                            {/* <br>≈ 0.8% hoàn tiền </br> */}
                                        </div>
                                        <div className={cx('badge-under-rating')}>
                                            <div className={cx('item')}>
                                                <span>Trả góp</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('badge-delivery')}>
                                        <span style={{ color: 'rgb(128, 128, 137)' }}>Giao thứ 7, ngày 03/12</span>
                                    </div>
                                </div>
                            </span>
                        </div>

                        <div className={cx('product-item')}>
                            <span className={cx('style__StyledItem-sc-18svp8n-0 fkDgwT')}>
                                <div>
                                    <div className={cx('thumbnail')}>
                                        <img
                                            src="https://salt.tikicdn.com/ts/upload/e8/6a/e3/7f998ef1eb5ab0536aac53f02a698c8a.png"
                                            className={cx('styles__StyledDynamicIconBadge-sc-cxexs7-0 hdozRK')}
                                            style={{ width: '68px', height: '14px', top: '0px', left: '0px' }}
                                        ></img>
                                        <div className={cx('image-wrapper')}>
                                            <picture className={cx('webpimg-container')}>
                                                <source
                                                    type="image/webp"
                                                    src="https://salt.tikicdn.com/cache/280x280/ts/product/e3/d8/38/c21574f6d5b2175624b930fd9cab4d19.png.webp 1x, https://salt.tikicdn.com/cache/280x280/ts/product/e3/d8/38/c21574f6d5b2175624b930fd9cab4d19.png.webp 2x"
                                                ></source>
                                                <img
                                                    src="https://salt.tikicdn.com/cache/280x280/ts/product/e3/d8/38/c21574f6d5b2175624b930fd9cab4d19.png"
                                                    alt='Laptop MSI Modern 14 B11MOU 1028VN 1115G4/8GB/256GB/14"FHD/Win11/(1028VN) - Hàng chính hãng'
                                                    className={cx('WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo')}
                                                ></img>
                                            </picture>
                                        </div>
                                        <div className={cx('badge-astra')}>
                                            <div className={cx('group-astra')}>
                                                <img
                                                    width="53"
                                                    height="20"
                                                    src="https://salt.tikicdn.com/ts/upload/d6/51/17/cde193f3d0f6da18147a739247c95c93.png"
                                                    alt="icon-astra"
                                                ></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('info')}>
                                        <div className={cx('name')}>
                                            <h3>
                                                Laptop MSI Modern 14 B11MOU 1028VN
                                                1115G4/8GB/256GB/14"FHD/Win11/(1028VN) - Hàng chính hãng
                                            </h3>
                                        </div>
                                        <div
                                            className={cx('styles__StyledRatingQtySold-sc-732h27-0 uDeVr')}
                                            style={{ marginBottom: '6px' }}
                                        >
                                            <div className={cx('styles__StyledQtySold-sc-732h27-2 fCfYNm')}>
                                                Đã bán 2
                                            </div>
                                        </div>
                                        <div className={cx('price-discount has-discount')}>
                                            <div className={cx('price-discount__price')}>
                                                10.880.100 <sup> ₫</sup>
                                            </div>
                                            <div className={cx('price-discount__discount')}>-1%</div>
                                        </div>
                                        <div
                                            className={cx('badge-under-price')}
                                            style={{ color: 'rgb(128, 128, 137)' }}
                                        >
                                            Tặng tới 1257 ASA (404k ₫)
                                            {/* <br>≈ 3.7% hoàn tiền </br> */}
                                        </div>
                                        <div className={cx('badge-under-rating')}>
                                            <div className={cx('item')}>
                                                <span>Trả góp</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('badge-delivery')}>
                                        <span style={{ color: 'rgb(128, 128, 137)' }}>Giao thứ 5, ngày 01/12</span>
                                    </div>
                                </div>
                            </span>
                        </div>

                        <div className={cx('product-item')}>
                            <span className={cx('style__StyledItem-sc-18svp8n-0 fkDgwT')}>
                                <div>
                                    <div className={cx('thumbnail')}>
                                        <img
                                            src="https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png"
                                            className={cx('styles__StyledDynamicIconBadge-sc-cxexs7-0 hdozRK')}
                                            style={{ width: '68px', height: '14px', top: '0px', left: '0px' }}
                                        ></img>
                                        <div className={cx('image-wrapper')}>
                                            <picture className={cx('webpimg-container')}>
                                                <source
                                                    type="image/webp"
                                                    src="https://salt.tikicdn.com/cache/280x280/ts/product/6a/1a/6e/d777fa9591575a75201f9f523ee1e36c.jpg.webp 1x, https://salt.tikicdn.com/cache/280x280/ts/product/6a/1a/6e/d777fa9591575a75201f9f523ee1e36c.jpg.webp 2x"
                                                ></source>
                                                <img
                                                    src="https://salt.tikicdn.com/cache/280x280/ts/product/6a/1a/6e/d777fa9591575a75201f9f523ee1e36c.jpg"
                                                    alt="Laptop Dell Alienware M15 R6 P109F001DBL (Core i7-11800H/ 32GB/ 1TB SSD/ RTX 3060/ 15.6 FHD, 165Hz/ Win11 + Office) - Hàng Chính Hãng"
                                                    className={cx('WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo')}
                                                ></img>
                                            </picture>
                                        </div>
                                    </div>
                                    <div className={cx('info')}>
                                        <div className={cx('name')}>
                                            <h3>
                                                Laptop Dell Alienware M15 R6 P109F001DBL (Core i7-11800H/ 32GB/ 1TB SSD/
                                                RTX 3060/ 15.6 FHD, 165Hz/ Win11 + Office) - Hàng Chính Hãng
                                            </h3>
                                        </div>
                                        <div
                                            className={cx('styles__StyledRatingQtySold-sc-732h27-0 uDeVr')}
                                            style={{ marginBottom: '6px' }}
                                        >
                                            <div className={cx('full-rating')}>
                                                <div className={cx('total')}>
                                                    <span>5</span>
                                                    <svg
                                                        stroke="currentColor"
                                                        fill="currentColor"
                                                        strokeWidth="0"
                                                        viewBox="0 0 24 24"
                                                        size="14"
                                                        color="#fdd836"
                                                        height="14"
                                                        width="14"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        style={{ color: 'rgb(253, 216, 54) ' }}
                                                    >
                                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className={cx('styles__StyledSeparator-sc-732h27-1 gcwbHk')}></div>
                                            <div className={cx('styles__StyledQtySold-sc-732h27-2 fCfYNm')}>
                                                Đã bán 1
                                            </div>
                                        </div>
                                        <div className={cx('price-discount has-discount')}>
                                            <div className={cx('price-discount__price')}>
                                                49.000.000 <sup> ₫</sup>
                                            </div>
                                            <div className={cx('price-discount__discount')}>-21%</div>
                                        </div>
                                        <div
                                            className={cx('badge-under-price')}
                                            style={{ color: 'rgb(128, 128, 137)' }}
                                        >
                                            Tặng tới 5390 ASA (2tr ₫)
                                            {/* <br>≈ 3.5% hoàn tiền </br> */}
                                        </div>
                                        <div className={cx('badge-under-rating')}>
                                            <div className={cx('item')}>
                                                <span>Freeship+</span>
                                            </div>
                                            <div className={cx('item')}>
                                                <span>Trả góp</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('badge-delivery')}>
                                        <img
                                            width="32"
                                            height="16"
                                            src="https://salt.tikicdn.com/ts/upload/9e/13/50/6d16b5e1d219857bd23572ce049e59e2.png"
                                            alt="icon-astra"
                                        ></img>
                                        <span style={{ color: 'rgb(128, 128, 137)' }}>Giao sáng mai</span>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
