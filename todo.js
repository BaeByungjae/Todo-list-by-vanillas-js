let what_list=document.querySelector('.what__list');
let input=document.querySelector('.what__input');
let done_list=document.querySelector('.done__list');
let pen_icon=document.querySelector('.pen-icon');
let check_icon=document.querySelector('.check-icon');
let clock_time=document.querySelector('.time');
let done_block=document.querySelector('.todo__done');
var num=1;

function enterkey() { 
    if (window.event.keyCode == 13) {
        var li=document.createElement('li');
        var block=document.createElement('div');
        block.addEventListener('dragstart',dragStart_);
        block.addEventListener('drag',drag_);
        block.setAttribute('draggable','true');
        block.id=num;
        num++;
        document.body.appendChild(block);
        li.textContent=input.value;
        add_icon(li,block,true);
 } 
}
function enter(){
    if(window.event.keyCode==13){
        var input=document.activeElement;
        var list=document.activeElement.parentNode;
        var block=document.activeElement.parentNode.parentNode;
        list.removeChild(input);
        list.textContent=input.value;
        list.style.removeProperty('border');
        add_icon(list,block,false);
    }
}

function add_icon(li,block,check){
    let pen_icon=document.querySelector('.pen-icon').cloneNode(true);
    let check_icon=document.querySelector('.check-icon').cloneNode(true);
    li.appendChild(check_icon);
    li.appendChild(pen_icon);
    block.appendChild(li);
    if(check)what_list.appendChild(block);
    input.value='';
    input.focus();
    check_icon.addEventListener('click',function(e){
        var list=e.target.parentNode;
        var block=list.parentNode;
        block.parentNode.removeChild(block);
        var del=document.createElement('del');
        del.textContent=list.textContent;
        list.innerHTML=null;
        list.appendChild(del);
        block.appendChild(list);
        done_list.appendChild(block);
    })
    pen_icon.addEventListener('click',function(e){
        var list_dom= e.target.parentNode;
        list_data=list_dom;
        list_data.textContent=null;
        var input_dom=document.createElement('input');
        input_dom.setAttribute("type","text");
        input_dom.setAttribute("onkeyup","enter();");
        input_dom.className='input_list';
        list_data.style.border='none';
        list_data.appendChild(input_dom);
        input_dom.focus();
    })
}

function get_Time(){
    var data=new Date();
    var hours=data.getHours();
    var min=data.getMinutes();
    var sec=data.getSeconds();
    clock_time.textContent=`${hours<10?`0${hours}`:hours} : ${min<10?`0${min}`:min} : ${sec<10?`0${sec}`:sec}`;
}
function init(){
    get_Time();
    setInterval(get_Time,1000);
}
init();

function dragStart_(e){
    console.warn('drag start');
    var Node=e.target;
    e.dataTransfer.setDragImage(Node,0,0);
    e.dataTransfer.setData('targetId',e.target.id);
}

function drag_(e){
    console.log("drag");
}
function dragOver_(e){
    e.preventDefault();
}
function drop_(e){
    var targetId=e.dataTransfer.getData('targetId');
    console.log('drop');
    e.preventDefault();
    var target=e.target.getElementsByClassName('done__list')[0];
    var block=document.getElementById(targetId);
    var list=block.getElementsByTagName('li')[0];
    var del=document.createElement('del');
    del.textContent=list.textContent;
    list.innerHTML=null;
    list.appendChild(del);
    //block.appendChild(list);
    target.appendChild(block);
}

done_block.addEventListener('dragover',dragOver_);
done_block.addEventListener('drop',drop_);