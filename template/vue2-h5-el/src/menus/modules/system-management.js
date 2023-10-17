const _menus = [
    {
        id: '4',
        url: '/admin/system-management',
        name: '系统管理',
        child: [
            {
                id: '4-1',
                url: '/admin/system-management/permission',
                name: '权限管理',
                child: [
                    {
                        id: '4-1-1',
                        url: '/admin/system-management/permission/menu-config',
                        name: '菜单配置'
                    },
                    {
                        id: '4-1-2',
                        url: '/admin/system-management/permission/role',
                        name: '角色管理'
                    },
                    {
                        id: '4-1-3',
                        url: '/admin/system-management/permission/person',
                        name: '人员管理'
                    }
                ]
            }
        ]
    }
];

export default _menus;
