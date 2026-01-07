import * as yup from 'yup'
import axios from 'axios'
import parse from './rss.js'
import customMessagesYUP from './settings/customMessagesYUP.js'
import watch from './view.js'

const defaultOptions = { timeout: 10000 }
const addProxy = (url) => {
  const proxyUrl = new URL('/get', 'https://allorigins.hexlet.app')
  proxyUrl.searchParams.append('disableCache', 'true')
  proxyUrl.searchParams.append('url', url)
  return proxyUrl.toString()
}
const handleData = (data, watchedState, url) => {
  const { feed, posts } = data
  feed.link = url
  watchedState.feeds.push(feed)
  watchedState.posts.unshift(...posts)
}
const handleError = (error) => {
  if (error.isParsingError) {
    return 'notRss'
  }
  if (axios.isAxiosError(error)) {
    return 'networkError'
  }
  return 'unknown'
}
const loadRSS = (watchedState, url) => {
  watchedState.error = null
  watchedState.form.status = 'sending'

  axios
    .get(addProxy(url), defaultOptions)
    .then((response) => {
      const data = parse(response.data.contents, url)
      handleData(data, watchedState, url)
      watchedState.form.status = 'added'
    })
    .catch((error) => {
      watchedState.error = handleError(error)
      watchedState.form.status = 'inValid'
    })
}
export default (t) => {
  yup.setLocale(customMessagesYUP)

  const state = {
    form: {
      status: 'filling',
    },
    error: null,
    feeds: [],
    posts: [],
    uiState: {
      currentPostId: null,
      viewedPostIds: new Set(),
    },
  }

  const elements = {
    form: document.querySelector('.rss-form'),
    submit: document.querySelector('.px-sm-5'),
    containerFeeds: document.querySelector('.feeds'),
    containerPosts: document.querySelector('.posts'),
    feedback: document.querySelector('.feedback'),
    urlInput: document.querySelector('#url-input'),
  }

  const watchedState = watch(state, t, elements)
  const validateURL = (existingURLs, input) => {
    const schema = yup.object().shape({
      url: yup.string().url().required().notOneOf(existingURLs),
    })

    return schema
      .validate({ url: input })
      .then(() => null)
      .catch(error => error.message)
  }

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault()
    const addedUrls = watchedState.feeds.map(feed => feed.link)
    const formData = new FormData(event.target)
    const input = formData.get('url')

    validateURL(addedUrls, input)
      .then((error) => {
        if (error) {
          watchedState.error = error.key
          watchedState.form.status = 'inValid'
        }
        else {
          watchedState.form.status = 'added'
          loadRSS(watchedState, input)
        }
      })
  })
}
