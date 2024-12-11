import { useGeneralStore } from './general'
import { useAuthStore } from './auth'
import { useRoleStore } from './role'
import { useUserStore } from './user'
import { useGenerationStore } from './generation'
import { useAcademicYearStore } from './academicYear'
import { useSemesterStore } from './semester'
import { useBlockStore } from './block'
import { useClassStore } from './class'
import { useTeacherStore } from './teacher'
import { useStudentStore } from './student'
import { useClassroomStore } from './classroom'
import { useAttendanceStore } from './attendance'
import { useAssignmentStore } from './assignment'
import { useArticleStore } from './article'
import { useChatStore } from './chat'
import { useGeminiStore } from './gemini'
import { useMaterialStore } from './material'

export const clearStores = () => {
  useGeneralStore().clearGeneral()
  useAuthStore().clearUser()
  useRoleStore().clearRoles()
  useUserStore().clearUsers()
  useGenerationStore().clearGenerations()
  useAcademicYearStore().clearAcademicYears()
  useSemesterStore().clearSemesters()
  useBlockStore().clearBlocks()
  useClassStore().clearClasses()
  useTeacherStore().clearTeachers()
  useStudentStore().clearStudents()
  useClassroomStore().clearClassrooms()
  useAttendanceStore().clearAttendances()
  useAssignmentStore().clearAssignments()
  useArticleStore().clearArticles()
  useChatStore().clearChats()
  useGeminiStore().clearGeminis()
  useMaterialStore().clearMaterials()
}
