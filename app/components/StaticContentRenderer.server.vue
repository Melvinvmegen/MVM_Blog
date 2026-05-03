<script lang="ts">
import { h } from "vue";
import { ContentRenderer } from "#components";
import { queryCollection } from "#imports";

export default defineComponent({
  props: {
    path: String,
  },
  async setup(props) {
    const path = props.path || "";
    const collection = path.includes("/snippets/") ? "snippets" : "posts";
    if (import.meta.dev) {
      const { data } = await useAsyncData(() => queryCollection(collection).path(path).first());
      return () => h(ContentRenderer, { value: data.value! });
    }
    const value = await queryCollection(collection).path(path).first();
    if (!value) return () => null;
    return () => h(ContentRenderer, { value });
  },
});
</script>
