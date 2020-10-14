<template>
    <div >
       
     <v-form class="justify-center m-auto">
         <v-file-input
               accept=".csv"                  
                   label="File input"  
                   v-model="files"
                   @change="onFileChange"
           ></v-file-input>

           <v-container>
      <v-row>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="username"
            
            :counter="20"
            label="username"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="Identifier"
            
            :counter="10"
            label="Identifier"
            required
          ></v-text-field>
        </v-col>

         <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="firstname"
            
            :counter="20"
            label="FIrst name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="lastname"
            :counter="20"
            label="Last Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
           </v-container>

            <v-btn block rounded color="teal" type="submit" @click="formUpload">submit</v-btn>
            </v-form>

    <v-container>
    <v-row >
      <v-col v-for="item in csvdata" :key="item.id" cols="4">
     <v-card 
    class="mx-auto"
    max-width="344"
    outlined
    >

       
<v-card-title>{{item.username}}</v-card-title>
<v-card-subtitle>{{item.Identifier}}</v-card-subtitle>
<v-card-text>{{item.first_name}} {{item.last_name}}</v-card-text>

  </v-card>
      </v-col>
    </v-row>
</v-container>

        <!-- <CsvApi :data="fileinput"/> -->
    </div>
</template>

<script>
// import CsvApi from '../components/CsvApi.vue';
import axios from 'axios';
export default {
    name:"CsvReader",
    data(){
        return{
            files:{},
              fileinput:[],
              csvdata:[],
              username:'',
              Identifier:'',
              firstname:'',
              lastname:'',
              flag: false
        }
    },
      mounted()
    {
            axios.get('http://localhost:8000/api/csv').then(res =>{
                    this.csvdata=res.data;                
            })
    },
    
    methods:{

       onFileChange(files) {
       this.flag = true;
      this.getAsText(files);
  
    },

     getAsText(fileToRead) {
      var reader = new FileReader();     
      reader.readAsText(fileToRead);
      reader.onload = this.loadHandler;
      reader.onerror = this.errorHandler;
    },

     loadHandler(event) {
      var csv = event.target.result;
      this.processData(csv);
    },

     processData(csv) {
        var allTextLines = csv.split(/\r\n|\n/);
        
        for (var i=1; i<allTextLines.length; i++) {
            
            var data = allTextLines[i].split(',');

               let  tmp = {
                    'username': data[0],
                     'Identifier': data[1],
                     'first_name': data[2],
                     'last_name': data[3]

                };
                this.fileinput.push(tmp);
                }
     
      console.log(this.fileinput);
    
    },

     errorHandler(evt) {
      if(evt.target.error.name == "NotReadableError") {
          alert("Canno't read file !");
      }
    },

    formUpload(){
    //     console.log(this.username);
    //     if(this.flag){

    //         let  tmp = {
    //                 'username': this.username,
    //                  'Identifier': this.Identifier,
    //                  'first_name': this.firstname,
    //                  'last_name': this.lastname

    //             };
    //             this.fileinput.push(tmp);
    //             console.log(this.fileinput);
    //             console.log(this.username);

    // }

        axios.post('http://localhost:8000/api/csv',this.fileinput);
    }
}
}
</script>