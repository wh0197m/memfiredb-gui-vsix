export const name = 'memfire-checkbox'

export const options = {
  props: ['modelValue', 'label'],
  template: `
    <label class="memfire-checkbox">
      <input type="checkbox" @change="$emit('update:modelValue', $event.target.checked)" :checked="modelValue" />
      <span>{{label}}</span>
    </label>
  `
}

export const style = `
  label.memfire-checkbox {
    display: inline-flex;
    align-items: center;
  }
  label.memfire-checkbox input {
    margin: 0;
    height: 1em;
    margin-right: .38em;
  }
  label.memfire-checkbox span {
    line-height: 1;
  }
`