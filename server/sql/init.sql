create table job
(
    jobId          varchar(200) not null,
    refererId      varchar(200) not null,
    company        varchar(30)  null,
    requiredFields varchar(300) null,
    deadline       datetime     null,
    expiration     int          null,
    referTotal     int          null,
    source         varchar(200) null,
    createdAt      datetime     null,
    updatedAt      datetime     null,
    constraint job_job_id_uindex
        unique (jobId)
);

alter table job
    add primary key (jobId);

create table refer
(
    referId          varchar(200) not null,
    refererId        varchar(200) null,
    refereeId        varchar(200) null,
    jobId            varchar(200) null,
    resumeId         varchar(30)  null,
    name             varchar(30)  null,
    email            varchar(30)  null,
    phone            varchar(30)  null,
    experience       int          null,
    intro            longtext     null,
    leetCodeUrl      varchar(200) null,
    thirdPersonIntro longtext     null,
    referLinks       longtext     null,
    status           varchar(30)  null,
    createdAt        datetime     null,
    updatedAt        datetime     null,
    constraint refer_referId_uindex
        unique (referId)
);

alter table refer
    add primary key (referId);

create table resume
(
    resumeId varchar(200) not null,
    name     varchar(200) null,
    url      varchar(200) null,
    constraint resume_resumeId_uindex
        unique (resumeId)
);

alter table resume
    add primary key (resumeId);

create table user
(
    userId           varchar(200) not null,
    jobId            varchar(200) null,
    resumeId         varchar(200) null,
    email            varchar(30)  not null,
    experience       int          null,
    name             varchar(30)  null,
    intro            longtext     null,
    leetCodeUrl      varchar(50)  null,
    thirdPersonIntro longtext     null,
    phone            varchar(20)  null,
    avatarUrl        varchar(200) null,
    constraint user_user_id_uindex
        unique (userId)
);

alter table user
    add primary key (userId);

