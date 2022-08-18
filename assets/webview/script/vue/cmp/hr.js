export const name = 'memfire-hr'

export const options = {
  template: `<div class="memfire-hr"><slot /></div>`,
}

export const style = `
  .memfire-hr {
    display: flex;
    align-items: center;
    margin: 1em;
  }
  .memfire-hr::before, .memfire-hr::after {
    display: block;
    content: '';
    flex: 1;
    height: .1px;
    background-color: rgba(var(--color1), .3);
    margin: 2em;
  }
`