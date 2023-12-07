<template>
    <div class="px-4">
        <div>
            <div class="my-auto flex item items-center w-full">
                <button @click="showTable" class="px-2 py-1" :class="table ? 'text-indigo-500 ' : 'text-black '">
                    Item List
                </button>
                <span class="material-icons-sharp"> arrow_forward_ios </span>
                <span class="text-indigo-500 px-2 py-1" v-if="form || itemEdit">Add Items</span>
            </div>
            <div class="my-4 flex justify-end w-full">
                <button @click="showForm" class="px-6 py-1 rounded-md"
                    :class="form ? 'hidden' : 'text-white bg-indigo-500 py-1.5 px-3'">
                    + Add Items
                </button>
            </div>
        </div>
        <CreateItem @reload="showTable" v-if="form" />
        <ViewItem @edit="showEdit" v-if="table" />
        <EditItem @reload="showTable" :id="idToEdit" v-if="itemEdit" />
    </div>
</template>

<script>
import CreateItem from "../../components/admin/item/CreateItem.vue";
import ViewItem from "../../components/admin/item/ViewItem.vue";
import EditItem from "../../components/admin/item/EditItem.vue";

export default {
    components: {
        CreateItem,
        ViewItem,
        EditItem,
    },
    data() {
        return {
            table: true,
            form: false,
            itemEdit: false,
            idToEdit: null,
        }
    },

     methods: {
        showTable() {
            this.table = true;
            this.form = false;
            this.itemEdit = false;

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
            this.itemEdit = true;
        },
    },
};
</script>

<style scoped></style>
