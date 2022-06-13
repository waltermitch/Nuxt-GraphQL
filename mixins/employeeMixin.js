import { mapGetters } from 'vuex'
import { EMPLOYEE } from '~/constants/employee'

export const employeeMixin = {
  computed: {
    ...mapGetters({
      getAddEmployee: 'employee/getAddEmployee',
      getEditEmployee: 'employee/getEditEmployee',
      getEmployee: 'employee/getEmployee',
    }),
  },
  methods: {
    clearAction() {
      this.$store.commit('employee/SET_EMPLOYEE', EMPLOYEE)
      this.$store.commit('employee/SET_ADD_EMPLOYEE', false)
      this.$store.commit('employee/SET_EDIT_EMPLOYEE', false)
    },
  },
}
