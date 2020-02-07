class PageScroll {
    constructor( container, selector ) {
        this.nativeContainer = document.querySelector( container );
        this.items = this.nativeContainer.querySelectorAll( selector );
        this.assignEvents();
    }

    getOffsetTop( selector ) {
        const item = document.querySelector( selector );
        const offsetTop = item.offsetTop;        

        return offsetTop;
    }    

    scrollToElement( e, speed, callback ) {
    	e.preventDefault();

        const href = e.target.getAttribute( 'href' );
        const offsetTop = this.getOffsetTop( href );

        let y = window.pageYOffset;
        let scrollY;  
    
        (function scroll() {           
            if ( scrollY !== offsetTop ) {
                if ( y > offsetTop ) {
                    y -= speed;
                    scrollY = Math.max( offsetTop, y );
                } else {
                    y += speed;
                    scrollY = Math.min( offsetTop, y );
                }   

                window.scroll( 0, scrollY );
                requestAnimationFrame( scroll );
            }
        })(); 

        if( callback ) {
            callback();
        }

        location.hash = href;
    }

    assignEvents() {
        for( let i = 0; i < this.items.length; i++ ) {
            this.items[ i ].addEventListener( 'click', ( e ) => {
                this.scrollToElement( e, 150 );                
            } )
        }
    }
}

const pageScroll = new PageScroll( '.menu', '.menu__link' );
