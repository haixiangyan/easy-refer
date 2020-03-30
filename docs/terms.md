# 术语规范

* JobList 显示内推广场，用于显示所有内推职位页面
    * JobItem 显示每个内推职位的简介
    
* ReferList 提交的所有内推的内推页
    * ReferItem 内推页里的每个小项，主要显示内推进度
    
* ResumeList 显示所有 candidate 信息
    * 页面只用 Table 没有 XXXItem

---
    
* Apply -> /apply:jobId 申请内推时用的组件

* Resume -> /resume:resumeId 查看投递信息用的组件

* Refer -> 相当于提交 Resume 后生成的一个 Receipt

* AddJob 用于添加和修改 Job 的组件

## 关系

1 个 Job -> n 个 Resume -> n 个 Refer

1 个 Resume <-> 1 个 Refer
