$(document).ready(function(){
    $('#tree_content').css('display', 'block');
    $('#tree_con').css('display','none');
    $('#tabchange').css('display','none');
    $('#tabview').css('display', 'block');
    $('#commonview').css('display','none');
});
function s_resize(){
    $('#tree_con .leftmenu').height($(window).height()-195);
}
$(window).bind('resize',s_resize);
function loadRootTab(){
    //loadMenu();
    var hash = window.location.hash;
    if(hash=='#notes'){
        loadSortTab();
    }  else if(hash=='#newfile') {
        loadNewTab();
    } else {
        showTable();
    }
    showUserDiskInfo();//refresh userInfo;
}
function showTable(){
    $("#tree_content ul li").removeClass("treelibg");
    $("#tree_content ul a").removeClass();
    $("#myfile").parent().addClass("treelibg myfiledown");
    $('#disk_upload2_href').attr("title","创建目录")
        .attr("href","folderCreateDispatch.do?parentId=986284&divType=")
        .bind("click",function(e){
        hs.htmlExpand(this,{headingText:'创建文件夹',objectType:'ajax',width:650,height:450,src:document.getElementById('disk_upload2_href').href});
        return false;
    })
        .html(' <img class="build"  src="http://tmisc.home.news.cn/vdisk1/js/lib/vx_disk/images/newcreate.png"  />');
    changePid('986284');
    var divType = $('#divType').val();
    var pageSize=changePageSize(divType);
    var action = "tabList.do?fid=986284&orderBy=1"+"&time="+Math.random()+"&share=0&pageNo=1&pageSize="+pageSize+"&divType="+divType;
    ajaxJump(action);
    showUserDiskInfo();//refresh userInfo;
}
function isOpenNotes(){
    var hash = window.location.hash;
    if(hash=='#notes'){
        loadSotemenu();
        loadNotepadTab();
    }
}

function loadNewTab(){
    loadMenu();
    $("#tree_content ul li").removeClass("treelibg");
    $("#tree_content ul a").removeClass();
    $("#latestupload").parent().addClass("treelibg").addClass("latestuploaddown");
    $('#disk_upload2_href').attr("title","创建目录")
        .attr("href","folderCreateDispatch.do?parentId=986284&divType=")
        .bind("click",function(e){
            hs.htmlExpand(this,{headingText:'创建文件夹',objectType:'ajax',width:650,height:450,src:document.getElementById('disk_upload2_href').href});
            return false;
        })
        .html(' <img class="build" src="http://tmisc.home.news.cn/vdisk1/js/lib/vx_disk/images/newcreate.png">');
    changePid('986284');
    var divType = $('#divType').val();
    var pageSize=changePageSize(divType);
    var action = "tabNewList.do?fid=986284&orderBy=1"+"&time="+Math.random()+"&share=0&pageNo=1&pageSize="+pageSize+"&divType="+divType;
    ajaxJump(action);
    showUserDiskInfo();//refresh userInfo;
}
function loadDelTab(){
    loadMenu();
    $("#tree_content ul li").removeClass("treelibg");
    $("#tree_content ul a").removeClass();

    $('#disk_upload2_href').attr("title","创建目录")
        .attr("href","folderCreateDispatch.do?parentId=986284&divType=")
        .bind("click",function(e){
            hs.htmlExpand(this,{headingText:'创建文件夹',objectType:'ajax',width:650,height:450,src:document.getElementById('disk_upload2_href').href})
            return false;
        })
        .html(' <img class="build" src="http://tmisc.home.news.cn/vdisk1/js/lib/vx_disk/images/newcreate.png">');
    changePid('986284');
    var divType = $('#divType').val();
    var pageSize=changePageSize(divType);
    var action = "tabDelList.do?orderBy=1"+"&time="+Math.random()+"&share=0&pageNo=1&pageSize="+pageSize+"&divType="+divType;
    ajaxJump(action);
    showUserDiskInfo();//refresh userInfo;
}


function loadNotepadTab(){
    var divType = $('#divType').val();
    var pageSize=changePageSize(divType);
    var action = "notepadDispatch.do?flag=3&divtype="+divType+"&pageNo=1&pageSize="+pageSize;
    ajaxJump(action);
    showUserDiskInfo();//refresh userInfo;
}

function loadSortTab(){
    $("#tree_content ul li").removeClass("treelibg");
    $("#tree_content ul a").removeClass();
    $("#cloudnote").parent().addClass("treelibg cloudnotedown");
    loadSotemenu();
    var divType = $('#divType').val();
    $('#disk_upload2_href').attr("title","创建分类")
        .attr("href","sortDispatchAction.do?flag=1")
        .bind("click",function(e){
            hs.htmlExpand(this,{headingText:'创建文件夹',objectType:'ajax',width:650,height:450,src:document.getElementById('disk_upload2_href').href});
            return false;
        })
        .html('<img class="build" src="http://tmisc.home.news.cn/vdisk1/js/lib/vx_disk/images/newcreateca.png">');
    var pageSize=changePageSize(divType);
    var timstamp = (new Date()).valueOf();
    var action="sortDispatchAction.do?flag=3&pageNo=1&pageSize="+pageSize+"&divtype="+divType+"&t="+timstamp;
    ajaxJump(action);
    showUserDiskInfo();//refresh userInfo;
}


