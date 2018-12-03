<template>
  <sample-item />
</template>

<script>
export default {
  components: {
    SampleItem: () => import('@/components/SampleItem.vue'),
  },
};
</script>
