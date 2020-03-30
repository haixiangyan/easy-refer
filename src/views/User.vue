<template>
    <div class="user">
        <el-divider>个人信息</el-divider>
        <div v-if="user.name" class="name user-item">
            <h3>
                <span>姓名</span>
                <router-link tag="span" to="/edit-user">
                    <el-button round type="primary" size="small" icon="el-icon-edit">编辑</el-button>
                </router-link>
            </h3>
            <p>{{user.name}}</p>
        </div>
        <div v-if="user.name" class="email user-item">
            <h3>邮箱</h3>
            <p>{{user.email}}</p>
        </div>
        <div v-if="user.phone" class="phone user-item">
            <h3>电话</h3>
            <p>{{user.phone}}</p>
        </div>
        <div v-if="user.experience" class="experience user-item">
            <h3>工作经验</h3>
            <p>{{level}}</p>
        </div>
        <div v-if="user.leetCodeUrl" class="leetcode-link user-item">
            <h3>LeetCode链接</h3>
            <p><el-link :href="user.leetCodeUrl">{{user.leetCodeUrl}}</el-link></p>
        </div>
        <div v-if="user.intro" class="intro user-item">
            <h3>个人简介</h3>
            <p>{{user.intro}}</p>
        </div>
        <div class="third-person-intro user-item">
            <h3>第三人称介绍</h3>
            <p>{{user.thirdPersonIntro}}</p>
        </div>
        <div v-if="user.resumeUrl" class="resume user-item">
            <h3>简历</h3>
            <p>{{user.resumeUrl}}</p>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import GetUserGQL from '@/graphql/GetUser.graphql'
  import {LEVEL_MAPPER} from "@/contents/level"

  @Component
  export default class User extends Vue {
    user: TUser = {
      userId: this.$store.state.user.userId,
      email: "",
      name: "",
      experience: 0
    }

    get level() {
      return LEVEL_MAPPER[this.user.experience]
    }

    mounted() {
      this.loadUser()
    }

    async loadUser() {
      try {
        const {data} = await this.$apollo.query({
          query: GetUserGQL,
          variables: {userId: this.user.userId}
        })

        this.user = data.user
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
</script>

<style scoped lang="scss">
    .user {
        .name > h3 {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &-item {
            margin-bottom: 10px;
        }
    }
</style>
