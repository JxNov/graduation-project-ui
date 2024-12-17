<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const { $gradeStore } = useNuxtApp()
const route = useRoute()

const props = defineProps<{
  data: any
}>()

const emits = defineEmits<{
  (e: 'update:score', data: any): void
  (e: 'close', value: boolean): void
}>()

const checkLength = (value: any) => {
  if (value.length === 0) {
    return [0, 0, 0]
  } else if (value.length === 1) {
    return [value[0], 0, 0]
  } else if (value.length === 2) {
    return [value[0], value[1], 0]
  }

  return value
}

const mouthPoints = computed(() => {
  let val = []
  if (props.data.mouthPoints) {
    val = props.data.mouthPoints
  }

  val = checkLength(val)

  return val
})

const fifteenMinutesPoints = computed(() => {
  let val = []
  if (props.data.fifteenMinutesPoints) {
    val = props.data.fifteenMinutesPoints
  }

  val = checkLength(val)

  return val
})

const onePeriodPoints = computed(() => {
  let val = []
  if (props.data.onePeriodPoints) {
    val = props.data.onePeriodPoints
  }

  val = checkLength(val)

  return val
})

const isLoading = ref<boolean>(false)
const initialValues = ref({
  mouthPoints: mouthPoints.value,
  fifteenMinutesPoints: fifteenMinutesPoints.value,
  onePeriodPoints: onePeriodPoints.value,
  midSemesterPoints: props.data.midSemesterPoints || [0],
  endSemesterPoints: props.data.endSemesterPoints || [0]
})

const formSchema = toTypedSchema(z.object({
  mouthPoints: z.array(z.number().min(0).max(10)),
  coefficientMouthPoints: z.number().min(0).max(10).default(1),

  fifteenMinutesPoints: z.array(z.number().min(0).max(10)),
  coefficientFifteenMinutesPoints: z.number().min(0).max(10).default(1),

  onePeriodPoints: z.array(z.number().min(0).max(10)),
  coefficientOnePeriodPoints: z.number().min(0).max(10).default(1.5),

  midSemesterPoints: z.array(z.number().min(0).max(10)),
  coefficientMidSemesterPoints: z.number().min(0).max(10).default(2),

  endSemesterPoints: z.array(z.number().min(0).max(10)),
  coefficientEndSemesterPoints: z.number().min(0).max(10).default(3)
}))

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    coefficientMouthPoints: 1,
    coefficientFifteenMinutesPoints: 1,
    coefficientOnePeriodPoints: 1.5,
    coefficientMidSemesterPoints: 2,
    coefficientEndSemesterPoints: 3,

    ...initialValues.value
  }
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  const data = {
    studentUsername: props.data.username,
    subjectSlug: props.data.subject,
    classSlug: route.params.slug as string,
    semesterSlug: props.data.semester,
    detailedScores: {
      mouthPoints: {
        coefficient: values.coefficientMouthPoints,
        scores: values.mouthPoints
      },
      fifteenMinutesPoints: {
        coefficient: values.coefficientFifteenMinutesPoints,
        scores: values.fifteenMinutesPoints
      },
      onePeriodPoints: {
        coefficient: values.coefficientOnePeriodPoints,
        scores: values.onePeriodPoints
      },
      midSemesterPoints: {
        coefficient: values.coefficientMidSemesterPoints,
        scores: values.midSemesterPoints
      },
      endSemesterPoints: {
        coefficient: values.coefficientEndSemesterPoints,
        scores: values.endSemesterPoints
      }
    }
  }

  try {
    const response = await $gradeStore.createGrade(data)

    if (!response) {
      throw new Error('Failed to create grade')
    }

    isLoading.value = false
    emits('update:score', response)
    emits('close', false)
  } catch (error) {
    isLoading.value = false
    throw error
  }
})
</script>

