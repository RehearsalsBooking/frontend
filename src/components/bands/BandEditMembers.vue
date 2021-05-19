<template>
  <v-fade-transition group mode="out-in">
    <v-container fluid v-if="isFetching" key="fetching">
      <v-row>
        <v-progress-circular indeterminate color="primary" class="mx-auto" />
      </v-row>
    </v-container>
    <v-container fluid v-else key="fetched">
      <BandMembers :members="members" :band="band">
        <template #actions="{ member, band }">
          <v-list-item-action>
            <BandEditMembersEditRole
              :band="band"
              :member="member"
              @memberRoleEdited="member.role = $event"
            />
          </v-list-item-action>
          <v-list-item-action v-if="member.id !== $auth.user().id">
            <BandEditMembersDelete
              :band="band"
              :member="member"
              @memberDeleted="
                members = members.filter((m) => m.id !== $event.id)
              "
            />
          </v-list-item-action>
        </template>
      </BandMembers>
    </v-container>
  </v-fade-transition>
</template>

<script>
import BandEditMembersDelete from "@/components/bands/BandEditMembersDelete";
import BandEditMembersEditRole from "@/components/bands/BandEditMembersEditRole";
import BandMembers from "@/components/bands/BandMembers";

export default {
  name: "BandEditMainInfo",
  props: { id: [String, Number] },
  components: {
    BandMembers,
    BandEditMembersDelete,
    BandEditMembersEditRole,
  },
  data() {
    return {
      members: [],
      band: {},
      isFetching: true,
    };
  },
  mounted() {
    this.getBand();
  },
  methods: {
    getBand() {
      this.isFetching = true;
      this.$http
        .get(`/bands/${this.id}`)
        .then((res) => {
          this.band = res.data.data;
          this.band.genres = this.band.genres.map((genre) => genre.id);
          this.members = this.band.members;
          document.title = `${this.band.name} | Состав группы`;
        })
        .finally(() => (this.isFetching = false));
    },
  },
};
</script>
