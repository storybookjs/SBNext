import MyButton from './MyButton.vue';

export default () => MyButton;
// This one gives template compiler error
// export default () => ({ template: '<div>hello world</div>' });

// export const withText = () => ({
//   components: { MyButton },
//   template: '<my-button :handle-click="log">Hello Button</my-button>',
//   methods: { log: () => console.log('clicked text button') },
// });

// export const withEmoji = () => {
//   console.log('withEmoji called');
//   return {
//     components: { MyButton },
//     template: '<my-button :handle-click="log">😀 😎 👍 💯</my-button>',
//     methods: { log: () => console.log('clicked emoji button') },
//   };
// };
