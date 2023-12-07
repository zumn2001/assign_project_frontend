<template>
    <div class="px-4">
        <div>
            <div class="my-auto flex item items-center  w-full ">
                <button @click="showTable" class="px-2 py-1"  :class="table ? 'text-indigo-500 ' : 'text-black '">Categories</button>
                <span class="material-icons-sharp">
                    arrow_forward_ios
                </span>                
                <span class="text-indigo-500 px-2 py-1" v-if="form || categoryEdit" >Add Categories</span>
            </div>
            <div class="my-4 flex justify-end  w-full ">
                <button @click="showForm" class="px-6 py-1 rounded-md" :class="form ? 'hidden' : 'text-white bg-indigo-500 py-1.5 px-3' ">+ Add Categories</button>
            </div>      
        </div>
        <CreateCategory @reload="showTable" v-if="form"/>
        <ViewCategory @edit="showEdit" v-if="table"/>
        <EditCategory @reload="showTable" :id="idToEdit"  v-if="categoryEdit"/>

    </div>
</template>

<script>
import CreateCategory from '../../components/admin/category/CreateCategory.vue';
import ViewCategory from '../../components/admin/category/ViewCategory.vue';
import EditCategory from '../../components/admin/category/EditCategory.vue';

    export default {
        components : {
                CreateCategory, ViewCategory, EditCategory,
        },
        data() {
            return {
                table : true,
                form : false,
                categoryEdit : false,
                idToEdit : null,
            }
        },
        methods: {
            showTable() {
                this.table = true;
                this.form = false;
                this.categoryEdit = false;
            },
            showForm() {
                this.table = false;
                this.form = true;
                this.artistEdit = false;
            },
            showEdit(id) {
                this.idToEdit = id;
                this.table = false;
                this.form = false;
                this.categoryEdit = true;
            }
        },
    }
  
</script>

<style scoped>

</style>