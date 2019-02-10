<template>
  <img
    :class="['item', { editable }, { unlocked }]"
    :src="getSrc()"
    :alt="title"
    :title="title"
    v-on="editable ? { click } : {}"
  />
</template>

<script>
export default {
  props: {
    item: Object,
    cumulative: Boolean,
    editable: Boolean
  },
  data() {
    return {
      id: this.item.id,
      title: this.item.title,
      src: this.item.src
    };
  },
  methods: {
    click() {
      if (!this.unlocked) {
        this.$emit("add", this.item);
      } else {
        this.$emit("remove", this.item);
      }
    },
    getSrc() {
      return require(`@/assets/img/${this.src}`);
    }
  },
  computed: {
    unlocked: function() {
      return this.item.unlocked;
    }
  },
  mounted: function() {
    if (this.editable) {
      this.item.unlocked = this.$store.getters.isUnlocked(this.id);
    } else {
      this.item.unlocked = this.$store.getters.isInTempData(this.id);
    }
  }
};
</script>

<style scoped>
.item {
  opacity: 0.5;
}
.editable {
  cursor: pointer;
}
.unlocked {
  opacity: 1;
}
@supports not (grid-auto-flow: row) {
  .item {
    margin: 0.5rem;
  }
}
</style>
