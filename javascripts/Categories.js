import { getCategories } from './ApiService.js'
const { dispatch, connect, div, h1, a } = Nozes;

function Categories({ categories = [] }) {

  !this.isConnected && getCategories().then(categories => {
    dispatch('answers', []);
    dispatch('categories', categories)
  });

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
