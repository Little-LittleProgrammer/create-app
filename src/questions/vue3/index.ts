import chalk from "chalk"
import { PromptObject } from "prompts"

const vue3TempalteQuestion:PromptObject = {
    type: 'select',
    name: 'tempalte',
    message: '选择你的模板',
    choices: [
        { title: chalk.magenta('vue3-antd-vite'), value: 'vue3-antd-vite' }
    ]
}
const nuxt3TempalteQuestion: PromptObject = {
    type: 'select',
    name: 'tempalte',
    message: '选择你的模板',
    choices: [
        { title: chalk.magenta('nuxt3'), value: 'nuxt3' }
    ]
}

export {nuxt3TempalteQuestion, vue3TempalteQuestion}