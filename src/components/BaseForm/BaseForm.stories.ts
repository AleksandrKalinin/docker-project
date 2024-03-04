import type { StoryFn, Meta, StoryContext } from '@storybook/vue3'
import BaseForm from './BaseForm.vue'

export default {
  title: 'BaseForm',
  component: BaseForm,
} as Meta<typeof BaseForm>

const Template: StoryFn<typeof BaseForm> = (args, { name }: StoryContext) => {
  return ({
    components: { BaseForm},
    setup() {
      return { args, name }
    },
    template: `<BaseForm v-bind="args"></BaseForm>`
  })
}

export const BasicBaseForm = Template.bind({})
// ContainedInput.args = { variant: 'contained', label: "Contained Input", placeholder: "Enter text" }

