import { Prray } from './prray'

function p<T>(arr: T[]): Prray<T> {
  return new Prray(...arr)
}

module.exports = p
export default p
