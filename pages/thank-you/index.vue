<template>
  <div class="d-flex justify-center my-32">
    <div
      class="block rounded-lg bg-sand p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
    >
      <h5
        class="text-center mb-2 text-xl font-medium leading-tight text-white dark:text-neutral-50"
      >
        {{ t("thankYou.title") }}
      </h5>
      <p class="mb-4 text-center text-base text-white dark:text-neutral-200">
        {{ t("thankYou.text") }}
      </p>
      <div class="flex justify-center confetti">
        <button
          ref="confetti"
          @click="generateParticles"
          class="relative no-underline font-medium rounded text-center text-black bg-secondary px-6 pb-2 pt-2.5 text-sm uppercase leading-normal transition duration-150 ease-in-out hover:bg-accent focus:bg-accent focus:outline-none focus:ring-0 active:bg-accent"
        >
          {{ t("thankYou.link") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

if (process.client) {
}
const confetti = ref();
function random(max) {
  return Math.random() * (max - 0) + 0;
}
function generateParticles() {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < 100; i++) {
    let styles = `transform: translate3d(${random(500) - 250}px, ${
      random(200) - 150
    }px, 0) rotate(${random(360)}deg);
                  background: hsla(${random(360)}, 100%, 50%, 1);
                  animation: bang 1000ms ease-out forwards;
                  opacity: 0;`;

    let element = document.createElement("i");
    element.style.cssText = styles.toString();
    fragment.appendChild(element);
  }
  confetti.value.appendChild(fragment);
}
</script>
<style>
@keyframes bang {
  from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.confetti i {
  position: absolute;
  display: block;
  left: 50%;
  top: 0;
  width: 3px;
  height: 8px;
  background: red;
  opacity: 0;
  animation: bang 700ms ease-out forwards;
}
</style>
