const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const sliderWrapper = $('.slide');
const nextPageBtn = $('.next-page-icon.next-btn');
const prevPageBtn = $('.next-page-icon.prev-btn');
const essayblock = $('.essay-block-item');

const essayblockwidth = essayblock.offsetWidth;

let positionX = 0;



const mainPage = {
    listEasay: localStorage.getItem("list-easay") ? JSON.parse(localStorage.getItem("list-easay")) : [],
    render: function() {
        const htmls = this.listEasay.map(function(essay,index) {
            return `
                <div class="col-20 center-col margin-both-sides essay-block-item">
                    <div class="essay-block ">
                        <div class="essay-content">
                            <img src="./asset/img/luanVanimg.jpg" alt="">
                        </div>
                        <div title="${essay.easayName}" class="essay-leter center-col">
                            <span>${essay.name}</span>
                            <h3>${essay.easayName}</h3>
                        </div>
                    
                    </div>
                </div>
                `
        })
        sliderWrapper.innerHTML = htmls.join(' ');
    },




    eventHandler: function() {
        const _this = this;
        // xử lí chuyển trang
        nextPageBtn.onclick = function() {
            
            if(positionX <= -essayblockwidth*(_this.listEasay.length-4)) {
                positionX = 0;
            } else {
                positionX = positionX - essayblockwidth -74;
            }
           
            sliderWrapper.style = `transform: translateX(${positionX}px);`;
        };
        prevPageBtn.onclick = function() {
            if(positionX >= 0) {
                positionX=0;
            }
            else {

                positionX = positionX + essayblockwidth+74 ;
            }
           
            sliderWrapper.style = `transform: translateX(${positionX}px);`;
        };
    },
     essayWrapper: $$('.essay-block'),
     


    start: function () {
        this.render();
        this.eventHandler();
        
    }
}

mainPage.start();

