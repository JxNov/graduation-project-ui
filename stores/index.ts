import { useGeneralStore } from './general'
import { useAuthStore } from './auth'
import { useRoleStore } from './role'
import { useUserStore } from './user'
import { useGenerationStore } from './generation'
import { useAcademicYearStore } from './academicYear'
import { useSemesterStore } from './semester'
import { useBlockStore } from '~/stores/block'
import { useClassStore } from './class'
import { useTeacherStore } from '~/stores/teacher'
import { useStudentStore } from '~/stores/student'
import { useClassroomStore } from '~/stores/classroom'

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
}
