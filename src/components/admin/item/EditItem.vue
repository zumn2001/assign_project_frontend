<template>
    <div>
        <h1 class="bg-gray-200 px-3 rounded-md py-2 ">Add Items</h1>
        <form @submit.prevent="editItem" class="flex flex-wrap justify-between w-[70%] py-5" action="">
            <div class="w-[45%]">
                <h1 class="my-5 ">Item Information</h1>
                <div class="my-3">
                    <label for="">Item Name</label>
                    <input v-model="item.item_name" class="w-full my-2 py-1 px-2 outline-none border border-gray-200 rounded-md" type="text" placeholder="Input Name">
                </div>
                <div class="my-3">
                    <label for="">Select Category</label>
                    <select v-model="item.category_id" class="w-full my-2 py-1.5 px-2 text-gray-500 bg-gray-100"  name="" id="">
                        <option v-for="category in categories" :key="category.id" :value="category.id"> {{ category.name }}</option>
                    </select>
                </div>
                <div class="my-3">
                    <label for="">Price</label>
                    <input v-model="item.price" class="w-full my-2 py-1 px-2 outline-none border border-gray-200 rounded-md" type="text" placeholder="Enter Price">
                </div>
                <div class="my-3">
                    <label for="">Description</label>
                    <quill-editor v-model:content="item.description"  theme="snow" toolbar="full" contentType="text"></quill-editor>
                </div>
                <div class="my-3">
                    <label for="">Select Item Condition</label>
                    <select v-model="item.item_condition" class="w-full my-2 py-1.5 px-2 text-gray-500 bg-gray-100"  name="" id="">
                        <option v-for="condition in item_conditons" :value="condition.condition" :key="condition.condition">{{ condition.condition }}</option>
                    </select>
                </div>
                <div class="my-3">
                    <label for="">Select Item Type</label>
                    <select v-model="item.item_type" class="w-full my-2 py-1.5 px-2 text-gray-800 bg-gray-100"  name="" id="">
                        <option :value="kinds.type" v-for="kinds in item_types" :key="kinds.type">{{ kinds.type }}</option>
                    </select>
                </div>
                <div class="flex flex-col my-5 ">
                    <label for="" >Status</label>
                    <div class="flex items-center">
                        <input @change="setStatus" type="checkbox" placeholder="Input Name" class="px-6 my-3 outline-none border border-gray-200 rounded-md" >
                        <span class="text-sm ml-2 text-gray-500">Publish</span>
                    </div>
                </div>
                <div class="flex flex-col my-5">
                <label for="" >Item Photo</label>
                <div class="flex items-center justify-center ">
                    <div class="flex justify-center w-full ">
                        <img @click="fillFileInput" v-if="previewImage" style="height: 240px;" class="w-full" :src="previewImage" alt="">
                        <input ref="fileInputRef" type="file" @change="saveImage" class="hidden">
                        <img v-if="!previewImage" style="height: 240px;" class="w-full" :src="previewImage" alt="">                    
                    </div>                    
                </div> 
            </div>
            </div>
            <div class="w-[45%]">
                <h1 class="my-5">Owner Information</h1>
                <div class="my-3">
                    <label for="">Owner Name</label>
                    <input v-model="item.owner_name" class="w-full my-2 py-1 px-2 outline-none border border-gray-200 rounded-md" type="text" placeholder="Input Owner Name">
                </div>
                <div class="my-3">
                        <label for="">Contact Number</label>
                        <div class="border flex my-2 border-gray-200">
                            <span class="text-center w-[20%] border-r border-r-gray-200 px-2 py-1">
                                + 95
                            </span>
                            <input v-model="item.phone" type="text" class="w-[80%] outline-none px-2 py-1 bg-transparent"/>
                        </div>
                    </div>
                <div class="my-3">
                    <label for="">Address</label>
                    <input v-model="item.address" class="w-full my-3 py-1 px-2 outline-none border border-gray-200 rounded-md" type="text" placeholder="Enter Address">
                </div>
                <div class="map" style="width: 480px; height: 400px;">
                    <label for="">Iframe</label>
                    <input v-model="item.location" class="w-full my-3 py-1 px-2 outline-none border border-gray-200 rounded-md" type="text" placeholder="Enter Iframe">
                    <div class="w-full" v-html="location" ></div>
                </div>
            </div>
            <div class="w-full  flex justify-end">
                <div @click="$emit('reload')" class="px-8 py-1.5 mx-2 text-indigo-500">Cancel</div>
                <button  class="px-8 py-1.5 mx-2 text-white bg-indigo-500 rounded-md">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill';
import ApiService from '@/services/APIService';
    export default {
        props : ['id'],
        components : {
            QuillEditor
        },
        data() {
            return {
                location : '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244399.5833216788!2d96.0167636267012!3d16.839076729176696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1949e223e196b%3A0x56fbd271f8080bb4!2sYangon!5e0!3m2!1sen!2smm!4v1701796837305!5m2!1sen!2smm" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
                item : {},
                categories : [],
                                item_conditons : [
                    {condition : 'New'},
                    {condition : 'Used'},
                    {condition : 'Second Hand'},

                ],
                item_types : [
                    {type : 'Sell'},
                    {type : 'Buy'},
                    {type : 'Exchange'},

                ],
                previewImage : ''
            }
        },
        methods : {
            editItem(){
                ApiService.patch(`admin/items/${this.id}`,this.item).then((res)=> {
                    console.log(res);
                    window.location.reload();
                }).catch((res)=>{
                    console.log(res);
                })
            },
            setStatus(e){
                if (e.target.value) {
                    this.item.status = true
                }
            },
            saveImage(e) {
                let form = new FormData();
                form.set('image' , e.target.files[0]);
                ApiService.post('admin/item-images', form).then((res) => {
                    this.item.image_id = res.data.data.id;
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
            ApiService.get(`admin/items/${this.id}`).then((res)=>{
                this.item = res.data.data
                this.previewImage = this.imagePath(res.data.data.image_id.image)
            }).catch((res)=> {
                console.log(res);
            })
            ApiService.get('admin/categories').then((res)=> {
                this.categories = res.data.data.categories
            }).catch((res)=> {
                console.log(res);
            })
        },
    }
</script>

<style scoped>

</style>