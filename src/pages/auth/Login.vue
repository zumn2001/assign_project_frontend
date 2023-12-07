<template >
    <div class="items-center align-middle">
        <form action="" @submit.prevent="login" class="absolute top-[20%] w-1/4 shadow-lg right-[40%]">
            <div class="flex justify-center  my-1 px-3 py-2">
                <img  style="width: 120px; height: 120px;" src="../../../public/image/logo-social.png" alt="">
            </div>
            <h1 class="text-center font-semibold my-1 text-3xl text-gray-600">Login in to your account</h1>
            <p class="text-gray-400 text-center my-2">Welcome back!</p>
            <div class="px-2 py-3 mx-2">
                <label class="" for="">Email</label>
                <input v-model="user.email" class="outline-none border my-2 py-1 px-2 w-full border-gray-200" placeholder="Enter your email" type="email" required >
            </div>
            <div class="px-2 py-2 mx-2">
                <label class="" for="">Password</label>
                <input v-model="user.password" class="outline-none border my-2 py-1 px-2 w-full border-gray-200" placeholder="password" type="password" required >
            </div>
            <div class="px-4 pb-5">
                <button class="w-full  bg-indigo-500 text-white px-1.5 py-1.5">Sign in</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import JWTService from '../../services/JWTService'
    export default {
        data() {
            return {
                user : {
                    email : '',
                    password : '',
                }
            }
        },
        methods: {
            login(){
                axios.post('http://localhost:8000/api/login',this.user).then((res)=>{
                    JWTService.saveToken(res.data.data.token);
                    console.log(res.data.data);
                    let token = JWTService.getToken();
                    if (token) {
                        this.$router.push('/admin')
                    } else {
                        alert("Error!")
                    }
                }).catch((res)=> {
                    console.log(res);
                })
            }
        },
    }
</script>

<style scoped>

</style>