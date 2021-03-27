<script>
export default {
  render() {
    return null;
  },
  name: "Logout",
  created() {
    this.$auth
      .logout({
        redirect: "/organizations",
      })
      .then(() => {
        this.$snackbar("Вы успешно вышли из системы");
      });
  },
};
</script>
