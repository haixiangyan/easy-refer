<template>
    <el-form ref="form" :model="addJobForm" label-width="120px" label-position="left" class="add-job-form">
        <el-divider></el-divider>
        <el-form-item label="标题">
            <el-input v-model="addJobForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
            <el-input type="textarea" autosize v-model="addJobForm.content"></el-input>
        </el-form-item>

        <el-divider>内推表单预览</el-divider>
        <el-form-item
            v-for="addedReferItem in addedReferItems"
            :key="addedReferItem.value"
            :label="addedReferItem.label">
            <el-col :span="21">
                <el-input disabled/>
            </el-col>
            <el-col class="delete-refer-item" :span="3">
                <el-button type="danger" plain circle icon="el-icon-delete"></el-button>
            </el-col>
        </el-form-item>
        <div class="add-form-item">
            <el-dropdown placement="bottom" @command="onSelectReferItem">
                <el-button icon="el-icon-plus" type="primary" circle></el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="referItem in referItems"
                        :key="referItem.value"
                        :command="referItem"
                        :disabled="!!addedReferItems.find(i => i.value === referItem.value)">
                        {{referItem.label}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <el-divider></el-divider>
        <div class="publish">
            <el-button type="primary" round>发布内推</el-button>
            <el-button type="danger" round>放弃编辑</el-button>
        </div>
    </el-form>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import {DEFAULT_ADDED_REFER_ITEMS, REFER_ITEMS} from "@/contents/refer"

  @Component
  export default class AddJob extends Vue {
    addJobForm = {
      title: "",
      content: "",
    }

    referItems = REFER_ITEMS
    addedReferItems: TItem[] = DEFAULT_ADDED_REFER_ITEMS

    onSelectReferItem(referItem: TItem) {
      this.addedReferItems.push(referItem)
    }
  }
</script>

<style scoped lang="scss">
    .add-job-form {
        .delete-refer-item {
            text-align: right;
        }
        .add-form-item {
            text-align: center;
        }
        .publish {
            text-align: center;
        }
    }
</style>
