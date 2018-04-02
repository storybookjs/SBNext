import Vue from 'vue';
import { document } from 'global';

let app = null;

export const renderer = items => {
  console.log({ items });
  const component = items && items[0](); // FIXME: iterate over all items
  console.log({ component });

  if (app) app.$destroy();

  // This method from storybook doesn't work:
  // app = new Vue({
  //   el: '#root',
  //   render(h) {
  //     return h('div', { attrs: { id: 'xroot' } }, [h(component)]);
  //   },
  // });
  //
  // But this one does:
  // https://github.com/vuejs-templates/webpack/issues/215#issuecomment-287652462
  app = new Vue(component).$mount('#root');
};

if (module.hot) {
  module.hot.decline();
}
