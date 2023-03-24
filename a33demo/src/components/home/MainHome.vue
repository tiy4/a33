<template>
    <!-- 侧边栏导航结束 -->
    <div id='center' class="main center">
        <div class="mainInner">
        <div>欢迎来到服创项目的试验页面</div>
        </div>
    </div>
</template>
<style>
html,
body {
    overflow-x: hidden;
    height: 100%;
}

body {
    background: #fff;
    padding: 0;
    margin: 0;
    font-family: 'Varela Round', sans-serif;
}

.header {
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
    box-shadow: none;
    background-color: #FC466B;
    /* position: fixed; */
    height: 60px !important;
    overflow: hidden;
    /* z-index: 10; */
}

ul {
    list-style-type: none;
}

.top {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    /* 防遮挡 */
    /* z-index: 999; */
}

.nav {
    float: center;
    margin-top: 15px;
    text-align: center;
    font-size: 0;
}

.nav li {
    display: inline-block;
    margin-left: 40px;
}

.nav a {
    display: inline-block;
    line-height: 30px;
    font-size: 18px;
    color: #fff;
    text-decoration: none;
}

.nav a:hover {
    color: #83c3f3;
}

.main {
    margin: 0 auto;
    display: block;
    height: 100%;
    /* width: 300px; */
    /* float: left; */
    /* position: fixed; */
    /* margin-left: 250px; */
}

.mainInner {
    display: table;
    height: 100%;
    width: 100%;
    text-align: center;
}

.mainInner div {
    display: table-cell;
    vertical-align: middle;
    font-size: 3em;
    font-weight: bold;
    letter-spacing: 1.25px;
}

#sidebarMenu {
    height: 100%;
    position: fixed;
    left: 0;
    width: 250px;
    /* float: left; */
    /* display: inline-block; */
    /* margin-top: 60px; */
    transform: translateX(-250px);
    transition: transform 250ms ease-in-out;
    background: linear-gradient(180deg, #FC466B 0%, #3F5EFB 100%);
}

.sidebarMenuInner {
    margin: 0;
    padding: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.10);
}

.sidebarMenuInner li {
    list-style: none;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    padding: 20px;
    cursor: pointer;
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
}

.sidebarMenuInner li span {
    display: block;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.50);
}

.sidebarMenuInner li a {
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
}

input[type="checkbox"]:checked~#sidebarMenu {
    transform: translateX(0);
}

input[type=checkbox] {
    transition: all 0.3s;
    box-sizing: border-box;
    display: none;
}

.sidebarIconToggle {
    transition: all 0.3s;
    box-sizing: border-box;
    cursor: pointer;
    position: absolute;
    z-index: 99;
    /* height: 100%;
    width: 100%; */
    top: -38px;
    left: 15px;
    height: 22px;
    width: 22px;
    border: 1px solid balck;
    border-radius: 15px;
}

.spinner {
    transition: all 0.3s;
    box-sizing: border-box;
    position: absolute;
    height: 3px;
    width: 100%;
    background-color: #fff;
}

.diagonal.part-1,
.horizontal,
.diagonal.part-2{
    background: black;
}

.horizontal {
    transition: all 0.3s;
    box-sizing: border-box;
    position: relative;
    float: left;
    margin-top: 3px;
}

.diagonal.part-1 {
    position: relative;
    transition: all 0.3s;
    box-sizing: border-box;
    float: left;
}

.diagonal.part-2 {
    transition: all 0.3s;
    box-sizing: border-box;
    position: relative;
    float: left;
    margin-top: 3px;
}

input[type=checkbox]:checked~.sidebarIconToggle>.horizontal {
    transition: all 0.3s;
    box-sizing: border-box;
    opacity: 0;
}

input[type=checkbox]:checked~.sidebarIconToggle>.diagonal.part-1 {
    transition: all 0.3s;
    box-sizing: border-box;
    transform: rotate(135deg);
    margin-top: 8px;
}

input[type=checkbox]:checked~.sidebarIconToggle>.diagonal.part-2 {
    transition: all 0.3s;
    box-sizing: border-box;
    transform: rotate(-135deg);
    margin-top: -9px;
}
/* hebrew */
@font-face {
  font-family: 'Varela Round';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/varelaround/v20/w8gdH283Tvk__Lua32TysjIfpcuPP9g.woff2) format('woff2');
  unicode-range: U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F;
}
/* vietnamese */
@font-face {
  font-family: 'Varela Round';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/varelaround/v20/w8gdH283Tvk__Lua32TysjIfqMuPP9g.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Varela Round';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/varelaround/v20/w8gdH283Tvk__Lua32TysjIfqcuPP9g.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Varela Round';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/varelaround/v20/w8gdH283Tvk__Lua32TysjIfp8uP.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>

