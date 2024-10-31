<script setup>
  import { ref } from 'vue'
  
  // Trạng thái hiển thị dropdown theo id của từng class
  const dropdownState = ref({})
  
  // Hàm chuyển đổi trạng thái dropdown cho từng class
  const toggleDropdown = (classId) => {
    dropdownState.value[classId] = !dropdownState.value[classId]
  }
  
  const classes = ref([
  { title: 'FA23_WEB', author: 'Nguyễn Văn Lương', avatarClass: 'avatar-header1', initial: 'L' },
  { title: 'WD18319-dự án 1', author: 'Vũ Anh Tú', avatarClass: 'avatar-header2', initial: 'T' },
    { title: 'WEB2014', author: 'Phạm Anh Vũ', avatarClass: 'avatar-header', initial: 'V' },
    { title: 'Khởi sự doanh nghiệp', author: 'Nguyễn Việt Lập', avatarClass: 'avatar-header2', initial: 'L' },
  ])
  </script>
  
  <template>
    <div class="home-wrapper">
      <!-- Sử dụng v-for để hiển thị từng class-inner với id riêng biệt -->
      <div v-for="(classItem, index) in classes" :key="index" class="class-inner">
        <div class="class-inner-header">
          <div class="title-top-header">
            <div class="class-inner-title">{{ classItem.title }}</div>
            <!-- Biểu tượng ba chấm theo chiều dọc -->
            <div class="icon-dots" @click="toggleDropdown(index)">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="5" r="2" fill="white" />
                <circle cx="12" cy="12" r="2" fill="white" />
                <circle cx="12" cy="19" r="2" fill="white" />
              </svg>
              <!-- Dropdown menu chỉ hiển thị khi trạng thái dropdownState của phần tử này là true -->
              <div v-if="dropdownState[index]" class="dropdown-menu">
                <ul>
                  <li>Copy URL</li>
                  <li>Edit</li>
                  <li>Copy</li>
                  <li>Save</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="title-bottom-header">{{ classItem.author }}</div>
          <div class="avatar-wrapper">
            <div :class="classItem.avatarClass">{{ classItem.initial }}</div>
          </div>
        </div>
        <div class="class-body-header"></div>
        <div class="class-footer-header">
          <div class="icon-footer">
            <div class="icon-footer-inner">
              <svg focusable="false" width="24" height="24" viewBox="0 0 24 24" class="NMm5M hhikbc">
                <path d="M16 6v2h2.58l-5.17 5.17-4-4L2 16.59 3.41 18l6-6 4 4L20 9.42V12h2V6z"></path>
              </svg>
            </div>
            <div class="icon-footer-inner">
              <svg focusable="false" width="24" height="24" viewBox="0 0 24 24" class="NMm5M">
                <path
                  d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .home-wrapper {
    display: flex;
    gap: 60px;
    flex-wrap: wrap;
  }
  
  .class-inner {
    width: 300px;
    height: 300px;
    border: 1px solid #dadce0;
    border-radius: 7px;
  }
  
  .class-inner-header {
    background: pink;
    height: 30%;
    padding: 20px;
    position: relative;
  }
  
  .title-top-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .class-inner-title {
    font-size: 1.375rem;
    font-weight: 400;
    color: #ffffff;
  }
  
  .icon-dots {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    cursor: pointer;
    position: relative;
  }
  
  .dropdown-menu {
    position: absolute;
    top: 30px;
    right: 0;
    background-color: white;
    border: 1px solid #dadce0;
    border-radius: 5px;
    width: 120px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 2;
  }
  
  .dropdown-menu ul {
    list-style: none;
    padding: 10px 0;
    margin: 0;
  }
  
  .dropdown-menu li {
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;
    color: #333;
  }
  
  .dropdown-menu li:hover {
    background-color: #f0f0f0;
  }
  
  .title-bottom-header {
    color: #ffffff;
  }
  
  .avatar-header {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: red;
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-weight: 3700;
  }
  
  .avatar-header2 {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: orange;
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-weight: 3700;
  }

  .avatar-header1{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: burlywood;
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-weight: 3700;
  }
  
  .avatar-wrapper {
    width: 90%;
    display: flex;
    justify-content: end;
    position: absolute;
    top: 70%;
  }
  
  .class-footer-header {
    height: 20%;
    border-top: 1px solid #dadce0;
    display: flex;
    width: 100%;
    justify-content: end;
    padding: 20px;
    cursor: pointer;
  }
  
  .icon-footer {
    display: flex;
    gap: 10px;
  }
  
  .class-body-header {
    height: 50%;
  }
  </style>
  