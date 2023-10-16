import {
    green,
    magenta,
  } from 'kolorist'
const vue2TemplateQuestion = {
    type: 'select',
    name: 'template',
    message: '选择你的模板',
    choices: [
        { title: magenta('vue3-antd-vite'), value: 'vue3-antd-vite' },
        { title: green('vue3-component-lib'), value: 'vue3-component-lib' },
    ]
}
const nuxt2TemplateQuestion = {
    type: 'select',
    name: 'template',
    message: '选择你的模板',
    choices: [
        { title: magenta('nuxt3'), value: 'nuxt3' }
    ]
}
export {vue2TemplateQuestion, nuxt2TemplateQuestion}