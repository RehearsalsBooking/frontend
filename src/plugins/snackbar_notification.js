import { VSnackbar, VBtn, VIcon, VSpacer } from "vuetify/lib";

export default function install(Vue) {
  const data = {
    isShown: false,
    message: null,
    color: null,
  };

  const VSnackbarNotification = {
    name: "v-snackbar-notification",

    props: {
      timeout: {
        type: Number,
        default: 4000,
      },
    },

    data() {
      return data;
    },

    render: function (createElement) {
      return createElement(
        VSnackbar,
        {
          props: {
            value: this.isShown,
            minWidth: 304,
            bottom: true,
            timeout: this.timeout,
            color: this.color,
          },
          on: {
            input: (value) => {
              this.isShown = value;
            },
          },
        },
        [
          this.message,
          createElement(VSpacer),
          createElement(
            VBtn,
            {
              props: {
                icon: true,
                color: "white",
                right: true,
              },
              slot: "action",
              on: {
                click: () => (this.isShown = false),
              },
            },
            [createElement(VIcon, {}, ["mdi-close"])]
          ),
        ]
      );
    },
  };

  Vue.component("VSnackbarNotification", VSnackbarNotification);

  Vue.prototype.$snackbar = function $snackbar(message, color = "primary") {
    data.isShown = false;

    setTimeout(() => {
      data.message = message;
      data.color = color;
      data.isShown = true;
    }, 250);
  };
}
