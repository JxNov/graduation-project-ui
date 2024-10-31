<template>
  <div class="todo-wrapper">
    <div class="header-todo">
      <div
        class="btn-header-todo"
        :class="{ active: activeItem === 'assigned' }"
        @click="setActiveItem('assigned')"
      >
        Stream
      </div>
      <div
        class="btn-header-todo"
        :class="{ active: activeItem === 'missing' }"
        @click="setActiveItem('missing')"
      >
       Classwork
      </div>
      <div
        class="btn-header-todo"
        :class="{ active: activeItem === 'done' }"
        @click="setActiveItem('done')"
      >
       People
      </div>
    </div>

    <!-- Khu vực hiển thị component tương ứng -->
    <div class="content-display">
      <Stream v-if="activeItem === 'assigned'" />
      <Classwork v-if="activeItem === 'missing'" />
      <People v-if="activeItem === 'done'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Stream from '../../components/ui/todo/Stream.vue'; 
import Classwork from '../../components/ui/todo/Classwork.vue'; 
import People from '../../components/ui/todo/People.vue'; // Nhập Component C

// Biến để lưu trạng thái của item đang active
const activeItem = ref('assigned');

// Hàm để thay đổi item đang active
const setActiveItem = (item) => {
  activeItem.value = item;
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

/* Styles cho khu vực hiển thị nội dung */
.content-display {
  margin-top: 20px;
}
</style>
