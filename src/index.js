/**
 * Ben Huang
 * tohuangbin@gmail.com
 * 2018-7-25
 */

import { Prray } from './prray'

function p(arr) {
  if (arr.length === 1) {
    const prr = new Prray(1)
    prr[0] = arr[0]
    return prr
  }
  return new Prray(...arr)
}

module.exports = p
export default p
