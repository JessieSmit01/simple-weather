<template>
<b-container>
    <b-navbar  type="dark" variant="dark">
        <h2 style="color:white" v-if="Account.userName !== ''">Welcome {{Account.userName}}</h2>
        <b-navbar-nav class="ml-auto">
            
            <b-nav-form>
                <b-form-input class="mr-sm-2" v-model="user" placeholder="Username"></b-form-input>
                <b-form-input class="mr-sm-2" v-model="password" placeholder="Password"></b-form-input>
                <b-button variant="outline-success" class="my-2 my-sm-0" @click="signup">Create Account</b-button>
                
                <b-button variant="outline-primary" class="my-2 my-sm-0" @click="login">Sign in</b-button>

            </b-nav-form>
        </b-navbar-nav>
    </b-navbar>
    
    <b-jumbotron header="Simple Weather">
         <i class="fas fa-cloud-sun" style="font-size:48px; padding-bottom: 10px;"></i>
        <b-container fluid>
            <b-row center>
                
                <b-col cols="10" lg="8" md="6">
                    <b-form-input placeholder="Enter a city" size="lg" v-model="city"></b-form-input>
                    <div class="form_error" v-if="cityEmpty">*Please enter a two-letter country code</div>

                </b-col>
                <b-col cols="10" lg="4" md="6">
                    <b-form-input placeholder="Country code: US" size="lg" v-model="country"></b-form-input>
                      <div class="error" v-if="!$v.country.required">*Country is required</div>
                      <div class="form_error" v-if="!$v.country.length> $v.country.maxLength">*Please enter a two-letter country code</div>
                </b-col>
                
            </b-row>
            <b-row style="padding-top: 10px;">
                <b-col cols="6" sm="4" md="3" lg="3">
                    <b-button variant="primary" block @click="getWeather" width="100%" >Get Weather</b-button>
                </b-col>
            </b-row>
        </b-container>
    </b-jumbotron>
    
    <b-container v-if="typeof this.weather.main !== 'undefined'">
        <template v-if="weather.main.feels_like < '-1'">
            <b-card  bg-variant="info" text-variant="white">
                <template v-slot:header>
                    <h1>{{weather.name}}</h1>
                </template>
                <b-row>
                    
                        <b-col cols="12" >
                            <h1><b>Temperature: </b>{{weather.main.temp}} °C</h1>
                        </b-col>
                        <b-col cols="12" >
                            <h4><b>Feels Like: </b>{{weather.main.feels_like}} °C</h4>
                        </b-col>
                        <b-col cols="12" >
                            <h4>{{description}}</h4>
                        </b-col>
                        
                    </b-row>
            </b-card>
        </template>
        <template v-else-if="weather.main.feels_like < '15'">
            <b-card  bg-variant="light" >
                <template v-slot:header>
                    <h1>{{weather.name}}</h1>
                </template>
                <b-row>
                    
                        <b-col cols="12" >
                            <h1>Temperature: {{weather.main.temp}} °C</h1>
                        </b-col>
                        <b-col cols="12" >
                            <h4>Feels Like: {{weather.main.feels_like}} °C</h4>
                        </b-col>
                        <b-col cols="12" >
                            <h4>{{description}}</h4>
                        </b-col>
                    
                    </b-row>
            </b-card>
        </template>
        <template v-else-if="weather.main.feels_like >= '15'">
            <b-card  bg-variant="danger" text-variant="white">
                <template v-slot:header>
                    <h1>{{weather.name}}</h1>
                </template>
                <b-row>
                    
                        <b-col cols="12" >
                            <h1>Temperature: {{weather.main.temp}} °C</h1>
                        </b-col>
                        <b-col cols="12" >
                            <h4>Feels Like: {{weather.main.feels_like}} °C</h4>
                        </b-col>
                        <b-col cols="12" >
                            <h4>{{description}}</h4>
                        </b-col> 
                    </b-row>
            </b-card>
        </template>
        
        
    </b-container>
</b-container>
    
    
        
</template>

<script>
const axios = require('axios').default;
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {  
    name:"home",
    data: () => {
        return{
            key: "e7825412f48a6170486522b35f775c76",
            url_base: "https://api.openweathermap.org/data/2.5/",
            city: '',
            country: '',
            cityEmpty: '',
            description: '',
            sunrise: '',
            weather: {},
            Account:{userName:''},
            user: '',
            password: ''
        }
    },
    validations:{
        country:{
            required,
            minLength: minLength(2),
            maxLength: maxLength(2)
        },
        city:{
            required
        }
    },

    methods:{
        getWeather(){
           if(this.$v.$invalid)
           {
               //dont call api, city must be entered
               !this.$v.city.required ? this.cityEmpty = true : this.cityEmpty = false;
           } else{
            this.cityEmpty = false;
            axios.get(this.url_base
                + "weather?q=" 
                + this.city + ' ,' + this.country 
                + "&units=metric&APPID="
                +this.key)
                .then(response =>{
                    return response.data;
                }).then(this.setResults);
                
           }
            
        },
        setResults(results){
            this.weather = results;
            this.description = results.weather[0].description;

        },
        login(){
            return;
        },
        signup(){
            axios({
                method: "POST",
                url: "http://localhost:3000/accounts",
                
                data: {
                    username: this.user,
                    password: this.password

                }
                })
                .then(res => {
                        this.Account.userName = res.data.username;
                    });
            }
        }
    }

</script>

<style scoped>
.form_error {
  color: red;
  
  padding-left: 10px;
}


</style>
