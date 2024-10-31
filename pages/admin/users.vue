<template>
  <div class="people-wrapper">
    <div class="setting-inner">
      <div class="teacher">Profile</div>
      <div class="profile-photo">Profile photo</div>
      <div class="change-img">
        <div><img class="circular-image" src = "https://lh3.googleusercontent.com/a/ACg8ocK9IvLkDC8oZ_Kplam4bakSCh2uKfydYioLVSSK9-5TFuGdiA=s32-c-mo" alt=""/></div>
        <div style="color: rgb(26, 115, 232)">Change</div>
      </div>
      <div>Account settings : Change your passwords and security options, and access other Google services </div>
      <div>Rename : To change your name, go to your account settings. </div>
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

.change-img{
  display:flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
}

.teacher {
  font-size: 2rem;
  font-weight: 400px;
  color: #202124;
}

.circular-image {
  border-radius: 50%; /* Để tạo hình tròn */
}


.setting-inner {
  display: flex;
  flex-direction: column;
  width: 760px;
  height: 300px;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 30px;
  border-radius: 10px;
}

.title-teacher {
  display: flex;
  width: 760px;
  height: 73px;
  gap: 20px;
  align-items: center;
  font-size: 2rem;
  font-weight: 400px;
  color: #202124;
}

.people-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
