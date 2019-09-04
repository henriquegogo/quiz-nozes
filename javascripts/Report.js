import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Report.scss';

const EASY = 'easy';
const MEDIUM = 'medium';
const HARD = 'hard';

class Report extends Component {

  state = {
    total_hits: 0,
    total_mistakes: 0,
    easy_hits: 0,
    easy_mistakes: 0,
    medium_hits: 0,
    medium_mistakes: 0,
    hard_hits: 0,
    hard_mistakes: 0
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
    const { answers, category } = this.props;

    let new_state = answers.reduce((result, answer) => {
      answer.correct ? result.total_hits++ : result.total_mistakes++;
      switch (answer.difficulty) {
        case EASY:
          answer.correct ? result.easy_hits++ : result.easy_mistakes++;
          break;
        case MEDIUM:
          answer.correct ? result.medium_hits++ : result.medium_mistakes++;
          break;
        case HARD:
          answer.correct ? result.hard_hits++ : result.hard_mistakes++;
          break;
        default:
      }
      return result;
    }, { ...this.state });

    const cached_answers = window.localStorage.getItem('category_' + category);
    new_state = cached_answers ? JSON.parse(cached_answers) : new_state;
    window.localStorage.setItem('category_' + category, JSON.stringify(new_state));
    this.setState(new_state);
  }

  render() {
    const {
      total_hits,  total_mistakes,
      easy_hits,   easy_mistakes,
      medium_hits, medium_mistakes,
      hard_hits,   hard_mistakes
    } = this.state;

    return (
      <div className='report'>
        <div className='report-head'>
          <img src='./mascot.png' alt='Mascot' />
          <div className='report-congrats'>
            <h1>Congrats!</h1>
            <h2>You finished the test</h2>
          </div>
        </div>
        <div className='report-body'>
          <h3>See your performance</h3>
          <div className='report-resume'>
            <div className='report-resume-points'>
              <div>{total_hits}</div>
              <span>hits</span>
            </div>
            <div className='report-resume-points'>
              <div>{total_mistakes}</div>
              <span>mistakes</span>
            </div>
          </div>
          <div className='report-detail'>
            <div>
              <b>Easy</b><br />
              Hits: {easy_hits}<br />
              Mistakes: {easy_mistakes}
            </div>
            <div>
              <b>Medium</b><br />
              Hits: {medium_hits}<br />
              Mistakes: {medium_mistakes}
            </div>
            <div>
              <b>Hard</b><br />
              Hits: {hard_hits}<br />
              Mistakes: {hard_mistakes}
            </div>
          </div>
          <Link to='/'>
            <button>Back to start</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(({ questions }) => questions)(Report);
