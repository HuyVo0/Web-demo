$(document).ready(function() {
    let listEasay = localStorage.getItem("list-easay") ? JSON.parse(localStorage.getItem("list-easay")) : [];
    let mainContentItemWrapper = $('.main-content-item__wrapper');

    let mainContentItemWrapperGrid = $('.main-content-item__wrapper-grid');
    
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
                            <span>Tác giả: </span>
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


    function renderListGrid(array) {
        const htmls = array.map(function(essay,index) {
            return `
            <div class="content-boxx col-25">
                    <div class="content-box__imgg">
                        <img src="./asset/img/luanVanimg.jpg" alt="">
                    </div>
                    <div class="content-box__descc flex-end">
                        <div class="main-content-item__title ">
                            <h3 class="width-h3">${essay.easayName}</h3>
                        </div>
                        <div class="main-content-item__name flex">
                            <span>Tác giả: </span>
                            <h4> ${essay.name}</h4>
                        </div>
                        <div class="main-content-item-desc ">
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
                        <div class="main-content-item__download-btn ">
                            <i class="ti-download"></i>
                                <span>Download</span>
                        </div>
                    </div>
                </div>
            `
        })
        mainContentItemWrapperGrid.html(htmls.join(' '));
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



    //   search grid 
    function gridSearch(inputValue, array) {
        let essaySearch = array.filter(function (itemValue) {
            return removeVietnameseTones(itemValue.easayName.toUpperCase()).includes(removeVietnameseTones(inputValue.toUpperCase()));
        });
        renderListGrid(essaySearch);
    };




    //   hàm đổi dạng 
    function changeList (signal) {
        if(signal === 1) {
            $('.row-list').removeClass('hide');
            $('.grid-list').addClass('hide');
          

        }else if(signal === 2) {
            $('.row-list').addClass('hide');
            $('.grid-list').removeClass('hide');
           
            
        }
    };


    // hàm phân trang : công thức:
    // currentPage
    // limit = 8
    // beginGet = limit * (thisPage -1)
    // endGet = limit * thisPage - 1
    let currentPage=1;
    let limit = 8;
   
  
    
    function loadItem () {
        let beginGet = limit * (currentPage -1);
        let endGet = limit * currentPage-1;
        $('.content-boxx').each(function(index, item){
            if(index >= beginGet && index<= endGet) {
                item.style.display = 'block';
            }
            else {
                item.style.display = 'none';

            }
            
        });
        addNumberLists();
        eventHandlers()
    }
    
    function addNumberLists() {
        let count = Math.ceil($('.content-boxx').length / limit);
        
        $('.grid-pagination').html('');
        
        for(let i = 1; i <= count; i++) {
            let newpage = $(`<li>${i}</li>`);
            if(i == currentPage) {
                newpage.addClass('active');
            }
            newpage.attr("data-index", `${i}`);
            $('.grid-pagination').append(newpage);
        }
        
    };
    
    function changePage(i){
        currentPage = i;
        loadItem();
        
    }
    function paginationBtn(){
        
        $('.pagination div').click(function() {
            // console.log($(this).text());
                if($(this).hasClass('prevBtn')) {
                    $('.nextBtn').removeClass('disabled');
                    $('.prevBtn').removeClass('disabled');
                    if(currentPage === 1  )  
                    {
                        $('.prevBtn').addClass('disabled');
                    }
                    else if(currentPage !== 1) {
                        currentPage = currentPage-1;
                        changePage(currentPage);
                        
                
                    } 
                    if(currentPage === 1  )  
                    {
                        $('.prevBtn').addClass('disabled');
                    }
                }
                 else  {
                    let count = Math.ceil($('.content-boxx').length / limit);
                    $('.prevBtn').removeClass('disabled');
                    
                    if(currentPage !== count) {
                        currentPage = currentPage+1;
                        changePage(currentPage);
                        
                        if(currentPage === count)
                        {
                            $('.nextBtn').addClass('disabled');
                        }
                    }
                    
                   
                }
            
           
            })
            
        };
    

    


       
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
        //   sử lí tìm kiếm
          $('.header2-navbar__search').on('input', function() {
                search($(this).val());
          });

        //   header khi di chuyển 
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
           
          });

          $('.row-icon').click(function() {
                $(this).addClass('active');
                $('.pagination').addClass('hide');
                $('.grid-icon').removeClass('active');
                changeList(1);
        });
        
        $('.grid-icon').click(function() {
                $(this).addClass('active');
                $('.pagination').removeClass('hide');
                $('.row-icon').removeClass('active');
                changeList(2);
        });
        $('.grid-pagination li').click(function() {
            let count = Math.ceil($('.content-boxx').length / limit);
            
            changePage(parseInt($(this).attr('data-index')));
            if(currentPage !== 1) {
                $('.prevBtn').removeClass('disabled')
            }
            else {
                $('.prevBtn').addClass('disabled')
            }
            if(currentPage !== count) {
                $('.nextBtn').removeClass('disabled')
            }
            else {
                $('.nextBtn').addClass('disabled')
            }
           
            
            
        })
        $('.header2-navbar__search').keypress(function(event) {
            // Kiểm tra xem phím nhấn là phím Enter (mã ASCII là 13)
            if (event.which === 13) {
              // Xử lý tại đây khi nhấn phím Enter
              let inputValue = $(this).val();
              gridSearch(inputValue, listEasay); 
              loadItem();
            }
        });
        
         
    };
      
   
    
      
      
      
      


    renderList(listEasay);
    renderListGrid(listEasay);
    loadItem();
    paginationBtn();
    eventHandlers();    
});