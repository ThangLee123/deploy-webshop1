import {} from '@ant-design/icons';
import { Button } from 'antd';
import styles from './SearchBox.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function SearchBox() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const submitHandler = (e) => {
        navigate(`/search/name/${name}`);
    };

    return (
        <div className={cx('sub-header__search-container')}>
            <div className={cx('sub-header__search-input')}>
                <input type="text" placeholder="Search Product..." onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div className={cx('sub-header__search-btn')}>
                <Button type="danger" onClick={submitHandler}>
                    Search
                </Button>
            </div>
        </div>
    );
}

export default SearchBox;
