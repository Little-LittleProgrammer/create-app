import baseData from '@/menus/modules/base-data'; //  router数据
import basea from '@/menus/modules/basea'; //  router数据
import link from '@/menus/modules/link'; //  router数据
import systemManagement from '@/menus/modules/system-management'; //  权限router数据

const _menus = [
    ...baseData,
    ...basea,
    ...link,
    ...systemManagement
];

export default _menus;
