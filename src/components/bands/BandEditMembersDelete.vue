<template>
  <BandMemberDelete :member="member" :band="band" v-on="$listeners">
    <template #title>
      Вы действительно хотите удалить участника из группы?
    </template>
    <template #text>
      Удаленный участник будет удален из всех будущих репетиций группы
    </template>
    <template #icon>
      <v-icon color="error"> mdi-delete </v-icon>
    </template>
  </BandMemberDelete>
</template>

<script>
import BandMemberDelete from "@/components/bands/BandMemberDelete";

export default {
  name: "BandEditMembersDelete",
  components: { BandMemberDelete },
  props: {
    member: Object,
    band: Object,
  },
};
</script>
