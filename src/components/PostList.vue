
<template>
<div >

    
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
         Create Post
        </v-btn>
      </template>

      <v-card elevation="3" shaped>
        <v-card-title>
          <span class="headline">Create Post</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
             
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  v-model="name"
                  type="text"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>

               <v-col cols="12">
                <v-text-field
                  label="username*"
                  v-model="username"
                  type="text"
                  :rules="requiredRule"
                  required
                ></v-text-field>
              </v-col>

               <v-col cols="12">
                <v-text-field
                  label="email*"
                  v-model="email"
                  type="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Title*"
                  v-model="title"
                  :rules="requiredRule"
                  required
                ></v-text-field>
              </v-col>


              <v-col cols="12">
                <v-text-field
                  label="body*"
                  v-model="body"
                  :rules="requiredRule"
                  required
                ></v-text-field>
              </v-col>
            
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="formUpload"
            
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

                                             <!-- comment post -->


      <v-row justify="center">
   

    <v-dialog
      v-model="dialog2"
      max-width="500"
    >
      <v-card elevation="3" shaped>
        <v-card-title>
         Post Comment
        </v-card-title>

        <v-card-text>       
         
          <v-container>
            <v-row>
             

              <v-col cols="12">
                <v-text-field
                  label="name*"
                  v-model="name"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>


              <v-col cols="12">
                <v-text-field
                  label="email*"
                  v-model="email"
                  type="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="body*"
                  v-model="body"
                  :rules="requiredRule"
                  required
                ></v-text-field>
              </v-col>
            
            </v-row>
          </v-container>
          <small>*indicates required field</small>
      

         </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog2 = false"
          >
            close
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="postComment"
          >
            Post
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>


                                                              <!-- csv file -->
     
       <v-form class="justify-center m-auto">
         <v-file-input
               accept=".csv"                  
                   label="Insert csv File"  
                   v-model="files"
                   @change="onFileChange"
           ></v-file-input>
        
           <v-btn block rounded color="teal" type="submit" @click="formUpload">submit</v-btn>
            </v-form>



                                            <!-- *********************     alert message    *************************** -->
<v-alert
  color="green"
  type="success"
   class="my-5"
   v-if="status == '200' && !error"
>{{this.message}}</v-alert>

<v-alert
  color="red"
  type="error"
  class="my-5"
   v-else-if="status != '200' && error"
>{{this.status}} -> {{this.message}}</v-alert>
  

                                                                     <!-- error inserted value in csv -->

             <div v-if="errordata.length>0" class="my-5">
               <h2 class="text-center warning--text mb-3" >Invalid Inserted Row</h2>
               <v-alert v-for="(item,index) in errordata" :key="item.id"
                
                prominent
                 outlined
                  type="error">
                    {{item}}<br><br>
                    
                    <ul v-for="i in errormessage[index]" :key="i.id">
                    <li class="black--text">{{i}}</li>
                    </ul>
      
    </v-alert>
    <v-btn block color="error" class="m-3" @click="deleteError"> Delete all error msg</v-btn>
             </div>

<br>

<hr>
<br>



                                                   <!--    ***********          table data          * ******     -->

<div class="my-3" v-if="fileinput.length >0">
  <h2 class="text-center success--text">Correct Inserted row</h2>
   <v-data-table
    :headers="headers"
    :items="fileinput" 
    class="elevation-2" >

      <template v-slot:item.actions="{ item }">
      <v-btn
        small
        class="mr-2"
        @click="deleteItem(item)"
      >
       Remove
      </v-btn>
     
    </template>
  
  </v-data-table>
</div>
                                          <!-- table value show -->

<v-container>
    <v-row >
      <v-col v-for="item in list" :key="item.id" cols="6">
  <v-card elevation="3"
    class="mx-auto"
    max-width="500"
    outlined
    shaped
  >
   