<template>
  <form @submit="onSubmit" class="pt-8">
    <div class="bg-card p-4 rounded-md shadow">
      <div class="rounded-md border">
        <table class="w-full">
          <TableBody>
            <TableRow class="border-none hover:bg-transparent">
              <TableHead class="border-r w-14" rowspan="1">
                Mouth Points
              </TableHead>

              <TableHead class="border-r w-14" rowspan="1">
                Fifteen Minutes Points
              </TableHead>

              <TableHead class="border-r w-14" rowspan="1">
                One Period Points
              </TableHead>

              <TableHead class="border-r w-14" rowspan="1">
                Mid Semester Points
              </TableHead>

              <TableHead class="w-14" rowspan="1">
                End Semester Points
              </TableHead>
            </TableRow>

            <TableRow class="hover:bg-transparent">
              <!--              <TableHead class="border-r" rowspan="1">-->
              <!--                <FormField v-slot="{ value }" name="coefficientMouthPoints">-->
              <!--                  <FormItem>-->
              <!--                    <NumberField-->
              <!--                      class="flex justify-between items-center gap-4 w-full"-->
              <!--                      :min="0"-->
              <!--                      :max="10"-->
              <!--                      :step="0.01"-->
              <!--                      :model-value="value"-->
              <!--                      @update:model-value="(v) => {-->
              <!--                        if (v) {-->
              <!--                          setFieldValue('coefficientMouthPoints', v)-->
              <!--                        }-->
              <!--                        else {-->
              <!--                          setFieldValue('coefficientMouthPoints', 1)-->
              <!--                        }-->
              <!--                      }"-->
              <!--                    >-->
              <!--                      <Label for="coefficientMouthPoints">-->
              <!--                        Coefficient-->
              <!--                      </Label>-->

              <!--                      <NumberFieldContent class="w-32">-->
              <!--                        <NumberFieldDecrement />-->
              <!--                        <FormControl>-->
              <!--                          <NumberFieldInput id="coefficientMouthPoints" />-->
              <!--                        </FormControl>-->
              <!--                        <NumberFieldIncrement />-->
              <!--                      </NumberFieldContent>-->
              <!--                    </NumberField>-->
              <!--                  </FormItem>-->
              <!--                </FormField>-->
              <!--              </TableHead>-->

              <!--              <TableHead class="border-r" rowspan="1">-->
              <!--                <FormField v-slot="{ value }" name="coefficientFifteenMinutesPoints">-->
              <!--                  <FormItem>-->
              <!--                    <NumberField-->
              <!--                      class="flex justify-between items-center gap-4 w-full"-->
              <!--                      :min="0"-->
              <!--                      :max="10"-->
              <!--                      :step="0.01"-->
              <!--                      :model-value="value"-->
              <!--                      @update:model-value="(v) => {-->
              <!--                        if (v) {-->
              <!--                          setFieldValue('coefficientFifteenMinutesPoints', v)-->
              <!--                        }-->
              <!--                        else {-->
              <!--                          setFieldValue('coefficientFifteenMinutesPoints', 1)-->
              <!--                        }-->
              <!--                      }"-->
              <!--                    >-->
              <!--                      <Label for="coefficientFifteenMinutesPoints">-->
              <!--                        Coefficient-->
              <!--                      </Label>-->

              <!--                      <NumberFieldContent class="w-32">-->
              <!--                        <NumberFieldDecrement />-->
              <!--                        <FormControl>-->
              <!--                          <NumberFieldInput id="coefficientFifteenMinutesPoints" />-->
              <!--                        </FormControl>-->
              <!--                        <NumberFieldIncrement />-->
              <!--                      </NumberFieldContent>-->
              <!--                    </NumberField>-->
              <!--                  </FormItem>-->
              <!--                </FormField>-->
              <!--              </TableHead>-->

              <!--              <TableHead class="border-r" rowspan="1">-->
              <!--                <FormField v-slot="{ value }" name="coefficientOnePeriodPoints">-->
              <!--                  <FormItem>-->
              <!--                    <NumberField-->
              <!--                      class="flex justify-between items-center gap-4 w-full"-->
              <!--                      :min="0"-->
              <!--                      :max="10"-->
              <!--                      :step="0.01"-->
              <!--                      :model-value="value"-->
              <!--                      @update:model-value="(v) => {-->
              <!--                        if (v) {-->
              <!--                          setFieldValue('coefficientOnePeriodPoints', v)-->
              <!--                        }-->
              <!--                        else {-->
              <!--                          setFieldValue('coefficientOnePeriodPoints', 1.5)-->
              <!--                        }-->
              <!--                      }"-->
              <!--                    >-->
              <!--                      <Label for="coefficientOnePeriodPoints">-->
              <!--                        Coefficient-->
              <!--                      </Label>-->

              <!--                      <NumberFieldContent class="w-32">-->
              <!--                        <NumberFieldDecrement />-->
              <!--                        <FormControl>-->
              <!--                          <NumberFieldInput id="coefficientOnePeriodPoints" />-->
              <!--                        </FormControl>-->
              <!--                        <NumberFieldIncrement />-->
              <!--                      </NumberFieldContent>-->
              <!--                    </NumberField>-->
              <!--                  </FormItem>-->
              <!--                </FormField>-->
              <!--              </TableHead>-->

              <!--              <TableHead class="border-r" rowspan="1">-->
              <!--                <FormField v-slot="{ value }" name="coefficientMidSemesterPoints">-->
              <!--                  <FormItem>-->
              <!--                    <NumberField-->
              <!--                      class="flex justify-between items-center gap-4 w-full"-->
              <!--                      :min="0"-->
              <!--                      :max="10"-->
              <!--                      :step="0.01"-->
              <!--                      :model-value="value"-->
              <!--                      @update:model-value="(v) => {-->
              <!--                        if (v) {-->
              <!--                          setFieldValue('coefficientMidSemesterPoints', v)-->
              <!--                        }-->
              <!--                        else {-->
              <!--                          setFieldValue('coefficientMidSemesterPoints', 2)-->
              <!--                        }-->
              <!--                      }"-->
              <!--                    >-->
              <!--                      <Label for="coefficientMidSemesterPoints">-->
              <!--                        Coefficient-->
              <!--                      </Label>-->

              <!--                      <NumberFieldContent class="w-32">-->
              <!--                        <NumberFieldDecrement />-->
              <!--                        <FormControl>-->
              <!--                          <NumberFieldInput id="coefficientMidSemesterPoints" />-->
              <!--                        </FormControl>-->
              <!--                        <NumberFieldIncrement />-->
              <!--                      </NumberFieldContent>-->
              <!--                    </NumberField>-->
              <!--                  </FormItem>-->
              <!--                </FormField>-->
              <!--              </TableHead>-->

              <!--              <TableHead rowspan="1">-->
              <!--                <FormField v-slot="{ value }" name="coefficientEndSemesterPoints">-->
              <!--                  <FormItem>-->
              <!--                    <NumberField-->
              <!--                      class="flex justify-between items-center gap-4 w-full"-->
              <!--                      :min="0"-->
              <!--                      :max="10"-->
              <!--                      :step="0.01"-->
              <!--                      :model-value="value"-->
              <!--                      @update:model-value="(v) => {-->
              <!--                        if (v) {-->
              <!--                          setFieldValue('coefficientEndSemesterPoints', v)-->
              <!--                        }-->
              <!--                        else {-->
              <!--                          setFieldValue('coefficientEndSemesterPoints', 3)-->
              <!--                        }-->
              <!--                      }"-->
              <!--                    >-->
              <!--                      <Label for="coefficientEndSemesterPoints">-->
              <!--                        Coefficient-->
              <!--                      </Label>-->

              <!--                      <NumberFieldContent class="w-32">-->
              <!--                        <NumberFieldDecrement />-->
              <!--                        <FormControl>-->
              <!--                          <NumberFieldInput id="coefficientEndSemesterPoints" />-->
              <!--                        </FormControl>-->
              <!--                        <NumberFieldIncrement />-->
              <!--                      </NumberFieldContent>-->
              <!--                    </NumberField>-->
              <!--                  </FormItem>-->
              <!--                </FormField>-->
              <!--              </TableHead>-->

              <TableHead class="border-r" rowspan="1">
                <div class="flex justify-between items-center">
                  <p class="text-sm text-primary">Coefficient</p>
                  <p class="text-sm text-primary">{{ values.coefficientMouthPoints }}</p>
                </div>
              </TableHead>

              <TableHead class="border-r" rowspan="1">
                <div class="flex justify-between items-center">
                  <p class="text-sm text-primary">Coefficient</p>
                  <p class="text-sm text-primary">{{ values.coefficientFifteenMinutesPoints }}</p>
                </div>
              </TableHead>

              <TableHead class="border-r" rowspan="1">
                <div class="flex justify-between items-center">
                  <p class="text-sm text-primary">Coefficient</p>
                  <p class="text-sm text-primary">{{ values.coefficientOnePeriodPoints }}</p>
                </div>
              </TableHead>

              <TableHead class="border-r" rowspan="1">
                <div class="flex justify-between items-center">
                  <p class="text-sm text-primary">Coefficient</p>
                  <p class="text-sm text-primary">{{ values.coefficientMidSemesterPoints }}</p>
                </div>
              </TableHead>

              <TableHead rowspan="1">
                <div class="flex justify-between items-center">
                  <p class="text-sm text-primary">Coefficient</p>
                  <p class="text-sm text-primary">{{ values.coefficientEndSemesterPoints }}</p>
                </div>
              </TableHead>
            </TableRow>

            <TableRow class="hover:bg-transparent">
              <TableCell class="border-r">
                <div class="flex gap-2">
                  <FormField v-slot="{ value }" name="mouthPoints">
                    <FormItem v-for="(point, index) in value" :key="index" class="w-full">
                      <NumberField
                        :min="0"
                        :max="10"
                        :step="0.01"
                        :model-value="point"
                        :disabled="isLoading"
                        @update:model-value="(v) => {
                          const newPoints = [...value]
                          newPoints[index] = v
                          setFieldValue('mouthPoints', newPoints)
                        }"
                      >
                        <NumberFieldContent>
                          <FormControl>
                            <NumberFieldInput :id="`mouthPoints${index}`" />
                          </FormControl>
                        </NumberFieldContent>
                      </NumberField>
                    </FormItem>
                  </FormField>
                </div>
              </TableCell>

              <TableCell class="border-r">
                <div class="flex gap-2">
                  <FormField v-slot="{ value }" name="fifteenMinutesPoints">
                    <FormItem v-for="(point, index) in value" :key="index" class="w-full">
                      <NumberField
                        :min="0"
                        :max="10"
                        :step="0.01"
                        :model-value="point"
                        :disabled="isLoading"
                        @update:model-value="(v) => {
                          const newPoints = [...value]
                          newPoints[index] = v
                          setFieldValue('fifteenMinutesPoints', newPoints)
                        }"
                      >
                        <NumberFieldContent>
                          <FormControl>
                            <NumberFieldInput :id="`fifteenMinutesPoints${index}`" />
                          </FormControl>
                        </NumberFieldContent>
                      </NumberField>
                    </FormItem>
                  </FormField>
                </div>
              </TableCell>

              <TableCell class="border-r">
                <div class="flex gap-2">
                  <FormField v-slot="{ value }" name="onePeriodPoints">
                    <FormItem v-for="(point, index) in value" :key="index" class="w-full">
                      <NumberField
                        :min="0"
                        :max="10"
                        :step="0.01"
                        :model-value="point"
                        :disabled="isLoading"
                        @update:model-value="(v) => {
                          const newPoints = [...value]
                          newPoints[index] = v
                          setFieldValue('onePeriodPoints', newPoints)
                        }"
                      >
                        <NumberFieldContent>
                          <FormControl>
                            <NumberFieldInput :id="`onePeriodPoints${index}`" />
                          </FormControl>
                        </NumberFieldContent>
                      </NumberField>
                    </FormItem>
                  </FormField>
                </div>
              </TableCell>

              <TableCell class="border-r">
                <div class="flex">
                  <FormField v-slot="{ value }" name="midSemesterPoints">
                    <FormItem v-for="(point, index) in value" :key="index" class="w-full">
                      <NumberField
                        :min="0"
                        :max="10"
                        :step="0.01"
                        :model-value="point"
                        :disabled="isLoading"
                        @update:model-value="(v) => {
                          const newPoints = [...value]
                          newPoints[index] = v
                          setFieldValue('midSemesterPoints', newPoints)
                        }"
                      >
                        <NumberFieldContent>
                          <NumberFieldDecrement />
                          <FormControl>
                            <NumberFieldInput :id="`midSemesterPoints${index}`" />
                          </FormControl>
                          <NumberFieldIncrement />
                        </NumberFieldContent>
                      </NumberField>
                    </FormItem>
                  </FormField>
                </div>
              </TableCell>

              <TableCell>
                <div class="flex">
                  <FormField v-slot="{ value }" name="endSemesterPoints">
                    <FormItem v-for="(point, index) in value" :key="index" class="w-full">
                      <NumberField
                        :min="0"
                        :max="10"
                        :step="0.01"
                        :model-value="point"
                        :disabled="isLoading"
                        @update:model-value="(v) => {
                          const newPoints = [...value]
                          newPoints[index] = v
                          setFieldValue('endSemesterPoints', newPoints)
                        }"
                      >
                        <NumberFieldContent>
                          <NumberFieldDecrement />
                          <FormControl>
                            <NumberFieldInput :id="`endSemesterPoints${index}`" />
                          </FormControl>
                          <NumberFieldIncrement />
                        </NumberFieldContent>
                      </NumberField>
                    </FormItem>
                  </FormField>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </table>
      </div>
    </div>

    <div class="flex justify-end gap-4 mt-4">
      <Button
        variant="outline"
        type="button"
        @click="() => emits('close', false)"
        :disabled="isLoading"
      >
        Cancel
      </Button>

      <Button type="submit" :disabled="isLoading">
        Save
      </Button>
    </div>
  </form>
</template>