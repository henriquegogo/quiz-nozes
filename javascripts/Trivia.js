//import { questions, clearQuestions, answerQuestion } from '../actions/questions';
import Elements, { store, dispatch, connect } from '../lib/nozes/nozes.js';
import { getQuestions } from './ApiService.js'
import Level from './Level.js'
import Modal from './Modal.js'
const { div, a, i, h2, h3, p, form, label, input, span, button, section } = Elements;

const MAX_QUESTIONS = 10;
const EASY = 'easy';
const MEDIUM = 'medium';
const HARD = 'hard';

function Trivia(props) {

  const {
    category = null,
    selected_answer = null,
    question_index = 0,
    correct = null,
    filter = MEDIUM,
    questions = store.questions || [],
  } = { ...props };

  console.log(props);

  const question = questions.filter(q => q.difficulty === filter)[question_index] || {};

  !this.isConnected && getQuestions(category, filter).then(questions => dispatch('questions', questions));

  const selectAnswer = (e) => {
    dispatch(Trivia, { ...props, selected_answer: e.target.value });
  }

  const submit = (e, question) => {
    e.preventDefault();
    const correct = this.state.selected_answer === question.correct_answer;
    this.setState({ correct });

    const answer = {
      ...question,
      selected_answer: this.state.selected_answer,
      correct,
      date_time: new Date()
    };
    this.props.dispatch(answerQuestion(answer));
  }

  const close = (e) => {
    e.preventDefault();
    window.location.href = '#/';
  }

  const next = (e) => {
    e.preventDefault();
    const { question_index } = this.state;
    const { answers } = this.props;

    if (answers.length < MAX_QUESTIONS) {
      this.form.current.reset();
      this.setState({
        selected_answer: null,
        question_index: question_index + 1,
        correct: null,
        filter: this.calcFilter()
      });
    }
    else {
      this.props.history.push('/report/' + this.props.category);
    }
  }

  const calcFilter = () => {
    const { answers } = this.props;
    let next_filter = this.state.filter;

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

  const componentWillUnmount = () => {
    this.props.dispatch(clearQuestions());
  }

  return !question.question ? div('Loading...') : (
    span(
      a({ href: '#close', onclick: close }, i('ⓧ'), ' Close'),
      h2(question.category),
      section(
        Level({ difficulty: question.difficulty }),
        h3(`Question ${question_index + 1}`),
        p(question.question),
        form({ className: 'answers', onchange: selectAnswer, onsubmit: e => submit(e, question) },
          ...question.options && question.options.map(option =>
            label(
              input({ type: 'radio', name: 'option', value: option }),
              span(option)
            )
          ),
          button({ type: 'submit', disabled: !selected_answer }, 'Send answer'),
          correct !== null && Modal({ correct, next })
        )
      )
    )
  );
}

export default connect('questions', Trivia);
