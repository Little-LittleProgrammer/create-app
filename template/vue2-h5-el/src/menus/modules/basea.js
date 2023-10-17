const _menus = [
    {
        id: '2',
        url: '/admin/basea',
        name: '基础数据2',
        child: [
            {
                id: '2-1',
                url: '/admin/basea/day-active-a',
                name: '事件分析',
                child: [
                    {
                        id: '2-1-1',
                        url: '/admin/basea/day-active-a/overview',
                        name: '概况'
                    },
                    {
                        id: '2-1-2',
                        url: '/admin/basea/day-active-a/customize',
                        name: '自定义分组'
                    }
                ]
            },
            {
                id: '2-2',
                url: 'https://www.baidu.com/',
                name: '日活232跃度构成2'
            },
            {
                id: '2-3',
                url: 'https://www.baidu.com/',
                name: '日活232跃度构成2'
            }
        ]
    }
];

export default _menus;
