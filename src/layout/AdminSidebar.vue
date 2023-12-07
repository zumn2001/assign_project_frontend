<template>
        
    <div id="side" class="bg-gray-200 ">
        <ul class="py-2 px-2 mt-10 bg-white " >
            <router-link :to="{name : AdminDashboardLayout, path : '/admin'}" class="flex items-center  px-12 ">
                <span class="material-icons-sharp">storage</span>
                <span class="text-lg px-5 ">Admin Panel</span>
            </router-link>
        </ul>
        <ul class="py-4 my-2 px-3 " >
            <li class="my-2"  v-for="item in items" :key="item.name" :class="currentRouteName == item.path ? 'bg-indigo-500 text-white rounded-md': ''" >
                <router-link class="flex items-center w-full px-8 py-4 text-lg" :to="{name : item.path}">
                    <span style="padding-right: 10px;" class="material-icons-sharp">{{ item.icon }}</span> &nbsp;{{ item.name }}
                </router-link>
            </li>
            <li>
                <button @click="logout" class="flex items-center w-full my-1 py-4 text-lg px-8">
                    <span  class="material-icons-sharp">logout</span>
                    &nbsp;&nbsp;Logout
                </button>
            </li>
        </ul>

    </div>
</template>

<script>
import JWTService from '../services/JWTService';
    export default {
        data() {
            return {
                items : [
                    {
                        name : 'Item',
                        path : 'ItemPage',
                        icon : 'grid_view'
                    },
                    {
                        name : 'Category',
                        path : 'CategoryPage',
                        icon : 'format_list_bulleted'
                    },
                ]
            }
        },
        computed : {
            currentRouteName() {
                return this.$route.name;
            }
        },
        methods: {
            logout(){
                JWTService.destroyToken();
                window.location.assign('/login')
            }
        },
    }
</script>

<style scoped>

</style>