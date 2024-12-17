import type { Grade } from '~/schema'

export const fetchGradeService = async (query?: string): Promise<Grade[]> => {
  const { $axios } = useNuxtApp()

  try {
    let api: string = `/v1/scores/classes`
    if (query) {
      api += `?${query}`
    }

    const response = await $axios.get(api)

    if (!response) {
      throw new Error('No response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const fetchGradeByTeacherService = async (query?: string): Promise<Grade[]> => {
  const { $axios } = useNuxtApp()

  try {
    let api: string = `/v1/scores/classes/teacher`
    if (query) {
      api += `?${query}`
    }

    const response = await $axios.get(api)

    if (!response) {
      throw new Error('No response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const fetchGradeStudentService = async (query?: string): Promise<Grade[]> => {
  const { $axios } = useNuxtApp()

  try {
    let api: string = `/v1/scores/student`
    if (query) {
      api += `?${query}`
    }

    const response = await $axios.get(api)

    if (!response) {
      throw new Error('No response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createGradeService = async (data: {
  studentUsername: string
  subjectSlug: string
  classSlug: string
  semesterSlug: string
  detailedScores: {
    mouthPoints: {
      coefficient: number
      scores: number[]
    },
    fifteenMinutesPoints: {
      coefficient: number
      scores: number[]
    },
    onePeriodPoints: {
      coefficient: number
      scores: number[]
    },
    midSemesterPoints: {
      coefficient: number
      scores: number[]
    },
    endSemesterPoints: {
      coefficient: number
      scores: number[]
    }
  }
}): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/scores', {
      student_username: data.studentUsername,
      subject_slug: data.subjectSlug,
      class_slug: data.classSlug,
      semester_slug: data.semesterSlug,
      detailed_scores: {
        diem_mieng: {
          he_so: data.detailedScores.mouthPoints.coefficient,
          score: data.detailedScores.mouthPoints.scores
        },
        diem_15_phut: {
          he_so: data.detailedScores.fifteenMinutesPoints.coefficient,
          score: data.detailedScores.fifteenMinutesPoints.scores
        },
        diem_mot_tiet: {
          he_so: data.detailedScores.onePeriodPoints.coefficient,
          score: data.detailedScores.onePeriodPoints.scores
        },
        diem_giua_ki: {
          he_so: data.detailedScores.midSemesterPoints.coefficient,
          score: data.detailedScores.midSemesterPoints.scores
        },
        diem_cuoi_ki: {
          he_so: data.detailedScores.endSemesterPoints.coefficient,
          score: data.detailedScores.endSemesterPoints.scores
        }
      }
    })

    if (!response) {
      throw new Error('No response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}