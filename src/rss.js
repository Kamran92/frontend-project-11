export default (xml, link) => {
  const parser = new DOMParser()
  const data = parser.parseFromString(xml, 'text/xml')
  const parseError = data.querySelector('parsererror')

  if (parseError) throw new Error(parseError.textContent)

  const title = data.querySelector('title').textContent
  const description = data.querySelector('description').textContent
  const feed = { link, title, description }

  const posts = [...data.querySelectorAll('item')].map((post) => {
    const link = post.querySelector('link').textContent
    const title = post.querySelector('title').textContent
    const description = post.querySelector('description').textContent
    const date = post.querySelector('pubDate').textContent

    return { link, title, description, date }
  })

  return { feed, posts }
}
