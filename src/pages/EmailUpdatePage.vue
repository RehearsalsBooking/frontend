<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col cols="12" sm="4">
        <v-card>
          <v-row>
            <v-col cols="12" class="text-center">
              <h2>Обновление почты</h2>
            </v-col>
          </v-row>
          <v-card-text v-if="isEmailChanged">
            <h3>Почта успешно изменена!</h3>
            <v-btn
              color="primary"
              type="submit"
              rounded
              block
              class="mt-2"
              :to="{ name: 'main' }"
            >
              На главную
            </v-btn>
          </v-card-text>
          <v-card-text v-else>
            <EmailUpdate @success="onSuccess" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EmailUpdate from "@/pages/EmailUpdate";

export default {
  name: "EmailUpdatePage",
  components: { EmailUpdate },
  data() {
    return {
      isEmailChanged: false,
    };
  },
  methods: {
    onSuccess() {
      this.isEmailChanged = true;
    },
  },
};
</script>
