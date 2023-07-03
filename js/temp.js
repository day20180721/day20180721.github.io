let scrollTopList = [];
let scrollTopSum = 0;
$(".portfolio-page").each(function (index, element) {
    console.log($(element).offset());
    scrollTopList.push(scrollTopSum);
    $(element).data("index", index);
    $(element).data("scrollTop", scrollTopSum);
    scrollTopSum += element.offsetHeight;
})
console.log(scrollTopList);

document.addEventListener("keyup", keyup);
const rightKey = 39;

function keyup(event) {
    //表示键盘监听所触发的事件，同时传递参数event
    switch (event.keyCode) {
        case rightKey:
            console.log(document.documentElement.scrollTop);
            // bindScrollToNextSectionOnRightKey();
            document.documentElement.scrollTop = 13491;
            break;
    }
}

function bindScrollToNextSectionOnRightKey() {
    scrollTopList.forEach(function (value, i) {
        if (inComparedRange(i)) {
            if (betweenTwoPages(i, i + 1)) {
                console.log(document.documentElement.scrollTop + "between in" + scrollTopList[i] + "and" + scrollTopList[i + 1])
                let nextPageScrollTop = scrollTopList[i + 1];
                document.documentElement.scrollTop = nextPageScrollTop;
            }
        } else {
        }
    });
}

function betweenTwoPages(pageOneTopScrollIndex, pageTwoTopScrollIndex) {
    let currentScroll = document.documentElement.scrollTop;
    return currentScroll >= scrollTopList[pageOneTopScrollIndex] && currentScroll < scrollTopList[pageTwoTopScrollIndex + 1]
}

function inComparedRange(i) {
    return i < scrollTopList.length - 1;
}

<div className="container-fluid ">
    <div className="row">
        <div className="col-md-12 ">