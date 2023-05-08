<template>
  <div class="d-flex justify-center mb-2">
    <div
      class="block rounded-lg bg-sand p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
    >
      <h5
        class="text-center mb-2 text-xl font-medium leading-tight text-white dark:text-neutral-50"
      >
        {{ t("portfolio.title") }}
      </h5>
      <p class="mb-4 text-center text-base text-white dark:text-neutral-200">
        {{ t("portfolio.text") }}
      </p>
      <p class="mb-4 text-center text-base text-white dark:text-neutral-200">
        {{ t("portfolio.subtext") }}
      </p>

      <div class="flex justify-center">
        <form action="https://www.finance.melvinvmegen.com/api/checkout" method="POST">
          <button
            class="no-underline font-medium rounded text-center text-black bg-secondary px-6 pb-2 pt-2.5 text-sm uppercase leading-normal transition duration-150 ease-in-out hover:bg-accent focus:bg-accent focus:outline-none focus:ring-0 active:bg-accent"
          >
            {{ t("portfolio.buyMeACoffe") }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
