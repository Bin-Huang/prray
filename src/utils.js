function wait(result) {
  if (result.find(r => r instanceof Promise)) {
    return Promise.all(result)
  }
  return result
}

module.exports = {
  wait
}
