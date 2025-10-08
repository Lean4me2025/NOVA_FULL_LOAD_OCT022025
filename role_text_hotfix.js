// Runtime hotfix: Try → Discover
(function(){
function swap(){
const re=/(^|\b)Try these roles:/i;
const tree=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
let n;while((n=tree.nextNode())){
if(re.test(n.nodeValue||'')){
n.nodeValue=(n.nodeValue||'').replace(re,'$1Discover these roles:');
break;
}}
}
(document.readyState==='loading')?document.addEventListener('DOMContentLoaded',swap):swap();
})();