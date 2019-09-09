import Elements, { dispatch, connect } from '../lib/nozes/nozes.js';
import { getQuestions } from './ApiService.js'
import Level from './Level.js'
import Modal from './Modal.js'
const { div, a, i, h2, h3, p, form, label, input, span, button, section } = Elements;

export const MAX_QUESTIONS = 10;
export const EASY = 'easy';
export const MEDIUM = 'medium';
export const HARD = 'hard';

function Trivia({
  category = null,
  questions = [],
  answers = [],
  selected_answer = null,
  question_index = 0,
  correct = null,
  filter = MEDIUM,
}) {

  let form_dom;
  const question = questions.filter(q => q.difficulty === filter)[question_index] || {};

  if (!this.isConnected) {
    getQuestions(category, filter).then(questions =>
      dispatch(Trivia, { questions })
    );
  }

  const selectAnswer = (e) => {
    dispatch(Trivia, { selected_answer: e.target.value });
  }

  const submit = (e, question) => {
    e.preventDefault();

    const correct = selected_answer === question.correct_answer;
    const answer = {
      ...question,
      selected_answer: selected_answer,
      correct,
      date_time: new Date()
    };

    dispatch('answers', answers.concat(answer));
    dispatch(Trivia, { correct });
  }

  const close = (e) => {
    e.preventDefault();
    window.location.href = '#/';
  }

  const next = (e) => {
    e.preventDefault();

    if (answers.length < MAX_QUESTIONS) {
      form_dom.reset();
      dispatch(Trivia, {
        selected_answer: null,
        question_index: question_index + 1,
        correct: null,
        filter: calcFilter()
      });
    }
    else {
      window.location.href = '#/report/' + category;
    }
  }

  const calcFilter = () => {
    let next_filter = filter;

    if (answers.length > 1) {
      const last = answers[answers.length-1];
      const nexttolast = answers[answers.length-2];

      if (last.correct === true && nexttolast.correct === true) {
        if (last.difficulty === EASY && nexttolast.difficulty === EASY) {
          next_filter = MEDIUM;
        }
        else if (last.difficulty === MEDIUM && nexttolast.difficulty === MEDIUM) {
          next_filter = HARD;
        }
      }
      else if (last.correct === false && nexttolast.correct === false) {
        if (last.difficulty === HARD && nexttolast.difficulty === HARD) {
          next_filter = MEDIUM;
        }
        else if (last.difficulty === MEDIUM && nexttolast.difficulty === MEDIUM) {
          next_filter = EASY;
        }
      }
    }

    return next_filter;
  }

  return !question.question ? div('Loading...') : (
    span(
      a({ href: '#close', onclick: close }, i('ⓧ'), ' Close'),
      h2(question.category),
      section(
        Level({ difficulty: question.difficulty }),
        h3(`Question ${question_index + 1}`),
        p(m => m.innerHTML = question.question),
        form({ className: 'answers', onchange: selectAnswer, onsubmit: e => submit(e, question) },
          ...question.options && question.options.map(option =>
            label(
              input({ type: 'radio', name: 'option', value: option, checked: option === selected_answer }),
              span(m => m.innerHTML = option)
            )
          ),
          button({ type: 'submit', disabled: !selected_answer }, 'Send answer'),
          correct !== null && Modal({ correct, next }),
          ref => form_dom = ref
        )
      )
    )
  );
}

export default connect('answers', Trivia);
