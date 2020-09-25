const animate = () => {
  //Animate star dvis
  anime({
    targets: '.stars',
    duration: 700,
    delay: anime.stagger(7),
    scale: [1, 1.6, 1],
    loop: true
  })

  let slideY = 72
  if(window.innerWidth < 600)
    slideY = 42

  //Animate header coming in from top
  anime({
    targets: ['#header #upper', '#header #lower' ],
    duration: 1000,
    color: ['#090A0A', '#ffffff'],
    translateY: [slideY],
    easing: 'easeInOutQuad'
  })

  //Animate SVG paths
  anime({
    targets: 'path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 800,
    delay: function(t,i) {
      return i*150;
    },
    opacity: [
      {value: [0,1]},
      {value: [1,0], duration: 200, easing: 'linear', delay:500}
    ],
    autoplay: true,

  })

  //Animate grid items displaying
  anime({
    targets: '.grid-item',
    duration: 500,
    delay: function(t,i) {
      return i*150 + 800;
    },
    easing: 'easeInQuart',
    opacity: {
      value: [0, 1],
      easing: 'linear'
    },
    border: ['none', '1px solid white'],
    scale: [0.5, 1],
    autoplay: true,
  })

}


const generate_svg = (element) => {

  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  svg.setAttribute('width', element.offsetWidth)
  svg.setAttribute('height', element.offsetHeight)
  svg.setAttribute('class', 'generated_svg')
  path.setAttribute('fill', 'transparent')
  path.setAttribute('stroke', 'ghostwhite')
  path.setAttribute('stroke-width', '4')
  path.setAttribute('d', `M0 0 H${element.offsetWidth} V${element.offsetHeight} H0 Z`)
  svg.appendChild(path)
  svg.style.position = 'absolute'
  svg.style.top = 0+'px'
  svg.style.left = 0+'px'

  return svg
}

const display_SVGs = (items) => {
  //generate svgs & display them
  let svgs = []
  for(let i = 0; i < items.length; i++){
    let svg  = generate_svg(items[i])
    svgs.push(svg)
    items[i].append(svg)
  }
  return svgs
}

const createStars = (density) => {
  let diameter = 3
  let amount_of_stars = (window.innerWidth * window.innerHeight) / 1000 * density
  //let amount_of_stars = 3000
  let parent = document.querySelector('#bg-wrapper')
  for(let i = 0; i < amount_of_stars; i++){
    let div = document.createElement('div')
    let d = Math.floor(Math.random()*diameter + 1)+'px'
    div.style.width = d
    div.style.height = d
    div.style.borderRadius = '50%'
    div.className = 'stars'
    div.style.backgroundColor = 'white'
    div.style.position = 'absolute'
    let top = Math.floor((Math.random() * 2.3 * window.innerHeight) - window.innerHeight/2)
    let left = Math.floor((Math.random() * 2.7 * window.innerWidth) - window.innerWidth/2)
    div.style.top = top+'px'
    div.style.left = left+'px'

    parent.append(div)
  }
}

let items = document.querySelectorAll('.grid-item-wrapper')
createStars(2)
display_SVGs(items)
animate(items)

for( let i = 0; i < items.length; i++){

  items[i].addEventListener('mouseenter', () => {
    anime({
      targets: items[i],
      duration: 1000,
      scale:[1, 1.2],
    })
  })

  items[i].addEventListener('mouseleave', () => {
    anime({
      targets: items[i],
      duration: 1000,
      scale:[1.2, 1],

    })
  })
}
