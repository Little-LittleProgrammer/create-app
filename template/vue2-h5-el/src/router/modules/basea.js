const _router = [
    {
        path: '/admin/basea',
        component: (resolve) => require(['@/layout/index'], resolve),
        meta: {
            title: '基础数据',
            pathName: '基础数据'
        },
        name: '基础数据',
        redirect: '/admin/basea/day-active-a',
        children: [
            {
                name: '事件分析',
                path: 'day-active-a',
                component: (resolve) => require(['@/views/base-data/event-analysis/index'], resolve),
                meta: {
                    title: '基础数据-事件分析'
                },
                redirect: '/admin/basea/day-active-a/overview',
                children: [
                    {
                        path: 'overview',
                        component: (resolve) => require(['@/views/base-data/event-analysis/overview'], resolve),
                        meta: {
                            title: '基础数据-事件分析'
                        },
                        name: '概况'
                    },
                    {
                        path: 'customize',
                        component: (resolve) => require(['@/views/base-data/event-analysis/customize'], resolve),
                        meta: {
                            title: '基础数据-事件分析'
                        },
                        name: '自定义分组'
                    },
                    {
                        path: 'customize1',
                        component: (resolve) => require(['@/views/base-data/event-analysis/customize'], resolve),
                        meta: {
                            title: '基础数据-事件分析11'
                        },
                        name: 'customize1'
                    },
                    {
                        path: 'customize2',
                        component: (resolve) => require(['@/views/base-data/event-analysis/customize'], resolve),
                        meta: {
                            title: '基础数据-事件分析222'
                        },
                        name: 'customize2'
                    }
                ]
            },
            {
                path: 'day-active-b',
                component: (resolve) => require(['@/views/base-data/event-analysis/overview'], resolve),
                meta: {
                    title: '基础数据-事件分析'
                },
                name: '概况'
            }
        ]
    }
];

export default _router;
