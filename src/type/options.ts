export interface ICliOptions {
    projectName: string;
    packageManage: 'pnpm' | 'yarn' | 'npm';
    frame: 'vue2' | 'vue3' | 'nuxt2' | 'nuxt3';
    npmToken?: string;
    gitUrl?: string;
    template?: string;
    isUpdate?: 'yes' | 'no'
}