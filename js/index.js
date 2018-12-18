window.onload = function () {
    // 搜索
    search();
    // 轮播图
    banner();
    // 倒计时
    downtime();
};

function search() {
    let search = document.querySelector('.jd_search_box');
    let banner = document.querySelector('.jd_banner');
    let height = banner.offsetHeight;

    window.onscroll = function () {
        let top = document.documentElement.scrollTop;
        let opacity = 1;
        if(top > height) {
            opacity = 1;
        }else {
            opacity = (top/height);
        }
        search.style.backgroundColor = `rgba(228, 49, 48, ${opacity})`;
    }
}

function banner() {
    // 轮播图容器
    let banner = document.querySelector('.jd_banner');
    // 图片容器
    let imgBox = banner.querySelector('ul:first-child');
    // 点盒子容器
    let pointer = banner.querySelector('ul:last-child');
    // 每个点
    let points = pointer.querySelectorAll('li');

    let index = 1;
    let width = banner.offsetWidth;
    let timer = setInterval(function () {
        imgBox.style.transition = 'all 0.5s';
        index++;
        imgBox.style.transform = 'translateX(-'+ width*index +'px)';

    }, 3000);
    imgBox.addEventListener('transitionend', function () {
        if(index >= 9) {
            index = 1;
            imgBox.style.transition = 'none';
            imgBox.style.transform = 'translateX(-'+ width*index +'px)';
        }else if (index <= 0) {
            index = 8;
            imgBox.style.transition = 'none';
            imgBox.style.transform = 'translateX(-'+ width*index +'px)';
        }
        for (let pointNode of points) {
            pointNode.classList.remove('now');
        }
        points[index-1].classList.add('now');
    });
    // 记录最开始的位置
    let startX = 0;
    let distance = 0;
    imgBox.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imgBox.addEventListener('touchmove', function (e) {
        distance = e.touches[0].clientX-startX;
        imgBox.style.transform = `translateX(${-index*width+distance}px)`;
    });
    imgBox.addEventListener('touchend', function () {
        imgBox.style.transition = 'all 0.5s';
        if (Math.abs(distance) >= width/2) {
            if (distance > 0) {
                imgBox.style.transform = `translateX(-${(--index)*width}px)`;
            }else {
                imgBox.style.transform = `translateX(-${(++index)*width}px)`;
            }
        }else {
            if (distance > 0) {
                imgBox.style.transform = `translateX(-${index*width}px)`;
            }else {
                imgBox.style.transform = `translateX(-${index*width}px)`;
            }
        }
        timer = setInterval(function () {
            imgBox.style.transition = 'all 0.5s';
            index++;
            imgBox.style.transform = 'translateX(-'+width*index+'px)';

        }, 3000);
    });
    pointer.addEventListener('click', function (e) {
        if (e.target !== pointer){
            let i = 0;
            let x =0;
            for (let pointNode of points) {
                if (pointNode === e.target) {
                    x = i;
                }
                pointNode.classList.remove('now');
                i++;
            }
            e.target.classList.add('now');
            index = x+1;
            imgBox.style.transform = 'translateX(-'+width*index+'px)';
        }
    })
}

function downtime() {
    let list = document.querySelectorAll('.jd_pro_title ul li');

    let time = 2*60*60+50*60+25;

    let timer = setInterval(function () {
        time --;
        let h = Math.floor(time/3600);
        let m = Math.floor(time%3600/60);
        let s = time%60;

        list[0].innerHTML = Math.floor(h/10);
        list[1].innerHTML = h%10;

        list[3].innerHTML = Math.floor(m/10);
        list[4].innerHTML = m%10;

        list[6].innerHTML = Math.floor(s/10);
        list[7].innerHTML = s%10;

        if (time <=0) {
            clearInterval(timer);
        }
    }, 1000);
}