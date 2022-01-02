<template>
  <v-fade-transition mode="out-in">
    <v-container fluid v-if="isFetching" key="fetching">
      <v-row>
        <v-progress-circular indeterminate color="primary" class="mx-auto" />
      </v-row>
    </v-container>
    <v-container fluid v-else key="fetched">
      <v-row>
        <v-col cols="12">
          <v-card class="px-6 py-12">
            <v-card-text>
              <v-row>
                <v-col cols="2" class="mr-3">
                  <v-avatar size="200">
                    <ImageWithPlaceholder :src="user.avatar.original" />
                  </v-avatar>
                </v-col>
                <v-col class="float-left">
                  <h2 class="mb-3">
                    {{ user.name }}
                    <v-btn
                      v-if="loggedUser.id === id"
                      class="ml-6"
                      small
                      dark
                      color="primary"
                      fab
                      :to="{ name: 'profile/edit' }"
                    >
                      <v-icon dark> mdi-pencil </v-icon>
                    </v-btn>
                  </h2>
                  <UserStats :user-id="user.id" />
                </v-col>
              </v-row>
              <v-row class="mt-6">
                <v-tabs
                  background-color="transparent"
                  color="basil"
                  v-model="tab"
                >
                  <v-tab>Группы</v-tab>
                </v-tabs>
              </v-row>
              <v-row class="mt-8">
                <v-col cols="12">
                  <v-tabs-items v-model="tab">
                    <v-tab-item>
                      <UserBands :user-id="user.id" />
                    </v-tab-item>
                  </v-tabs-items>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-fade-transition>
</template>

<script>
import UserStats from "@/components/user/UserStats";
import UserBands from "@/components/user/UserBands";
import ImageWithPlaceholder from "@/pages/ImageWithPlaceholder";
import { mapGetters } from "vuex";

export default {
  name: "UserPage",
  components: { ImageWithPlaceholder, UserStats, UserBands },
  props: {
    id: [String, Number],
  },
  data() {
    return {
      isFetching: true,
      user: {},
      tab: 0,
    };
  },
  computed: {
    ...mapGetters({
      loggedUser: "auth/getUser",
    }),
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.isFetching = true;
      this.$http
        .get(`/users/${this.id}`)
        .then((res) => {
          this.user = res.data.data;
          document.title = `Пользователь | ${this.user.name}`;
        })
        .finally(() => (this.isFetching = false));
    },
  },
};
</script>
