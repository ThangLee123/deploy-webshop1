import { BackTop } from 'antd';
import { UpCircleOutlined, UpOutlined } from '@ant-design/icons';
import { useEffect, useRef } from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import classNames from 'classnames/bind';
import styles from './ChatBot.module.scss';
const cx = classNames.bind(styles);
const ChatBot = () => {
    const MessengerRef = useRef();
    useEffect(() => {
        MessengerRef.current.setAttribute('page_id', '116121714729411');
        MessengerRef.current.setAttribute('attribution', 'biz_inbox');

        window.fbAsyncInit = function () {
            window.FB.init({
                xfbml: true,
                version: 'v16.0',
            });
        };
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }, []);
    return (
        <>
            {/* <MessengerCustomerChat
                pageId="100090049478508"
                appId="633584301478315"
                // htmlRef="<REF_STRING>"
            />
            , */}
            <div id="fb-root"></div>
            <div ref={MessengerRef} id="fb-customer-chat" className="fb-customerchat"></div>
        </>
    );
};
export default ChatBot;
