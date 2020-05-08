# easy-refer（易推）

[![Build Status](https://travis-ci.org/Haixiang6123/easy-refer.svg?branch=dev)](https://travis-ci.org/Haixiang6123/easy-refer)
[![Coverage Status](https://coveralls.io/repos/github/Haixiang6123/easy-refer/badge.svg?branch=dev)](https://coveralls.io/github/Haixiang6123/easy-refer?branch=dev)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

一个方便北美内推的网站应用。

[easy-refer（易推）地址](https://easy-refer.com)

## 快速上手

### 找内推
1. [点击这里](https://easy-refer.herokuapp.com/job/list) 可以看到目前有哪些人发布了可以内推的消息
2. 进去找到对应职位点击"开始内推"
3. 填好信息
4. OK!

### 发内推
1. [点击这里](https://easy-refer.herokuapp.com/job/list) 先登录
2. 点击"发布一个职位"
3. 将生成的表单链接放到一亩三分地，或者别的帖子里，让别人填信息去吧
4. OK!

## 为什么要做这个
以前在一亩三分地或者找人内推的时候，总会面临以下问题：

对于找内推的人：
1. 有些内推消息可能已经失效了，内推贴是个死贴
2. 内推人一直没有回复，不知道推了没有
3. 内推人说推了，但是一直没收到确认，怀疑没有被推

对于内推别人的人：
1. 本来内推只是做善事，但是没想到内推邮件太多，消息轰炸
2. 忘记更新贴子，变成死贴
3. 发邮件的人老是不遵守邮件格式
4. 推了一半，突然不想推了，又懒得一个一个回复了
5. X 天内内推，到底现在是距离那天多少天了？不知道

OK，如果你也有以上的问题，那么希望我的应用可以帮到你~

## 功能

### Referee

- [x] 提交内推申请
- [x] 撤回，修改内推状态
- [x] 修改提交的内推
- [x] 追踪自己的内推状态

### Referer

- [x] 生成内推职位表单
- [ ] 撤回内推职位表单
- [x] 修改内推职位表单
- [x] 显示目前内推情况
- [x] X 天后自动放弃内推
- [x] 修改内推状态（已推/不推）

## 未来
当时在一亩三分地找内推的时候真是受尽了煎熬，等内推人等得焦虑得不行，所以就有了这个做 easy-refer 系统的想法。
刚好疫情被困在美国，而且也想最后回深圳腾讯了，所以无聊就写了这个系统。
功能其实并不多，但是自己写的时候会想特别多的东西，框架，架构之类的，尽量向企业级去思考。
但是，有时候真的觉得目前到了天花板了，想的很多解决方案可能都是一时兴起或者无可奈何的做法。
感觉在架构方面缺乏太多的知识，如安全，并发，性能，运维，设计等等。

如果你也喜欢这个项目，可以在这里给点建议或一个 Star :)

## 后端 Repo

[easy-refer 后端 Repo](https://github.com/Haixiang6123/easy-refer-server)
