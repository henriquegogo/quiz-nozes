import Elements, { store, watch, dispatch, connect } from '../lib/nozes/nozes.js';
import { getCategories } from './ApiService.js'
const { div, h1, a } = Elements;

watch(function log() {
  console.log('watched');
});

function Categories(categories = []) {
  !this.isConnected && getCategories().then(data => dispatch(Categories, data));

  return div(
    h1('Categories'),
    categories.length === 0 && 'Loading...',
    div({ className: 'card-group' },
      ...categories.map(category =>
        a({ className: 'card', href: '#/trivia/' + category.id }, category.name)
      )
    )
  );
}

export default connect(Categories);
