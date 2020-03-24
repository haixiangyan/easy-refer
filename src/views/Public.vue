<template>
    <div class="public">
        <JobItem v-for="item in publicJobs" :item="item" :key="item.id"></JobItem>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Component} from 'vue-property-decorator'
    import JobItem from '@/components/JobItem'

    @Component({
        components: {JobItem}
    })
    export default class Home extends Vue {
        msg = 'hello'
        publicJobs = [
            {
                id: 1,
                title: '三天内推 Facebook',
                company: 'facebook',
                content: '阿里云智能事业群 - ' +
                    '• 在这里，你可以接触到中国最大的云计算业务系统\n' +
                    '• 和我们一起引领云计算商业模式的创新和商业基础设施的建设\n' +
                    '• 和我们一起用最先进的技术去挑战最复杂的业务场景\n' +
                    '• 和我们一起用大数据和智能化驱动云计算行业的高速增'
            }
        ]
    }
</script>

<style lang="scss">
    .public {
        margin: 0 auto;
        max-width: 640px;
    }
</style>
