$('document').ready( function(){/*###########ACORDEION-DE-PRECIOS############*/
	$('dt').click('mouseenter', function(){
		$(this)
			.next()
			.slideDown()
			.siblings('dd')
			.slideUp();
		});	
	});
$('document').ready( function(){/*###########ACORDEION-DE-FOTOS############*/
	$('dta').click('mouseenter', function(){
		$(this)
			.next()
			.slideDown()
			.siblings('dda')
			.slideUp();
		});	
	});
