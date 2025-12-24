create table sample
(
    id   varchar(100) not null,
    name varchar(100) not null,
    primary key (id)
);

select *
from sample;

create table customers
(
    id    varchar(100) not null,
    name  varchar(100) not null,
    email varchar(100) not null,
    phone varchar(100) not null,
    primary key (id),
    constraint unique_email unique (email),
    constraint unique_phone unique (phone)
);

alter table customers
    drop constraint unique_email;

alter table customers
    drop constraint unique_phone;

alter table customers
    add constraint customer_unique_email unique (email);

alter table customers
    add constraint customer_unique_phone unique (phone);

select *
from customers;

update customers
set name = 'Ricky'
where name = 'Ricky Andrianto Kusuma';

create table products
(
    id       varchar(100) not null,
    name     varchar(100) not null,
    price    int          not null,
    stock    int          not null,
    category text         not null,
    primary key (id)
);

select *
from products;

insert into products(id, name, price, stock, category)
values ('P0001', 'A', 1000, 100, 'K1'),
       ('P0002', 'B', 2000, 200, 'K1'),
       ('P0003', 'C', 3000, 300, 'K1'),
       ('P0004', 'D', 4000, 400, 'K1'),
       ('P0005', 'E', 5000, 500, 'K1');


insert into products(id, name, price, stock, category)
values ('P0006', 'A', 1000, 100, 'K2'),
       ('P0007', 'B', 2000, 200, 'K2'),
       ('P0008', 'C', 3000, 300, 'K2'),
       ('P0009', 'D', 4000, 400, 'K2'),
       ('P0010', 'E', 5000, 500, 'K2');

update products
set price = 5000
where id = 'P0010';


create table categories
(
    id   serial not null,
    name text   not null,
    primary key (id)
);

select *
from categories;

create table wallet
(
    id          text not null,
    balance     int  not null,
    customer_id text not null,
    primary key (id),
    constraint wallet_customer_id_fk foreign key (customer_id) references customers (id),
    constraint wallet_customer_id_unique unique (customer_id)
);

select *
from wallet;

select *
from customers
         join wallet on customers.id = wallet.customer_id;

select *
from customers;

create table comments
(
    id          serial not null,
    customer_id text   not null,
    title       text   not null,
    description text,
    primary key (id),
    constraint comments_customer_id_fk foreign key (customer_id) references customers (id)
);

insert into comments(customer_id, title, description)
values ('ricky', 'Comment 1', 'Sample Comment 1'),
       ('ricky', 'Comment 2', 'Sample Comment 2'),
       ('budi', 'Comment 1', 'Sample Comment 1'),
       ('budi', 'Comment 3', 'Sample Comment 3');

select *
from comments;

alter table comments
    alter column description drop not null;

insert into customers (id, name, email, phone)
values ('budi', 'budi', 'budi@gmail.com', '12319319');

select *
from customers
         join comments c on customers.id = c.customer_id;

select *
from comments;

create table likes
(
    customer_id text not null,
    product_id  text not null,
    primary key (customer_id, product_id),
    constraint likes_customer_id_fk foreign key (customer_id) references customers (id),
    constraint likes_product_id_fk foreign key (product_id) references products (id)
);

select *
from likes;

create table _loves
(
    "A" text not null,
    "B" text not null,
    primary key ("A", "B"),
    constraint customer_loves_fk foreign key ("A") references customers (id),
    constraint product_loves_fk foreign key ("B") references products (id)
);
drop table if exists _loves;
select *
from _loves;