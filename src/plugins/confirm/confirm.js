import Vue from 'vue';

import Confirm from '~/components/Confirm';

const createConfirmDialog = (content, resolveLabel, rejectLabel) => {
  return new Promise((resolve) => {
    const confirm = new Vue({
      methods: {
        closeHandler(result) {
          return () => {
            resolve(result);
            confirm.$destroy();
            confirm.$el.remove();
          };
        },
      },
      render(h) {
        return h(Confirm, {
          props: {
            content,
            resolveLabel,
            rejectLabel,
          },
          on: {
            resolve: this.closeHandler(true),
            reject: this.closeHandler(false),
          },
        });
      },
    }).$mount();
    document.body.appendChild(confirm.$el);
  });
};

const confirmPlugin = {
  install: (vue) => {
    vue.prototype.$confirm = createConfirmDialog;
  },
};

export default confirmPlugin;
