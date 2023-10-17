import baseData from '@/router/modules/base-data'; //  router数据
import basea from '@/router/modules/basea'; //  router数据
import systemManagement from '@/router/modules/system-management'; //  router数据

//  注意 error必须添加在最后
const _router = [
    ...baseData,
    ...basea,
    ...systemManagement
];

export default _router;
