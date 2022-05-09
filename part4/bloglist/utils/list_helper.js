const dummy = (_blogs) => 1

const totalLikes = (blogs) =>
  blogs.reduce((total, blog) => total + blog.likes, 0)

const favoriteBlog = (blogs) =>
  blogs.length === 0
    ? undefined
    : blogs.reduce((prev, current) =>
        prev.likes > current.likes ? prev : current
      )

module.exports = { dummy, totalLikes, favoriteBlog }
