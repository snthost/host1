(function (window, document) {
	/*global HTMLElement */

	var typeof_string			= typeof "",
		typeof_undefined		= typeof undefined,
		typeof_function			= typeof function () {},
		typeof_object			= typeof {},
		isTypeOf				= function (item, type) { return typeof item === type; },
		isString				= function (item) { return isTypeOf(item, typeof_string); },
		isUndefined				= function (item) { return isTypeOf(item, typeof_undefined); },
		isFunction				= function (item) { return isTypeOf(item, typeof_function); },

		isObject				= function (item) { return isTypeOf(item, typeof_object); },
		//Returns true if it is a DOM element
		isElement				= function (o) {
			return typeof HTMLElement === "object" ? o instanceof HTMLElement : typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === "string";
		},



		generateSimpleCart = function (space) {

			// stealing this from selectivizr
			var selectorEngines = {
				"MooTools"							: "$$",
				"Prototype"							: "$$",
				"jQuery"							: "*"
			},


				// local variables for internal use
				item_id					= 0,
				item_id_namespace		= "SCI-",
				sc_items				= {},
				namespace				= space || "simpleCart",
				selectorFunctions		= {},
				eventFunctions			= {},
				baseEvents				= {},

				// local references
				localStorage			= window.localStorage,
				console					= window.console || { msgs: [], log: function (msg) { console.msgs.push(msg); } },

				// used in views 
				_VALUE_		= 'value',
				_TEXT_		= 'text',
				_HTML_		= 'html',
				_CLICK_		= 'click',

				// Currencies
				currencies = {
					"GTQ": { code: "GTQ", symbol: "Q ", name: "quetzal" },
					"BTC": { code: "BTC", symbol: " BTC", name: "Bitcoin", accuracy: 4, after: true	}
				},

				// default options
				settings = {
             cartStyle: "table",
             checkout:{ 
                 type: "SendForm", 
                 url:"http://clientsntmail.000webhostapp.com/c1a22r333r4444i55555t666666o7777777.php",
                 method: "POST", },

					currency				: "GTQ",
					language				: "spanish-us",

					cartStyle				: "div",
					cartColumns			: [
                        
						{ attr: "name", label: "Name" },
						{ attr: "price", label: "Price", view: 'currency' },
						{ view: "decrement", label: false },
						{ attr: "quantity", label: "quantity" },
						{ view: "increment", label: false },
						{ attr: "total", label: "SubTotal", view: 'currency' },
						{ view: "remove", text: "Remove", label: false }
					],

					excludeFromCheckout	: ['thumb'],

					shippingFlatRate		: 0,
					shippingQuantityRate	: 0,
					shippingTotalRate		: 0,
					shippingCustom		: null,

					taxRate				: 0.001,
					
					taxShipping			: false,

					data				: {}

				},


				// main simpleCart object, function call is used for setting options
				simpleCart = function (options) {
					// shortcut for simpleCart.ready
					if (isFunction(options)) {
						return simpleCart.ready(options);
					}

					// set options
					if (isObject(options)) {
						return simpleCart.extend(settings, options);
					}
				},

				// selector engine
				$engine,

				// built in cart views for item cells
				cartColumnViews;

			// function for extending objects
			simpleCart.extend = function (target, opts) {
				var next;

				if (isUndefined(opts)) {
					opts = target;
					target = simpleCart;
				}

				for (next in opts) {
					if (Object.prototype.hasOwnProperty.call(opts, next)) {
						target[next] = opts[next];
					}
				}
				return target;
			};

			// create copy function
			simpleCart.extend({
				copy: function (n) {
					var cp = generateSimpleCart(n);
					cp.init();
					return cp;
				}
			});

			// add in the core functionality
			simpleCart.extend({

				isReady: false,

				// this is where the magic happens, the add function
				add: function (values, opt_quiet) {
					var info		= values || {},
						newItem		= new simpleCart.Item(info),
						addItem 	= true,
						// optionally supress event triggers
						quiet 		= opt_quiet === true ? opt_quiet : false,
						oldItem;

					// trigger before add event
					if (!quiet) {
					  	addItem = simpleCart.trigger('beforeAdd', [newItem]);
					
						if (addItem === false) {
							return false;
						}
					}
					
					// if the new item already exists, increment the value
					oldItem = simpleCart.has(newItem);
					if (oldItem) {
						oldItem.increment(newItem.quantity());
						newItem = oldItem;

					// otherwise add the item
					} else {
						sc_items[newItem.id()] = newItem;
					}

					// update the cart
					simpleCart.update();

					if (!quiet) {
						// trigger after add event
						simpleCart.trigger('afterAdd', [newItem, isUndefined(oldItem)]);
					}

					// return a reference to the added item
					return newItem;
				},


				// iteration function
				each: function (array, callback) {
					var next,
						x = 0,
						result,
						cb,
						items;

					if (isFunction(array)) {
						cb = array;
						items = sc_items;
					} else if (isFunction(callback)) {
						cb = callback;
						items = array;
					} else {
						return;
					}

					for (next in items) {
						if (Object.prototype.hasOwnProperty.call(items, next)) {
							result = cb.call(simpleCart, items[next], x, next);
							if (result === false) {
								return;
							}
							x += 1;
						}
					}
				},

				find: function (id) {
					var items = [];

					// return object for id if it exists
					if (isObject(sc_items[id])) {
						return sc_items[id];
					}
					// search through items with the given criteria
					if (isObject(id)) {
						simpleCart.each(function (item) {
							var match = true;
							simpleCart.each(id, function (val, x, attr) {

								if (isString(val)) {
									// less than or equal to
									if (val.match(/<=.*/)) {
										val = parseFloat(val.replace('<=', ''));
										if (!(item.get(attr) && parseFloat(item.get(attr)) <= val)) {
											match = false;
										}

									// less than
									} else if (val.match(/</)) {
										val = parseFloat(val.replace('<', ''));
										if (!(item.get(attr) && parseFloat(item.get(attr)) < val)) {
											match = false;
										}

									// greater than or equal to
									} else if (val.match(/>=/)) {
										val = parseFloat(val.replace('>=', ''));
										if (!(item.get(attr) && parseFloat(item.get(attr)) >= val)) {
											match = false;
										}

									// greater than
									} else if (val.match(/>/)) {
										val = parseFloat(val.replace('>', ''));
										if (!(item.get(attr) && parseFloat(item.get(attr)) > val)) {
											match = false;
										}

									// equal to
									} else if (!(item.get(attr) && item.get(attr) === val)) {
										match = false;
									}

								// equal to non string
								} else if (!(item.get(attr) && item.get(attr) === val)) {
									match = false;
								}

								return match;
							});

							// add the item if it matches
							if (match) {
								items.push(item);
							}
						});
						return items;
					}

					// if no criteria is given we return all items
					if (isUndefined(id)) {

						// use a new array so we don't give a reference to the
						// cart's item array
						simpleCart.each(function (item) {
							items.push(item);
						});
						return items;
					}

					// return empty array as default
					return items;
				},

				// return all items
				items: function () {
					return this.find();
				},

				// check to see if item is in the cart already
				has: function (item) {
					var match = false;

					simpleCart.each(function (testItem) {
						if (testItem.equals(item)) {
							match = testItem;
						}
					});
					return match;
				},

				// empty the cart
				empty: function () {
					// remove each item individually so we see the remove events
					var newItems = {};
					simpleCart.each(function (item) {
						// send a param of true to make sure it doesn't
						// update after every removal
						// keep the item if the function returns false,
						// because we know it has been prevented 
						// from being removed
						if (item.remove(true) === false) {
							newItems[item.id()] = item
						}
					});
					sc_items = newItems;
					simpleCart.update();
				},


				// functions for accessing cart info
				quantity: function () {
					var quantity = 0;
					simpleCart.each(function (item) {
						quantity += item.quantity();
					});
					return quantity;
				},

				total: function () {
					var total = 0;
					simpleCart.each(function (item) {
						total += item.total();
					});
					return total;
				},

				grandTotal: function () {
					return simpleCart.total() + simpleCart.tax() + simpleCart.shipping();
				},


				// updating functions
				update: function () {
					simpleCart.save();
					simpleCart.trigger("update");
				},

				init: function () {
					simpleCart.load();
					simpleCart.update();
					simpleCart.ready();
				},

				// view management
				$: function (selector) {
					return new simpleCart.ELEMENT(selector);
				},

				$create: function (tag) {
					return simpleCart.$(document.createElement(tag));
				},

				setupViewTool: function () {
					var members, member, context = window, engine;

					// Determine the "best fit" selector engine
					for (engine in selectorEngines) {
						if (Object.prototype.hasOwnProperty.call(selectorEngines, engine) && window[engine]) {
							members = selectorEngines[engine].replace("*", engine).split(".");
							member = members.shift();
							if (member) {
								context = context[member];
							}
							if (typeof context === "function") {
								// set the selector engine and extend the prototype of our
								// element wrapper class
								$engine = context;
								simpleCart.extend(simpleCart.ELEMENT._, selectorFunctions[engine]);
								return;
							}
						}
					}
				},

				// return a list of id's in the cart
				ids: function () {
					var ids = [];
					simpleCart.each(function (item) {
						ids.push(item.id());
					});
					return ids;

				},


				// storage
				save: function () {
					simpleCart.trigger('beforeSave');

					var items = {};

					// save all the items
					simpleCart.each(function (item) {
						items[item.id()] = simpleCart.extend(item.fields(), item.options());
					});

					localStorage.setItem(namespace + "_items", JSON.stringify(items));

					simpleCart.trigger('afterSave');
				},

				load: function () {

					// empty without the update
					sc_items = {};

					var items = localStorage.getItem(namespace + "_items");

					if (!items) {
						return;
					}
					
					// we wrap this in a try statement so we can catch 
					// any json parsing errors. no more stick and we
					// have a playing card pluckin the spokes now...
					// soundin like a harley.
					try {
						simpleCart.each(JSON.parse(items), function (item) {
							simpleCart.add(item, true);
						});
					} catch (e){
						simpleCart.error( "Error Loading data: " + e );
					}


					simpleCart.trigger('load');
				},

				// ready function used as a shortcut for bind('ready',fn)
				ready: function (fn) {

					if (isFunction(fn)) {
						// call function if already ready already
						if (simpleCart.isReady) {
							fn.call(simpleCart);

						// bind if not ready
						} else {
							simpleCart.bind('ready', fn);
						}

					// trigger ready event
					} else if (isUndefined(fn) && !simpleCart.isReady) {
						simpleCart.trigger('ready');
						simpleCart.isReady = true;
					}

				},


				error: function (message) {
					var msg = "";
					if (isString(message)) {
						msg = message;
					} else if (isObject(message) && isString(message.message)) {
						msg = message.message;
					}
					try { console.log("simpleCart(js) Error: " + msg); } catch (e) {}
					simpleCart.trigger('error', [message]);
				}
			});


			/*******************************************************************
			 *	TAX AND SHIPPING
			 *******************************************************************/
			simpleCart.extend({

				// TODO: tax and shipping
				tax: function () {
					var totalToTax = settings.taxShipping ? simpleCart.total() + simpleCart.shipping() : simpleCart.total(),
						cost = simpleCart.taxRate() * totalToTax;
					
					simpleCart.each(function (item) {
						if (item.get('tax')) {
							cost += item.get('tax');
						} else if (item.get('taxRate')) {
							cost += item.get('taxRate') * item.total();
						}
					});
					return parseFloat(cost);
				},
				
				taxRate: function () {
					return settings.taxRate || 0;
				},

				shipping: function (opt_custom_function) {

					// shortcut to extend options with custom shipping
					if (isFunction(opt_custom_function)) {
						simpleCart({
							shippingCustom: opt_custom_function
						});
						return;
					}

					var cost = settings.shippingQuantityRate * simpleCart.quantity() +
							settings.shippingTotalRate * simpleCart.total() +
							settings.shippingFlatRate;

					if (isFunction(settings.shippingCustom)) {
						cost += settings.shippingCustom.call(simpleCart);
					}

					simpleCart.each(function (item) {
						cost += parseFloat(item.get('shipping') || 0);
					});
					return parseFloat(cost);
				}

			});

			/*******************************************************************
			 *	CART VIEWS
			 *******************************************************************/

			// built in cart views for item cells
			cartColumnViews = {
				attr: function (item, column) {
					return item.get(column.attr) || "";
				},

				currency: function (item, column) {
					return simpleCart.toCurrency(item.get(column.attr) || 0);
				},

				link: function (item, column) {
					return "<a href='" + item.get(column.attr) + "'>" + column.text + "</a>";
				},

				decrement: function (item, column) {
					return "<a href='javascript:;' class='" + namespace + "_decrement'>" + (column.text || "") + "</a>";
				},

				increment: function (item, column) {
					return "<a href='javascript:;' class='" + namespace + "_increment'>" + (column.text || "") + "</a>";
				},

				image: function (item, column) {
					return "<img src='" + item.get(column.attr) + "'/>";
				},

				input: function (item, column) {
					return "<input type='text' value='1" + item.get(column.attr) + "' class='" + namespace + "_input'/>";
				},

				remove: function (item, column) {
					return "<a href='javascript:;' class='" + namespace + "_remove'>" + (column.text || "") + "</a>";
				}
			};

			// cart column wrapper class and functions
			function cartColumn(opts) {
				var options = opts || {};
				return simpleCart.extend({
					attr			: "",
					label			: "",
					view			: "attr",
					text			: "",
					className		: "",
					hide			: false
				}, options);
			}

			function cartCellView(item, column) {
				var viewFunc = isFunction(column.view) ? column.view : isString(column.view) && isFunction(cartColumnViews[column.view]) ? cartColumnViews[column.view] : cartColumnViews.attr;

				return viewFunc.call(simpleCart, item, column);
			}


			simpleCart.extend({

				// write out cart
				writeCart: function (selector) {
					var TABLE = settings.cartStyle.toLowerCase(),
						isTable = TABLE === 'table',
						TR = isTable ? "tr" : "div",
						TH = isTable ? 'th' : 'div',
						TD = isTable ? 'td' : 'div',
						THEAD = isTable ? 'thead' : 'div',
						cart_container = simpleCart.$create(TABLE),
						thead_container = simpleCart.$create(THEAD),
						header_container = simpleCart.$create(TR).addClass('headerRow'),
						container = simpleCart.$(selector),
						column,
						klass,
						label,
						x,
						xlen;

					container.html(' ').append(cart_container);

					cart_container.append(thead_container);

					thead_container.append(header_container);


					// create header
					for (x = 0, xlen = settings.cartColumns.length; x < xlen; x += 1) {
						column	= cartColumn(settings.cartColumns[x]);
						klass	=  "item-" + (column.attr || column.view || column.label || column.text || "cell") + " " + column.className;
						label	= column.label || "";

						// append the header cell
						header_container.append(
							simpleCart.$create(TH).addClass(klass).html(label)
						);
					}

					// cycle through the items
					simpleCart.each(function (item, y) {
						simpleCart.createCartRow(item, y, TR, TD, cart_container);
					});

					return cart_container;
				},

				// generate a cart row from an item
				createCartRow: function (item, y, TR, TD, container) {
					var row = simpleCart.$create(TR)
										.addClass('itemRow row-' + y + " " + (y % 2 ? "even" : "odd"))
										.attr('id', "cartItem_" + item.id()),
						j,
						jlen,
						column,
						klass,
						content,
						cell;

					container.append(row);

					// cycle through the columns to create each cell for the item
					for (j = 0, jlen = settings.cartColumns.length; j < jlen; j += 1) {
						column	= cartColumn(settings.cartColumns[j]);
						klass	= "item-" + (column.attr || (isString(column.view) ? column.view : column.label || column.text || "cell")) + " " + column.className;
						content = cartCellView(item, column);
						cell	= simpleCart.$create(TD).addClass(klass).html(content);

						row.append(cell);
					}
					return row;
				}

			});

			/*******************************************************************
			 *	CART ITEM CLASS MANAGEMENT
			 *******************************************************************/

			simpleCart.Item = function (info) {

				// we use the data object to track values for the item
				var _data = {},
					me = this;

				// cycle through given attributes and set them to the data object
				if (isObject(info)) {
					simpleCart.extend(_data, info);
				}

				// set the item id
				item_id += 1;
				_data.id = _data.id || item_id_namespace + item_id;
				while (!isUndefined(sc_items[_data.id])) {
					item_id += 1;
					_data.id = item_id_namespace + item_id;
				}

				function checkQuantityAndPrice() {

					// check to make sure price is valid
					if (isString(_data.price)) {
					   // trying to remove all chars that aren't numbers or '.'
						_data.price = parseFloat(_data.price.replace(simpleCart.currency().decimal, ".").replace(/[^0-9\.]+/ig, ""));

					}
					if (isNaN(_data.price)) {
						_data.price = 0;
					}
					if (_data.price < 0) {
						_data.price = 0;
					}

					// check to make sure quantity is valid
					if (isString(_data.quantity)) {
						_data.quantity = parseInt(_data.quantity.replace(simpleCart.currency().delimiter, ""), 10);
					}
					if (isNaN(_data.quantity)) {
						_data.quantity = 1;
					}
					if (_data.quantity <= 0) {
						me.remove();
					}

				}

				// getter and setter methods to access private variables
				me.get = function (name, skipPrototypes) {

					var usePrototypes = !skipPrototypes;

					if (isUndefined(name)) {
						return name;
					}

					// return the value in order of the data object and then the prototype
					return isFunction(_data[name])	? _data[name].call(me) :
							!isUndefined(_data[name]) ? _data[name] :

							isFunction(me[name]) && usePrototypes		? me[name].call(me) :
							!isUndefined(me[name]) && usePrototypes	? me[name] :
							_data[name];
				};
				me.set = function (name, value) {
					if (!isUndefined(name)) {
						_data[name.toLowerCase()] = value;
						if (name.toLowerCase() === 'price' || name.toLowerCase() === 'quantity') {
							checkQuantityAndPrice();
						}
					}
					return me;
				};
				me.equals = function (item) {
					for( var label in _data ){
						if (Object.prototype.hasOwnProperty.call(_data, label)) {
							if (label !== 'quantity' && label !== 'id') {
								if (item.get(label) !== _data[label]) {
									return false;
								}
							}
						}
					}
					return true;
				};
				me.options = function () {
					var data = {};
					simpleCart.each(_data,function (val, x, label) {
						var add = true;
						simpleCart.each(me.reservedFields(), function (field) {
							if (field === label) {
								add = false;
							}
							return add;
						});

						if (add) {
							data[label] = me.get(label);
						}
					});
					return data;
				};


				checkQuantityAndPrice();
			};

			simpleCart.Item._ = simpleCart.Item.prototype = {

				// editing the item quantity
				increment: function (amount) {
					var diff = amount || 1;
					diff = parseInt(diff, 10);

					this.quantity(this.quantity() + diff);
					if (this.quantity() < 1) {
						this.remove();
						return null;
					}
					return this;

				},
				decrement: function (amount) {
					var diff = amount || 1;
					return this.increment(-parseInt(diff, 10));
				},
				remove: function (skipUpdate) {
					var removeItemBool = simpleCart.trigger("beforeRemove", [sc_items[this.id()]]);
					if (removeItemBool === false ) {
						return false;
					}
					delete sc_items[this.id()];
					if (!skipUpdate) { 
						simpleCart.update();
					}
					return null;
				},

				// special fields for items
				reservedFields: function () {
					return ['quantity', 'id', 'item_number', 'price', 'name', 'shipping', 'tax', 'taxRate'];
				},

				// return values for all reserved fields if they exist
				fields: function () {
					var data = {},
						me = this;
					simpleCart.each(me.reservedFields(), function (field) {
						if (me.get(field)) {
							data[field] = me.get(field);
						}
					});
					return data;
				},


				// shortcuts for getter/setters. can
				// be overwritten for customization
				// btw, we are hiring at wojo design, and could
				// use a great web designer. if thats you, you can
				// get more info at https://wojodesign.com/now-hiring/
				// or email me directly: brett@wojodesign.com
				quantity: function (val) {
					return isUndefined(val) ? parseInt(this.get("quantity", true) || 1, 10) : this.set("quantity", val);
				},
				price: function (val) {
					return isUndefined(val) ?
							parseFloat((this.get("price",true).toString()).replace(simpleCart.currency().symbol,"").replace(simpleCart.currency().delimiter,"") || 1) :
							this.set("price", parseFloat((val).toString().replace(simpleCart.currency().symbol,"").replace(simpleCart.currency().delimiter,"")));
				},
				id: function () {
					return this.get('id',false);
				},
				total:function () {
					return this.quantity()*this.price();
				}

			};




			/*******************************************************************
			 *	CHECKOUT MANAGEMENT
			 *******************************************************************/

			simpleCart.extend({
				checkout: function () {
					if (settings.checkout.type.toLowerCase() === 'custom' && isFunction(settings.checkout.fn)) {
						settings.checkout.fn.call(simpleCart,settings.checkout);
					} else if (isFunction(simpleCart.checkout[settings.checkout.type])) {
						var checkoutData = simpleCart.checkout[settings.checkout.type].call(simpleCart,settings.checkout);
						
						// if the checkout method returns data, try to send the form
						if( checkoutData.data && checkoutData.action && checkoutData.method ){
							// if no one has any objections, send the checkout form
							if( false !== simpleCart.trigger('beforeCheckout', [checkoutData.data]) ){
								simpleCart.generateAndSendForm( checkoutData );
							}
						}
						
					} else {
						simpleCart.error("No Valid Checkout Method Specified");
					}
				},
				extendCheckout: function (methods) {
					return simpleCart.extend(simpleCart.checkout, methods);
				},
				generateAndSendForm: function (opts) {
					var form = simpleCart.$create("form");
					form.attr('style', 'display:none;');
					form.attr('action', opts.action);
					form.attr('method', opts.method);
					simpleCart.each(opts.data, function (val, x, name) {
						form.append(
							simpleCart.$create("input").attr("type","hidden").attr("name",name).val(val)
						);
					});
					simpleCart.$("body").append(form);
					form.el.submit();
					form.remove();
				}
			});

			simpleCart.extendCheckout({
				PayPal: function (opts) {
					// account email is required
					if (!opts.email) {
						return simpleCart.error("No email provided for PayPal checkout");
					}

					// build basic form options
					var data = {
							  cmd			: "_cart"
							, upload		: "1"
							, currency_code : simpleCart.currency().code
							, business		: opts.email
							, rm			: opts.method === "POST" ? "0" : "2"
							, tax_cart		: (simpleCart.tax()*1).toFixed(2)
							, handling_cart : (simpleCart.shipping()*1).toFixed(2)
							, charset		: "utf-8"
						},
						action = opts.sandbox ? "" : "",
						method = opts.method === "POST" ? "POST" : "POST";


					// check for return and success URLs in the options
					if (opts.success) {
						data['return'] = opts.success;
					}
					if (opts.cancel) {
						data.cancel_return = opts.cancel;
					}
					if (opts.notify) {
						data.notify_url = opts.notify;
					}


					// add all the items to the form data
					simpleCart.each(function (item,x) {
						var counter = x+1,
							item_options = item.options(),
							optionCount = 0,
							send;
	
						// basic item data
						data["item_name_" + counter] = item.get("name");
						data["quantity_" + counter] = item.quantity();
						data["amount_" + counter] = (item.price()*1).toFixed(2);
						data["item_number_" + counter] = item.get("item_number") || counter;


						// add the options
						simpleCart.each(item_options, function (val,k,attr) {
							// paypal limits us to 10 options
							if (k < 10) {
		
								// check to see if we need to exclude this from checkout
								send = true;
								simpleCart.each(settings.excludeFromCheckout, function (field_name) {
									if (field_name === attr) { send = false; }
								});
								if (send) {
										optionCount += 1;
										data["on" + k + "_" + counter] = attr;
										data["os" + k + "_" + counter] = val;
								}
	
							}
						});

						// options count
						data["option_index_"+ x] = Math.min(10, optionCount);
					});


					// return the data for the checkout form
					return {
						  action	: action
						, method	: method
						, data		: data
					};

				},


				GoogleCheckout: function (opts) {
					// account id is required
					if (!opts.merchantID) {
						return simpleCart.error("No merchant id provided for GoogleCheckout");
					}

					if (simpleCart.currency().code !== "GTQ" && simpleCart.currency().code !== "GBP") {
						return simpleCart.error("");
					}

					// build basic form options
					var data = {
							// TODO: better shipping support for this google
							  ship_method_name_1	: "Shipping"
							, ship_method_price_1	: simpleCart.shipping()
							, ship_method_currency_1: simpleCart.currency().code
							, _charset_				: ''
						},
						action = "" + opts.merchantID,
						method = opts.method === "POST" ? "POST" : "POST";


					// add items to data
					simpleCart.each(function (item,x) {
						var counter = x+1,
							options_list = [],
							send;
						data['item_name_' + counter]		= item.get('name');
						data['item_quantity_' + counter]	= item.quantity();
						data['item_price_' + counter]		= item.price();
						data['item_currency_ ' + counter]	= simpleCart.currency().code;
						data['item_tax_rate' + counter]		= item.get('taxRate') || simpleCart.taxRate();

						// create array of extra options
						simpleCart.each(item.options(), function (val,x,attr) {
							// check to see if we need to exclude this from checkout
							send = true;
							simpleCart.each(settings.excludeFromCheckout, function (field_name) {
								if (field_name === attr) { send = false; }
							});
							if (send) {
								options_list.push(attr + ": " + val);
							}
						});

						// add the options to the description
						data['item_description_' + counter] = options_list.join(", ");
					});

					// return the data for the checkout form
					return {
						  action	: action
						, method	: method
						, data		: data
					};


				},


				AmazonPayments: function (opts) {
					// required options
					if (!opts.merchant_signature) {
						return simpleCart.error("No merchant signature provided for Amazon Payments");
					}
					if (!opts.merchant_id) {
						return simpleCart.error("No merchant id provided for Amazon Payments");
					}
					if (!opts.aws_access_key_id) {
						return simpleCart.error("No AWS access key id provided for Amazon Payments");
					}


					// build basic form options
					var data = {
							  aws_access_key_id:	opts.aws_access_key_id
							, merchant_signature:	opts.merchant_signature
							, currency_code:		simpleCart.currency().code
							, tax_rate:				simpleCart.taxRate()
							, weight_unit:			opts.weight_unit || 'lb'
						},
						action = "https://payments" + (opts.sandbox ? "-sandbox" : "") + ".amazon.com/checkout/" + opts.merchant_id,
						method = opts.method === "GET" ? "GET" : "POST";


					// add items to data
					simpleCart.each(function (item,x) {
						var counter = x+1,
							options_list = [];
						data['item_title_' + counter]			= item.get('name');
						data['item_quantity_' + counter]		= item.quantity();
						data['item_price_' + counter]			= item.price();
						data['item_sku_ ' + counter]			= item.get('sku') || item.id();
						data['item_merchant_id_' + counter]	= opts.merchant_id;
						if (item.get('weight')) {
							data['item_weight_' + counter]		= item.get('weight');
						}
						if (settings.shippingQuantityRate) {
							data['shipping_method_price_per_unit_rate_' + counter] = settings.shippingQuantityRate;
						}


						// create array of extra options
						simpleCart.each(item.options(), function (val,x,attr) {
							// check to see if we need to exclude this from checkout
							var send = true;
							simpleCart.each(settings.excludeFromCheckout, function (field_name) {
								if (field_name === attr) { send = false; }
							});
							if (send && attr !== 'weight' && attr !== 'tax') {
								options_list.push(attr + ": " + val);
							}
						});

						// add the options to the description
						data['item_description_' + counter] = options_list.join(", ");
					});

					// return the data for the checkout form
					return {
						  action	: action
						, method	: method
						, data		: data
					};

				},


				SendForm: function (opts) {
					// url required
					if (!opts.url) {
						return simpleCart.error('URL required for SendForm Checkout');
					}

					// build basic form options
					var data = {
							  currency	: simpleCart.currency().code
							, shipping	: simpleCart.shipping()
							, tax		: simpleCart.tax()
							, taxRate	: simpleCart.taxRate()
							, itemCount : simpleCart.find({}).length
						},
						action = opts.url,
						method = opts.method === "GET" ? "GET" : "POST";


					// add items to data
					simpleCart.each(function (item,x) {
						var counter = x+1,
							options_list = [],
							send;
						data['item_name_' + counter]		= item.get('name');
						data['item_quantity_' + counter]	= item.quantity();
						data['item_price_' + counter]		= item.price();

						// create array of extra options
						simpleCart.each(item.options(), function (val,x,attr) {
							// check to see if we need to exclude this from checkout
							send = true;
							simpleCart.each(settings.excludeFromCheckout, function (field_name) {
								if (field_name === attr) { send = false; }
							});
							if (send) {
								options_list.push(attr + ": " + val);
							}
						});

						// add the options to the description
						data['item_options_' + counter] = options_list.join(", ");
					});


					// check for return and success URLs in the options
					if (opts.success) {
						data['return'] = opts.success;
					}
					if (opts.cancel) {
						data.cancel_return = opts.cancel;
					}

					if (opts.extra_data) {
						data = simpleCart.extend(data,opts.extra_data);
					}

					// return the data for the checkout form
					return {
						  action	: action
						, method	: method
						, data		: data
					};
				}


			});


			/*******************************************************************
			 *	EVENT MANAGEMENT
			 *******************************************************************/
			eventFunctions = {

				// bind a callback to an event
				bind: function (name, callback) {
					if (!isFunction(callback)) {
						return this;
					}

					if (!this._events) {
						this._events = {};
					}
					
					// split by spaces to allow for multiple event bindings at once
					var eventNameList = name.split(/ +/);
					
					// iterate through and bind each event
					simpleCart.each( eventNameList , function( eventName ){
						if (this._events[eventName] === true) {
							callback.apply(this);
						} else if (!isUndefined(this._events[eventName])) {
							this._events[eventName].push(callback);
						} else {
							this._events[eventName] = [callback];
						}
					});

					
					return this;
				},
				
				// trigger event
				trigger: function (name, options) {
					var returnval = true,
						x,
						xlen;

					if (!this._events) {
						this._events = {};
					}
					if (!isUndefined(this._events[name]) && isFunction(this._events[name][0])) {
						for (x = 0, xlen = this._events[name].length; x < xlen; x += 1) {
							returnval = this._events[name][x].apply(this, (options || []));
						}
					}
					if (returnval === false) {
						return false;
					}
					return true;
				}

			};
			// alias for bind
			eventFunctions.on = eventFunctions.bind;
			simpleCart.extend(eventFunctions);
			simpleCart.extend(simpleCart.Item._, eventFunctions);


			// base simpleCart events in options
			baseEvents = {
				  beforeAdd				: null
				, afterAdd				: null
				, load					: null
				, beforeSave			: null
				, afterSave				: null
				, update				: null
				, ready					: null
				, checkoutSuccess		: null
				, checkoutFail			: null
				, beforeCheckout		: null
				, beforeRemove			: null
			};
			
			// extend with base events
			simpleCart(baseEvents);

			// bind settings to events
			simpleCart.each(baseEvents, function (val, x, name) {
				simpleCart.bind(name, function () {
					if (isFunction(settings[name])) {
						settings[name].apply(this, arguments);
					}
				});
			});

			/*******************************************************************
			 *	FORMATTING FUNCTIONS
			 *******************************************************************/
			simpleCart.extend({
				toCurrency: function (number,opts) {
					var num = parseFloat(number),
						opt_input = opts || {},
						_opts = simpleCart.extend(simpleCart.extend({
							  symbol:		"$"
							, decimal:		"."
							, delimiter:	","
							, accuracy:		2
							, after: false
						}, simpleCart.currency()), opt_input),

						numParts = num.toFixed(_opts.accuracy).split("."),
						dec = numParts[1],
						ints = numParts[0];
			
					ints = simpleCart.chunk(ints.reverse(), 3).join(_opts.delimiter.reverse()).reverse();

					return	(!_opts.after ? _opts.symbol : "") +
							ints +
							(dec ? _opts.decimal + dec : "") +
							(_opts.after ? _opts.symbol : "");
	
				},


				// break a string in blocks of size n
				chunk: function (str, n) {
					if (typeof n==='undefined') {
						n=2;
					}
					var result = str.match(new RegExp('.{1,' + n + '}','g'));
					return result || [];
				}

			});


			// reverse string function
			String.prototype.reverse = function () {
				return this.split("").reverse().join("");
			};


			// currency functions
			simpleCart.extend({
				currency: function (currency) {
					if (isString(currency) && !isUndefined(currencies[currency])) {
						settings.currency = currency;
					} else if (isObject(currency)) {
						currencies[currency.code] = currency;
						settings.currency = currency.code;
					} else {
						return currencies[settings.currency];
					}
				}
			});


			/*******************************************************************
			 *	VIEW MANAGEMENT
			 *******************************************************************/

			simpleCart.extend({
				// bind outlets to function
				bindOutlets: function (outlets) {
					simpleCart.each(outlets, function (callback, x, selector) {
						
						simpleCart.bind('update', function () {
							simpleCart.setOutlet("." + namespace + "_" + selector, callback);
						});
					});
				},

				// set function return to outlet
				setOutlet: function (selector, func) {
					var val = func.call(simpleCart, selector);
					if (isObject(val) && val.el) {
						simpleCart.$(selector).html(' ').append(val);
					} else if (!isUndefined(val)) {
						simpleCart.$(selector).html(val);
					}
				},

				// bind click events on inputs
				bindInputs: function (inputs) {
					simpleCart.each(inputs, function (info) {
						simpleCart.setInput("." + namespace + "_" + info.selector, info.event, info.callback);
					});
				},

				// attach events to inputs	
				setInput: function (selector, event, func) {
					simpleCart.$(selector).live(event, func);
				}
			});		


			// class for wrapping DOM selector shit
			simpleCart.ELEMENT = function (selector) {

				this.create(selector);
				this.selector = selector || null; // "#" + this.attr('id'); TODO: test length?
			};

			simpleCart.extend(selectorFunctions, {

				"MooTools"		: {
					text: function (text) {
						return this.attr(_TEXT_, text);
					},
					html: function (html) {
						return this.attr(_HTML_, html);
					},
					val: function (val) {
						return this.attr(_VALUE_, val);
					},
					attr: function (attr, val) {
						if (isUndefined(val)) {
							return this.el[0] && this.el[0].get(attr);
						}
						
						this.el.set(attr, val);
						return this;
					},
					remove: function () {
						this.el.dispose();
						return null;
					},
					addClass: function (klass) {
						this.el.addClass(klass);
						return this;
					},
					removeClass: function (klass) {
						this.el.removeClass(klass);
						return this;
					},
					append: function (item) {
						this.el.adopt(item.el);
						return this;
					},
					each: function (callback) {
						if (isFunction(callback)) {
							simpleCart.each(this.el, function( e, i, c) {
								callback.call( i, i, e, c );
							});
						}
						return this;
					},
					click: function (callback) {
						if (isFunction(callback)) {
							this.each(function (e) {
								e.addEvent(_CLICK_, function (ev) {
									callback.call(e,ev);
								});
							});
						} else if (isUndefined(callback)) {
							this.el.fireEvent(_CLICK_);
						}

						return this;
					},
					live: function (	event,callback) {
						var selector = this.selector;
						if (isFunction(callback)) {
							simpleCart.$("body").el.addEvent(event + ":relay(" + selector + ")", function (e, el) {
								callback.call(el, e);
							});
						}
					},
					match: function (selector) {
						return this.el.match(selector);
					},
					parent: function () {
						return simpleCart.$(this.el.getParent());
					},
					find: function (selector) {
						return simpleCart.$(this.el.getElements(selector));
					},
					closest: function (selector) {
						return simpleCart.$(this.el.getParent(selector));
					},
					descendants: function () {
						return this.find("*");
					},
					tag: function () {
						return this.el[0].tagName;
					},
					submit: function (){
						this.el[0].submit();
						return this;
					},
					create: function (selector) {
						this.el = $engine(selector);
					}


				},

				"Prototype"		: {
					text: function (text) {
						if (isUndefined(text)) {
							return this.el[0].innerHTML;
						}
						this.each(function (i,e) {
							$(e).update(text);
						});
						return this;
					},
					html: function (html) {
						return this.text(html);
					},
					val: function (val) {
						return this.attr(_VALUE_, val);
					},
					attr: function (attr, val) {
						if (isUndefined(val)) {
							return this.el[0].readAttribute(attr);
						}
						this.each(function (i,e) {
							$(e).writeAttribute(attr, val);
						});
						return this;
					},
					append: function (item) {
						this.each(function (i,e) {
							if (item.el) {
								item.each(function (i2,e2) {
									$(e).appendChild(e2);
								});
							} else if (isElement(item)) {
								$(e).appendChild(item);
							}
						});
						return this;
					},
					remove: function () {
						this.each(function (i, e) {
							$(e).remove();
						});
						return this;
					},
					addClass: function (klass) {
						this.each(function (i, e) {
							$(e).addClassName(klass);
						});
						return this;
					},
					removeClass: function (klass) {
						this.each(function (i, e) {
							$(e).removeClassName(klass);
						});
						return this;
					},
					each: function (callback) {
						if (isFunction(callback)) {
							simpleCart.each(this.el, function( e, i, c) {
								callback.call( i, i, e, c );
							});
						}
						return this;
					},
					click: function (callback) {
						if (isFunction(callback)) {
							this.each(function (i, e) {
								$(e).observe(_CLICK_, function (ev) {
									callback.call(e,ev);
								});
							});
						} else if (isUndefined(callback)) {
							this.each(function (i, e) {
								$(e).fire(_CLICK_);
							});
						}
						return this;
					},
					live: function (event,callback) {
						if (isFunction(callback)) {
							var selector = this.selector;
							document.observe(event, function (e, el) {
								if (el === $engine(e).findElement(selector)) {
									callback.call(el, e);
								}
							});
						}
					},
					parent: function () {
						return simpleCart.$(this.el.up());
					},
					find: function (selector) {
						return simpleCart.$(this.el.getElementsBySelector(selector));
					},
					closest: function (selector) {
						return simpleCart.$(this.el.up(selector));
					},
					descendants: function () {
						return simpleCart.$(this.el.descendants());
					},
					tag: function () {
						return this.el.tagName;
					},
					submit: function() {
						this.el[0].submit();
					},

					create: function (selector) {
						if (isString(selector)) {
							this.el = $engine(selector);
						} else if (isElement(selector)) {
							this.el = [selector];
						}
					}



				},

				"jQuery": {
					passthrough: function (action, val) {
						if (isUndefined(val)) {
							return this.el[action]();
						}
						
						this.el[action](val);
						return this;
					},
					text: function (text) {
						return this.passthrough(_TEXT_, text);
					},
					html: function (html) {
						return this.passthrough(_HTML_, html);
					},
					val: function (val) {
						return this.passthrough("val", val);
					},
					append: function (item) {
						var target = item.el || item;
						this.el.append(target);
						return this;
					},
					attr: function (attr, val) {
						if (isUndefined(val)) {
							return this.el.attr(attr);
						}
						this.el.attr(attr, val);
						return this;
					},
					remove: function () {
						this.el.remove();
						return this;
					},
					addClass: function (klass) {
						this.el.addClass(klass);
						return this;
					},
					removeClass: function (klass) {
						this.el.removeClass(klass);
						return this;
					},
					each: function (callback) {
						return this.passthrough('each', callback);
					},
					click: function (callback) {
						return this.passthrough(_CLICK_, callback);
					},
					live: function (event, callback) {
						$engine(document).delegate(this.selector, event, callback);
						return this;
					},
					parent: function () {
						return simpleCart.$(this.el.parent());
					},
					find: function (selector) {
						return simpleCart.$(this.el.find(selector));
					},
					closest: function (selector) {
						return simpleCart.$(this.el.closest(selector));
					},
					tag: function () {
						return this.el[0].tagName;
					},
					descendants: function () {
						return simpleCart.$(this.el.find("*"));
					},
					submit: function() {
						return this.el.submit();
					},

					create: function (selector) {
						this.el = $engine(selector);
					}
				}
			});
			simpleCart.ELEMENT._ = simpleCart.ELEMENT.prototype;

			// bind the DOM setup to the ready event
			simpleCart.ready(simpleCart.setupViewTool);

			// bind the input and output events
			simpleCart.ready(function () {
				simpleCart.bindOutlets({
					total: function () {
						return simpleCart.toCurrency(simpleCart.total());
					}
					, quantity: function () {
						return simpleCart.quantity();
					}
					, items: function (selector) {
						simpleCart.writeCart(selector);
					}
					, tax: function () {
						return simpleCart.toCurrency(simpleCart.tax());
					}
					, taxRate: function () {
						return simpleCart.taxRate().toFixed();
					}
					, shipping: function () {
						return simpleCart.toCurrency(simpleCart.shipping());
					}
					, grandTotal: function () {
						return simpleCart.toCurrency(simpleCart.grandTotal());
					}
				});
				simpleCart.bindInputs([                        
					   {  selector: 'checkout'
						, event: 'click'
						, callback: function () {
							simpleCart.checkout();
						}
					}
					, {	  selector: 'empty'
						, event: 'click'
						, callback: function () {
							simpleCart.empty();
						}
					}
					, {	  selector: 'increment'
						, event: 'click'
						, callback: function () {
							simpleCart.find(simpleCart.$(this).closest('.itemRow').attr('id').split("_")[1]).increment();
							simpleCart.update();
						}
					}
					, {	  selector: 'decrement'
						, event: 'click'
						, callback: function () {
							simpleCart.find(simpleCart.$(this).closest('.itemRow').attr('id').split("_")[1]).decrement();
							simpleCart.update();
						}
					}
					/* remove from cart */
					, {	  selector: 'remove'
						, event: 'click'
						, callback: function () {
							simpleCart.find(simpleCart.$(this).closest('.itemRow').attr('id').split("_")[1]).remove();
						}
					}

					/* cart inputs */
					, {	  selector: 'input'
						, event: 'change'
						, callback: function () {
							var $input = simpleCart.$(this),
								$parent = $input.parent(),
								classList = $parent.attr('class').split(" ");
							simpleCart.each(classList, function (klass) {
								if (klass.match(/item-.+/i)) {
									var field = klass.split("-")[1];
									simpleCart.find($parent.closest('.itemRow').attr('id').split("_")[1]).set(field,$input.val());
									simpleCart.update();
									return;
								}
							});
						}
					}

					/* here is our shelfItem add to cart button listener */
					, { selector: 'shelfItem .item_add'
						, event: 'click'
						, callback: function () {
							var $button = simpleCart.$(this),
								fields = {};

							$button.closest("." + namespace + "_shelfItem").descendants().each(function (x,item) {
								var $item = simpleCart.$(item);

								// check to see if the class matches the item_[fieldname] pattern
								if ($item.attr("class") &&
									$item.attr("class").match(/item_.+/) &&
									!$item.attr('class').match(/item_add/)) {

									// find the class name
									simpleCart.each($item.attr('class').split(' '), function (klass) {
										var attr,
											val,
											type;

										// get the value or text depending on the tagName
										if (klass.match(/item_.+/)) {
											attr = klass.split("_")[1];
											val = "";
											switch($item.tag().toLowerCase()) {
												case "input":
												case "textarea":
												case "select":
													type = $item.attr("type");
													if (!type || ((type.toLowerCase() === "checkbox" || type.toLowerCase() === "radio") && $item.attr("checked")) || type.toLowerCase() === "text" || type.toLowerCase() === "number") {
														val = $item.val();
													}				
													break;
												case "img":
													val = $item.attr('src');
													break;
												default:
													val = $item.text();
													break;
											}

											if (val !== null && val !== "") {
												fields[attr.toLowerCase()] = fields[attr.toLowerCase()] ? fields[attr.toLowerCase()] + ", " +  val : val;
											}
										}
									});
								}
							});

							// add the item
							simpleCart.add(fields);
						}
					}
				]);
			});


			/*******************************************************************
			 *	DOM READY
			 *******************************************************************/
			// Cleanup functions for the document ready method
			// used from jQuery
			/*global DOMContentLoaded */
			if (document.addEventListener) {
				window.DOMContentLoaded = function () {
					document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
					simpleCart.init();
				};

			} else if (document.attachEvent) {
				window.DOMContentLoaded = function () {
					// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
					if (document.readyState === "complete") {
						document.detachEvent("onreadystatechange", DOMContentLoaded);
						simpleCart.init();
					}
				};
			}
			// The DOM ready check for Internet Explorer
			// used from jQuery
			function doScrollCheck() {
				if (simpleCart.isReady) {
					return;
				}

				try {
					// If IE is used, use the trick by Diego Perini
					// https://javascript.nwbox.com/IEContentLoaded/
					document.documentElement.doScroll("left");
				} catch (e) {
					setTimeout(doScrollCheck, 1);
					return;
				}

				// and execute any waiting functions
				simpleCart.init();
			}
			
			// bind ready event used from jquery
			function sc_BindReady () {

				// Catch cases where $(document).ready() is called after the
				// browser event has already occurred.
				if (document.readyState === "complete") {
					// Handle it asynchronously to allow scripts the opportunity to delay ready
					return setTimeout(simpleCart.init, 1);
				}

				// Mozilla, Opera and webkit nightlies currently support this event
				if (document.addEventListener) {
					// Use the handy event callback
					document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

					// A fallback to window.onload, that will always work
					window.addEventListener("load", simpleCart.init, false);

				// If IE event model is used
				} else if (document.attachEvent) {
					// ensure firing before onload,
					// maybe late but safe also for iframes
					document.attachEvent("onreadystatechange", DOMContentLoaded);

					// A fallback to window.onload, that will always work
					window.attachEvent("onload", simpleCart.init);

					// If IE and not a frame
					// continually check to see if the document is ready
					var toplevel = false;

					try {
						toplevel = window.frameElement === null;
					} catch (e) {}

					if (document.documentElement.doScroll && toplevel) {
						doScrollCheck();
					}
				}
			}

			// bind the ready event
			sc_BindReady();

			return simpleCart;
		};


	window.simpleCart = generateSimpleCart();

}(window, document));


