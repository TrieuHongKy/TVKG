export const slugify = (val) => {
  if (!val) return ''
  return String(val)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
}

export const shortName = (name) => {
  // Tách tên người dùng thành các từ riêng biệt
  var words = name?.split(' ')

  // Lấy tên đầu tiên và họ
  var ho = words[0]
  var ten = words[words.length - 1]

  // Trả về tên rút gọn
  return ho + ' ' + ten
}
export const timeSince = (date) => {
  var seconds = Math.floor((Date.now() - date) / 1000)
  var interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' năm trước'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' tháng trước'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' ngày trước'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' giờ trước'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' phút trước'
  }
  // return Math.floor(seconds) + ' giây trước'
}

export const timeUntil = (date) => {
  var now = Date.now()
  var seconds = Math.floor((date - now) / 1000)

  var minutes = Math.floor(seconds / 60)
  var hours = Math.floor(minutes / 60)
  var days = Math.floor(hours / 24)

  return {
    seconds: seconds % 60,
    minutes: minutes % 60,
    hours: hours % 24,
    days: days
  }
}

export const formatCurrency = (value) => {
  let formatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value)
  return formatted.replace('₫', '').trim()
}

export const convertToVND = (number) => {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
export const formatMoney = (amount, decimalCount = 0, decimal = '.', thousands = ',') => {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString()
    let j = i.length > 3 ? i.length % 3 : 0

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    )
  } catch (e) {
    console.log(e)
  }
}
