<template>
    <div id="dash" class="flex bg-white h-screen">
        <div class="w-1/6">
            <AdminSidebar class="fixed top-0 w-1/6 h-full z-20 shadow-lg" />
        </div>
        <div class="w-5/6">
            <AdminNavbar class="fixed top-0 right-0 w-5/6 shadow" />
            <div class="z-10 mt-20">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import AdminSidebar from './AdminSidebar.vue';
import AdminNavbar from './AdminNavbar.vue';
export default {
    components : {
        AdminNavbar,AdminSidebar
    }
}
</script>

<style scoped>

</style>