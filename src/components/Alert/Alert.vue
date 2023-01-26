<template>
  <div></div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
  name: 'Alert',
  computed: {
    ...mapGetters({
      error: 'alert/getError',
      success: 'alert/getSuccess',
    }),
  },
  watch: {
    error() {
      this.addErrorNotification(this.error);
      this.onResetError();
    },
    success() {
      this.addSuccessNotification(this.success);
      this.onResetSuccess();
    }
  },
  methods: {
    ...mapActions({
      onResetError: 'alert/onResetError',
      onResetSuccess: 'alert/onResetSuccess',
    }),
    addSuccessNotification(message) {
      this.$toasted.success(message, {
        action: {
          text: 'X',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        }
      })
    },
    addInfoNotification() {
      this.$toasted.info('Launching thermonuclear war...', {
        action: {
          text: 'Cancel launch',
          onClick: (e, toastObject) => {
            toastObject.text('Thermonuclear war averted').goAway(1000);
          }
        }
      });
    },
    addErrorNotification(error) {
      this.$toasted.error(error, {
        action: [
          {
            text: 'X',
            onClick: (e, toastObject) => {
              toastObject.el.classList.remove('info');
              toastObject.el.classList.add('success');
              toastObject.text('Cancelled').goAway(500);
            }
          }
        ]
      });
    },
    toggleLocation(position = 'top-right') {
      this.$toasted.options.position = position;
      this.$toasted.show(null);
    },
  },
  created() {
    // this.$toasted.show('Thanks for checking out Messenger!');
  },
};
</script>