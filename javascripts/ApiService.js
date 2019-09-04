const API_BASE_URL = 'https://opentdb.com';
const CATEGORIES_URL = `${API_BASE_URL}/api_category.php`;
const QUESTION_URL = `${API_BASE_URL}/api.php?amount=10&difficulty={difficulty}&type=multiple&category={category}`;

export async function getCategories() {
  const resp = await fetch(CATEGORIES_URL).then(resp => resp.json());
  return resp.trivia_categories;
}

export async function getQuestions(category_id, difficulty) {
  let questions = await Promise.all([
    fetch(QUESTION_URL.replace('{category}', category_id).replace('{difficulty}', 'easy')).then(resp => resp.json()),
    fetch(QUESTION_URL.replace('{category}', category_id).replace('{difficulty}', 'medium')).then(resp => resp.json()),
    fetch(QUESTION_URL.replace('{category}', category_id).replace('{difficulty}', 'hard')).then(resp => resp.json()),
  ]).then(([ easy, medium, hard ]) => {
    return [ ...easy.results, ...medium.results, ...hard.results ];
  });

  questions = questions.map(question => {
    const options = (question.incorrect_answers && question.correct_answer) ?
      [...question.incorrect_answers, question.correct_answer] : [];
    options.sort(() => Math.random() - 0.5); // Shuffle
    return {...question, options };
  });

  return questions;
}
