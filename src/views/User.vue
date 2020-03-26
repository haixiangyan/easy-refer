<template>
    <div class="user">
        <div v-if="user.name" class="name">
            <h3>姓名</h3>
            <p>{{user.name}}</p>
        </div>
        <div v-if="user.name" class="email">
            <h3>Email</h3>
            <p>{{user.email}}</p>
        </div>
        <div v-if="user.phone" class="phone">
            <h3>电话</h3>
            <p>{{user.phone}}</p>
        </div>
        <div v-if="user.experience" class="experience">
            <h3>工作经验</h3>
            <p>{{user.experience}}</p>
        </div>
        <div v-if="user.leetCodeLink" class="leetcode-link">
            <h3>LeetCode链接</h3>
            <p>
                <el-link :href="user.leetCodeLink">{{user.leetCodeLink}}</el-link>
            </p>
        </div>
        <div v-if="user.intro" class="intro">
            <h3>个人简介</h3>
            <p>{{user.intro}}</p>
        </div>
        <div class="third-person-intro">
            <h3>第三人称介绍</h3>
            <p>{{user.thirdPersonIntro}}</p>
        </div>
        <div v-if="user.referLinks" class="refer-links">
            <h3>内推链接</h3>
            <p v-for="link in user.referLinks" :key="link">
                <el-link :href="link">{{link}}</el-link>
            </p>
        </div>
        <div v-if="user.resumeUrl" class="resume">
            <h3>简历</h3>
            <p>{{user.resumeUrl}}</p>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import UserService from "@/services/UserService"
  import {getLevel} from "@/utils/generator"

  @Component
  export default class User extends Vue {
    user: TUser = {
      email: "",
      name: "",
      experience: 0
    }
    userId: string = "1"

    get level() {
      return getLevel(this.user.experience)
    }

    mounted() {
      this.loadUser()
    }

    async loadUser() {
      try {
        const {data} = await UserService.getUser(this.userId)

        if (!data.success) return this.$message.error(data.message)

        this.user = data.content
      } catch (error) {
          this.$message.error(error.message)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
