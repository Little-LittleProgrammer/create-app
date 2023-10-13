import { bin_run_ignore, bin_run_inherit } from "../utils";

import pkg from '../../package.json'
import { cli_update } from "../questions/update";
import chalk from "chalk";

async function need_update() {
    const _string = bin_run_ignore('npm show create-app versions')!.replace('\'', '\"');
    const _arr = JSON.parse(_string);
    if (_arr) {
        let _newVersion = _arr[_arr.length-1];
        if (_newVersion !== pkg.version) {
            const _options = await cli_update(_newVersion, pkg.version);
            if (_options.isUpdate === 'yes' ) {
                bin_run_inherit('npm update create-app -g');
                chalk.green('update ok');
                return true;
            } else {
                return false
            }
        }
    }
    return false
}

async function create_app() {
    const _needUpdate = await need_update();
    if (!_needUpdate) {
        
    }
}