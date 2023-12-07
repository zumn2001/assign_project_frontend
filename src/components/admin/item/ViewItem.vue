<template>
    <div >
      <vue-good-table
        :columns="columns"
        :rows="items"
        :search-options="{enabled: false}"
        :select-options="{ enabled: false , selectOnCheckboxOnly: false, }"

        >
        <template  #table-column="props">
                  <span class="text-sm">{{ props.column.label }}</span>
      </template>
  
              <template #table-row="props">
                  <span class="flex  relative w-full text-center " v-if="props.column.field == 'actions'">

                          <button @click="editItem(props.row.id)" class="px-1 py-0.5 mx-2 text-md bg-green-400 rounded-lg">
                            <span style="color: aliceblue;" class="material-icons-sharp">
                                edit
                            </span>
                          </button>
                          <button @click="deleteItem(props.row.id)" class="px-1 py-0.5 mx-2 bg-red-500 text-md rounded-lg">
                            <span style="color: aliceblue;" class="material-icons-sharp">
                                delete
                            </span>
                          </button>
                  </span>
                  <span v-if="props.column.field == 'status'">
    <label class="relative inline-flex items-center mb-5 cursor-pointer">
      <input type="checkbox" value="" class="sr-only peer">
      <div
        :class="{
          'w-9 h-5 bg-gray-200': props.row.status,
          'w-9 h-5 bg-sky-800': !props.row.status,
          'peer-focus:outline-none': true,
          'peer-focus:ring-4': true,
          'peer-focus:ring-blue-300': true,
          'dark:peer-focus:ring-blue-800': true,
          'rounded-full': true,
          'peer': true,
          'dark:bg-gray-700': true,
          'peer-checked:after:translate-x-full': true,
          'rtl:peer-checked:after:-translate-x-full': true,
          'peer-checked:after:border-white': true,
          'after:absolute': true,
          'after:top-[2px]': true,
          'after:start-[2px]': true,
          'after:bg-white': true,
          'after:border-gray-300': true,
          'after:border': true,
          'after:rounded-full': true,
          'after:h-4': true,
          'after:w-4': true,
          'after:transition-all': true,
          'dark:border-gray-600': true,
          'peer-checked:bg-blue-600': true
        }"
      ></div>
    </label>
  </span>
                <span class="text-sm" v-else>{{props.formattedRow[props.column.field]}}</span>
              </template>
              <template #table-actions-bottom>
                <Pagination  v-if="paginationData.current_page"  :paginationProp="paginationData" @next="paginateNext" @previous="paginatePrevious" @random="paginateRandom"></Pagination>
            </template>
      </vue-good-table>
    </div>
  </template>
  
<script>
import ApiService from '@/services/APIService';
import { VueGoodTable } from 'vue-good-table-next';
import Pagination from '../../Pagination.vue';
      export default {
          components : {
              VueGoodTable,Pagination
          },
          data() {
              return {
                  items : [],
                  paginationData : {},
                  columns : [
                      {
                        label : 'Action',
                        field : 'actions',
                      },
                      {
                        label : 'No',
                        field : 'id'
                      },
                      {
                        label : 'Name',
                        field : 'item_name'
                      },
                      {
                        label : 'Category',
                        field : 'category_id.name'
                      },
                      {
                        label : 'Description',
                        field : 'description'
                      },
                      {
                        label : 'Price',
                        field : 'price'
                      },
                      {
                        label : 'Owner',
                        field : 'owner_name'
                      },
                      {
                        label : 'Publish',
                        field : 'status'
                      }

                  ]
              }
          },
          methods: {
            getItem(page){
                ApiService.get(`admin/items?page=${page}`).then((res) => {
                    this.paginationData = res.data.data.pagination;
                    this.items = res.data.data.items;
                    console.log(res.data.data.items);
                }).catch((res) => {
                    console.log(res);
                })
            },
              editItem(id){
                  this.$emit('edit',id)
              },
              deleteItem(id){
                  ApiService.delete(`admin/items/${id}`).then(()=>{
                      window.location.reload()
                  }).catch((res)=>{
                      console.log(res);
                  })
              },
              paginateNext(page){
                this.getCategory(page)
              },
              paginatePrevious(page){
                this.getCategory(page)
              },
              paginateRandom(page){
                this.getCategory(page)
            },
          },
          mounted() {
            this.getItem();
          },
        
      }
  </script>
  
  <style scoped>
  
  </style>