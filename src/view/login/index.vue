<script lang="ts" setup>
import Bg from "../../assets/my.png"
</script>
<template>
    <div class="main">
        <img :src="Bg" alt="bg" class="bg">
        <el-card class="card" title="登陆">
            <template #header>
                登陆
            </template>
        </el-card>
    </div>
</template>
<style scoped>
.main{
    width: 100vw;
    height: 100vh;
}
.bg{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    background-size: 100% 100%;
}
.card{
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 400px;
    height: 600px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>