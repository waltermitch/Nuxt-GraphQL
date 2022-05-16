export const addPercentSign = (value) => value + '%'

export const formatDate = (timeStamp) => {
  const timeStampArray = timeStamp.split('/')
  return `${timeStampArray[2]}-${timeStampArray[0]}-${timeStampArray[1]}`
}

export const formatDateAndTime = (timeStamp) => {
  const timeStampArray = timeStamp.split(' ')
  const date = timeStampArray[0].split('/').reverse().join('-')
  const time = timeStampArray[1]

  return `${date[2]}-${date[0]}-${date[1]} ${time}:00`
}
