import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import FormSubmissionMessage from '~/components/FormSubmissionMessage.vue'

export const submitMessagesMixin = {
  components: { FormSubmissionMessage },
  computed: {
    ...mapGetters({
      showMessage: 'formSubmissionMessage/getShowMessage',
      messageType: 'formSubmissionMessage/getMessageType',
      message: 'formSubmissionMessage/getMessage',
    }),
  },
  methods: {
    ...mapActions({
      setShowMessage: 'formSubmissionMessage/setShowMessage',
      setMessageType: 'formSubmissionMessage/setMessageType',
      setMessage: 'formSubmissionMessage/setMessage',
    }),
    hideMessage() {
      setTimeout(() => {
        this.setShowMessage(false)
      }, 6000)
    },
    showSubmitMessage(message, type) {
      this.setShowMessage(true)
      this.setMessageType(type)
      this.setMessage(message)
      this.hideMessage()
    },
  },
}
