export const name = 'memfire-input'

export const options = {
  props: ['modelValue', 'textarea'],
  template: `
    <span class="memfire-input">
      <component :is="textarea?'textarea':'input'" class="reset-style" :value="modelValue"
        @focus="$emit('focus', $event)"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </span>
  `
}

export const style = `
  .memfire-input {
    position: relative;
  }
  .memfire-input::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;

    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    background: currentColor;
    opacity: .05;
  }
  .memfire-input input, .memfire-input textarea {
    border: 1px solid transparent;
    color: inherit;
    height: 2em;
    width: 100%;
    padding: 0 .5em;
    outline: none;
  }
  .memfire-input textarea {
    padding: .5em;
    line-height: 1.5em;
    height: 4em;
    display: block;
  }
  .memfire-input input:focus, .memfire-input textarea:focus {
    border: var(--border-focus);
  }
`