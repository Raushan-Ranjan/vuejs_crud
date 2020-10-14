<template>
    <div>
        <ul>
            <li v-for="(item ,index ) in data" :key="index">
                {{item['username']}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"CsvApi",
  props:['data']
}
</script>