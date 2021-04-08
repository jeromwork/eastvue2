import axios from 'axios'

export default {
  namespaced:true,
  mutations: {
    SET_CURRENT_DOCTOR_ID(state, val) {

      state.currentDoctorId = val;
      //this.GET_DOCTOR_SETTINGS_AJAX();
      //console.log(state);
    },
    FILL_DOCTOR_SETTINGS_DATA(state, doctor) {

      state.doctorSettings = doctor.data[0];
      console.log(state);
      },
    SET_DOCTOR_TAGS(state, tags ={}) {

      if(!state.doctorSettings.bind){
        console.log('обновляем bind');
        state.doctorSettings.bind = {};
      }


      state.doctorSettings.bind[tags.name] = tags.data ;
      console.log(state);

      },
    SET_LIST_DOCTORS(state, doctors) {

      if(!Array.isArray(doctors)){console.log('необходимо передать массив');}

      state.doctors = doctors;
//здесь преобразуем присланный массив в формате сервера в формат нужный для select
//       state.doctors= doctors.map(function (doc) {
//        // console.log(doc);
//         return {value:doc.doc__id, text:doc.doc__fullname};
//       });


    },
  },
  actions:{

    async GET_DOCTORS_AJAX(){
      let qdata = {
        action:  'doctors/get',
        cors_key : '8cbd6a0c2e767862b02887a446bb34ca',
        include_fields : {doc__id:'value', doc__fullname:'text'},
        length : 1000,
      };

      axios
          .post('http://dev.eastclinic.local/assets/components/eastclinic/iservices/connector.php', qdata)
          .then(response => {this.info = response

            console.log(response.data);
            this.commit('doctorSettings/SET_LIST_DOCTORS', response.data.data);
            //
          }).catch(error => console.log(error));
    },
    async GET_DOCTOR_SETTINGS_AJAX({getters}){
      const formData = new FormData();
      formData.append("action", 'doctors/get');
      formData.append("cors_key", '8cbd6a0c2e767862b02887a446bb34ca');
     // formData.append("fields", 'id, fullname');
      formData.append("id", getters.currentDoctorId);


      axios

          .post('http://dev.eastclinic.local/assets/components/eastclinic/iservices/connector.php', formData)
          .then(response => {this.info = response

            console.log(response);
            this.commit('doctorSettings/FILL_DOCTOR_SETTINGS_DATA', response.data);
          });
    },
    async SAVE_DOCTOR_SETTINGS_AJAX({getters, state}){
console.log(state);
      let qdata = {
        ...state.doctorSettings,
        action:'doctors/set',
        cors_key:'8cbd6a0c2e767862b02887a446bb34ca',
        id:getters.currentDoctorId};
      axios

          .post('http://dev.eastclinic.local/assets/components/eastclinic/iservices/connector.php', qdata)
          .then(response => {this.info = response

            //this.commit('doctorSettings/FILL_DOCTOR_SETTINGS_DATA', response.data);
          });
    },




    async getDoctorsAjax2(){
      const res = await fetch('https://gorest.co.in/public-api/users');
      //console.log(res);
      const initialData = await res.json();


      this.commit('doctorSettings/initialData', initialData);


      //this.commit('Shops/initialData', initialData);
//ctx.commit('setPF', JSON.parse(prods));
    }
  },
  state: {
    doctorSettings:
      {id:0,
        email: 0,
        name: 0,
        gender: 0}
    ,
    doctors:[
      {id:0, name:'Выберите доктора'}
    ],
    currentDoctorId:1,
    arrChildAge:[
      {value:'-1', text:'Не работает с детьми'},
        {value:'0', text:'Новорожденный'},
      {value:'1', text:'с 1го месяца'},
      {value:'2', text:'с 2х месяцев'},
    ],
  },
  getters: {
    getDoctors: state => {        return state.doctors;      },
    getArrChildAges: state => {        return state.arrChildAge;      },
    //todo разобраться почему currentDoctorId is not a function
    currentDoctorId: state => {        return state.currentDoctorId;      },
    doctorSettings: state => {        return state.doctorSettings ;      },
    tagsSelected: state => type =>  {
      console.log(type);

      if(state.doctorSettings['bind'] && state.doctorSettings['bind']['IssSpecials']){
        console.log(state.doctorSettings['bind']['IssSpecials']);
        return state.doctorSettings['bind']['IssSpecials'] ;
      }else{
        return[];
      }
          },
  },








}
