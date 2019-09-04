const API_BASE_URL = 'https://opentdb.com';
const CATEGORIES_URL = `${API_BASE_URL}/api_category.php`;
const QUESTION_URL = `${API_BASE_URL}/api.php?amount=10&difficulty={difficulty}&type=multiple&category={category}`;

export async function getCategories() {
  const resp = await fetch(CATEGORIES_URL).then(resp => resp.json());
  return resp.trivia_categories;
}

export async function getQuestions(category_id, difficulty) {
  const resp = await fetch(QUESTION_URL
    .replace('{difficulty}', difficulty)
    .replace('{category}', category_id)
  ).then(resp => resp.json());
  return resp.results;
}
