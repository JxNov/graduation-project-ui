import { useGeneralStore } from '~/stores/general'
import { useAuthStore } from '~/stores/auth'
import { useRoleStore } from '~/stores/role'
import { useUserStore } from '~/stores/user'
import { useGenerationStore } from '~/stores/generation'
import { useAcademicYearStore } from '~/stores/academicYear'
import { useSemesterStore } from '~/stores/semester'
import { useClassStore } from '~/stores/class'
import { useTeacherStore } from '~/stores/teacher'
import { useStudentStore } from '~/stores/student'

declare module '#app' {
  interface NuxtApp {
    $generalStore: ReturnType<typeof useGeneralStore>;
    $authStore: ReturnType<typeof useAuthStore>;
    $roleStore: ReturnType<typeof useRoleStore>;
    $userStore: ReturnType<typeof useUserStore>;
    $generationStore: ReturnType<typeof useGenerationStore>;
    $academicYearStore: ReturnType<typeof useAcademicYearStore>;
    $semesterStore: ReturnType<typeof useSemesterStore>;
    $classStore: ReturnType<typeof useClassStore>;
    $teacherStore: ReturnType<typeof useTeacherStore>;
    $studentStore: ReturnType<typeof useStudentStore>;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $generalStore: ReturnType<typeof useGeneralStore>;
    $authStore: ReturnType<typeof useAuthStore>;
    $roleStore: ReturnType<typeof useRoleStore>;
    $userStore: ReturnType<typeof useUserStore>;
    $generationStore: ReturnType<typeof useGenerationStore>;
    $academicYearStore: ReturnType<typeof useAcademicYearStore>;
    $semesterStore: ReturnType<typeof useSemesterStore>;
    $classStore: ReturnType<typeof useClassStore>;
    $teacherStore: ReturnType<typeof useTeacherStore>;
    $studentStore: ReturnType<typeof useStudentStore>;
  }
}