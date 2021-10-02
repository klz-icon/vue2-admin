<template>
    <div id="main-wrap">
        <div class="main-content">

            <div class="content"> <router-view/></div>
        </div>
       
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap{
//    position: fixed;
//    left: $navMenu;
//    top: 60px;
//    right: 0;
//    bottom: 0;
//    padding: 30px;
//    padding-left: 30px;
//    border: 30px solid #f7f7f7;
//    background-color: #fff;
//    border-bottom: none;
//    -webkit-box-sizing: border;
    height: 100vh;
}
.main-content {
    width: 100%;
    height: 100%;
    padding-top: $layoutHeader + 30;
    padding-right: 30px;
    padding-left: $navMenu + 30;
    @include webkit(box-sizing,border-box);
    @include webkit(transition, all .3s ease 0s);
}

.content {
    width: 100%;
    height: 100%;
    padding: 30px 30px 0 30px;
    background-color: #fff;
    @include webkit(box-sizing,border-box);
}

.open {
    .main-content { padding-left: $navMenu + 30; }
}
.close {
    .main-content { padding-left: $navMenuMin + 30; }
}
</style>