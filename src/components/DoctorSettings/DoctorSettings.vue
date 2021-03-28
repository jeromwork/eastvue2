<template>
    <v-row>
        <v-col cols="12"
               sm="12"
               md="12">
            <v-card
                    elevation="8"
                    outlined
            >
                <v-card-text>
                    <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                    >
                        <v-row no-gutters >
                            <v-col cols="12"
                                   sm="12"
                                   md="12">
                                <v-select
                                        v-model="currentDoctorId"
                                        :items="listDoctors"
                                        label="Выберите доктора"
                                ></v-select>

                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12"
                   sm="12"
                   md="12">
    <v-card
            elevation="8"
            outlined
    >
        <v-card-text>

    <v-form
            ref="form"
            v-model="valid"
            lazy-validation
    >
        <v-row no-gutters >
            <v-col cols="12"
                   sm="12"
                   md="4">
                <v-text-field
                        class="pa-2"
                        v-model="doctorSettings.doc__surname"
                        :counter="10"
                        :rules="nameRules"
                        label="Фамилия"
                        required
                ></v-text-field>


            </v-col>
            <v-col cols="6"
                   sm="6"
                   md="4">
                <v-text-field
                        class="pa-2"
                        v-model="doctorSettings.doc__name"
                        label="Имя"
                ></v-text-field>
            </v-col>
            <v-col cols="6"
                   sm="6"
                   md="4">
                <v-text-field
                        class="pa-2"
                        v-model="doctorSettings.doc__middlename"
                        label="Отчество"
                ></v-text-field>
            </v-col>

        </v-row>

        <v-row no-gutters >
            <v-col cols="12"
                   sm="12"
                   md="4">

                <v-combobox
                        hide-selected
                        multiple
                        outlined
                        small-chips
                        v-model="select"
                        :items="items"
                        :deletable-chips="true"
                ></v-combobox>



            </v-col>
            <v-col cols="6"
                   sm="6"
                   md="4">
                <v-text-field
                        class="pa-2"
                        v-model="name"
                        :counter="10"
                        :rules="nameRules"
                        label="Name"
                        required
                ></v-text-field>
            </v-col>
            <v-col cols="6"
                   sm="6"
                   md="4">
                <v-text-field
                        class="pa-2"
                        v-model="name"
                        :counter="10"
                        :rules="nameRules"
                        label="Name"
                        required
                ></v-text-field>
            </v-col>

        </v-row>

        <v-select
                v-model="select"
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="Item"
                required
        ></v-select>

        <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
        ></v-checkbox>



        <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
        >
            Validate
        </v-btn>

        <v-btn
                color="error"
                class="mr-4"
                @click="reset"
        >
            Reset Form
        </v-btn>

        <v-btn
                color="warning"
                @click="resetValidation"
        >
            Reset Validation
        </v-btn>
        </v-form>
        </v-card-text>
    </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import { mapGetters , mapMutations , mapState} from "vuex";

    export default {


        name: 'doctorSettings',

        props: {
            idDoctor:{
                type: Number,
                default: 2,
            }
        },
        components: {

        },
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Имя не должно быть более 10 символов',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ],
            checkbox: false,
        }),

        methods: {
            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },
            onSaveDoctorData(){
                //console.log(this.$refs.form);//забываем jquery. Здесь не нужно брать данные формы. Они храняться в data
                this.$store.dispatch('doctorSettings/SAVE_DOCTOR_SETTINGS_AJAX');
            }
        },
        created(){
            //console.log('created');
            this.$store.dispatch('doctorSettings/GET_DOCTORS_AJAX', {limit:10});

        },

        computed:{
            //====================================================================
            ...mapGetters({getDoctors:'doctorSettings/getDoctors'
                //,currentDoctorId:'doctorSettings/currentDoctorId'
            }),

            ...mapState({currentDoctorId:'doctorSettings/currentDoctorId'}),
            //====================================================================
            ...mapMutations({SET_CURRENT_DOCTOR_ID:'doctorSettings/SET_CURRENT_DOCTOR_ID'
                //,currentDoctorId:'doctorSettings/getDoctors'
            }),
            //====================================================================

            currentDoctorId:{
                get(){        //console.log(this);
                    //todo разобраться с mapGetters и mapState
                    //return this.currentDoctorId;
                    return this.$store.getters["doctorSettings/currentDoctorId"];
                },
                set(val){
                    //this.SET_CURRENT_DOCTOR_ID(val);
                    this.$store.commit('doctorSettings/SET_CURRENT_DOCTOR_ID', val);
                    this.$store.dispatch('doctorSettings/GET_DOCTOR_SETTINGS_AJAX');
                },
            },
            doctorSettings:{
                get(){        //console.log(this);
                    return this.$store.getters["doctorSettings/doctorSettings"];
                },
                set(val){

                    console.log(val);
                    //this.SET_CURRENT_DOCTOR_ID(val);
                    //this.$store.commit('doctorSettings/SET_CURRENT_DOCTOR_ID', val);
                    //this.$store.dispatch('doctorSettings/GET_DOCTOR_SETTINGS_AJAX');
                },
            },
            listDoctors(){                return this.getDoctors;                }

        }


    }
</script>

<style scoped>

</style>