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
      title: this.item.title
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
    },
    src: function() {
      return this.item.title.includes("Page")
        ? this.item.title
            .toLowerCase()
            .slice(0, -2)
            .replace(/ /g, "_") + ".png"
        : this.item.title.toLowerCase().replace(/ /g, "_") + ".png";
    }
  },
  mounted: function() {
    this.$set(
      this.item,
      "unlocked",
      this.$store.getters.isUnlocked({ editable: this.editable, item: this.id })
    );
  }
};
</script>

<style scoped>
.editable {
  cursor: pointer;
}
@supports not (grid-auto-flow: row) {
  .item {
    margin: 0.5rem;
  }
}
</style>
