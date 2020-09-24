export const fakeID = (length = 10) => {
  const result = []
  const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length)
    const char = characterSet.charAt(randomIndex)
    result.push(char)
  }
  return result.join('')
}
