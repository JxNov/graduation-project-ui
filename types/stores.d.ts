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
import { useStudentStore } from '~/stores/student'
import { useClassroomStore } from '~/stores/classroom'
import { useAttendanceStore } from '~/stores/attendance'
import { useAssignmentStore } from '~/stores/assignment'
import { useArticleStore } from '~/stores/article'
import { useChatStore } from '~/stores/chat'
import { useGeminiStore } from '~/stores/gemini'
import { useHomeworkStore } from '~/stores/homework'
import { useMaterialStore } from '~/stores/material'

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
    $studentStore: ReturnType<typeof useStudentStore>;
    $classroomStore: ReturnType<typeof useClassroomStore>;
    $attendanceStore: ReturnType<typeof useAttendanceStore>;
    $assignmentStore: ReturnType<typeof useAssignmentStore>;
    $articleStore: ReturnType<typeof useArticleStore>;
    $chatStore: ReturnType<typeof useChatStore>;
    $geminiStore: ReturnType<typeof useGeminiStore>;
    $homeworkStore: ReturnType<typeof useHomeworkStore>;
    $materialStore: ReturnType<typeof useMaterialStore>;
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
    $studentStore: ReturnType<typeof useStudentStore>;
    $classroomStore: ReturnType<typeof useClassroomStore>;
    $attendanceStore: ReturnType<typeof useAttendanceStore>;
    $assignmentStore: ReturnType<typeof useAssignmentStore>;
    $articleStore: ReturnType<typeof useArticleStore>;
    $chatStore: ReturnType<typeof useChatStore>;
    $geminiStore: ReturnType<typeof useGeminiStore>;
    $homeworkStore: ReturnType<typeof useHomeworkStore>;
    $materialStore: ReturnType<typeof useMaterialStore>;
  }
}