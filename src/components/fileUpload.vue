<template>

<div>

          <v-form>
         <v-file-input
               accept=".csv"
               v-model="files"
                  
                    
                   label="File input"  
                   @change="onFileChange"
           ></v-file-input>
            <v-btn type="submit" @click="formUpload">submit</v-btn>
            </v-form>
</div>
    
</template>

<script>
export default {
    name:"fileUpload",

data(){
 return{
    files:{},
    fileinput:[]
 }
},
methods:{
       
       formUpload(){
    if (this.files) {
       
  console.log(this.files)
  console.log("hello")
        
        for (let file of this.files) {
            
            console.log(file);
        }
}
       },

       onFileChange(files){
          console.log(files);
              this.createInput(files);
    },
    createInput(file) {
      let promise = new Promise((resolve) => {
        var reader = new FileReader();
        var vm = this;
        reader.onload = () => {
          resolve((vm.fileinput = reader.result));
        };
        reader.readAsText(file);
      });

      promise.then(
        result => {
          /* handle a successful result */
         this.fileinput = result;
        //  console.log("hello");
        //  console.log(this.fileinput[0]);
        },
        error => {
          /* handle an error */ 
          console.log(error);
        }
      );





    }

    //    onFileChange(files){
    //         const file = e.target.files[0];
    //         const reader = new FileReader();
    //         reader.onload = e => console.log(e.target.result);
    //         reader.readAsText(file);
    //     },


       }
 
}



   //          this.getAsText(files);
    // },

    //  getAsText(fileToRead) {
    //   var reader = new FileReader();     
    //   reader.readAsText(fileToRead);
    //   reader.onload = this.loadHandler;
    //   reader.onerror = this.errorHandler;
    // },

    //  loadHandler(event) {
    //   var csv = event.target.result;
    //   this.processData(csv);
    // },

    //  processData(csv) {
    //     var allTextLines = csv.split(/\r\n|\n/);
    //     // var lines = [];
    //     for (var i=1; i<allTextLines.length; i++) {
    //         // console.log(allTextLines[i]);
    //         var data = allTextLines[i].split(',');
    //             // var tarr = [];


    //            let  tmp = {
    //                 'username': data[0],
    //                  'Identifier': data[1],
    //                  'first_name': data[2],
    //                  'last_name': data[3]

    //             };
    //             this.fileinput.push(tmp);
    
    //             }
     
    //   console.log(this.fileinput);
    
    // },


</script>