function loadPublicDisk(){

    $("#tree_content ul li").removeClass("treelibg");
    $("#tree_content ul a").removeClass();
    $("#publicdisk").parent().addClass("treelibg").removeClass().addClass("publicdiskdown");
    //loadPublicDiskMenu();
    $('#disk_upload2_href').attr("title","创建目录")
        .attr("href","folderCreateDispatch.do?parentId=986284&divType=")
        .bind("click",function(e){
            hs.htmlExpand(this,{headingText:'创建文件夹',objectType:'ajax',width:650,height:450,src:document.getElementById('disk_upload2_href').href})
            return false;
        })
        .html(' <img class="build"  src="http://tmisc.home.news.cn/vdisk1/js/lib/vx_disk/images/newcreate.png"  />');
//	loadMenu();
    changePid('986284');
    var divType = $('#divType').val();
    var pageSize=changePageSize(divType);
    var action ="publicDiskFolderList.do?parentId=986284&pageNo=1&divType="+divType+"&pageSize="+pageSize;
    ajaxJump(action);
    showUserDiskInfo('temp');//refresh userInfo;
}
function loadPublicVDiskFile(){
    var divType = $('#divType').val();
    var pageSize=changePageSize(divType);
    var timstamp = (new Date()).valueOf();
    var action="pvFileList.do?pvParentId=1&pageNo=1&pageSize="+pageSize+"&divtype="+divType+"&t="+timstamp;
    ajaxJump(action);
    showUserDiskInfo('temp');//refresh userInfo;
}
function loadCreamVideoTab(flag){
    $.ajax({
        type:"post",				//使用post方法访问后台
        dataType:"html",			//返回html格式的数据
        url:"getCreamVideo.do",		//要访问的后台地址
        data:{
            flag:flag
        },
        complete:function(){},
        success:function(data){
            if(data != '0') {
                $("#tree_content ul li").removeClass("treelibg");
                $("#tree_content ul a").removeClass();
                $("#cloudphoto").parent().addClass("treelibg").addClass("cloudphotodown");
                $('#disk_upload2_href').attr("title","创建目录")
                    .attr("href","folderCreateDispatch.do?parentId=986284&divType=")
                    .bind("click",function(e){
                        hs.htmlExpand(this,{headingText:'创建文件夹',objectType:'ajax',width:650,height:450,src:document.getElementById('disk_upload2_href').href});
                        return false;
                    })
                    .html(' <img class="build" src="http://tmisc.home.news.cn/vdisk1/js/lib/vx_disk/images/newcreate.png">');
                fileLinkEvent(data);
                var divType = $('#divType').val();
                var pageSize=changePageSize(divType);
                var action = "tabList.do?fid="+data+"&orderBy=1"+"&time="+Math.random()+"&share=0&pageNo=1&pageSize="+pageSize+"&divType="+divType;
                ajaxJump(action);
            } else {
                alert('error');
            }
        }	//调用handleSuccess函数处理结果
    });
    showUserDiskInfo();//refresh userInfo;
}
function loadVideoTab(flag){
    $.ajax({
        type:"post",				//使用post方法访问后台
        dataType:"html",			//返回html格式的数据
        url:"getCreamVideo.do",		//要访问的后台地址
        data:{
            flag:flag
        },
        complete:function(){
        },
        success:function(data){
            if(data != '0') {
                $("#tree_content ul li").removeClass("treelibg");
                $("#tree_content ul a").removeClass();
                $("#cloudvideo").parent().addClass("treelibg").addClass("cloudvideodown");
                $('#disk_upload2_href').attr("title","创建目录")
                    .attr("href","folderCreateDispatch.do?parentId=986284&divType=")
                    .bind("click",function(e){
                        hs.htmlExpand(this,{headingText:'创建文件夹',objectType:'ajax',width:650,height:450,src:document.getElementById('disk_upload2_href').href})
                        return false;
                    })
                    .html(' <img class="build"  src="http://tmisc.home.news.cn/vdisk1/js/lib/vx_disk/images/newcreate.png"  />');
                fileLinkEvent(data);
                var divType = $('#divType').val();
                var pageSize=changePageSize(divType);
                var action = "tabList.do?fid="+data+"&orderBy=1"+"&time="+Math.random()+"&share=0&pageNo=1&pageSize="+pageSize+"&divType="+divType;
                ajaxJump(action);
            } else {
                alert('error');
            }
        }	//调用handleSuccess函数处理结果
    });
    showUserDiskInfo();//refresh userInfo;
}
