 <template>
    <div>
        <div class="swiper-wrapper">
            <div data-v-a818784e class="swiper-slide" role="group" aria-label="2 / 6">
                <ul data-v-a818784e class="slider2-box">
                    <li :key="item.id"
                        v-for="item in pageInfo"
                        data-v-a818784e="" >
                        <p data-v-a818784e="">
                            <router-link id="" :to=item.link>{{ item.titleCN }}</router-link>
                        </p>
                        <p data-v-a818784e="">{{ item.titleEN }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            pageInfo:[
                {
                    id: 0,
                    titleCN: '门店规则',
                    titleEN: 'Store Rules',
                    link: '/shoprule'
                },
                {
                    id: 1,
                    titleCN: '员工偏好',
                    titleEN: 'Employee Preferences',
                    link: '/emploerhobby'
                },
                {
                    id: 2,
                    titleCN: '排班表',
                    titleEN: 'Schedule',
                    link: '/paiban'
                },
                {
                    id: 3,
                    titleCN: '客流量',
                    titleEN: 'Passenger Flow',
                    link: '/chart'
                },
                {
                    id: 4,
                    titleCN: '关于我们',
                    titleEN: 'About we',
                    link: ''
                },
            ]
        }
    },
}
</script>

<style>
@import url('@/assets/css/MianMiddle.css');
.slider2-box li:nth-child(1){
    background: url('@/assets/OIP-C.jpg') no-repeat;
}
.slider2-box li:nth-child(2){
    background: url('@/assets/home-slider2-1.c58a2da7.png') no-repeat;
}
.slider2-box li:nth-child(3){
    background: url('@/assets/home-slider2-4.2131a6bc.png') no-repeat;
}
.slider2-box li:nth-child(4){
    background: url('@/assets/R-C.jpg') no-repeat;
}
.slider2-box li:nth-child(5){
    background: url('@/assets/1080-x-1920-Image-Vertical-Free-Download.jpg') no-repeat;
}

.slider2-box li p a{
    text-decoration: none;
    color: white;
}
.slider2-box li p a:hover{
    text-decoration: none;
    color:rgb(217, 245, 90);
}
</style>

