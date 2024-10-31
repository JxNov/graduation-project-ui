<template>
  <div class="todo-wrapper">
    <div class="header-todo">
      <div
        class="btn-header-todo"
        :class="{ active: activeItem === 'assigned' }"
        @click="setActiveItem('assigned')"
      >
        Assigned
      </div>
      <div
        class="btn-header-todo"
        :class="{ active: activeItem === 'missing' }"
        @click="setActiveItem('missing')"
      >
        Missing
      </div>
      <div
        class="btn-header-todo"
        :class="{ active: activeItem === 'done' }"
        @click="setActiveItem('done')"
      >
        Done
      </div>
    </div>

    <!-- Dropdown tùy chỉnh -->
    <div class="dropdown">
      <div class="dropdown-btn" @click="toggleDropdown">
        <button>
          {{ selectedOption }}
        </button>
        <div>▼</div>
      </div>

      <div v-if="isDropdownOpen" class="dropdown-options">
        <div
          class="dropdown-option"
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
        >
          {{ option }}
        </div>
      </div>
    </div>

    <!-- Khu vực hiển thị component tương ứng -->
    <div class="content-display">
      <ComponetA v-if="selectedOption === 'WEB2014'" />
      <ComponetB v-if="selectedOption === 'Khởi sự doanh nghiệp'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ComponetA from '../../components/ui/todo/ComponetA'; 
import ComponetB from '../../components/ui/todo/ComponetB'; 

// Biến để lưu trạng thái của item đang active
const activeItem = ref('assigned');
const selectedOption = ref('All classes'); // Biến lưu trạng thái của option được chọn
const options = ['WEB2014', 'Khởi sự doanh nghiệp']; // Các option có sẵn
const isDropdownOpen = ref(false); // Trạng thái mở/đóng của dropdown

// Hàm để thay đổi item đang active
const setActiveItem = (item) => {
  activeItem.value = item;
};

// Hàm để chuyển đổi trạng thái của dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Hàm để chọn option
const selectOption = (option) => {
  selectedOption.value = option;
  isDropdownOpen.value = false; // Đóng dropdown sau khi chọn
};
</script>

<style scoped>
.header-todo {
  height: 49px;
  border-bottom: 1px solid #ccc;
  display: flex;
  gap: 50px;
}

.btn-header-todo {
  color: rgb(95, 99, 104);
  cursor: pointer;
  position: relative; /* Để vị trí chính xác cho thanh gạch ngang */
}

/* Thay đổi màu chữ và tạo thanh gạch ngang khi button được chọn */
.btn-header-todo.active {
  color: rgb(24, 90, 188);
}

.btn-header-todo.active::after {
  content: ''; /* Tạo một phần tử giả */
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px; /* Đặt thanh gạch ngang phía dưới button */
  height: 3px; /* Độ dày của thanh gạch ngang */
  background-color: rgb(24, 90, 188); /* Màu của thanh gạch ngang */
}

/* Styles cho dropdown */
.dropdown {
  margin-top: 20px;
  position: relative; /* Để định vị các phần tử con */
}

.dropdown-btn {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
  width: 348px;
  height: 48px;
  display: flex;
  justify-content: space-between;
}

.dropdown-options {
  position: absolute;
  top: 100%; /* Đặt bên dưới button */
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  background-color: #fff;
  width: 348px;
  z-index: 1;
}

.dropdown-option {
  padding: 10px;
  cursor: pointer;
}

.dropdown-option:hover {
  background-color: #f0f0f0; /* Hiệu ứng hover cho option */
}

/* Styles cho khu vực hiển thị nội dung */
.content-display {
  margin-top: 20px;
}
</style>
