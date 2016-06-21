'use strict'

const gameDir = 'images/'
function setImage(id, pathSuffix) {
  $('#' + id).attr('src', pathSuffix.includes('undefined') ? '' : gameDir + pathSuffix)
}

var parseColor = rawColor => {
  var color = { white: 'W', blue: 'U', black: 'B', red: 'R', green: 'G' }[rawColor && rawColor.toLowerCase()] || rawColor
  return color && color.toLowerCase()
}

function pictureCategory(card) {
  if (!card.type) {
    return ''
  }

  switch (true) {
    case card.type.includes('Artifact Creature'):
      return 'transport'
    case card.type.includes('Artifact'):
      return 'technics'
    case card.type.includes('Land'):
      return 'nature'
    case card.type.includes('Cat'):
    case card.type.includes('Leonin'):
      return 'cats'
    case card.type.includes('Goblin'):
      return 'sports'
    case card.type.includes('Elf'):
      return 'fashion'
    case card.type.includes('Vampire'):
      return 'nightlife'
    case card.type.includes('Human'):
    case card.type.includes('Merfolk'):
    case card.type.includes('Vedalken'):
    case card.type.includes('Knight'):
    case card.type.includes('Soldier'):
    case card.type.includes('Warrior'):
    case card.type.includes('Druid'):
    case card.type.includes('Rogue'):
      return 'people'
    case card.type.includes('Creature'):
      return 'animals'
    default:
      return 'abstract'
  }
}

var elemWithClass = c => `<i class="mtg ${c}"></i>`

var iconForAbbreviation = icon => elemWithClass(classForIcon(icon))

function classForIcon(icon) {
  icon = icon.toLowerCase()

  var hybridMatch = /(.)\/(.)/.exec(icon)
  if (hybridMatch) {
    return 'hybrid-' + hybridMatch[1] + hybridMatch[2]
  }

  if (icon.match(/\d|[wubrgxyz]/)) {
    return 'mana-' + icon
  }

  return {
    t: 'tap',
    d: 'untap'
  }[icon]
}

function generateColors(manaCost) {
  if (!manaCost) {
    return []
  }

  var cost = manaCost.toLowerCase()
  var retval = []
  if (cost.includes('w')) {
    retval.push('white')
  }
  if (cost.includes('u')) {
    retval.push('blue')
  }
  if (cost.includes('b')) {
    retval.push('black')
  }
  if (cost.includes('r')) {
    retval.push('red')
  }
  if (cost.includes('g')) {
    retval.push('green')
  }

  return retval.length ? retval : ['c']
}

function copyField(card, field, opts={}) {
  if (!card[field]) {
    $('#' + field).html('')
    return
  }

  var text = card[field].replace(/~/g, card.name)
  if (opts.paras) {
    text = '<p>' + text.replace(/\n/g, '</p><p>') + '</p>'
  }

  if (opts.icons) {
    text = text.replace(/{(.+?)}/gi, (_, icon) => iconForAbbreviation(icon))
  }

  if (opts.longDash) {
    text = text.replace(/-/g, '\u2014')
  }

  $('#' + field).html(text)
}

function getColors(colors, manaCost) {
  if (colors) {
    return colors
  }

  colors = generateColors(manaCost)
  if (!colors.length) {
    return ['c']
  }

  return colors
}

function getPt(power, toughness, loyalty) {
  if (power && toughness) {
    return power + '/' + toughness
  } else {
    return loyalty || ''
  }
}

function getRarityColor(rarity) {
  return {
    m: 'darkorange',
    r: 'gold',
    u: 'silver',
    c: 'black'
  }[rarity && rarity.substring(0, 1).toLowerCase()]
}

var cardViewer = {
  updateCard: function(textAreaValue) {
    try {
      var inputString = textAreaValue.replace(/\\u00e2\\u20ac\\u201d|\u00e2\u20ac\u201d/g, '\u2014')
      var card = jsyaml.load(inputString)
    } catch(ex) {
      return ex
    }

    if (typeof card !== 'object') {
      return 'Card object required'
    }

    copyField(card, 'name')
    copyField(card, 'type', {longDash: true})
    copyField(card, 'text', {paras: true, icons: true})
    copyField(card, 'flavor', {paras: true, longDash: true})
    copyField(card, 'manaCost', {icons: true})

    $('#ptbox').html(getPt(card.power, card.toughness, card.loaylty))

    var colors = getColors(card.colors, card.manaCost)
    if (colors.length > 2) { colors = colors.map(_ => 'm') }
    setImage('back-main-img',  `back/${parseColor(colors[0])}.jpg`)
    setImage('back-half-img',  `back/h${parseColor(colors[1])}.png`)
    setImage('rules-main-img', `rules/${parseColor(colors[0])}.png`)
    setImage('rules-half-img', `rules/h${parseColor(colors[1])}.png`)
    setImage('type-img',       `type/${parseColor(colors[0] && !colors[1] ? colors[0] : 'c')}.png`)

    $('#art-img').attr('src', card.imgUrl || 'http://lorempixel.com/315/140/' + pictureCategory(card))
    $('#rarity').css('color', getRarityColor(card.rarity))
  }
}

window.cardViewer = cardViewer

