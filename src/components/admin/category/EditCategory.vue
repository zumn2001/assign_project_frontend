<template>
    <div>
        <h1 class="bg-gray-200 px-3 rounded-md py-2 ">Add Categories</h1>
        <form action=""  @submit.prevent="editCategory">
            <div class="flex flex-col my-5">
                <label for="" >Category</label>
                <input v-model="category.name" type="text" placeholder="Input Name" class="px-1.5 py-2 my-3 outline-none w-[40%] border border-gray-200 rounded-md" required>
            </div>
            <div class="flex flex-col my-5">
                <label for="" >Category Photo</label>
                <div class="flex items-center justify-center w-[40%]">
                    <div class="flex justify-center w-full ">
                        <img @click="fillFileInput" v-if="previewImage" style="height: 240px;" class="w-full" :src="previewImage" alt="">
                        <input ref="fileInputRef" type="file" @change="saveImage" class="hidden">
                        <img v-if="!previewImage" style="height: 240px;" class="w-full" :src="previewImage" alt="">                    
                    </div>                    
                </div>          
            </div>
            <div class="flex flex-col my-5 ">
                <label for="" >Status</label>
                <div class="flex items-center">
                    <input @change="setStatus" type="checkbox" placeholder="Input Name" class="px-6 my-3 outline-none border border-gray-200 rounded-md" >
                    <span class="text-sm ml-2 text-gray-500">Publish</span>
                </div>
            </div>
            <div class="w-[65%] flex justify-center">
                <div @click="$emit('reload')" class="px-8 py-1.5 text-indigo-500">Cancel</div>
                <button class="px-8 py-1.5 text-white bg-indigo-500 rounded-md">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import ApiService from '@/services/APIService'
    export default {
        props : [ 'id'],
        data() {
            return {
                category : {},
                previewImage : ''
            }
        },
        methods: {

            editCategory(){
                ApiService.patch(`admin/categories/${this.id}`,this.category).then((res)=> {
                    console.log(res);
                    this.$emit('reload')
                }).catch((res)=>{
                    console.log(res);
                })
            },

            setStatus(e){
                if (e.target.value) {
                    this.category.status = true
                }
            },
            saveImage(e) {
                let form = new FormData();
                form.set('image' , e.target.files[0]);
                ApiService.post('admin/category-images', form).then((res) => {
                    this.category.image_id = res.data.data.id;
                }).catch((res) => {
                    console.log(res);
                })
                this.previewImage = URL.createObjectURL(e.target.files[0])
            },
            imagePath(filename) {
                return "http://localhost:8000/image/" + filename;
            },
            fillFileInput() {
                this.$refs.fileInputRef.click();
            },
        },
        mounted() {
            ApiService.get(`admin/categories/${this.id}`).then((res)=> {
                this.category = res.data.data
                this.previewImage = this.imagePath(res.data.data.image_id.image)
            }).catch((res)=> {
                console.log(res);
            })
        },
        
    }
</script>

<style scoped>

</style>