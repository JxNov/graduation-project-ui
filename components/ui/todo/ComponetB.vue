<template>
  <div class="component-a">
    <div class="no-due">No due date</div>
    <div class="inner-ass">
        <div class="icon-ass">
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
      <div>
        <div class="title-ass">Lab01</div>
        <div class="title-ass1">WEB2014</div>
        <div class="title-ass1">Posted Friday, 24 Feb 2024</div>
      </div>
    </div>
    <div class="inner-ass">
      <div class="icon-ass">
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
      <div>
        <div class="title-ass">Lab02</div>
        <div class="title-ass1">WEB1196</div>
        <div class="title-ass1">Posted Friday, 04 Feb 2023</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Có thể thêm logic hoặc props nếu cần
</script>

<style scoped>
.component-a {
}
.inner-ass {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
.no-due {
  font-size: 1rem;
  font-weight: 500;
  color: #3c4043;
}

.title-ass {
  font-size: 0.875rem;
  font-weight: 500;
  color: #3c4043;
}

.title-ass1 {
  font-size: 0.875rem;
  font-weight: 300;
  color: #3c4043;
}

.icon-ass {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(105, 105, 149);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
