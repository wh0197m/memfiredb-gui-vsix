import selectFile from '../../../../../lib/vscode-utils/file-selector/client.js'

export const name = 'file-input'

export const options = {
  props: ['modelValue'],
  template: `
    <memfire-input v-model="modelValue" @focus="select" />
  `,
  methods: {
    async select() {
      const file = await selectFile()
      if(!file) return
      this.$emit('update:modelValue', file[0].path)
    }
  }
}