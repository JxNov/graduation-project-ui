<template>
  <div class="people-wrapper">
    <div class="people-inner">
      <div class="teacher">Teacher</div>
      <div>
        <svg focusable="false" width="24" height="24" viewBox="0 0 24 24" class="NMm5M hhikbc">
          <path
            d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="title-teacher">
      <div>
        <img class="circular-image" src = "https://lh3.googleusercontent.com/a/ACg8ocK9IvLkDC8oZ_Kplam4bakSCh2uKfydYioLVSSK9-5TFuGdiA=s32-c-mo" alt=""/>
      </div>
      <div>Vu Hai Anh</div>
    </div>
    <div class="people-inner">
      <div class="teacher">Student</div>
      <div>
        <svg focusable="false" width="24" height="24" viewBox="0 0 24 24" class="NMm5M hhikbc">
          <path
            d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
// Logic hoặc props có thể được thêm vào đây
</script>

<style scoped>
.circular-image {
  border-radius: 50%; /* Để tạo hình tròn */
}

.teacher {
  font-size: 2rem;
  font-weight: 400px;
  color: #202124;
}

.people-inner{
  display: flex;
  width: 760px;
  height: 73px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.title-teacher{
  display: flex;
  width: 760px;
  height: 73px;
  gap: 30px;
  align-items: center;
  font-size: 2rem;
  font-weight: 400px;
  color: #202124;
}

.people-wrapper{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
