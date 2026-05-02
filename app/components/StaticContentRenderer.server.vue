<script lang="ts">
import { h } from 'vue'
import { ContentRenderer } from '#components'
import { queryCollection } from '#imports';

export default defineComponent({
  props: {
    path: String,
  },
  async setup(props) {
    const path = props.path || "";
    if (process.dev) {
      const { data } = await useAsyncData(() =>
        queryCollection('posts').path(path).first()
      )
      return () => h(ContentRenderer, { value: data.value! })
    }
    const value = await queryCollection('posts').path(path).first()
    return () => h(ContentRenderer, { value })
  },
});
</script>