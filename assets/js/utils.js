export function formateDate (date) {
  if (date.length === 6) {
    return date.slice(0, 4) + '/' + date.slice(4, 6)
  } else if (date.length === 8) {
    const d = new Date(date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8))
    return d.toDateString()
  }
}
