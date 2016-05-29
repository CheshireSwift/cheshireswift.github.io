'use strict'

const gameDir = 'images/'
function setImage(id, pathSuffix) {
  $(id).attr('src', pathSuffix.includes('undefined') ? '' : gameDir + pathSuffix)
}

var parseColor = rawColor => {
  var color = { white: 'W', blue: 'U', black: 'B', red: 'R', green: 'G' }[rawColor && rawColor.toLowerCase()] || rawColor
  return color && color.toLowerCase()
}

function pictureCategory(card) {
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

var iconForAbbreviation = (_, icons) => icons
  .replace(/(.)\/(.)/gi, (_, first, second) => elemWithclass(classForHybrid(first, second)))
  .split('')
  .map(icon => elemWithClass(classForIcon(icon)))
  .join('')

function classForHybrid(first, second) {
  return '.hybrid-' + first + second
}

function classForIcon(icon) {
  icon = icon.toLowerCase()
  if (icon.match(/\d|[wubrgxyz]/)) {
    return 'mana-' + icon
  }

  return {
    t: 'tap',
    d: 'untap'
  }[icon]
}

function generateColors(manaCost) {
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
  return retval
}

var cardViewer = {
  updateCard: function(e) {
    try {
      var inputString = e.target.value.replace(/\\u00e2\\u20ac\\u201d|\u00e2\u20ac\u201d/g, '\u2014')
      var card = jsyaml.load(inputString)
    } catch(ex) {
      return ex
    }

    copyField('name')
    copyField('type', {longDash: true})
    copyField('text', {paras: true, icons: true})
    copyField('flavor', {paras: true, longDash: true})
    copyField('manaCost', {icons: true})
    
    $('#ptbox').html(
      card.power && card.toughness ?
        card.power + '/' + card.toughness :
        card.loyalty ||
        ''
    )

    if (!card.colors) {
      card.colors = generateColors(card.manaCost)
    }

    if (!card.colors.length) {
      card.colors.push('c')
    }

    setImage('#back-main-img',  `back/${parseColor(card.colors[0])}.jpg`)
    setImage('#back-half-img',  `back/h${parseColor(card.colors[1])}.png`)
    setImage('#rules-main-img', `rules/${parseColor(card.colors[0])}.png`)
    setImage('#rules-half-img', `rules/h${parseColor(card.colors[1])}.png`)
    setImage('#type-img',       `type/${parseColor(card.colors[0] && !card.colors[1] ? card.colors[0] : 'c')}.png`)

    $('#art-img').attr('src', card.imgUrl || 'http://lorempixel.com/315/140/' + pictureCategory(card))

    $('#rarity').css('color', {
      m: 'darkorange',
      r: 'gold',
      u: 'silver',
      c: 'black'
    }[card.rarity.substring(0, 1).toLowerCase()])

    return 'Success!'

    function copyField(field, opts={}) {
      if (!card[field]) {
        $('#' + field).html('')
        return
      }

      var text = card[field].replace(/~/g, card.name)
      if (opts.paras) {
        text = '<p>' + text.replace(/\n/g, '</p><p>') + '</p>'
      }

      if (opts.icons) {
        text = text.replace(/{(.+?)}/gi, iconForAbbreviation)
      }

      if (opts.longDash) {
        text = text.replace(/-/g, '\u2014')
      }

      $('#' + field).html(text)
    }
  }
}

window.cardViewer = cardViewer

