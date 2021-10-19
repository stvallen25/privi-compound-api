import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

export const axiosClient = applyCaseMiddleware(axios.create(), {
  caseFunctions: {
    camel: input => {
      return (input.charAt(0).toLowerCase() + input.slice(1)).replace(/[-_](.)/g, (match, group1) =>
        group1.toUpperCase()
      )
    },
  },
})
