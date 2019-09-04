import Elements from '../lib/nozes/nozes.js';
const { header, h1 } = Elements;

function Header() {
  return header(
    h1('Quiz')
  )
}

export default Header;
