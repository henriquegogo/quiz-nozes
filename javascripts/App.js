import Elements, { router } from '../lib/nozes/nozes.js';
import Header from './Header.js';
import Categories from './Categories.js';
import Trivia from './Trivia.js';
import Report from './Report.js';
const { div, main } = Elements;

function App() {
  return div(
    Header(),
    main(
      router({
        index: Categories,
        trivia: category => {
          const cached_answers = window.localStorage.getItem('quiz-nozes-category_' + category);
          return cached_answers ? window.location.href = '#/report/' + category : Trivia({ category });
        },
        report: category => Report({ category })
      })
    )
  );
}

export default App;
