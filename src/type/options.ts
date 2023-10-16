import {templateEnums} from '../enums/template'
export interface ICliOptions {
    projectName: string;
    packageManage: 'pnpm' | 'yarn' | 'npm' | 'none';
    infrastructureMode: 'monorepo' | 'polyrepo'
    frame: 'vue2' | 'vue3' | 'nuxt2' | 'nuxt3';
    npmToken?: string;
    gitUrl?: string;
    template?: typeof templateEnums[number];
    isUpdate?: boolean;
    overwrite?: boolean;
    overwriteMonorepo?: boolean;
}