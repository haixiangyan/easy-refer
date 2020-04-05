<template>
    <div v-loading="loading" element-loading-text="提交中" class="add-job">
        <JobForm @submit="onSubmit"/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import JobForm from '@/components/JobForm.vue'
  import JobService from '@/service/JobService'

  @Component({
    components: {JobForm}
  })
  export default class AddJob extends Vue {
    loading = false

    async onSubmit(form: TJobForm) {
      await JobService.addJob(form)

      this.$message.success('已添加该职位')

      await this.$router.push('/job-list')
    }
  }
</script>

<style lang="scss">
    .add-job-form {
        .required-fields-select {
            .el-tag__close.el-icon-close {
                display: none;
            }
        }
    }
</style>

<style scoped lang="scss">
    @import '~@/assets/styles/variables.scss';

    .add-job-form {
        .full-width {
            width: 100%;
        }

        .limit-hint {
            color: $warning-color;
        }

        .publish {
            text-align: center;

            &-button {
                margin-right: 8px;
            }
        }
    }
</style>
