<template>
    <div class="tabs">
        <el-tag
           size="small"
           v-for="(tag,index) in tags"
           :key="tag.name"
           :closable="tag.name !== 'home'"
           :effect="$route.name === tag.name ? 'dark' : 'plain'"
           @click="changeMenu(tag)"
           @close="handleClose(tag,index)"
        >
            {{tag.label}}
        </el-tag>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            
        }
    },
    computed:{
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods: {
        ...mapMutations({
            close:'CLOSETAG'
        }),
        changeMenu(item){
            this.$router.push({ name:item.name })
        },
        handleClose(tag, index){
            // 获取最后一个tag的位置 最右侧
            const length = this.tags.length -1
            // 判断点击的和当前的焦点是否一致
            this.close(tag)
            if(tag.name !== this.$route.name){
                // 不一致直接返回
                return;
            }
            if(index === length){
                this.$router.push({
                    // 向左挑
                    name:this.tags[index - 1].name
                })
            }else{
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    },
}
</script>

<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-right:20px ;
        cursor: pointer;
    }
}
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
        color:white !important;
}
</style>