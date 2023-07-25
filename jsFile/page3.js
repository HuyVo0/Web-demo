$(document).ready(function() {
    let listEasay = localStorage.getItem("list-easay") ? JSON.parse(localStorage.getItem("list-easay")) : [];
    let mainContentItemWrapper = $('.main-content-item__wrapper');
    let scrollPosition = 0;
// xử lí render
    function renderList(array) {
        const htmls = array.map(function(essay,index) {
            return `
            <div class="main-content-item flex">
                    <div class="main-content-item__img">
                        <img src=".//asset/img/luanVanimg.jpg" alt="">
                    </div>
                    <div class="main-content-item__text center-col space-between">
                        <div class="main-content-item__title">
                            <h3>${essay.easayName}</h3>
                        </div>
                        <div class="main-content-item__name flex">
                            <span>tác giả: </span>
                            <h4> ${essay.name}</h4>
                        </div>
                        <div class="main-content-item-desc">
                            <p>Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Explicabo eligendi 
                                corrupti laboriosam maxime adipisci, 
                                magnam sapiente officiis, quibusdam 
                                sequi dolor eveniet rerum quod eius. 
                                Eveniet ullam excepturi corrupti 
                                quibusdam accusamus. Lorem ipsum dolor sit amet consectetur adipisicing 
                                elit. Vel itaque culpa esse est eaque quis facere iste ipsum quae quam 
                                voluptatum quod sit nihil velit ut nobis fugit, aliquam nemo. Lorem ipsum 
                                dolor sit amet consectetur adipisicing elit. Ea cumque optio esse, quam
                                 saepe molestias quaerat voluptatum magni, doloremque aperiam possimus 
                                 architecto. Consequuntur animi ut odio ex illum quia quae.</p>
                        </div>
                        <div class="main-content-item__option-bar space-between flex">
                            <div class="main-content-item__option-btn">
                                <i class="ti-eye"></i>
                                <span>83</span>
                            </div>
                            <div class="main-content-item__option-btn">
                                <i class="ti-download"></i>
                                <span>12</span>
                            </div>
                            <div class="main-content-item__option-btn flex">
                                <i class="ti-file"></i>
                                <span>doc</span>
                            </div>
                            <div class="main-content-item__option-btn">
                                <i class="ti-download"></i>
                                <span>Download</span>
                            </div>
                        </div>
                    </div>
                </div>`
        })
        mainContentItemWrapper.html(htmls.join(' '));
    };



    // hàm bỏ kí tự đặc biệt
    function removeVietnameseTones(str) {
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
    };

    // function search(inputValue) {
    //     let essayItem = $('.main-content-item').outerHeight();
    //     let contentItem = $('.main-content-item__title');
    //     console.log(contentItem.length);
    //     for(let index = 0; index <contentItem.length; index++) {
    //         if(removeVietnameseTones(contentItem[index].innerText.toUpperCase()).includes(removeVietnameseTones(inputValue.toUpperCase()))) {
    //             positionX = 0;
    //             $('.content-block').scrollTop(positionX);
    //             positionX = essayItem*index;
    //             $('.content-block').scrollTop(positionX);
    //             break;
    //         }
    //     }
    //     if(inputValue === "") {
    //         $('.content-block').scrollTop(0);
    //     }
    // };
    function search(inputValue) {
        let essayItem = $('.main-content-item').outerHeight();
        let contentItems = $('.main-content-item__title');
      
        let matchFound = false; // Flag to indicate if a match has been found
      
        contentItems.each(function(index) {
          let text = removeVietnameseTones($(this).text().toUpperCase());
          if (text.includes(removeVietnameseTones(inputValue.toUpperCase()))) {
            matchFound = true; // Set the flag to true to indicate a match is found
      
            let positionX = essayItem * index;
            $('.content-block').scrollTop(positionX);
      
            return false; // Exit the loop early once the first match is found
          }
        });
      
        // If no match is found or inputValue is empty, scroll to the top
        if (!matchFound || inputValue === "") {
          $('.content-block').scrollTop(0);
        }
      }

    function eventHandlers() {
        //    xử lí cuộn 
        $('.content-block').scroll(function() {
            let scrollTop = $(this).scrollTop();
            if(scrollTop === 0) {
                $(this).find('.main-select-bar').css({
                    'top': '8px',
                    'left': '24px',
                    'width': 96.5 + '%'
                });
            } 
            else {
    
                $(this).find('.main-select-bar').css({
                    'top': scrollTop + 'px',
                    'left': '0px',
                    'width': 100 + '%'
                });
            }
          });
          $('.header2-navbar__search').on('input', function() {
                search($(this).val());
          });


          let prevScrollTop = $(window).scrollTop();
          $(window).scroll(function() {
            let currentScrollTop = $(window).scrollTop();
            
            if(currentScrollTop > prevScrollTop) {
                $('.header2-navbar ').css('top', -65 + 'px');
                
            }
            else {
                $('.header2-navbar ').css('top',0);
            }
            setTimeout(function() {
                prevScrollTop = currentScrollTop;
            },100)
            if(currentScrollTop ===0) {
                $('.header2-navbar ').css('top',0);
            }
            console.log($('.header2-navbar '));
            console.log('pre',prevScrollTop);
            console.log('curent',currentScrollTop);
          });

          //   xử lí tìm kiếm
    };
      
   
      
      
      
      
      


    renderList(listEasay);
    eventHandlers();    
});