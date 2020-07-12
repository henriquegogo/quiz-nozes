import { createElement } from '../lib/nozes/index.js';
const { header, h1 } = createElement;

function Header() {
  return header(
    h1('Quiz')
  )
}

export default Header;
