import Elements, { dispatch, connect } from '../lib/nozes/nozes.js';
const { div, span, img, h1, h2, h3, b, br } = Elements;

const EASY = 'easy';
const MEDIUM = 'medium';
const HARD = 'hard';

function Report(props) {
  const {
    answers = [],
    category = null,
    total_hits = 0,
    total_mistakes = 0,
    easy_hits = 0,
    easy_mistakes = 0,
    medium_hits = 0,
    medium_mistakes = 0,
    hard_hits = 0,
    hard_mistakes = 0
  } = props;

  if (!this.isConnected) {
    window.scrollTo(0, 0);

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
    }, { ...props });

    const cached_answers = window.localStorage.getItem('category_' + category);
    new_state = cached_answers ? JSON.parse(cached_answers) : new_state;
    window.localStorage.setItem('category_' + category, JSON.stringify(new_state));
    dispatch(Report, new_state);
  }

  return (
    div({ className: 'report' },
      div({ className: 'report-head' },
        img({ src: '../images/mascot.png', alt: 'Mascot' }),
        div({ className: 'report-congrats' },
          h1('Congrats!'),
          h2('You finished the test')
        )
      ),
      div({ className: 'report-body' },
        h3('See your performance'),
        div({ className: 'report-resume' },
          div({ className: 'report-resume-points' },
            div(total_hits),
            span('hits')
          ),
          div({ className: 'report-resume-points' },
            div(total_mistakes),
            span('mistakes'),
          ),
        ),
        div({ className: 'report-detail' },
          div(
            b('Easy'), br(),
            'Hits: ', easy_hits, br(),
            'Mistakes: ', easy_mistakes
          ),
          div(
            b('Medium'), br(),
            'Hits: ', medium_hits, br(),
            'Mistakes: ', medium_mistakes
          ),
          div(
            b('Hard'), br(),
            'Hits: ', hard_hits, br(),
            'Mistakes: ', hard_mistakes
          )
        )
      )
    )
  );
}

export default connect('answers', Report);
