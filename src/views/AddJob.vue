<template>
    <div class="add-job">
        <JobForm @submit="onSubmit"/>
    </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from "vue-property-decorator"
  import JobForm from "@/components/JobForm.vue"
  import AddJobGQL from "@/graphql/AddJob.graphql"

  @Component({
    components: {JobForm}
  })
  export default class AddJob extends Vue {
    async onSubmit(jobForm: TJobForm) {
      try {
        await this.$apollo.mutate({
          mutation: AddJobGQL,
          variables: {
            refererId: this.$store.state.user.userId,
            jobForm
          }
        })

        this.$message.success("已添加该职位")

        await this.$router.push("/job-list")
      } catch (error) {
        this.$message.error(error.message)
      }
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
