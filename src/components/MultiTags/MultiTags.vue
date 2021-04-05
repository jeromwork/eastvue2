<template>

    <v-autocomplete
            hide-selected
            multiple
            outlined
            small-chips
            v-model="select"
            :items="listItems"
            :deletable-chips="true"
            :auto-select-first="true"
            :search-input.sync="searchInput"
            :menu-props="{ offsetY: true, }"
            :hide-no-data="true"
            :label="this.placeholder"
            v-on:change="$emit('custom', select)"
    ></v-autocomplete>

</template>





<script>
    import axios from 'axios'
//todo Сделать ajax подгрузку
    //сейчас все тэги загружаются при создании компонента.
    //если 800 штук плохо но терпимо
    //но если будут десятки тысяч, нужно переделывать на ajax
    export default {

        name: 'MultiTags',

        props: {
            typeTag:{
                type: String,
                required: true,
            },
            placeholder:{
                type: String,
            },
            include_fields:{
                type: Object,
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
            searchInput:null,
        }),



        methods: {
            removeItem: function() {

                // генерируем событие 'remove' и передаём id элемента
                this.$emit('custom', 'somedata');
                console.log('removeItem');
            },
            async search(val){
                console.log('search');
                if(!val) {return;}
                const formData = new FormData();
                formData.append("action", this.typeTag + '/get');
                formData.append("cors_key", '8cbd6a0c2e767862b02887a446bb34ca');
                formData.append("include_fields", JSON.stringify({'id':'value', 'fullname':'text'}));
                if(this.searchInput){
                    formData.append("search", this.searchInput);
                }

                formData.append("length", '1000');
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
                let qdata = {
                    action: this.typeTag + '/get',
                    cors_key : '8cbd6a0c2e767862b02887a446bb34ca',
                    include_fields : this.include_fields,
                    length : 1000,
                };
                axios

                    .post('http://dev.eastclinic.local/assets/components/eastclinic/iservices/connector.php', qdata)
                    .then(response => {
                        this.items = response.data.data;

                        //this.commit('doctorSettings/FILL_DOCTOR_SETTINGS_DATA', response.data);
                    });
            },
        },
        created(){
            // console.log('createdMultiTags');
             this.GET_ITEMS();

        },

        computed:{

            listItems:{
                get(){
                    //console.log(this.items);
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
