
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

      <v-card>
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
      <v-card>
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

                                                   <!--    ***********          table data          * ******     -->

<div v-if="fileinput.length >0">
   <v-data-table
    :headers="headers"
    :items="fileinput" 
    class="elevation-1" >

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

<v-container v-if="renderComponent" >
    <v-row >
      <v-col v-for="item in list" :key="item.id" cols="6">
  <v-card 
    class="mx-auto"
    max-width="500"
    outlined
  >
   
<v-card-title>{{item.title}}</v-card-title>
<v-card-text>{{item.body}}</v-card-text>
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
                    dialog: false,
                    dialog2:false,
                    flag:false,
                    renderComponent: true,
                    id:'',
                    title:'',
                    body:'',
                    name:'',
                    email:'',
                    username:'',
                    comment:[],
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
          {
            text: 'name',
            value: 'name',
          },
          { text: 'username', value: 'username' },
          { text: 'email', value: 'email' },
          { text: 'title', value: 'title' },
          { text: 'body', value: 'body' },
          { text: 'Remove Row', value: 'actions', sortable: false },
        ],
            
    }
    },
    mounted()
    {
            axios.get('http://127.0.0.1:8000/api/posts').then(res =>{
                    this.list=res.data;  
                  
                              
            })
          
    },
    methods:{
              onFileChange(files) {
                this.flag = true;
                
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
          var cou = 0;
        
        for (var i=1; i<allTextLines.length; i++) {
            
            var data = allTextLines[i].split(',');

            if(data.length < 5 || data.length >5) {
              let temp = "May be more or less number of column is inserted than required at line "+(i+1);
              alert(temp);
              continue;
            }

            if(data[0] === '' || data[1] === '' || data[2] === '' || data[3] === '' || data[4] === ''){
              let temp = "Failed to insert line "+(i+1)+". Empty feild found ";
              alert(temp);
              continue;
            }

           if(!this.mailformat.test(data[2]) || !this.nameformat.test(data[0])){
             
             let temp  = "Failed to insert line "+(i+1)+" Invalid email Id or name";
            alert(temp);
             continue;

           }

               let  tmp = {
                    
                    'name':data[0].trim(),
                    'username':data[1].trim(),
                      'email':data[2].trim(),
                     'title': data[3].trim(),
                     'body': data[4].trim()

                };
                this.fileinput.push(tmp);
                cou++;
                }
                this.count = cou;
        this.message = "csv file uploaded successfully. "+ cou +"row Inserted";
      console.log(this.fileinput);
    },   

     errorHandler(evt) {
     this.error = true;
     this.message = evt.message;
     
    },

     formUpload(){
       
       this.dialog =false;

       if(!this.flag){
         this.message = "1 post added successfully";

           

          let  tmp = {
                   
                    'name':this.name.trim(),
                    'username':this.username.trim(),
                    'email':this.email.trim(),
                     'title': this.title.trim(),
                     'body': this.body.trim()

                };
                this.fileinput.push(tmp);     

       }
       this.flag = false;
       this.error = false;
       console.log(this.fileinput);
        
        if(this.fileinput.length >0){
        axios.post('http://localhost:8000/api/posts',this.fileinput).then(response =>  {
          this.status = response.status;
                this.renderComponent = false;

              this.$nextTick(() => {
         
              this.renderComponent = true;
              });   
         
        }).catch(error => {
          this.error = true;
        this.message = error.message;
    });
        }else{
          alert("empty file can not be inserted");
        }
        this.fileinput = [];
        
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
    }

    }
}
</script>
