const nav = document.querySelector('.nav')
const toggle = document.querySelector('.nav-toggle')
const menu = document.querySelector('#nav-menu')
const year = document.querySelector('#year')
const form = document.querySelector('.contact-form')
const formNote = document.querySelector('.form-note')

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

form?.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(form)
  const name = String(data.get('name') || '').trim() || '旅人'
  if (formNote) {
    formNote.textContent = `谢谢你，${name}！留言已记录（演示站点，不会真正发送）。`
  }
  form.reset()
})
