//src = https://gitlab.com/tozd/vue-snackbar-queue
import { VSnackbar, VBtn } from "vuetify/lib";
import VueObserverUtils from "@tozd/vue-observer-utils";

export default function install(Vue) {
  Vue.use(VueObserverUtils);

  let lastSnackbarId = 0;

  // We need an object around the queue.
  // See: https://github.com/vuejs/vue/issues/9500
  const globalState = Vue.observable({ queue: [] });

  const VSnackbarQueue = {
    name: "v-snackbar-queue",

    props: {
      timeout: {
        type: Number,
        default: 6000
      },
      pause: {
        type: Number,
        default: 300
      }
    },

    data() {
      return {
        isShown: false,
        snackbar: null
      };
    },

    created() {
      this.handle = null;
      this.unwait = null;
      this.showNextSnackbar();
    },

    watch: {
      isShown(newValue) {
        if (newValue === false && this.snackbar) {
          const snackbarIndex = globalState.queue.findIndex(
            element => element.id === this.snackbar.id
          );
          if (snackbarIndex > -1) {
            globalState.queue.splice(snackbarIndex, 1);
          }
          this.snackbar = null;
        }
      }
    },

    methods: {
      clearSnackbarState() {
        if (this.handle) {
          clearTimeout(this.handle);
          this.handle = null;
        }

        if (this.unwait) {
          this.unwait();
          this.unwait = null;
        }
      },

      showNextSnackbar() {
        this.clearSnackbarState();

        // Wait for the first next snackbar to be available.
        this.unwait = this.$wait(
          function() {
            // Snackbars are enqueued from oldest to newest and "find" searches array elements in
            // same order as well, so the first one which matches is also the oldest one.
            return globalState.queue.find(element => element.shown === false);
          },
          function(snackbar) {
            this.unwait = null;

            snackbar.shown = true;

            this.snackbar = snackbar;
            this.isShown = true;

            this.handle = setTimeout(() => {
              this.handle = null;

              this.showNextSnackbar();
            }, this.timeout + this.pause);
          }
        );
      },

      onSnackbarClose() {
        this.clearSnackbarState();

        this.isShown = false;

        setTimeout(() => {
          this.showNextSnackbar();
        }, this.pause);
      }
    },

    render: function(createElement) {
      return createElement(
        VSnackbar,
        {
          props: {
            value: this.isShown,
            top: true,
            timeout: this.timeout,
            color: this.snackbar && this.snackbar.color
          },
          on: {
            input: value => {
              this.isShown = value;
            }
          }
        },
        [
          (this.$scopedSlots.default &&
            this.$scopedSlots.default({
              snackbar: this.snackbar
            })) ||
            (this.snackbar && this.snackbar.message),
          createElement(
            VBtn,
            {
              props: {
                icon: true,
                color: "white"
              },
              on: {
                click: this.onSnackbarClose
              }
            },
            (this.$scopedSlots.close &&
              this.$scopedSlots.close({
                snackbar: this.snackbar
              })) ||
              "Close"
          )
        ]
      );
    }
  };

  Vue.component("VSnackbarQueue", VSnackbarQueue);

  Vue.prototype.$snackbar = function $snackbar(message, color = "info") {
    // message: text of the snackbar
    // color: color of the snackbar close action ("success", "info", "error")
    // id: id of this snackbar
    // enqueuedAt: timestamp when snackbar was enqueued
    // shown: true if already shown
    globalState.queue.push({
      message,
      color,
      id: ++lastSnackbarId,
      enqueuedAt: new Date(),
      shown: false
    });
  };
}
