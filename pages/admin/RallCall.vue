<template>
  <div>
    <header class="attendance-header">
      <div style="display: flex; gap: 3px; align-items: center; justify-content: center">
        <h2>Điểm Danh</h2>
        <i class="fas fa-user-check"></i>
      </div>

      <div style="display: flex; align-items: center; gap: 10px;" class="attendance-icon">
        <i class="fas fa-search"></i>
        <i class="fas fa-bell"></i>
        <div class="btn">2024 - 2025</div>
        <i class="fas fa-user-shield"></i>
      </div>
    </header>
    
    <div class="attendance-container">
      <div class="tabs">
        <button :class="{ active: activeTab === 'day' }" @click="activeTab = 'day'">Điểm Danh Theo Ngày</button>
        <button :class="{ active: activeTab === 'month' }" @click="activeTab = 'month'; showMonthlyAttendance = true;">Điểm Danh Theo Tháng</button>
      </div>
  
      <div v-if="activeTab === 'day'">
        <div class="attendance-summary">
          <div>
            <p>Thời gian: 8:00 - 9:00</p>
            <p>Môn học: CNTT</p>
            <p>Giáo viên: Nguyễn Đức Thắng</p>
          </div>
          <div>
            <p>Sĩ số: {{ totalStudents }}</p>
            <p>Có mặt: {{ presentStudents }}</p>
            <p>Vắng: {{ absentStudents }}</p>
          </div>
        </div>

        <div style="display: flex; margin-bottom: 10px; justify-content: end; width: 100%; gap: 10px;">
          <div class="parent-notification">Thông báo cho PH</div>
          <div class="progress-notification" @click="openModal">Tiện Ích</div>
        </div>
  
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>STT</th>
              <th>Tên học sinh</th>
              <th>Ngày sinh</th>
              <th>Có mặt</th>
              <th>Nghỉ có phép</th>
              <th>Nghỉ không phép</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in filteredStudents" :key="student.id">
              <td><input type="checkbox" /></td>
              <td>{{ index + 1 }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.birthDate }}</td>
              <td>
                <input type="checkbox" :checked="student.status === 'Có mặt'" @change="markAttendance(student.id, 'Có mặt', $event.target.checked)" />
              </td>
              <td>
                <input type="checkbox" :checked="student.status === 'Nghỉ có phép'" @change="markAttendance(student.id, 'Nghỉ có phép', $event.target.checked)" />
              </td>
              <td>
                <input type="checkbox" :checked="student.status === 'Nghỉ không phép'" @change="markAttendance(student.id, 'Nghỉ không phép', $event.target.checked)" />
              </td>
            </tr>
          </tbody>
        </table>
        <div style="display: flex; gap: 10px; width: 100%; justify-content: end; margin-top: 10px;">
          <div class="btn-save">Lưu</div>
          <div class="btn-cancle">Huỷ</div>
        </div>
      </div>
  
      <div v-if="activeTab === 'month'">
        <div class="attendance-summary">
          <p>Sĩ số: {{ totalStudents }}</p>
          <p>Có mặt: {{ presentStudents }}</p>
          <p>Vắng: {{ absentStudents }}</p>
        </div>
  
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên học sinh</th>
              <th>Số ngày đi học</th>
              <th>Số ngày đi muộn</th>
              <th>Số ngày nghỉ</th>
              <th>Ngày nghỉ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in filteredStudents" :key="student.id">
              <td>{{ index + 1 }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.on }}</td>
              <td>{{ student.late }}</td>
              <td>{{ student.off }}</td>
              <td>{{ student.daysOff.join(", ") }}</td>
            </tr>
          </tbody>
        </table>
        <div style="display: flex; gap: 10px; width: 100%; justify-content: end; margin-top: 10px;">
          <div class="btn-save">Lưu</div>
          <div class="btn-cancle">Huỷ</div>
        </div>
      </div>
    </div>
    
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <div style="display: flex; width: 80%; justify-content: space-between;">
          <div>Tiện ích</div>
          <span class="close" @click="closeModal">&times;</span>
        </div>
       
        <div style="display: flex; width: 80%; justify-content: space-between; padding: 40px 36px">
          <div>Mặc định điểm danh có mặt</div>
          <input type="checkbox">
        </div>
        
        <div style="display: flex; justify-content: end; width: 100%;">
          <div class="btn-save" @click="closeModal">Lưu</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Rollcall",
  data() {
    return {
      activeTabMont: "month",
      isModalOpen: false, // Quản lý trạng thái của modal
      activeTab: "day", // Tab mặc định là điểm danh theo ngày
      showMonthlyAttendance: false, // Biến điều kiện để hiển thị phần điểm danh theo tháng
      students: [
        {
          id: 1,
          name: "Nguyễn Văn A",
          birthDate: "2005-01-15",
          on: "28",
          off: "2",
          late: "0",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 2,
          name: "Trần Thị B",
          birthDate: "2005-02-20",
          on: "30",
          off: "0",
          late: "2",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 3,
          name: "Lê Văn C",
          birthDate: "2005-03-10",
          on: "28",
          off: "2",
          late: "4",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 4,
          name: "Nguyễn Văn D",
          birthDate: "2005-01-15",
          on: "30",
          off: "0",
          late: " 2",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 5,
          name: "Trần Thị E",
          birthDate: "2005-01-15",
          on: "30",
          off: "0",
          late: " 0",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 6,
          name: "Lê Văn F",
          birthDate: "2005-01-15",
          on: "30",
          off: "0",
          late: " 2",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 7,
          name: "Nguyễn Thị G",
          birthDate: "2005-01-15",
          on: "30",
          off: "0",
          late: " 2",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 8,
          name: "Phạm Văn H",
          birthDate: "2005-01-15",
          on: "30",
          off: "0",
          late: " 2",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 9,
          name: "Đinh Thị I",
          birthDate: "2005-01-15",
          on: "30",
          off: "0",
          late: " 1",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 10,
          name: "Vũ Văn J",
          birthDate: "2005-01-15",
          on: "30",
          off: "0",
          late: " 0",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 11,
          name: "Nguyễn Thị K",
          birthDate: "2005-01-15",
          on: "28",
          off: "2",
          late: " 0",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 12,
          name: "Phạm Văn L",
          birthDate: "2005-01-15",
          on: "30",
          off: "0",
          late: " 0",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 13,
          name: "Đoàn Thị M",
          birthDate: "2005-01-15",
          on: "30",
          off: "0",
          late: " 0",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 14,
          name: "Lê Văn N",
          birthDate: "2005-01-15",
          on: "30",
          off: "0",
          late: " 0",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 15,
          name: "Nguyễn Thị O",
          birthDate: "2005-01-15",
          on: "30",
          off: "0",
          late: " 2",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
        {
          id: 16,
          name: "Bùi Văn P",
          birthDate: "2005-01-15",
          on: "30",
          off: "0",
          late: " 2",
          attendance: {},
          daysOff: ["Chi tiết"],
        },
       
      ],
    };
  },
  computed: {
    filteredStudents() {
      if (this.activeTab === "month" && this.selectedMonth) {
        return this.students.filter((student) =>
          Object.keys(student.attendance).some((date) =>
            date.startsWith(this.selectedMonth)
          )
        );
      }
      return this.students;
    },
    totalStudents() {
      return this.students.length;
    },
    presentStudents() {
      return this.students.filter(
        (student) => student.attendance[this.selectedDate] === "Có mặt"
      ).length;
    },
    absentStudents() {
      return this.students.filter(
        (student) =>
          student.attendance[this.selectedDate] === "Nghỉ có phép" ||
          student.attendance[this.selectedDate] === "Nghỉ không phép"
      ).length;
    },
    
  },
  methods: {
    openModal() {
      this.isModalOpen = true; // Mở modal
    },
    closeModal() {
      this.isModalOpen = false; // Đóng modal
    },
    markAttendance(studentId, status, isChecked) {
      const student = this.filteredStudents.find((s) => s.id === studentId);
      if (student) {
        if (isChecked) {
          // Nếu checkbox được chọn, đặt trạng thái tương ứng
          student.status = status;
        } else {
          // Nếu checkbox không được chọn, xóa trạng thái
          student.status = "";
        }
      }
    },
  },
};
</script>

