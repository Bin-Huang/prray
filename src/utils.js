function wait(result) {
  if (result.find(r => r instanceof Promise)) {
    return Promise.all(result)
  }
  return result
}

function delay(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

module.exports = {
  wait,
  delay
}
