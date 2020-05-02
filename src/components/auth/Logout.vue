<script>
export default {
  render() {
    return null;
  },
  name: "Logout",
  created() {
    this.$auth
      .logout({
        redirect: "/organizations"
      })
      .then(() => {
        window.getApp.$emit("success", "Вы успешно вышли из системы");
      });
  }
};
</script>
