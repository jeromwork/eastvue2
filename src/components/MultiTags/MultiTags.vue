<template>
    <v-combobox
            hide-selected
            multiple
            outlined
            small-chips
            v-model="select"
            :items="listItems"
            :deletable-chips="true"
            @focus="GET_ITEMS"
            @update:search-input="search"
            @change="console"
    ></v-combobox>


</template>





<script>
    import axios from 'axios'
    export default {

        name: 'MultiTags',

        props: {
            typeTag:{
                type: String,
                required: true,
            },

        },
        components: {

        },
        data: () => ({

            items: [
                {value:0, text:''},
            ],
            select: [],
            info:{},
        }),

        methods: {
            console()
            async search(val){

                if(!val) {return;}
                const formData = new FormData();
                formData.append("action", 'doctors/get');
                formData.append("cors_key", '8cbd6a0c2e767862b02887a446bb34ca');
                formData.append("include_fields", JSON.stringify({'id':'value', 'fullname':'text'}));
                formData.append("search", val);
                formData.append("length", '25');
                axios
                    .post('http://dev.eastclinic.local/assets/components/eastclinic/iservices/connector.php', formData)
                    .then(response => {
                        this.info = response;


                        this.items = response.data.data;
                        //console.log(this);
                        //
                    }).catch(error => console.log(error));
            },


            async GET_ITEMS(){
                const formData = new FormData();
                formData.append("action", 'doctors/get');
                formData.append("cors_key", '8cbd6a0c2e767862b02887a446bb34ca');
                formData.append("include_fields", JSON.stringify({'id':'value', 'fullname':'text'}));
                formData.append("length", '25');
                axios
                    .post('http://dev.eastclinic.local/assets/components/eastclinic/iservices/connector.php', formData)
                    .then(response => {
                        this.info = response;


                        this.items = response.data.data;
                        //console.log(this);
                        //
                    }).catch(error => console.log(error));
            },
        },
        created(){
            // console.log('createdMultiTags');
            // this.GET_ITEMS();

        },

        computed:{

            listItems:{
                get(){
                    console.log(this.items);
                    return this.items;
                },
                // set(val){        console.log(val);
                //     this.items = val;
                // },
            },

        }


    }
</script>

<style scoped>

</style>
