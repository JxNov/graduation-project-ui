<template>
  <div class="stream-wrapper">
    
    <div class="stream-body">
        <div class="btn-right">
            <div class="btn-right">
            <div class="noti">
                <div class="avatar-stream">
                    <svg
                    enable-background="new 0 0 24 24"
                    focusable="false"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    class="NMm5M"
                  >
                    <g>
                      <path
                        d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M20,18H4V8h16V18z M18,12H6v-2h12V12z M14,16H6v-2h8V16z"
                      ></path>
                      <rect fill="none" height="24" width="24"></rect>
                    </g>
                  </svg>
                </div>
                <div>BTVN - FE - Vuejs</div>
            </div>
            <div class="noti">
                <div class="avatar-stream">
                    <svg
              enable-background="new 0 0 24 24"
              focusable="false"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              class="NMm5M"
            >
              <g>
                <path
                  d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M20,18H4V8h16V18z M18,12H6v-2h12V12z M14,16H6v-2h8V16z"
                ></path>
                <rect fill="none" height="24" width="24"></rect>
              </g>
            </svg>
                </div>
                <div>BTVN - BE</div>
            </div>
            <div class="noti">
                <div class="avatar-stream">
                    <svg
              enable-background="new 0 0 24 24"
              focusable="false"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              class="NMm5M"
            >
              <g>
                <path
                  d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M20,18H4V8h16V18z M18,12H6v-2h12V12z M14,16H6v-2h8V16z"
                ></path>
                <rect fill="none" height="24" width="24"></rect>
              </g>
            </svg>
                </div>
                <div>BTVN - MongoDB</div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script setup>
// Logic hoặc props có thể được thêm vào đây
</script>

<style scoped>
    .stream-wrapper{
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    .stream-header{
        width: 1000px;
        height: 240px;
        background-image: url('https://gstatic.com/classroom/themes/Honors.jpg');
        border-radius: 10px;
        padding: 20px;
        font-size: 2.25rem;
        font-weight: 500;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: end;
    }
    .btn-inner-left{
        border-radius: 5px;
        border: 1px solid #ccc;
        width: 196px;
        height: 144px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .view{
        color: rgb(26, 115, 232);
        width: 100%;
        display: flex;
        justify-content: end;
        cursor: pointer;
    }

    .btn-right{
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .noti{
        width: 780px;
        height: 72px;
        border-radius: 5px;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 0 30px;
    }

    .stream-body{
        display: flex;
        gap: 25px;
    }

    .avatar-stream{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        background-color: red;
        color: #ffffff;
        align-items: center;
    }
</style>
