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
  NuxtApp.provide('studentStore', useStudentStore())
  NuxtApp.provide('classroomStore', useClassroomStore())
  NuxtApp.provide('attendanceStore', useAttendanceStore())
  NuxtApp.provide('assignmentStore', useAssignmentStore())
  NuxtApp.provide('articleStore', useArticleStore())
  NuxtApp.provide('chatStore', useChatStore())
  NuxtApp.provide('geminiStore', useGeminiStore())
})
