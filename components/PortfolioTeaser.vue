<template>
  <div class="d-flex justify-center mb-2">
    <v-card width="100%">
      <v-card-item>
        <v-card-title>
          <h3 class="text-center">{{ t("portfolio.title") }}</h3>
        </v-card-title>
      </v-card-item>
      <v-card-text class="text-center">
        {{ t("portfolio.text") }}
        <br />
        <br />
        {{ t("portfolio.subtext") }}
        <NuxtLink
          to="https://www.melvinvmegen.com/"
          class="font-weight-bold text-white"
          >{{ t("portfolio.link") }}</NuxtLink
        >
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>