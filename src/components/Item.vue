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
    if (this.editable) {
      this.$set(this.item, "unlocked", this.$store.getters.isUnlocked(this.id));
    } else {
      this.$set(
        this.item,
        "unlocked",
        this.$store.getters.isInTempData(this.id)
      );
    }
  }
};
</script>

<style scoped>
.item {
  opacity: 0.4;
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
