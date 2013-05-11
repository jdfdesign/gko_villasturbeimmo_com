/*
 * jQuery UI Nested Sortable
 * v 1.3.5 / 21 jun 2012
 * http://mjsarfatti.com/code/nestedSortable
 *
 * Depends on:
 *	 jquery.ui.sortable.js 1.8+
 *
 * Copyright (c) 2010-2012 Manuele J Sarfatti
 * Licensed under the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(e){e.widget("mjs.nestedSortable",e.extend({},e.ui.sortable.prototype,{options:{tabSize:20,disableNesting:"mjs-nestedSortable-no-nesting",errorClass:"mjs-nestedSortable-error",listType:"ol",maxLevels:0,protectRoot:!1,rootID:null,rtl:!1,isAllowed:function(){return!0}},_create:function(){if(this.element.data("sortable",this.element.data("nestedSortable")),!this.element.is(this.options.listType))throw new Error("nestedSortable: Please check the listType option is set to your actual list type");return e.ui.sortable.prototype._create.apply(this,arguments)},destroy:function(){return this.element.removeData("nestedSortable").unbind(".nestedSortable"),e.ui.sortable.prototype.destroy.apply(this,arguments)},_mouseDrag:function(t){if(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll){var n=this.options,r=!1;this.scrollParent[0]!=document&&"HTML"!=this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<n.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+n.scrollSpeed:t.pageY-this.overflowOffset.top<n.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-n.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<n.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+n.scrollSpeed:t.pageX-this.overflowOffset.left<n.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-n.scrollSpeed)):(t.pageY-e(document).scrollTop()<n.scrollSensitivity?r=e(document).scrollTop(e(document).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<n.scrollSensitivity&&(r=e(document).scrollTop(e(document).scrollTop()+n.scrollSpeed)),t.pageX-e(document).scrollLeft()<n.scrollSensitivity?r=e(document).scrollLeft(e(document).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<n.scrollSensitivity&&(r=e(document).scrollLeft(e(document).scrollLeft()+n.scrollSpeed))),r!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)}this.positionAbs=this._convertPositionTo("absolute");var i=this.placeholder.offset().top;this.options.axis&&"y"==this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"==this.options.axis||(this.helper[0].style.top=this.position.top+"px");for(var o=this.items.length-1;o>=0;o--){var a=this.items[o],s=a.item[0],l=this._intersectsWithPointer(a);if(l&&s!=this.currentItem[0]&&this.placeholder[1==l?"next":"prev"]()[0]!=s&&!e.contains(this.placeholder[0],s)&&("semi-dynamic"==this.options.type?!e.contains(this.element[0],s):!0)){if(e(s).mouseenter(),this.direction=1==l?"down":"up","pointer"!=this.options.tolerance&&!this._intersectsWithSides(a))break;e(s).mouseleave(),this._rearrange(t,a),this._clearEmpty(s),this._trigger("change",t,this._uiHash());break}}var c=this.placeholder[0].parentNode.parentNode&&e(this.placeholder[0].parentNode.parentNode).closest(".ui-sortable").length?e(this.placeholder[0].parentNode.parentNode):null,u=this._getLevel(this.placeholder),d=this._getChildLevels(this.helper),f=this.placeholder[0].previousSibling?e(this.placeholder[0].previousSibling):null;if(null!=f)for(;"li"!=f[0].nodeName.toLowerCase()||f[0]==this.currentItem[0]||f[0]==this.helper[0];){if(!f[0].previousSibling){f=null;break}f=e(f[0].previousSibling)}var p=this.placeholder[0].nextSibling?e(this.placeholder[0].nextSibling):null;if(null!=p)for(;"li"!=p[0].nodeName.toLowerCase()||p[0]==this.currentItem[0]||p[0]==this.helper[0];){if(!p[0].nextSibling){p=null;break}p=e(p[0].nextSibling)}var h=document.createElement(n.listType);return this.beyondMaxLevels=0,null!=c&&null==p&&(n.rtl&&this.positionAbs.left+this.helper.outerWidth()>c.offset().left+c.outerWidth()||!n.rtl&&this.positionAbs.left<c.offset().left)?(c.after(this.placeholder[0]),this._clearEmpty(c[0]),this._trigger("change",t,this._uiHash())):null!=f&&(n.rtl&&this.positionAbs.left+this.helper.outerWidth()<f.offset().left+f.outerWidth()-n.tabSize||!n.rtl&&this.positionAbs.left>f.offset().left+n.tabSize)?(this._isAllowed(f,u,u+d+1),f.children(n.listType).length||f[0].appendChild(h),i&&f.offset().top>=i?f.children(n.listType).prepend(this.placeholder):f.children(n.listType)[0].appendChild(this.placeholder[0]),this._trigger("change",t,this._uiHash())):this._isAllowed(c,u,u+d),this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t){this.beyondMaxLevels&&(this.placeholder.removeClass(this.options.errorClass),this.domPosition.prev?e(this.domPosition.prev).after(this.placeholder):e(this.domPosition.parent).prepend(this.placeholder),this._trigger("revert",t,this._uiHash()));for(var n=this.items.length-1;n>=0;n--){var r=this.items[n].item[0];this._clearEmpty(r)}e.ui.sortable.prototype._mouseStop.apply(this,arguments)},serialize:function(t){var n=e.extend({},this.options,t),r=this._getItemsAsjQuery(n&&n.connected),i=[];return e(r).each(function(){var t=(e(n.item||this).attr(n.attribute||"id")||"").match(n.expression||/(.+)[-=_](.+)/),r=(e(n.item||this).parent(n.listType).parent(n.items).attr(n.attribute||"id")||"").match(n.expression||/(.+)[-=_](.+)/);t&&i.push((n.key||t[1])+"["+(n.key&&n.expression?t[1]:t[2])+"]"+"="+(r?n.key&&n.expression?r[1]:r[2]:n.rootID))}),!i.length&&n.key&&i.push(n.key+"="),i.join("&")},toHierarchy:function(t){function n(t){var i=(e(t).attr(r.attribute||"id")||"").match(r.expression||/(.+)[-=_](.+)/);if(i){var o={id:i[2]};return e(t).children(r.listType).children(r.items).length>0&&(o.children=[],e(t).children(r.listType).children(r.items).each(function(){var e=n(this);o.children.push(e)})),o}}var r=e.extend({},this.options,t),i=(r.startDepthCount||0,[]);return e(this.element).children(r.items).each(function(){var e=n(this);i.push(e)}),i},toArray:function(t){function n(t,a,s){var l,c,u=s+1;if(e(t).children(r.listType).children(r.items).length>0&&(a++,e(t).children(r.listType).children(r.items).each(function(){u=n(e(this),a,u)}),a--),l=e(t).attr(r.attribute||"id").match(r.expression||/(.+)[-=_](.+)/),a===i+1)c=r.rootID;else{var d=e(t).parent(r.listType).parent(r.items).attr(r.attribute||"id").match(r.expression||/(.+)[-=_](.+)/);c=d[2]}return l&&o.push({item_id:l[2],parent_id:c,depth:a,left:s,right:u}),s=u+1}var r=e.extend({},this.options,t),i=r.startDepthCount||0,o=[],a=2;return o.push({item_id:r.rootID,parent_id:"none",depth:i,left:"1",right:2*(e(r.items,this.element).length+1)}),e(this.element).children(r.items).each(function(){a=n(this,i+1,a)}),o=o.sort(function(e,t){return e.left-t.left})},_clearEmpty:function(t){var n=e(t).children(this.options.listType);n.length&&!n.children().length&&n.remove()},_getLevel:function(e){var t=1;if(this.options.listType)for(var n=e.closest(this.options.listType);n&&n.length>0&&!n.is(".ui-sortable");)t++,n=n.parent().closest(this.options.listType);return t},_getChildLevels:function(t,n){var r=this,i=this.options,o=0;return n=n||0,e(t).children(i.listType).children(i.items).each(function(e,t){o=Math.max(r._getChildLevels(t,n+1),o)}),n?o+1:o},_isAllowed:function(t,n,r){var i=this.options,o=e(this.domPosition.parent).hasClass("ui-sortable")?!0:!1,a=this.placeholder.closest(".ui-sortable").nestedSortable("option","maxLevels");!i.isAllowed(t,this.placeholder)||t&&t.hasClass(i.disableNesting)||i.protectRoot&&(null==t&&!o||o&&n>1)?(this.placeholder.addClass(i.errorClass),this.beyondMaxLevels=r>a&&0!=a?r-a:1):r>a&&0!=a?(this.placeholder.addClass(i.errorClass),this.beyondMaxLevels=r-a):(this.placeholder.removeClass(i.errorClass),this.beyondMaxLevels=0)}})),e.mjs.nestedSortable.prototype.options=e.extend({},e.ui.sortable.prototype.options,e.mjs.nestedSortable.prototype.options)})(jQuery);var list_reorder={initialised:!1,init:function(e,t){this.element=e,this.url=t,e.nestedSortable({disableNesting:"no-nest",forcePlaceholderSize:!0,handle:"i.icon-move",helper:"clone",items:"li",listType:"ul",maxLevels:MENU_LEVEL,opacity:.6,placeholder:"placeholder",revert:250,tabSize:25,tolerance:"pointer",toleranceElement:"> div",update:function(e,t){item_id=get_number_from_string(t.item.attr("id"));try{parent_id=t.item.parent().parent().attr("id"),parent_id=void 0==parent_id?0:get_number_from_string(parent_id)}catch(n){parent_id=0}try{prev_id=get_number_from_string(t.item.prev().attr("id"))}catch(n){prev_id=0}try{next_id=get_number_from_string(t.item.next().attr("id"))}catch(n){next_id=0}jQuery.ajax({type:"POST",url:list_reorder.url,data:{node_id:item_id,parent_id:parent_id,prev_id:prev_id,next_id:next_id,authenticity_token:AUTH_TOKEN},dataType:"script",beforeSend:function(){attachLoading("body")},error:function(){},complete:function(){removeLoading("body")}})}}),this.initialised=!0}};