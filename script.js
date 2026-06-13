const cursor = document.getElementById('cursor')
const trail  = document.getElementById('cursor-trail');
const canvas = document.getElementById('particles')
const ctx = canvas.getContext('2d')
const audio = document.getElementById('audio')
const playBtn = document.getElementById('play-btn')
const progFill = document.getElementById('prog-fill')
const volume = document.getElementById('volume')
const bio = document.querySelector('.bio')
const texte = "why is it working.."
let etats = 'texte'
let index = 0
let playing = true


// taille de la fenetre Canvas
canvas.width = window.innerWidth
canvas.height = window.innerHeight



const stars = Array.from({ length: 80}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    rayon: Math.random() * 1.8 + 0.4,
    vitesse: Math.random() * 0.4 + 0.1
}))

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  stars.forEach(function(star){
    star.x = Math.random() * canvas.width
    star.y = Math.random() * convas.height
  })
})

document.addEventListener('mousemove',function(e) {
    cursor.style.left = e.clientX - 7 + "px"
    cursor.style.top  = e.clientY - 7 + "px"

    trail.style.left = e.clientX - 15 + "px"
    trail.style.top  = e.clientY - 15 + "px"
})

function animateTrail(){
    trailX += (mouseX - trailX) * 0.12
    trailY += (mouseY - trailY) * 0.12
    trail.style.left = trailX - 15 + 'px'
    trail.style.top = trailY - 15 + 'px'
    requestAnimationFrame(animateTrail)
}

document.querySelectorAll('a, button').forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    cursor.style.transform = 'scale(2.5)'
    cursor.style.opacity = '0.5'
    trail.style.transform = 'scale(1.5)'
  })
  el.addEventListener('mouseleave', function() {
    cursor.style.transform = 'scale(1)'
    cursor.style.opacity = '1'
    trail.style.transform = 'scale(1)'
  })
})

// se compresse au clic
document.addEventListener('mousedown', function() {
  cursor.style.transform = 'scale(0.6)'
})
document.addEventListener('mouseup', function() {
  cursor.style.transform = 'scale(1)'
})

// ripple au clic
document.addEventListener('click', function(e) {
  const ripple = document.createElement('div')
  ripple.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ff0000;
    pointer-events: none;
    z-index: 9997;
    left: ${e.clientX - 4}px;
    top: ${e.clientY - 4}px;
    opacity: 0.8;
    transition: all 0.5s ease-out;
  `
  document.body.appendChild(ripple)

  // déclenche l'animation
  requestAnimationFrame(function() {
    ripple.style.transform = 'scale(10)'
    ripple.style.opacity = '0'
  })

  // supprime le div après l'animation
  setTimeout(function() {
    ripple.remove()
  }, 500)
})

function typewriter(){
  if (etats == 'texte') {
    if (index < texte.length) {
      bio.textContent = texte.slice(0, index + 1)
      index++
      setTimeout(typewriter, 80)
    }else{
      etats = 'efface'
      setTimeout(typewriter, 1000)
    }
  
  }else if (etats === 'efface'){
    if(index > 0) {
      bio.textContent = texte.slice(0, index- 1)
      index --
      setTimeout(typewriter,50)
    }else{
      etats ='texte'
      setTimeout(typewriter, 500)
    }
  }
}


function animer() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    
    stars.forEach(function(star){
        star.y -= star.vitesse

    if (star.y < 0){
        star.y = canvas.height
        star.x = Math.random() * canvas.width
    }

    ctx.beginPath()
    ctx.arc(star.x,star.y, star.rayon, 0, Math.PI * 2)
    ctx.fillStyle = '#ff0000'
    ctx.globalAlpha = 0.6
    ctx.fill()
    })
    
    ctx.globalAlpha = 0
    requestAnimationFrame(animer)
}

volume.addEventListener('input',function(){
  audio.volume = volume.value
})

playBtn.addEventListener('click', function(){
    if (playing){
        audio.pause()
        playBtn.textContent = '▶'
        playing = false
    }else{
        audio.play()
        audio.volume = 0.03
        playBtn.textContent = "⏸"
        playing = true
    }
})

function updateProgress(){
    if(audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100
        progFill.style.width = pct + '%'
    }
    requestAnimationFrame(updateProgress)
}

typewriter()
animer()
updateProgress()
animateTrail()