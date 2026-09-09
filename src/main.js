const header = document.querySelector('.site-header')
const nav = document.querySelector('.nav')
const toggle = document.querySelector('.nav-toggle')
const menu = document.querySelector('#nav-menu')
const year = document.querySelector('#year')
const form = document.querySelector('.contact-form')
const formNote = document.querySelector('.form-note')
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

if (year) {
  year.textContent = String(new Date().getFullYear())
}

function setMenuOpen(open) {
  if (!nav || !toggle) return
  nav.classList.toggle('is-open', open)
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
  toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单')
}

toggle?.addEventListener('click', () => {
  setMenuOpen(!nav.classList.contains('is-open'))
})

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false))
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuOpen(false)
})

function updateHeaderState() {
  if (!header) return
  header.classList.toggle('is-scrolled', window.scrollY > 12)
}

updateHeaderState()
window.addEventListener('scroll', updateHeaderState, { passive: true })

function revealAll() {
  document.querySelectorAll('.reveal').forEach((el) => {
    el.classList.add('is-visible')
  })
}

function initScrollReveals() {
  const elements = document.querySelectorAll('.reveal')
  if (!elements.length) return

  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
    revealAll()
    return
  }

  elements.forEach((el) => {
    const delay = el.getAttribute('data-reveal-delay')
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )

  elements.forEach((el) => observer.observe(el))

  // Hero content should appear promptly on load
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero .reveal').forEach((el) => {
      el.classList.add('is-visible')
    })
  })
}

initScrollReveals()

prefersReducedMotion.addEventListener?.('change', (event) => {
  if (event.matches) revealAll()
})

form?.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(form)
  const name = String(data.get('name') || '').trim() || '旅人'
  if (formNote) {
    formNote.textContent = `谢谢你，${name}！留言已记录（演示站点，不会真正发送）。`
  }
  form.reset()
})
