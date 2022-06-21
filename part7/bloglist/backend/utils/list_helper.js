const dummy = (_blogs) => 1

const totalLikes = (blogs) =>
  blogs.reduce((total, blog) => total + blog.likes, 0)

const favoriteBlog = (blogs) =>
  blogs.length === 0
    ? undefined
    : blogs.reduce((prev, current) =>
        prev.likes > current.likes ? prev : current
      )

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined

  const authors = blogs.map((blog) => blog.author)
  const counts = {}
  for (const author of authors) {
    counts[author] = counts[author] ? counts[author] + 1 : 1
  }

  const result = { author: '', blogs: Number.MIN_VALUE }
  for (const author in counts) {
    if (counts[author] > result.blogs) {
      result.author = author
      result.blogs = counts[author]
    }
  }

  return result
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined

  const counts = {}
  for (const blog of blogs) {
    const { author, likes } = blog
    counts[author] = counts[author] ? counts[author] + likes : likes
  }

  const result = { author: '', likes: Number.MIN_VALUE }
  for (const author in counts) {
    if (counts[author] > result.likes) {
      result.author = author
      result.likes = counts[author]
    }
  }

  return result
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
