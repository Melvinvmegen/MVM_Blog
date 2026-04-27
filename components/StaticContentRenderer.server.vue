<script lang="ts">
import { h } from 'vue'
import { ContentRenderer } from '#components'
import { queryCollection } from '@nuxt/content/server';

export default defineComponent({
  props: {
    path: String,
  },
  async setup(props) {
    if (process.dev) {
      const { data } = await useAsyncData(() =>
        queryCollection(props.path!).findOne()
      )
      return () => h(ContentRenderer, { value: data.value! })
    }
    const value = await queryCollection(props.path!).findOne()
    return () => h(ContentRenderer, { value })
  },
});
</script>