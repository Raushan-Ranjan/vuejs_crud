<template>
    <div>
        <v-container>
     <v-row >
      <v-col v-for="item in list" :key="item.id" cols="4">
        <v-card class="mx-auto"
                max-width="344"
                 outlined
                 elevation="3" shaped>
               
                  <v-card-title>{{item.name}}</v-card-title>
               <v-card-subtitle>{{item.email}}</v-card-subtitle>
               <v-card-text>{{item.body}}</v-card-text>
           </v-card>
      </v-col>
     </v-row>
        </v-container>
           
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:"Comments",
    data(){
        return {
            userId :this.$route.params.id,
            list:[]
        }
    },
    mounted()
    {
            axios.get('http://127.0.0.1:8000/api/posts/'+this.userId+'/comments').then(res =>{
                    // this.comment.push(res.data);     
                    this.list=res.data;
                           
            })
    }
}
</script>