import { createElement } from '../lib/nozes/index.js';
const { div, i, h2, button } = createElement;

function Modal({ correct, next }) {
  return div(
    div({ className: 'modal-overlay' }),
    div({ className: 'modal ' + (!correct && 'red') },
      i({ className: 'modal-icon' }),
      h2(correct ? 'You got it right!' : 'Wrong answer!'),
      button({ className: 'modal-button', onclick: next, autofocus: true },
        'Next ', i('→')
      )
    )
  );
}

export default Modal;

