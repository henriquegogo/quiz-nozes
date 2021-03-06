import { createElement } from '../lib/nozes/index.js';
const { div, span } = createElement;

const levels = {
  easy: { stars: '★☆☆', text: 'Easy' },
  medium: { stars: '★★☆', text: 'Medium' },
  hard: { stars: '★★★', text: 'Hard' },
}

function Level({ difficulty }) {
  const level = levels[difficulty] || {};

  return div({ className: 'level' },
    span({ className: 'level-stars' }, level.stars),
    level.text
  );
}

export default Level;
