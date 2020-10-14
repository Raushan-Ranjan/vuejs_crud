<template>
    <div>
        <v-card class="mx-auto"
                max-width="344"
                 outlined>

                  <v-card-title>{{list.name}}</v-card-title>
               <v-card-subtitle>{{list.username}}</v-card-subtitle>
               <v-card-text>{{list.email}}</v-card-text>
           </v-card>
           
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:"User",
    data(){
        return {
            userId :this.$route.params.id,
            list:[]
        }
    },
    mounted()
    {
            axios.get('http://localhost:8000/api/users/'+this.userId).then(res =>{
                    // this.comment.push(res.data);     
                    this.list=res.data;
                    console.log(res.data);         
            })
    }
}
</script>