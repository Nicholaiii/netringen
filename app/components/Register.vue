<template>
  <form @submit.prevent="onSubmit" v-if="!success">
    <div>
      <h5>Register</h5>
      <label for="url">URL</label>
      <span>
        <input id="url" v-model="url" :class="{ error: errors.url }" />
        <button type="submit" :disabled="loading" @click="onSubmit">
          Submit
        </button>
      </span>
      <small v-if="errors.url">{{ errors.url }}</small>
    </div>
  </form>

  <div v-else class="success">
    <h5>Success</h5>
    <p>Your URL has been submitted successfully!</p>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

const success = ref(false);
const loading = ref(false);

const { defineField, errors, handleSubmit } = useForm({
  initialValues: {
    url: "",
  },
  validationSchema: toTypedSchema(
    z.object({
      url: z.string().url("Invalid URL format").nonempty("URL is required"),
    })
  ),
});

const [url] = defineField("url");

const onSubmit = handleSubmit((values) => {
  console.log("submit", values);
  loading.value = true;

  setTimeout(() => {
    success.value = true;
    loading.value = false;
  }, 1000);
});
</script>

<style scoped lang="scss">
form {
  display: flex;
  gap: 10px;
  h5 {
    margin: 0 0 10px 0;
  }

  label,
  input,
  small {
    display: block;
  }

  span {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  input {
    border: 2px dashed var(--green);
    padding: 5px;

    &.error {
      border-color: var(--red);
    }
  }

  button {
    margin: 0;
    padding: 5px 10px;
  }
}

.success {
  p {
    color: var(--green);
  }
}
</style>
