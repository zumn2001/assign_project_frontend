<template>
    <div >
        <h1 class="bg-gray-200 px-3 rounded-md py-2 ">Add Categories</h1>
        <form action=""  @submit.prevent="createCategory">
            <div class="flex flex-col my-5">
                <label for="" >Category</label>
                <input v-model="category.name" type="text" placeholder="Input Name" class="px-1.5 py-2 my-3 outline-none w-[40%] border border-gray-200 rounded-md" required>
            </div>
            <div class="flex flex-col my-5">
                <label for="" >Category Photo</label>
                <div class="flex items-center justify-center w-[40%]">
                    <div class="flex justify-center w-full ">
                        <img @click="fillFileInput" :class="previewImage ? 'hidden' : ''"  src="../../../../public/image/drap&drop.png" alt="">
                        <input ref="fileInputRef" type="file" @change="saveImage" class="hidden">
                        <img v-if="previewImage" style="height: 240px;" class="w-[70%]" :src="previewImage" alt="">                    
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
import APIServie from '../../../services/APIService'
    export default {
        data() {
            return {
                category : {
                    name : '',
                    status : false,
                    image_id : '',
                },
                previewImage : '',
            }
        },
        methods: {

            createCategory(){
                APIServie.post('admin/categories',this.category).then((res)=> {
                    window.location.reload();
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
                APIServie.post('admin/category-images', form).then((res) => {
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
        
    }
</script>

<style scoped>

</style>