<script setup lang="ts">
const currentYear=getCurrentYear();
</script>

<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="footer-left">
        <span>&copy; {{ currentYear }}</span>
      </div>
      <ul class="footer-media">
        <li class="footer-media-item">
          <a href="https://github.com/adriytkr/adriytkr-blog" class="footer-media-link">
            <!-- Github icon -->
            <svg width="24" height="24" viewBox="0 0 98 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_730_27136)">
                <path d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip0_730_27136">
                <rect width="98" height="96" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </a>
        </li>
        <div class="footer-media-item">
          <a href="https://www.youtube.com/@adriytkr" class="footer-media-link">
            <!-- Youtube logo -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28.57 20">
              <g>
                <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="currentColor"/>
                <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="rgb(var(--background-color))"/>
              </g>
            </svg>
          </a>
        </div>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.footer-main{
  width:100%;
  max-width:850px;
  padding:16px;
  margin:0 auto;
  display:flex;
  justify-content:space-between;
}

.footer-media{
  display:flex;
  column-gap:16px;
}

.footer-media-link{
  transition:color 100ms;
}
.footer-media-link:hover{
  color:rgb(var(--primary-color));
}
</style>
