<template>
  <div></div>
</template>

<script>
import RolePrivileges from "~/graphql/queries/RolePrivileges.gql";

export default {
  name: 'AdminIndexPage',
  middleware: 'redirectToSpecificPage',
  apollo: {
    RolePrivileges: {
      query: RolePrivileges,
    },
  },
  data () {
    return {
      closeWeekPageShow: false,
    }
  },
  mounted () {
    this.closeWeekPageShow = !!this.RolePrivileges.filter(privilege => {
      return (privilege.slugName === 'close-week') && (privilege.permissionType === 'VIEW')
    }).length

    console.log(this.closeWeekPageShow)
  },
  meta: {redirectTo: '/admin/close-week',}/* this.closeWeekPageShow ? {
    redirectTo: '/admin/close-week',
  } : {
    redirectTo: '/admin/fixed-expenses',
  } */,
}
</script>

<style lang="scss" scoped></style>
