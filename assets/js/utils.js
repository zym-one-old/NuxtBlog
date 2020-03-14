export function formateDate (date) {
  if (date.length === 6) {
    return date.slice(0, 4) + '/' + date.slice(4, 6)
  } else if (date.length === 8) {
    const d = new Date(date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8))
    return d.toDateString()
  }
}

export function clone (Obj) {
  let buf
  if (Array.isArray(Obj)) {
    buf = []
    let i = Obj.length
    while (i--) {
      buf[i] = clone(Obj[i])
    }
    return buf
  } else if (Obj instanceof Object) {
    buf = {}
    for (const k in Obj) {
      buf[k] = clone(Obj[k])
    }
    return buf
  } else {
    return Obj
  }
}
