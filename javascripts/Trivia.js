//import { questions, clearQuestions, answerQuestion } from '../actions/questions';
import Level from './Level.js'
import Modal from './Modal.js'

const MAX_QUESTIONS = 10;
const EASY = 'easy';
const MEDIUM = 'medium';
const HARD = 'hard';

function Trivia(state = {
  selected_answer: null,
  question_index: 0,
  correct: null,
  filter: MEDIUM
}) {

  return div(
  );
}

  selectAnswer = (e) => {
    this.setState({ selected_answer: e.target.value });
  }

  submit = (e, question) => {
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

  close = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }

  next = (e) => {
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

  calcFilter() {
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

  componentDidMount() {
    this.props.dispatch(questions(this.props.category));
  }

  componentWillUnmount() {
    this.props.dispatch(clearQuestions());
  }

  render() {
    const { selected_answer, question_index, correct, filter } = this.state;
    const { questions } = this.props;
    const question = questions.filter(q => q.difficulty === filter)[question_index] || {};

    return !question.question ? 'Loading...' : (
      <Fragment>
        <a href='#close' onClick={this.close}><i>ⓧ</i> Close</a>
        <h2>{question.category}</h2>
        <section>
          <Level difficulty={question.difficulty} />
          <h3>Question {question_index + 1}</h3>
          {/* Needs to use dangerouslySetInnerHTML because api returns some HTML encoded text */}
          <p dangerouslySetInnerHTML={{ __html: question.question }} />
          <form className='answers' ref={this.form = createRef()}
            onChange={this.selectAnswer}
            onSubmit={e => this.submit(e, question)}>
            {question.options && question.options.map(option =>
              <label key={btoa(option)}>
                <input type='radio' name='option' value={option} />
                <span dangerouslySetInnerHTML={{ __html: option }} />
              </label>
            )}
            <button type='submit' disabled={!selected_answer}>Send answer</button>
            {correct !== null && <Modal correct={correct} next={this.next} />}
          </form>
        </section>
      </Fragment>
    );
  }
}

export default connect(({ questions }) => questions)(withRouter(Trivia));
