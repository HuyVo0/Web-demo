const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);

        
        const sliderWrapper = $('.slide');
        const nextPageBtn = $('.next-page-icon.next-btn');
        const prevPageBtn = $('.next-page-icon.prev-btn');
        const essayblock = $('.essay-block-item');
        const essayblockwidth = essayblock.offsetWidth;
        const inputBlock = $('.header2-search');
        const headerTop = $('.header2-navbar');
        const headerInput = $('.header2-navbar__search');
        
       
        
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
                                    <span><span>MSSV: </span>${essay.MSSV}</span>
                                    <span><span>Tên: </span>${essay.name}</span>
                                    <h3><span>Tên luận: </span>${essay.easayName}</h3>
                                </div>
                            
                            </div>
                        </div>
                        `
                })
                sliderWrapper.innerHTML = htmls.join(' ');
            },
            // Hàm Loại Bỏ Dấu Tìm Trên GITHUP =================================================================
            removeVietnameseTones: function(str) {
                str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
                str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
                str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
                str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
                str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
                str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
                str = str.replace(/đ/g,"d"); 
                str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
                str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
                str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
                str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
                str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
                str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
                str = str.replace(/Đ/g, "D");
                // Some system encode vietnamese combining accent as individual utf-8 characters
                // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
                str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
                str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
                // Remove extra spaces
                // Bỏ các khoảng trắng liền nhau
                str = str.replace(/ + /g," ");
                str = str.trim();
                // Remove punctuations
                // Bỏ dấu câu, kí tự đặc biệt
                str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
                return str;
            },
            
            
            searching: function(inputValue) {
                const _this = this;
                let essayWrappers = $$('.essay-block');
                
                for (let index = 0; index < essayWrappers.length; index++) {
                    let essayWrapper = essayWrappers[index];
                    let essayName = essayWrapper.querySelector('h3').innerText;
                    
                    if (_this.removeVietnameseTones(essayName.toUpperCase()).includes(_this.removeVietnameseTones(inputValue.toUpperCase()))) {
                        positionX = 0;
                        sliderWrapper.style = `transform: translateX(0px);`;
                        if ((index + 1) > essayWrappers.length) {
                            positionX = -(essayblockwidth + 74) * (essayWrappers.length - 4);
                            sliderWrapper.style = `transform: translateX(${positionX}px);`;
                        }else  {
                            
                                positionX = -(essayblockwidth + 74) * (index -1) ;
                            
                            
                            sliderWrapper.style = `transform: translateX(${positionX}px);`;
                        }
                        if(inputValue ==='') {
                            positionX = 0;
                            sliderWrapper.style = `transform: translateX(0px);`;
                        }
                    
                        break; 
                    }
                }
                
                    for (let index = 0; index < essayWrappers.length; index++) {
                        let essayWrapper = essayWrappers[index];
                        let essayName = essayWrapper.querySelector('h3').innerText;
                        if (_this.removeVietnameseTones(essayName.toUpperCase()).includes(_this.removeVietnameseTones(inputValue.toUpperCase()))) {
                            setTimeout(function(){
                                essayWrappers[index].parentElement.classList.remove('searched');
                            },3000)
                            essayWrappers[index].parentElement.classList.add('searched');
                        }
                    }
                
            },
            headerAper: function(){
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if(scrollTop >= 450 ) {
                    headerTop.style.top = 0;
                }
                else {
                    headerTop.style.top = `-65px`;
                }
            },


            eventHandler: function() {
                const _this = this;
                // xử lí chuyển trang
                nextPageBtn.onclick = function() {
                    
                    
                    if(positionX <= -essayblockwidth*(_this.listEasay.length-3)) {
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
                inputBlock.oninput = function() {
                    _this.searching(inputBlock.value);
                };
                headerInput.oninput = function() {
                    _this.searching(headerInput.value);
                };
                window.onscroll = function() {
                    _this.headerAper();
                }

            },
             


            start: function () {
                this.render()
                this.eventHandler();
                
            }
        }

        mainPage.start();

