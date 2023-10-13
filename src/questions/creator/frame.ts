import chalk from 'chalk';
import { PromptObject } from 'prompts';
export const frameQuestion: PromptObject = {
    name: 'frame',
    type: 'select',
    message: '选择框架',
    choices: [
      { title: chalk.magenta('Vue2'), value: 'vue2' },
      { title: chalk.blue('Vue3') , value: 'vue3'},
      { title: chalk.cyan('Nuxt2'), value: 'nuxt2'},
      { title: chalk.yellow('Nuxt3'), value: 'nuxt3'}
    ]
}

export const infrastructureMode:PromptObject = {
    name: 'infrastructureMode',
    type: 'select',
    message: '选择你的基础框架',
    choices: [{
        title: 'monorepo', value: 'monorepo'
    }, {
        title: 'polyrepo', value: 'polyrepo'
    }]
}