$(document).ready(function () {
        simpleCart({
            cartColumns: [
               {
                 attr: "size"
                , label: "size"
            },
               {
                 attr: 'pageLink' 
                , view:'link' 
                , label:'Details' 
            },
               {
                 attr: "name"
                , label: false
            }, {
                 view: 'image'
                , attr: 'thumb'
                , label: false
            },
               { 
                 view:"increment"
                , labe: false 
            },
               { 
                 view:"decrement"
                , labe: false
            },
               {
                attr: "quantity"
                , label: "qty"
            }, {
                attr: "total"
                , label: false
                , view: 'currency'
            }, {
                view: "remove"
                , label: false
            },
               ]
        });
simpleCart.bind( 'beforeCheckout' , function( data ){
data.firstname = document.getElementById("firstname").value;
data.lastname = document.getElementById("lastname").value;
data.address = document.getElementById("address").value;
data.phone = document.getElementById("phone").value;
data.comments = document.getElementById("comments").value;
if(data.firstname === "" || data.lastname === "" || data.address === "" || data.email === "" || 
   data.phone === "" || data.comments === "" ){
                              alert("Todos los campos deben llenarse");
                                 return false;
                          }
else if(data.firstname.length>20){
                              alert("nombre muy largo");  
                                 return false;                           
                          }
          else if(!isNaN(data.firstname)){
                              alert("nombre invalido");  
                                 return false;                           
                          }
else if(data.lastname.length>20){
                              alert("Apellido muy largo");  
                                 return false;                           
                          }
          else if(!isNaN(data.lastname)){
                              alert("Apellido invalido");  
                                 return false;                           
                          }
else if(data.address.length>50){
                              alert("direccion de entrega muy largo");  
                                 return false;                           
                          }
else if(data.phone.length>11){
                              alert("telefono  muy largo");  
                                 return false;                           
                          }
else if(data.phone.length<8){
                              alert("telefono  muy corto");  
                                 return false;                           
                          }
         else if(isNaN(data.phone)){
                              alert("ingrese un numero telefonico valido");  
                                 return false;                           
                          }
else if(data.comments.length>60){
                              alert("comentario  muy largo");  
                                 return false;                           
                          }
});
    });
