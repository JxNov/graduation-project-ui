<script setup lang="ts">
</script>

<template>
  <div class="bg-card p-4 rounded-md shadow">
    <div class="rounded-md border">
      <Table>
        <!--          <TableHeader>-->
        <!--            <TableRow class="hover:bg-transparent">-->
        <!--              <TableHead class="border-r" rowspan="2">-->
        <!--                Invoice-->
        <!--              </TableHead>-->

        <!--              <TableHead class="border-r" rowspan="1">Status</TableHead>-->

        <!--              <TableHead class="border-r" rowspan="1">Method</TableHead>-->

        <!--              <TableHead rowspan="1">-->
        <!--                Amount-->
        <!--              </TableHead>-->
        <!--            </TableRow>-->

        <!--            <TableRow class="hover:bg-transparent">-->
        <!--              <TableHead class="border-r" rowspan="1">Status</TableHead>-->

        <!--              <TableHead class="border-r" rowspan="1">Method</TableHead>-->

        <!--              <TableHead rowspan="1">-->
        <!--                Amount-->
        <!--              </TableHead>-->
        <!--            </TableRow>-->
        <!--          </TableHeader>-->

        <TableBody>
          <TableRow class="border-none hover:bg-transparent">
            <TableHead class="border-r text-center w-24" rowspan="3">
              Invoice
            </TableHead>

            <TableHead class="border-r w-14" rowspan="1">
              Status
            </TableHead>

            <TableHead class="border-r w-14" rowspan="1">
              Method
            </TableHead>

            <TableHead class="border-r w-14" rowspan="1">
              Method
            </TableHead>

            <TableHead class="border-r w-14" rowspan="1">
              Method
            </TableHead>

            <TableHead class="border-r w-14" rowspan="1">
              Method
            </TableHead>

            <TableHead class="w-14" rowspan="1">
              Amount
            </TableHead>
          </TableRow>

          <TableRow class="hover:bg-transparent">
            <TableHead class="border-r" rowspan="1">
              <NumberField
                class="flex justify-between items-center gap-4 w-full"
                id="age"
                :default-value="0"
                :min="0"
                :max="10"
              >
                <Label for="age">
                  Age
                </Label>

                <NumberFieldContent class="w-28">
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </TableHead>

            <TableHead class="border-r" rowspan="1">
              <NumberField
                class="flex justify-between items-center gap-4 w-full"
                id="age"
                :default-value="0"
                :min="0"
                :max="10"
              >
                <Label for="age">
                  Age
                </Label>

                <NumberFieldContent class="w-28">
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </TableHead>

            <TableHead class="border-r" rowspan="1">
              <NumberField
                class="flex justify-between items-center gap-4 w-full"
                id="age"
                :default-value="0"
                :min="0"
                :max="10"
              >
                <Label for="age">
                  Age
                </Label>

                <NumberFieldContent class="w-28">
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </TableHead>

            <TableHead class="border-r" rowspan="1">
              <NumberField
                class="flex justify-between items-center gap-4 w-full"
                id="age"
                :default-value="0"
                :min="0"
                :max="10"
              >
                <Label for="age">
                  Age
                </Label>

                <NumberFieldContent class="w-28">
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </TableHead>

            <TableHead class="border-r" rowspan="1">
              <NumberField
                class="flex justify-between items-center gap-4 w-full"
                id="age"
                :default-value="0"
                :min="0"
                :max="10"
              >
                <Label for="age">
                  Age
                </Label>

                <NumberFieldContent class="w-28">
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </TableHead>

            <TableHead rowspan="1">
              <NumberField
                class="flex justify-between items-center gap-4 w-full"
                id="age"
                :default-value="0"
                :min="0"
                :max="10"
              >
                <Label for="age">
                  Age
                </Label>

                <NumberFieldContent class="w-28">
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </TableHead>
          </TableRow>

          <TableRow class="hover:bg-transparent">
            <TableCell class="border-r">
              <div class="flex gap-2">
                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>

                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>

                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>
              </div>
            </TableCell>

            <TableCell class="border-r">
              <div class="flex gap-2">
                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>

                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>

                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>
              </div>
            </TableCell>

            <TableCell class="border-r">
              <div class="flex gap-2">
                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>

                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>

                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>
              </div>
            </TableCell>

            <TableCell class="border-r">
              <div class="flex gap-2">
                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>

                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>

                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>
              </div>
            </TableCell>

            <TableCell class="border-r">
              <div class="flex gap-2">
                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>

                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>

                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>
              </div>
            </TableCell>

            <TableCell>
              <div class="flex gap-2">
                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>

                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>

                <NumberField class="w-full" :default-value="0" :min="0" :max="10">
                  <NumberFieldContent>
                    <NumberFieldInput />
                  </NumberFieldContent>
                </NumberField>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>