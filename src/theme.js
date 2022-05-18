import theme from '@theme-ui/preset-swiss'

export default {
    ...theme, 
  styles: {
    ...theme,
  },

  cards: {
    primary: {
      padding: 1,
      borderRadius: 1,
      boxShadow: '0 0 4px rgba(0, 0, 0, 0.125)',
    }
  },

  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      border: 'solid 2px',
      '&:hover': {
        color: 'primary',
        bg: 'highlight',
        border: 'solid 2px',
      }
    },
    secondary: {
      color: 'white',
      bg: 'purple',
      border: 'solid 2px',
      '&:hover': {
        color: 'purple',
        bg: 'highlight',
        border: 'solid 2px',
      }
    },
  },
  breakpoints: [56, 96, 128].map((n) => n + 'em')
}