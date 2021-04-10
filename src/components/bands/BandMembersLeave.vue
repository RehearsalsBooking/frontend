<template>
  <BandMemberDelete
    :member="member"
    :band="band"
    v-on="$listeners"
    snackbar="Вы успешно покинули группу"
  >
    <template #title> Вы действительно хотите покинуть группу? </template>
    <template #text>
      Вы будете удалены из всех будущих репетиций группы
    </template>
    <template #icon>
      <v-icon color="error" class="lighten-2"> mdi-logout </v-icon>
    </template>
  </BandMemberDelete>
</template>

<script>
import BandMemberDelete from "@/components/bands/BandMemberDelete";

export default {
  name: "BandMembersLeave",
  components: { BandMemberDelete },
  props: {
    member: Object,
    band: Object,
  },
};
</script>
