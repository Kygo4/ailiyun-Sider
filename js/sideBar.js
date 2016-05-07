(function ($) {
    var config = {};
    var dataTitle = ['云产品'];
    var dataLevel0 = ['云服务器ECS', '负载均衡', '云数据库RDS', '开放存储服务OSS', '内容分发服务', '云盾', '云监控', '更多云服务'];
    var dataLevel1 = [['开放存储服务OSS', '内容分发服务', '云盾', '云监控', '更多云服务'],['云服务器ECS', '负载均衡', '云数据库RDS', '开放存储服务OSS', '内容分发服务', '云盾'],['云服务器ECS', '负载均衡', '云数据库RDS', '云盾', '云监控', '更多云服务'],['负载均衡', '云数据库RDS', '开放存储服务OSS', '内容分发服务', '云盾', '云监控', '更多云服务'],['开放存储服务OSS', '内容分发服务', '云盾', '云监控', '更多云服务'],['云服务器ECS', '负载均衡', '云数据库RDS', '内容分发服务', '云盾', '云监控', '更多云服务'],['云服务器ECS', '负载均衡', '云数据库RDS', '开放存储服务OSS', '云盾', '云监控', '更多云服务'],['云服务器ECS', '负载均衡', '云数据库RDS', '开放存储服务OSS', '内容分发服务', '云盾', '云监控', '更多云服务', '云盾', '云监控', '更多云服务']];
    var stateMap = {
        $slideBar: null,
        dataId: 0,
        levelOneState: 'allclosed',
        toggleUlTimeout: null
    }
    var domQuery = {};
    /*-----------util-------------*/
    var makeId = function () {
        return stateMap.dataId++;
    }
    /*-----------dom-------------*/
    var setDomjuery = function () {
        domQuery = {
            $slideBar: stateMap.$slideBar
        }
    }
    var createUl0 = function () {
        domQuery.$slideBar.append('<h3>' + dataTitle[0] + '</h3><ul style=\'z-index: 5;\' data-level=\'' + 0 + '\'></ul>');
        $.each(dataLevel0, function (index, value) {
            domQuery.$slideBar.find('ul').append('<li data-id=\'' + makeId() + '\'>' +  value  + '<span class=\"arrow-right\"></span>' + '</li>')
        })
    }
    var createUl1 = function () {
        var oUl;
        return function () {
            return oUl || (oUl = $('<ul style=\'z-index: 1;\' data-level=\'1\'></ul>'));
        }
    }()
    /*-----------event handler-------------*/
    var onToggleUl = function (ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        clearTimeout(stateMap.toggleUlTimeout)
        if ($(this).parent().data('level') == 0 && target.nodeName.toLowerCase() == 'li') {
            if (stateMap.levelOneState == 'allclosed') {
                toShowUl(ev);
            } else if (stateMap.levelOneState == 'hasOpened') {
                toToggleUl(ev);
            }
        }
    }
    var toToggleUl = function (ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        setTimeout(function () {
                createUl1().empty().css({display: 'block'});
                createUl1().append('<h3>' + target.innerText + '</h3>')
                $.each(dataLevel1[$(target).data('id')], function (index, value) {
                    createUl1().append('<li><a href=\'#\'>' + value + '</a></li>');
                })
            }, 200)
    }
    var toShowUl = function (ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        setTimeout(function () {
                createUl1().css({left: 0});
                createUl1().empty().animate({left: '180px'});
                createUl1().css({display: 'block'});
                createUl1().append('<h3>' + target.innerText + '</h3>')
                $.each(dataLevel1[$(target).data('id')], function (index, value) {
                    createUl1().append('<li><a href=\'#\'>' + value + '</a></li>');
                })
                domQuery.$slideBar.append(createUl1());
            }, 1)
        stateMap.levelOneState = 'hasOpened';
        console.log(stateMap.levelOneState)
    }
    var onMouseoutUl = function (ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        stateMap.toggleUlTimeout = setTimeout(function () {
            createUl1().css({display: 'none'});
            stateMap.levelOneState = 'allclosed';
        }, 200)
        console.log(stateMap.levelOneState)
    }

    var onMouseoverUl1 = function (ev) {
        var e = ev || event;
        var target = e.target || e.srcElement;
        if ($(this).data('level') == 1) {
            console.log('取消定时器')
            clearTimeout(stateMap.toggleUlTimeout)
        }
    }
    /*--------public event----------*/
    var init = function ($slideBar) {
        stateMap.$slideBar = $slideBar;
        setDomjuery();
        createUl0();
        $('.slideBar').find('ul').delegate('li', 'mouseover', onToggleUl);
        $('.slideBar').delegate('ul', 'mouseenter', onMouseoverUl1);
        $('.slideBar').delegate('ul', 'mouseleave', onMouseoutUl);
    }
    var slideBar = {
        init: init
    }
    window.slideBar = slideBar;
})(jQuery);

slideBar.init($('.slideBar'));
