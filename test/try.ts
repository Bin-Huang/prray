import delay from 'delay'
import pReduce from 'p-reduce'
import p from '../src/index'
const sumAsync = (sum: number, c: number) => delay(100).then(() => sum + c);

(async () => {
  const arr = [1,1,1,1]
  console.log(await pReduce(arr, sumAsync))
})()