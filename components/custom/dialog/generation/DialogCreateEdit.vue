<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useForm} from "vee-validate";
import {toast} from "vue-sonner";
import DatePicker from "~/components/custom/DatePicker.vue";
import {type DateValue, parseDate, today, getLocalTimeZone} from "@internationalized/date";

const {$generationStore, $bus} = useNuxtApp();

interface DialogEditGenerationProps {
  data?: any,
  edit?: boolean,
}

const props = defineProps<DialogEditGenerationProps>();

const startDate = ref<DateValue>(today(getLocalTimeZone()));
const endDate = ref<DateValue>(today(getLocalTimeZone()).add({years: 1}));
const isLoading = ref<boolean>(false);
const initialValues = ref<any>({
  name: '',
  startDate: startDate.value.toString(),
  endDate: endDate.value.toString(),
});

if (props.edit) {
}

const formSchema = toTypedSchema(z.object({
  name: z.string().min(3).max(50),
  startDate: z.string(),
  endDate: z.string(),
}));

const {setFieldValue, handleSubmit} = useForm({
  validationSchema: formSchema,
  initialValues: initialValues.value,
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const handleStartDateChange = (date: DateValue) => {
  startDate.value = date;
  setFieldValue('startDate', date.toString());
};

const handleEndDateChange = (date: DateValue) => {
  endDate.value = date;
  setFieldValue('endDate', date.toString());
};

const handleClose = () => {
  $bus.emit('close-dialog-create-edit-generation', false);
};
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <DialogHeader>
      <DialogTitle v-if="props.edit">Edit Role</DialogTitle>
      <DialogTitle v-else>Create new Role</DialogTitle>

      <DialogDescription v-if="props.edit">
        Edit role <strong>{{ props.data.name }}</strong> with specific permissions here.
      </DialogDescription>
      <DialogDescription v-else>
        Create a new role with specific permissions.
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Name..." v-bind="componentField" :disabled="isLoading"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>

      <DatePicker
          name="startDate"
          label="Start date"
          date-format="vi"
          :model-value="startDate"
          :disabled="isLoading"
          @update:modelValue="handleStartDateChange"
      />

      <DatePicker
          name="endDate"
          label="End date"
          date-format="vi"
          :model-value="endDate"
          :disabled="isLoading"
          @update:modelValue="handleEndDateChange"
      />
    </div>

    <DialogFooter>
      <Button type="button" variant="outline" @click="handleClose" :disabled="isLoading">
        Cancel
      </Button>
      <Button type="submit" :disabled="isLoading">
        Save changes
      </Button>
    </DialogFooter>
  </form>
</template>
