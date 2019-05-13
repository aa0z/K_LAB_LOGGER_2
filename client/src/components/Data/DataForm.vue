<template>
  <b-form @submit="onSubmit">
    <b-form-group id="input-group-1">
      <b-form-input
        class="mt-2"
        id="title"
        type="text"
        placeholder="Title"
        v-model="$store.state.data.title"
        @update="changeTitle"
      ></b-form-input>
      <b-form-textarea
        class="mt-2"
        id="text"
        placeholder="Text"
        rows="3"
        max-rows="6"
        v-model="$store.state.data.text"
        @update="changeText"
      ></b-form-textarea>
    </b-form-group>
    <div class="text-center">
      <b-button type="submit" variant="primary">Add</b-button>
    </div>
  </b-form>
</template>

<script>
export default {
  name: "DataForm",
  methods: {
    changeTitle() {
      this.$store.dispatch("updateTitle", this.$store.state.data.title);
    },
    changeText() {
      this.$store.dispatch("updateText", this.$store.state.data.text);
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.dispatch("addData");
    }
  }
};
</script>
