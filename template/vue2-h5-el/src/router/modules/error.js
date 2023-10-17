const _router = [
    {
        path: '/admin/error',
        component: (resolve) => require(['@/layout/index'], resolve),
        redirect: '/admin/error/404',
        children: [
            {
                path: '404',
                component: (resolve) => require(['@/views/error/404'], resolve),
                meta: {
                    title: '404'
                },
                name: 'error2'
            }
        ]
    },
    {
        path: '/admin/*',
        component: (resolve) => require(['@/layout/index'], resolve),
        redirect: '/admin/error/404',
        children: [
            {
                path: '404',
                component: (resolve) => require(['@/views/error/404'], resolve),
                meta: {
                    title: '404'
                },
                name: 'error1'
            }
        ]
    }
];

export default _router;
