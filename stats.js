const PASSING_PERCENTAGE = 67

function isArray(value) {
  return Array.isArray(value)
}

export function validateQuizData(data) {
  return typeof data === 'object' && data !== null && !isArray(data) &&
    typeof data.quizTitle === 'string' && data.quizTitle.trim().length > 0 &&
    isArray(data.correctAnswers) && data.correctAnswers.length > 0 &&
    isArray(data.attempts) && data.attempts.length > 0 &&
    data.attempts.every((attempt) =>
      typeof attempt === 'object' && attempt !== null && !isArray(attempt) &&
      typeof attempt.name === 'string' && attempt.name.trim().length > 0 &&
      isArray(attempt.answers) && attempt.answers.length === data.correctAnswers.length
    )
}

export function calculateAttempt(attempt, correctAnswers) {
  let score = 0
  correctAnswers.forEach((answer, index) => {
    if (attempt.answers[index] === answer) score += 1
  })
  const percentage = Math.round(score / correctAnswers.length * 100)
  return { name: attempt.name.trim(), score, percentage, passed: percentage >= PASSING_PERCENTAGE }
}

export function calculateReport(data) {
  const attempts = data.attempts.map((attempt) => calculateAttempt(attempt, data.correctAnswers))
  let best = attempts[0]
  let totalPercentage = 0
  let passedCount = 0
  attempts.forEach((attempt) => {
    totalPercentage += attempt.percentage
    if (attempt.passed) passedCount += 1
    if (attempt.score > best.score) best = attempt
  })
  return {
    quizTitle: data.quizTitle.trim(),
    questionCount: data.correctAnswers.length,
    participantCount: attempts.length,
    averagePercentage: Math.round(totalPercentage / attempts.length),
    passedCount,
    threshold: PASSING_PERCENTAGE,
    best,
    attempts,
  }
}
