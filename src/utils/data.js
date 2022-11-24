export default function data (hora) {
  const data = new Date
  if (hora) {
    const addZero = hora => hora ? data.getHours < 10 ? '0' : '' : data.getMinutes() < 10 ? '0' : ''
    return `${addZero(true)}${data.getHours()}:${addZero()}${data.getMinutes()}`
  } else {
    const addZero = (day) => day ? data.getDate() < 10 ? '0' : '' : data.getMonth()+1 < 10 ? '0' : ''
    return `${addZero(true)}${data.getDate()}/${addZero()}${data.getMonth()+1}/${data.getFullYear()}`
  }
    
  }