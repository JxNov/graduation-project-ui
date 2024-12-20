import {
  fetchStatisticPerformanceService,
  fetchStatisticAllService,
  fetchStatisticGenderService,
  fetchStatisticStudentAcademicYearService
} from '~/services/statistic'

export const useStatisticStore = defineStore('statistic', () => {
  const statistics = ref<any>([])
  const statisticPerformance = ref<any>([])
  const statisticGender = ref<any>([])
  const statisticStudentAcademicYear = ref<any>([])

  const fetchStatisticPerformance = async (slug: any) => {
    try {
      statisticPerformance.value = await fetchStatisticPerformanceService(slug)
    } catch (error) {
      statisticPerformance.value = []
      throw error
    }
  }

  const fetchStatisticAll = async () => {
    try {
      statistics.value = await fetchStatisticAllService()
    } catch (error) {
      statistics.value = []
      throw error
    }
  }

  const fetchStatisticGender = async () => {
    try {
      statisticGender.value = await fetchStatisticGenderService()
    } catch (error) {
      statisticGender.value = []
      throw error
    }
  }

  const fetchStatisticStudentAcademicYear = async (slug: any) => {
    try {
      statisticStudentAcademicYear.value = await fetchStatisticStudentAcademicYearService(slug)
    } catch (error) {
      statisticStudentAcademicYear.value = []
      throw error
    }
  }

  const clearStatistic = () => {
    statisticPerformance.value = []
  }

  return {
    statistics,
    statisticPerformance,
    statisticGender,
    statisticStudentAcademicYear,
    fetchStatisticAll,
    fetchStatisticPerformance,
    fetchStatisticGender,
    fetchStatisticStudentAcademicYear,
    clearStatistic
  }
})