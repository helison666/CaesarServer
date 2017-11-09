'use strict';
function DomProvider ($) {
	this.row = $('#row');
	this.topMenu = $('#top-menu');
	this.wrapper =$('#wrapper');
	this.header = $('#header');
	this.logo = $('#logo');
	this.icon = $('#icon');	
	this.leftMenu = $('#left-menu');
	this.rightMenu = $('#right-menu');
	this.page = $('#page');
	this.leftSideBar = $('#left-side-bar');
	this.contentSection = $('#content-section');
	this.rightSideBar = $('#right-side-bar');
	this.modalWindow = $('#modal-window');

	return this;
}

