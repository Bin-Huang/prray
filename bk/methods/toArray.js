const toArray = function() {
  return this.then((r) => [...r])
}

module.exports = toArray
