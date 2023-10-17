const _menus = [
    {
        id: '1',
        url: '/admin/base-data',
        name: '基础数据',
        child: [
            {
                id: '1-1',
                url: '/admin/base-data/event-analysis/overview',
                name: '事件分析',
                child: [
                    {
                        id: '1-1-1',
                        url: '/admin/base-data/event-analysis/overview',
                        name: '概况'
                    },
                    {
                        id: '1-1-2',
                        url: '/admin/base-data/event-analysis/customize',
                        name: '自定义分组'
                    }
                ]
            },
            {
                id: '1-2',
                url: '/admin/base-data/day-active-degree',
                name: '日活跃度构成'
            }
        ]
    }
];

export default _menus;