<v-card-title>{{item.motor_controller_type_id}}</v-card-title>
<v-card-text>{{item.controller_id}}</v-card-text>
    <v-card-actions>

 <v-btn
      color="primary"
      dark
      @click.stop="openDialog($event, item.id)"
    >
      Post Comment
    </v-btn>

            <v-btn x-small>
      <router-link :to="'/comments/'+item.id">view comment</router-link></v-btn>
      

     <v-btn x-small><router-link :to="'/user/'+item.id">Details</router-link></v-btn>
    </v-card-actions>
  </v-card>
      </v-col>
    </v-row>
</v-container>
    
</div>

</template>

<script>

import axios from 'axios';
export default {
    name:"PostComponent",
    data(){
            return{
                    list:[],
                    files:{},
                    fileinput:[],
                    postinput:[],
                    errordata:[],
                    errormessage:[],
                    dialog: false,
                    dialog2:false,
                    flag:false,
                    id:'',
                    title:'',
                    body:'',
                    name:'',
                    email:'',
                    username:'',
                    comment:[],
                    attributeIndex:[],
                    error:false,
                    message:'',
                    status:'',
                    count:'',
                    mailformat:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    nameformat:/^[a-zA-Z ]{2,30}$/,
                    emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
                    nameRules: [
        v => !!v || 'Name field can not be empty',
        v => /^[a-zA-Z ]{2,30}$/.test(v) || 'Name must be valid less than 30 characters',
       
      ], 
           requiredRule: [
        v => !!v || 'This field can not be empty',
       
      ],
                     headers: [
          
          { text: 'motor_controller_type_id', value: 'motor_controller_type_id' },
          { text: 'controller_id', value: 'controller_id' },
          { text: 'lot_no', value: 'lot_no' },
          { text: 'has_uart', value: 'has_uart' },
          { text: 'Remove Row', value: 'actions', sortable: false },
        ],

        //            Errorheaders: [
          
        //   { text: 'motor_controller_type_id', value: 'motor_controller_type_id' },
        //   { text: 'controller_id', value: 'controller_id' },
        //   { text: 'lot_no', value: 'lot_no' },
        //   { text: 'has_uart', value: 'has_uart' },
          
        // ],
        

        attributes : [
  {
    "attribute": "motor_controller_type_id",
    "mandatory": true,
    "validation": null
  },
  {
    "attribute": "controller_id",
    "mandatory": true,
    "validation": null,
    "scan": true
  },
  {
    "attribute": "lot_no",
    "mandatory": true,
    "validation": null
  },
  {
    "attribute": "has_uart",
    "mandatory": false,
    "validation": null
  }
],
            
    }
    },
    mounted()
    {
      
          this.getPost();
          
    },
    methods:{
              onFileChange(files) {
                this.flag = true;
                this.deleteError;
                
                let filename = files.name.split('.');
                 
                 if(filename[filename.length-1] === 'csv'){

        var reader = new FileReader();     
      reader.readAsText(files);
      reader.onload = this.loadHandler;
      reader.onerror = this.errorHandler;
                 }else{
                   alert("Please enter correct file format");
                 }
  
    },

     loadHandler(event) {
      var csv = event.target.result;
          var allTextLines = csv.split(/\r\n|\n/);
          
          var map = new Map(); 
  
              var data = allTextLines[0].split(',');

            for(let j=0; j< this.attributes.length; j++){
              let header = this.attributes[j].attribute;
              map.set(header,data.indexOf(header));
    
            }  

            var test = false;

            for (var i=1; i<allTextLines.length; i++) {
            
              data = allTextLines[i].split(',');
              test = false;

            var temp = { };

            for(let k=0;k<map.size;k++){
              let header = this.attributes[k].attribute;
              temp[header] = data[map.get(header)];

            }
            var  errorMsg = [];
            
            for(let k=0;k<this.attributes.length;k++){
              let header = this.attributes[k].attribute;

              if(this.attributes[k].mandatory === true && !temp[header] ){
                  test = true;
                  errorMsg.push( header + " filed is required at row "+(i+1) + " column "+(k+1));
                  temp[header] = "";
                
              }

             else if(this.attributes[k].validation && !this.checkValidation(temp[header])){
                     test = true;
                        errorMsg.push("Invalid "+header+ " field at row "+(i+1)  + " column "+(k+1));
 
              }
              
            }
            // console.log(errorMsg);
            

            if(!test){
            this.fileinput.push(temp);
            }else{
              this.errormessage.push(errorMsg);
              this.errordata.push(temp);
            }      
    }
  
  console.log(this.fileinput);
        

  //  for (var i=1; i<allTextLines.length; i++) {
            
  //           var data = allTextLines[i].split(',');


          //   console.log(data);
           

          //   if(data.length < 5 || data.length >5) {
          //     let temp = "May be more or less number of column is inserted than required at row "+(i+1);
          //     this.errordata.push(data);
          //     this.errormessage.push(temp);
          //     // alert(temp);
          //     continue;
          //   }

          //   if(data[0] === '' || data[1] === '' || data[2] === '' || data[3] === '' || data[4] === ''){
          //     let temp = "Failed to insert row "+(i+1)+". Empty feild found ";
          //     this.errordata.push(data);
          //     this.errormessage.push(temp);
          //     // alert(temp);
          //     continue;
          //   }

          //  if(!this.mailformat.test(data[2]) || !this.nameformat.test(data[0])){
             
          //    let temp  = "Failed to insert row "+(i+1)+" Invalid email Id or name";
          //    this.errordata.push(data);
          //    this.errormessage.push(temp);
          //   // alert(temp);
          //    continue;

          //  }

          //      let  tmp = {
                    
          //           'name':data[0].trim(),
          //           'username':data[1].trim(),
          //             'email':data[2].trim(),
          //            'title': data[3].trim(),
          //            'body': data[4].trim()

          //       };
          //       this.fileinput.push(tmp);
          //       cou++;
                // }
                // this.count = cou;
        // this.message = "csv file uploaded successfully. "+ cou +"row Inserted";
      // console.log(this.fileinput);
    },   

    checkValidation(item){
       
       return this.nameformat.test(item);
    },

     errorHandler(evt) {
     this.error = true;
     this.message = evt.message;
     
    },

     formUpload(){
       
      //  this.dialog =false;

      //  if(!this.flag){
      //    this.message = "1 post added successfully";

           

      //     let  tmp = {
                   
      //               'name':this.name.trim(),
      //               'username':this.username.trim(),
      //               'email':this.email.trim(),
      //                'title': this.title.trim(),
      //                'body': this.body.trim()

      //           };
      //           this.fileinput.push(tmp);     

      //  }
      //  this.flag = false;
       this.error = false;
       console.log(this.fileinput);
        
        if(this.fileinput.length >0){
        axios.post('http://localhost:8000/api/posts',this.fileinput).then(response =>  {
          this.status = response.status;
              
        }).catch(error => {
          this.error = true;
        this.message = error.message;
    });
        }else{
          alert("empty file can not be inserted");
        }
        this.getPost();
        this.fileinput = [];
        this.errordata = [];
        this.errormessage = [];
        
    },

    postComment(){
       this.dialog2 = false;
         let  tmp = {
                    'postId': this.id,
                     'name': this.name,
                     'email': this.email,
                     'body':this.body

                };
                this.comment = tmp;
                console.log(this.comment);
                
                 axios.post('http://localhost:8000/api/comments',this.comment).then(response => console.log(response.status)).catch( error => {
                this.error =true;
                this.message = error.message;

  });

    },
    openDialog(event, id){
      this.id = id;
      this.dialog2 = true;
    },

    deleteItem(item){
     const index = this.fileinput.indexOf(item);
        
        this.fileinput.splice(index, 1);
    },

    deleteError(){
      this.errormessage = [];
      this.errordata = [];
    },

     getPost(){
       
            axios.get('http://127.0.0.1:8000/api/posts').then(res =>{
                    this.list=res.data;  
                  
                              
            })
           },



    }
}
</script>
