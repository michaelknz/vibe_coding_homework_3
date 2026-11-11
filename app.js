// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  if (filter === 'passed') return window.reportData.attempts.filter((attempt) => attempt.passed === true)
  if (filter === 'failed') return window.reportData.attempts.filter((attempt) => attempt.passed === false)
  return window.reportData.attempts
}

function renderAttempts(attempts) {
  let markup = ''
  attempts.forEach((attempt) => {
    const status = attempt.passed ? 'Порог пройден' : 'Порог не пройден'
    markup += `<li class="result-item">
      <span class="result-name">${escapeHtml(attempt.name)}</span>
      <span>${attempt.score} из ${attempt.questionCount} (${attempt.percentage}%) — ${status}</span>
    </li>`
  })
  document.querySelector('#result-list').innerHTML = markup
  document.querySelector('#result-count').textContent = `Показано: ${attempts.length} из ${window.reportData.attempts.length}`
}

function startFilter() {
  const form = document.querySelector('#filter-form')
  const select = document.querySelector('#filter')
  const count = document.querySelector('#result-count')
  const list = document.querySelector('#result-list')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const attempts = selectAttempts(select.value)
    renderAttempts(attempts)
  })
}

startFilter()
