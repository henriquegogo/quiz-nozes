import Header from './Header.js';
import Categories from './Categories.js';
import Trivia from './Trivia.js';
import Report from './Report.js';
const { router, div, main } = Nozes;

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
