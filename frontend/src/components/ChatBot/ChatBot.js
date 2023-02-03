import { BackTop } from 'antd';
import { UpCircleOutlined, UpOutlined } from '@ant-design/icons';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import classNames from 'classnames/bind';
import styles from './ChatBot.module.scss';
const cx = classNames.bind(styles);
const ChatBot = () => (
    <>
        <MessengerCustomerChat
            pageId="100090049478508"
            appId="633584301478315"
            // htmlRef="<REF_STRING>"
        />
        ,
    </>
);
export default ChatBot;
