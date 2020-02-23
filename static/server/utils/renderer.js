const marked = require('marked')
const highlightjs = require('highlight.js')
const octicon = require('octicons')

// Use highlight.js for code blocks
const renderer = new marked.Renderer()

renderer.code = (code, language) => {
  const validLang = !!(language && highlightjs.getLanguage(language))
  let highlighted = validLang ? highlightjs.highlight(language, code).value : code
  highlighted = '<ul><li>' + highlighted.replace(/\n/g, '\n</li><li>') + '\n</li></ul>'
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`
}

renderer.heading = (text, level) => {
  const patt = /\s?{([^}]+)}$/
  let link = patt.exec(text)

  if (link && link.length && link[1]) {
    text = text.replace(patt, '')
    link = link[1]
  } else {
    link = text.toLowerCase().replace(/[^\wА-яіІїЇєЄ\u4E00-\u9EFF一-龠ぁ-ゔァ-ヴー々〆〤\u3130-\u318F\uAC00-\uD7AF]+/gi, '-')
  }
  const str = '<h' + level + ' id="' + link + '">' + text + '<a class="anchor" aria-hidden="true" href="#' + link + '"><span>' + octicon.link.toSVG() + '</span></a>' + '</h' + level + '>'

  return str
}

marked.setOptions({ renderer })

module.exports = {
  marked
}
