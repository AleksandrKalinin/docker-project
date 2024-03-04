import type { StoryFn, Meta, StoryContext } from '@storybook/vue3'
import BaseInput from './BaseInput.vue'
import IconChevron from '../icons/IconChevron.vue'
import IconSearch from '../icons/IconSearch.vue'
import type { Component } from 'vue'

export default {
  title: 'BaseInput',
  component: BaseInput,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['contained', 'outlined'],
      defaultValue: 'outlined',
    },
    type: {
      control: { type: 'radio' },
      options: ['text', 'number', 'password', 'email'],
      defaultValue: 'text',
    },
    label: {
      control: { type: 'text' },
      defaultValue: 'Enter your name'
    },
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Name'
    },
    modelValue: {
      control: { type: 'text' },
      defaultValue: ''
    },
  },
} as Meta<typeof BaseInput>

interface Mapper {
  [key: string]: Component
}

const iconMapping: Mapper = {
  'Search Input': IconSearch,
  'Dropdown Input': IconChevron,
};

const Template: StoryFn<typeof BaseInput> = (args, { name }: StoryContext) => {
  const IconComponent = iconMapping[name]; 
  return ({
    components: { BaseInput, IconComponent},
    setup() {
      return { args, name }
    },
    template: `<BaseInput v-bind="args"><IconComponent /></BaseInput>`
  })
}

export const ContainedInput = Template.bind({})
ContainedInput.args = { variant: 'contained', label: "Contained Input", placeholder: "Enter text" }

export const OutlinedInput = Template.bind({})
OutlinedInput.args = { variant: 'outlined', label: "Outlined Input", placeholder: "Enter text" }

export const SearchInput = Template.bind({})
SearchInput.args = { variant: 'outlined', label: "Input with an icon", placeholder: "Placeholder" }

export const DropdownInput = Template.bind({})
DropdownInput.args = { variant: 'outlined', label: "Input with an icon", placeholder: "Placeholder" }