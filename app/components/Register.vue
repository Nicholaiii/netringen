<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import z from 'zod'

const success = ref(false)
const loading = ref(false)

const { defineField, errors, handleSubmit } = useForm({
  initialValues: {
    url: '',
  },
  validationSchema: toTypedSchema(
    z.object({
      url: z.url('errors.invalid_url').nonempty('errors.missing_url'),
    }),
  ),
})

const [url] = defineField('url')

const onSubmit = handleSubmit(async (values) => {
  loading.value = true

  const { error } = await useFetch('/api/sites', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (error.value) {
    errors.value.url = 'Failed to submit URL. Please try again.'
    loading.value = false
    return
  }

  success.value = true
  loading.value = false
})
</script>

<template>
  <form v-if="!success" @submit.prevent="onSubmit">
    <div>
      <h5>Register</h5>
      <label for="url">URL</label>
      <span>
        <input id="url" v-model="url" :class="{ error: errors.url }" />
        <button type="submit" :disabled="loading" @click="onSubmit">
          Submit
        </button>
      </span>
      <small v-if="errors.url">{{ $t(errors.url) }}</small>
    </div>
  </form>

  <div v-else class="success">
    <h5>Success</h5>
    <p>Your URL has been submitted successfully!</p>
  </div>
</template>

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
