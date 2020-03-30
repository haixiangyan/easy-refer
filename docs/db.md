# 数据库设计

## 范式
[数据库范式](https://segmentfault.com/a/1190000013695030)

* 1NF是对属性的原子性，要求属性具有原子性，不可再分解；
* 2NF是对记录的惟一性，要求记录有惟一标识，即实体的惟一性，即不存在部分依赖；
* 3NF是对字段的冗余性，要求任何字段不能由其他字段派生出来，它要求字段没有冗余，即不存在传递依赖；

## 数据库定义

User

| 字段             | 类型   | 不能为空 | 主键 | 外键 | 描述                    |
|------------------|--------|----------|------|------|-------------------------|
| userId           | string | !      | yes  |      | 用户ID                  |
| jobId            | string | !      |      | yes  | 发布工作的ID            |
| email            | string | !      |      |      | 邮箱                    |
| name             | string | !      |      |      | 姓名                    |
| experience       | number | !      |      |      | 工作经验，注：0为应届生 |
| intro            | string |          |      |      | 个人简介                |
| phone            | string |          |      |      | 电话                    |
| leetCodeUrl      | string |          |      |      | LeetCode链接            |
| thirdPersonIntro | string |          |      |      | 第三人称介绍            |
| resumeUrl        | string |          |      |      | 简历链接                |

Job
内推人要发布一个 Job，其它人根据这个 Job 来填写内推的内容。这个 Job 是由内失人生成的，和
别内推人无关。

| 字段           | 类型     | 不能为空 | 主键 | 外键 | 描述               |
|----------------|----------|----------|------|------|--------------------|
| jobId          | string   | !        | yes  |      | 工作ID             |
| refererId         | string   | !        |      | yes  | 发布该工作的用户ID |
| company        | string   | !        |      |      | 该职位的公司名     |
| requiredFields | string[] | !        |      |      | 内推表单项         |
| deadline       | Date     | !        |      |      | 截止日期           |
| expiration     | number   | !        |      |      | X天后直接默拒      |
| referredCount  | number   | !        |      |      | 已经内推数目       |
| referTotal     | number   | !        |      |      | 计划内推总数       |
| imageUrl       | string   |          |      |      | 公司logo图片地址   |
| source         | string   |          |      |      | 原贴链接           |

Resume
申请人每次提交的时候需要输入规定的内推信息。

| 字段             | 类型   | 不能为空 | 主键 | 外键 | 描述           |
|------------------|--------|----------|------|------|----------------|
| resumeId         | string | !        | yes  |      | 简历ID         |
| refereeId           | string | !        |      |      | 申请人ID       |
| jobId            | string | !        |      |      | 对应JobID      |
| email            | string | !        |      |      | 申请人邮箱     |
| name             | string | !        |      |      | 申请人姓名     |
| experience       | number | !        |      |      | 申请人工作经验 |
| intro            | string |          |      |      | 申请人自我简介 |
| phone            | string |          |      |      | 申请人电话     |
| leetCodeUrl      | string |          |      |      | LeetCode链接   |
| thirdPersonIntro | string |          |      |      | 第三人称介绍   |
| resumeUrl        | string |          |      |      | 简历链接       |

Refer
当提交内推后，生成一个 Refer，提交人可以查看、修改或撤销这个 Refer。注意，这个 Refer 
是由别内推的人生成的，和内推人无关。

| 字段        | 类型   | 不能为空 | 主键 | 外键 | 描述               |
|-------------|--------|----------|------|------|--------------------|
| referId     | string | !        | yes  |      | 提交内推后生成的ID |
| refereeId           | string | !        |      |      | 申请人ID       |
| refererId           | string | !        |      |      | 内推人ID       |
| jobId       | string | !        |      | yes  | 该内推对应的职位ID |
| resumeId       | string | !        |      | yes  | 该内推对应的简历ID |
| status      | string | !        |      |      | 内推状态           |
| createdAt | Date   | !        |      |      | 提交内推日期       |

