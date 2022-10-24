create table if not exists customer (
	cust_id varchar(50) unique not null,
    email varchar(100) unique not null,
    password varchar(1000) not null,
    first_name varchar(100),
    last_name varchar(100),
    created_date timestamp not null default current_timestamp,
    primary key (cust_id)
);

create table if not exists task (
	task_id BIGINT UNSIGNED unique not null AUTO_INCREMENT,
	cust_id varchar(50) not null,
    type varchar(50) not null,
    name varchar(200)  not null,
    status varchar(50) not null,
    assign varchar(50),
    description text,
    acceptance text,
    story_point int(2),
    priority int(2) default 2,
    risk int(2),
    area int(2),
    parent BIGINT UNSIGNED,
    created_by varchar(50) not null,
    update_by varchar(50) not null,
    created_date timestamp not null default current_timestamp,
    update_date timestamp not null default current_timestamp,
    primary key (task_id),
    foreign key (cust_id) references customer(cust_id)
);

create table if not exists discussion (
	discus_id varchar(50) unique not null,
	task_id BIGINT UNSIGNED not null,
	cust_id varchar(50) not null,
    comment text,
    created_by varchar(50) not null,
    update_by varchar(50) not null,
    created_date timestamp not null default current_timestamp,
    update_date timestamp not null default current_timestamp,
    primary key (discus_id),
    foreign key (cust_id) references customer(cust_id),
    foreign key (task_id) references task(task_id)
);

create table if not exists relation (
    relation_id varchar(50) unique not null,
    link_type tinyint not null,  -- 1: Child, 2: Duplicate
    task_id BIGINT UNSIGNED not null,
    task_link BIGINT UNSIGNED not null,
    comment text,
    created_by varchar(50) not null,
    update_by varchar(50) not null,
    created_date timestamp not null default current_timestamp,
    update_date timestamp not null default current_timestamp,
    primary key (relation_id),
    foreign key (task_id) references task(task_id),
    foreign key (task_link) references task(task_id)
);