class ToggleMenu {
	constructor( container ) {
		this.menu = container.querySelector( '.menu' );
		this.button = container.querySelector( '.hamburger' );
		this.button.addEventListener( 'click', this.toggle.bind( this ), false );
	}

	toggle() {	
		if( !this.menu.classList.contains( 'menu_collapsing' ) ) {
			this.button.setAttribute( 'aria-expanded', String( !this.menu.classList.contains( 'menu_is-open' ) ) );

			if ( this.menu.classList.contains( 'menu_is-open' ) ) {
				this.hide()
			} else {
				this.show()
			}
		}
	}

	show() {
		this.menu.classList.add( 'menu_is-open' );
		this.menu.classList.add( 'menu_collapsing' );
		this.menu.style.height = this.menu.scrollHeight + 'px';                

		setTimeout( function() { 
			this.menu.classList.remove( 'menu_collapsing' ); 
			this.menu.style.height = '';                    
		}.bind( this ), 400);  
	}
	
	hide() {
		this.menu.style.height = this.menu.getBoundingClientRect().height + 'px';

		ToggleMenu.reflow( this.menu );

		this.menu.classList.add( 'menu_collapsing' );
		this.menu.style.height = '';

		setTimeout( function() {
			this.menu.classList.remove( 'menu_is-open' );
			this.menu.classList.remove( 'menu_collapsing' );
		}.bind( this ), 400 );       
	}

	static reflow( el ) {
		return el.offsetHeight;
	}
}

const toggleMenu = new ToggleMenu( document.querySelector( '.navigation' ) );

export default ToggleMenu;
