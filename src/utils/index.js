import BigNumber from 'bignumber.js'

export function toPrecision(value, precision = 0, paddingZero = true) {
  precision = Number(precision)
  const big = new BigNumber(value).dividedBy(Math.pow(10, precision))

  if (paddingZero) {
    return big.toFixed(precision)
  } else {
    return big.toNumber()
  }
}

const oneHour = 60 * 60
const oneDaySeconds = 60 * 60 * 24

export function getReadableTime(big, small, dueMsg) {
  const seconds = new BigNumber(big).minus(small).multipliedBy(6).toNumber()

  if (seconds < 0) {
    return dueMsg
  }

  if (seconds > 3 * oneDaySeconds) {
    return `${(seconds / oneDaySeconds).toFixed(0)} days`
  }

  if (seconds > oneHour) {
    return `${(seconds / oneHour).toFixed(0)} hours`
  }

  return `${seconds} seconds`
}
