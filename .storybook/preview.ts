import type { Preview } from '@storybook/vue3'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    parameters: {
      backgrounds: {
        default: 'blue',
        values: [
          {
            name: 'blue',
            value: '#318CE7',
          },
          {
            name: 'moonstone',
            value: '#3AA8C1',
          },
        ],
      },
    },
  }
}

export default preview
