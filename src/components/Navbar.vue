<template>
<div>
    <section class="kit-contrast-hidden-mb navbar-wrap">
        <nav class="navbar navbar-Rain__simple navbar-fixed-top">
            <a class="brand">四月は君の嘘</a>
            <div class="space"></div>
            <i class="fa fa-bars navbar-menu"></i>
        </nav>
    </section>
    <section class="kit-hidden-mb navbar-wrap">
        <nav class="navbar navbar-Rain__simple navbar-fixed-top">
            <a class="brand">四月は君の嘘</a>
            <div class="space"></div>
            <router-link to="home">HOME</router-link>
            <router-link to="link">LINK</router-link>
            <router-link to="project">AWESOME</router-link>
            <router-link to="me">ME</router-link>
        </nav>
    </section>
</div>
</template>
<style>
    .navbar-wrap {
        position: fixed;
        width: 100%;
        background-color: #fff;
        top: 0;
    }
    .navbar-Rain__simple {
        color: #333;
        box-shadow: 0 0 10px rgba(14, 14, 14, .26);
        font-size: 14px;
        display: flex;
        font-weight: 300;
        padding: 0 40px;
    }
    .navbar-menu {
        background-color: #fafafa;
        border: .0625rem solid #fafafa;
        border-radius: 18px;
        width: 55px;
        font-size: 12px;
        text-align: center;
        padding: 8px;
        position: absolute;
        box-shadow: rgba(0, 0, 0, 0.118) 0px 2px 5px 0px;
        transition: box-shadow 0.3s ease-in-out;
        cursor: pointer;
        top: 15px;
        right: 10px;
    }
    .navbar-menu:hover {
        box-shadow: 0 0.375rem 0.9375rem rgba(0,0,0,0.2);
    }
    .navbar-Rain__simple a {
        color: #333;
        text-decoration: none;
        padding: 20px 12px;
    }
</style>