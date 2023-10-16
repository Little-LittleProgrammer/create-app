import { readFileSync, writeFileSync } from "fs-extra";
import { cliOptions } from "../enums/default-options";
import { get_root, rm_dir, rm_file } from "../utils/fs";
import { copy_template } from "../command";
import { monorepoNotNeed } from "../enums/template";

export function copy_project() {
    const _projectName = cliOptions.projectName
    if (cliOptions.infrastructureMode === 'monorepo') {
        if ( ['vue3', 'nuxt3'].includes(cliOptions.frame)) {
            const _rootDir = get_root(`${_projectName}-monorepo`)
            copy_template(_rootDir, 'monorepo');
            const _subDir = `${_rootDir}/${_projectName.includes('lib') ? 'packages': 'apps'}/${_projectName}`;
            copy_template(_subDir);
            // 处理多余的依赖
            const pkgContent = readFileSync(`${_subDir}/package.json`, 'utf8');
            if (pkgContent) {
                const _text = JSON.parse(pkgContent);
                if (_text.devDependencies){
                    for (let key of monorepoNotNeed) {
                        _text.devDependencies[key] && Reflect.deleteProperty(_text.devDependencies, key)
                    }
                }
                writeFileSync(`${_subDir}/package.json`, JSON.stringify(_text))
            }
            
            // 删除内部的npmrc，以及gitignore;
            rm_file(`${_subDir}/.npmrc`)
            rm_file(`${_subDir}/.gitignore`)  
        }
    } else {
        const _rootDir = get_root(`${_projectName}`);
        copy_template(_rootDir);
    }
}


export function delete_overwrite_dir() {
    const _projectName = cliOptions.projectName
    if (cliOptions.overwrite) {
        const _rootDir = get_root(`${_projectName}`);
        rm_dir(_rootDir)
    }
    if (cliOptions.overwriteMonorepo) {
        const _rootDir = get_root(`${_projectName}-monorepo`);
        rm_dir(_rootDir)
    }
}