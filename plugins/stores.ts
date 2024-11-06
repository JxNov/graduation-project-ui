import { useGeneralStore } from '~/stores/general'
import { useAuthStore } from '~/stores/auth'
import { useRoleStore } from '~/stores/role'
import { useUserStore } from '~/stores/user'
import { useGenerationStore } from '~/stores/generation'
import { useAcademicYearStore } from '~/stores/academicYear'
import { useSemesterStore } from '~/stores/semester'
import { useBlockStore } from '~/stores/block'
import { useClassStore } from '~/stores/class'
import { useTeacherStore } from '~/stores/teacher'

export default defineNuxtPlugin((NuxtApp) => {
  NuxtApp.provide('generalStore', useGeneralStore())
  NuxtApp.provide('authStore', useAuthStore())
  NuxtApp.provide('roleStore', useRoleStore())
  NuxtApp.provide('userStore', useUserStore())
  NuxtApp.provide('generationStore', useGenerationStore())
  NuxtApp.provide('academicYearStore', useAcademicYearStore())
  NuxtApp.provide('semesterStore', useSemesterStore())
  NuxtApp.provide('blockStore', useBlockStore())
  NuxtApp.provide('classStore', useClassStore())
  NuxtApp.provide('teacherStore', useTeacherStore())
})
