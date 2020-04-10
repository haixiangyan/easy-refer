import {Message} from 'element-ui'
import {Context} from '@nuxt/types'

export default function ({ $axios, redirect }: Context) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    Message.error(error.response?.data.message)

    if (error.response?.status === 404) {
      redirect('/not-found')
    }
  })
}
