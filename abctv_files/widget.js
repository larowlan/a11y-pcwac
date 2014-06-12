var ABC = ABC ? ABC : {};

ABC.SHOP = function () {


	var shopProducts
		= "/enterprises/tv/shopProducts.json";
		
/* Set up functionality on page load */
	jQuery(document).ready(function() {
		/* AJAX modules */
		jQuery('#abc-shop').displayShopProduct(shopProducts);
	});
	


/* AJAX modules */
	/**
	 * Access a JSON file of product information
	 */	
    jQuery.fn.displayShopProduct = function(_shopProducts) {
		return this.each(function() {
        	jQuery.getJSON(_shopProducts, function(json) {
				
				var productsTotal = json.shopProducts.length;
				var shop_keyword  = ('shop_keyword');
				var randomProduct
					= Math.round((productsTotal-1) * Math.random());
				var selectedProduct
					= json.shopProducts[randomProduct];
					
				var module = jQuery('#abc-shop');
				
				module.find('div.shop p.title a')
					.text(selectedProduct.title);
				module.find('div.shop p.title a')
					.attr('href',selectedProduct.url);
				module.find('div.shop p.format')
					.text(selectedProduct.format);					
				module.find('div.shop p.price')
					.text(selectedProduct.price);
				module.find('div.bestsubmitLink a')
					.attr('href', selectedProduct.url);
				module.find('div.shop img.image')
					.attr('src', selectedProduct.thumbnail);
        	});
		});
    };
    
}();
