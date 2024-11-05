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

declare module '#app' {
  interface NuxtApp {
    $generalStore: ReturnType<typeof useGeneralStore>;
    $authStore: ReturnType<typeof useAuthStore>;
    $roleStore: ReturnType<typeof useRoleStore>;
    $userStore: ReturnType<typeof useUserStore>;
    $generationStore: ReturnType<typeof useGenerationStore>;
    $academicYearStore: ReturnType<typeof useAcademicYearStore>;
    $semesterStore: ReturnType<typeof useSemesterStore>;
    $blockStore: ReturnType<typeof useBlockStore>;
    $classStore: ReturnType<typeof useClassStore>;
    $teacherStore: ReturnType<typeof useTeacherStore>;
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
    $blockStore: ReturnType<typeof useBlockStore>;
    $classStore: ReturnType<typeof useClassStore>;
    $teacherStore: ReturnType<typeof useTeacherStore>;
  }
}