<style scoped>
  .modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Màu nền mờ */
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
  width: 300px;
  height: 150px;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 20px;
}
.attendance-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.attendance-icon i {
  font-size: 1.5rem;
  cursor: pointer;
}

.current-year-div {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.attendance-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #4caf50; /* Màu nền của header */
  color: white; /* Màu chữ */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.attendance-header h1 {
  margin: 0;
  font-size: 28px; /* Kích thước chữ cho tên trường */
}

.attendance-header h2 {
  font-size: 20px; /* Kích thước chữ cho tiêu đề */
}

.school-logo img {
  width: 60px; /* Kích thước logo trường */
  height: auto; /* Đảm bảo tỷ lệ logo */
  margin-bottom: 10px;
}

.attendance-icon {
  font-size: 40px; /* Kích thước biểu tượng */
}

.fa-user-check {
  color: white; /* Màu cho biểu tượng */
}

button.selected {
  background-color: #388e3c; /* Màu nền cho nút được chọn */
  color: #ffffff; /* Màu chữ cho nút được chọn */
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #2e7d32;
}

.btn-save{
  cursor: pointer;
  background-color: #2e7d32;
  color: white;
  padding: 8px 20px;
  border-radius: 5px;
}

.btn-cancle{
  cursor: pointer;
  background-color: red;
  color: white;
  padding: 8px 20px;
  border-radius: 5px;
}

.attendance-summary {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding:10px 25px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  text-align: center;
}

.attendance-summary p {
  margin: 5px 0;
}

.attendance-summary p:first-child {
  font-weight: bold;
  font-size: 18px;
  color: #4caf50;
}

.attendance-summary p:nth-child(2) {
  color: #2196f3;
}

.attendance-summary p:nth-child(3) {
  color: #f44336;
}

.parent-notification{
  border: 1px solid #4caf50;
    background: #4caf50;
    color: white;
    padding: 0 10px;
    width: 100px;
    border-radius: 7px;
    font-size: 14px;
    cursor: pointer;
}

.progress-notification{
  border: 1px solid #4caf50;
    background: #fff;
    color: #4caf50;
    padding: 0 10px;
    width: 80px;
    border-radius: 7px;
    height: 36px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.tabs {
  display: flex;
  justify-content: center;
  margin: 20px;
  gap: 10px;
}

.tabs button {
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background: none;
  font-weight: bold;
  color: #2e7d32;
  transition: color 0.3s;
}

.tabs button.active {
  color: #ffffff;
  background-color: #2e7d32;
  border-radius: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

button {
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  border-radius: 20px;
  color: white;
  transition: background-color 0.3s, transform 0.2s;
}

button.selected {
  background-color: #4caf50;
}

button:not(.selected) {
  background-color: #ccc;
}

button:hover {
  transform: scale(1.05);
  background-color: #45a049;
}

button.selected:hover {
  background-color: #388e3c;
}

.btn{
  font-size: 20px;
    border: 1px solid #fff;
    padding: 0 10px;
    border-radius: 5px
}
</style>
