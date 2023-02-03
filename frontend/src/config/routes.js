const publicRoutes = {
    home: '/',
    productWId: '/product/:id',
    cartpage: '/cart',
    cartpageWId: '/cart/:id',
    signin: '/signin',
    register: '/register',
    activateEmail: '/user/activate/:activation_token',
    forgetPass: '/forgot_password',
    resetPass: '/user/reset/:token',
    sellerPage: '/seller/:id',
    search: '/search/name/',
    searchWParamName: '/search/name/:name',
    searchWParamCategory: '/search/category/:category',
    searchWParamCategoryAndName: '/search/category/:category/name/:name',
    searchWParamCategoryAndNameAndMinAndMax: '/search/category/:category/name/:name/min/:min/max/:max',
    searchWParamCategoryAndNameAndMinAndMaxAndRating:
        '/search/category/:category/name/:name/min/:min/max/:max/rating/:rating',
    searchWParamCategoryAndNameAndMinAndMaxAndRatingAndOrder:
        '/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order',
};
const privateRoutes = {
    shipping: '/shipping',
    orderWId: '/order/:id',
    productEditWId: '/product/:id/edit',
    orderHistory: '/orderhistory',
    userProfile: '/profile',
    productManagement: '/productmanagement',
    productManagementSeller: '/productmanagement/seller',
    orderList: '/orderlist',
    orderListSeller: '/orderlist/seller',
    userList: '/userlist',
    userEdit: '/user/:id/edit',
    paySellerSalary: '/paySellerSalary',
    rollBackOrderManagement: '/rollback-order-management',
    dashboard: '/dashboard',
};

export { publicRoutes, privateRoutes };
