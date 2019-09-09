import Elements, { dispatch, connect } from '../lib/nozes/nozes.js';
import { MAX_QUESTIONS, EASY, MEDIUM, HARD } from './Trivia.js';
const { div, span, img, h1, h2, h3, b, br, button } = Elements;

function Report({
  answers = [],
  category = null
}) {

  let
    total_hits = 0,
    total_mistakes = 0,
    easy_hits = 0,
    easy_mistakes = 0,
    medium_hits = 0,
    medium_mistakes = 0,
    hard_hits = 0,
    hard_mistakes = 0

  if (!this.isConnected) {
    window.scrollTo(0, 0);

    const cached_answers = window.localStorage.getItem('quiz-nozes-category_' + category);
    answers = cached_answers ? JSON.parse(cached_answers) : answers;
    answers.length === MAX_QUESTIONS && window.localStorage.setItem('quiz-nozes-category_' + category, JSON.stringify(answers));
    
    dispatch(Report, { answers });
  }

  answers.forEach(answer => {
    answer.correct ? total_hits++ : total_mistakes++;
    switch (answer.difficulty) {
      case EASY:
        answer.correct ? easy_hits++ : easy_mistakes++;
        break;
      case MEDIUM:
        answer.correct ? medium_hits++ : medium_mistakes++;
        break;
      case HARD:
        answer.correct ? hard_hits++ : hard_mistakes++;
        break;
      default:
    }
  });

  const back = (e) => {
    e.preventDefault();
    window.location.href = '#/';
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
        ),
        button({ onclick: back }, 'Back to start')
      )
    )
  );
}

export default connect('answers', Report);
