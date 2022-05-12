export function addQuestionInStorage(id: string): void {
  let answeredQuestions = localStorage.getItem('answeredQuestions');
  if (!answeredQuestions) {
    localStorage.setItem('answeredQuestions', id);
    return;
  }
  const answeredQuestionsArr = Array.from(
    new Set(answeredQuestions.split(','))
  );
  if (answeredQuestionsArr.includes(id)) {
    return;
  } else {
    answeredQuestions += ',' + id;
    localStorage.setItem('answeredQuestions', answeredQuestions);
  }
}

export default {};
