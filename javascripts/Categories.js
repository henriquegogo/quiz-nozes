import Elements, { store, dispatch, connect } from '../lib/nozes/nozes.js';
import { getCategories } from './ApiService.js'
const { div, h1, a } = Elements;

function Categories() {
  const categories = store.categories || [];

  console.log(this);
  !this.isConnected && getCategories().then(data => dispatch('categories', data));

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

export default connect('categories', Categories);
