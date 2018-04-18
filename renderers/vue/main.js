import Vue from 'vue';
import { document } from 'global';

export const renderer = items => {
  const component = items && items[0]();
  return new Vue({
    el: '#root',
    render(h) {
      return h('div', { attrs: { id: 'root' } }, [h(component)]);
    },
  });
};

if (module.hot) {
  module.hot.decline();
}
