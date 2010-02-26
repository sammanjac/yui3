YUI.add("chart",function(H){function G(J,I){this._id=H.guid(this.GUID);this._setParent(J);this.addAttrs(this._attributeConfig,I);}G.prototype={_setParent:function(I){this.oElement=I;},CLASSNAME:"SWFWidget",swfReadyFlag:false,GUID:"yuiswfwidget",_defaultStyles:{},_styleObjHash:null,setStyle:function(J,L){var I,K;if(this._styleObjHash&&this._styleObjHash.hasOwnProperty(J)){if(this._defaultStyles[J]){K=this._defaultStyles[J];for(I in L){if(L.hasOwnProperty(I)){K[I]=L[I];}}}else{K=L;}this._defaultStyles[J]=K;}else{if(!this._defaultStyles.hasOwnProperty(this._id)){this._defaultStyles[this._id]={};}this._defaultStyles[this._id][J]=L;}if(this.swfReadyFlag){this._updateStyles();}},_setStyles:function(K){var J,I,L=this._defaultStyles;if(!L.hasOwnProperty(this._id)){L[this._id]={};}for(J in K){if(K.hasOwnProperty(J)){if(this._styleObjHash&&this._styleObjHash.hasOwnProperty(J)){I=this._styleObjHash[J];if(L&&L.hasOwnProperty(I)&&H.Lang.isObject(L[I])){L[I]=this._mergeStyles(K[J],L[I]);}else{L[I]=K[J];}}else{I=this._id;if(L&&L.hasOwnProperty(I)&&L[I].hasOwnProperty(J)&&H.Lang.isObject(L[I][J])){L[I][J]=this._mergeStyles(K[J],L[I][J]);}else{L[I][J]=K[J];}}}}this._defaultStyles=L;if(this.swfReadyFlag){this._updateStyles();}},_mergeStyles:function(J,I){var K;for(K in J){if(J.hasOwnProperty(K)){if(I.hasOwnProperty(K)&&H.Lang.isObject(J[K])){I[K]=this._mergeStyles(J[K],I[K]);}else{I[K]=J[K];}}}return I;},_updateStyles:function(){for(var I in this._defaultStyles){if(this._defaultStyles.hasOwnProperty(I)){if(this._id===I||(this._styleObjHash&&this._styleObjHash.hasOwnProperty(I))){this.appswf.applyMethod(I,"setStyles",[this._defaultStyles[I]]);}}}this._defaultStyles=null;this._defaultStyles={};},_attributeConfig:{className:{value:this.CLASSNAME,readOnly:true,getter:function(){return this.CLASSNAME;}},styles:{value:null,setter:function(I){this._setStyles(I);},validator:function(I){return H.Lang.isObject(I);}}},toString:function(){return"SWFWidget "+this._id;}};H.augment(G,H.Attribute);H.SWFWidget=G;function D(J,I){this._attributeConfig=H.merge(this._attributeConfig,D.superclass._attributeConfig);D.superclass.constructor.apply(this,arguments);}H.extend(D,H.SWFWidget,{_items:[],CLASSNAME:"Container",_backgroundId:"background",GUID:"yuicontainer",LAYOUTS:["LayoutStrategy","HLayout","VLayout","HFlowLayout","VFlowLayout","LayerStack","BorderContainer"],_init:function(K){var J,L,I;this.swfowner=K;this.appswf=K.appswf;this._addBackground();I=this._items.length;if(I<1){return;}for(J=0;J<I;J++){L=this._items[J];this.addItem(L.item,L.props);}this._updateStyles();},_addBackground:function(){this.appswf.createInstance("background","Skin");this.appswf.applyMethod(this._id,"addItem",["$background",{index:0}]);this._styleObjHash.background="background";},addItem:function(K,J){if(this.swfReadyFlag){var I=K.swfarguments&&typeof K.swfarguments=="array"?K.args:[];this.appswf.createInstance(K._id,K.get("className"),I);I=["$"+K._id];if(J){I.push(J);}this.appswf.applyMethod(this._id,"addItem",I);}else{this._items.push({item:K,props:J});}},_styleObjHash:{background:"background"},_attributeConfig:{props:{value:null,setter:function(I){return I;},validator:function(I){return H.Lang.isObject(I);}},swfargs:{value:[],validator:function(I){return H.Lang.isArray(I);}},layout:{value:"LayoutStrategy",validator:function(I){return this.LAYOUTS.hasOwnProperty(I);}},items:{value:[],setter:function(I){this._items=I;},getter:function(){return this._items;},validator:function(I){return H.Lang.isArray(I);}}},toString:function(){return"Container "+this._id;}});H.Container=D;function B(J,I){B.superclass.constructor.apply(this,arguments);}H.extend(B,H.Container,{GUID:"yuibordercontainer",itemsQueue:{},CLASSNAME:"BorderContainer",layout:"LayoutStrategy",_init:function(K){var J,I;this.swfowner=K;this.appswf=this.swfowner.appswf;this.swfReadyFlag=true;this._updateStyles();for(J in this.itemsQueue){if(this.itemsQueue.hasOwnProperty(J)){I=this.itemsQueue[J];while(I.length>0){this.addItem(I.shift(),J);}}}},addBottomItem:function(I){this.addItem(I,"bottom");},addLeftItem:function(I){this.addItem(I,"left");},addTopItem:function(I){this.addItem(I,"top");},addRightItem:function(I){this.addItem(I,"right");},addCenterItem:function(I){this.addItem(I,"center");},addItem:function(K,I){var J=(I.charAt(0)).toUpperCase()+I.substr(1);if(this.swfReadyFlag){K._init(this.swfowner);this.appswf.applyMethod(this._id,"add"+J+"Item",["$"+K._id]);if(I!="center"){K.setStyle("position",I);}}else{if(!this.itemsQueue||!this.itemsQueue.hasOwnProperty(I)){this.itemsQueue[I]=[];}this.itemsQueue[I].push(K);}},toString:function(){return"BorderContainer "+this._id;}});function A(J,I){this._attributeConfig=H.merge(this._attributeConfig,A.superclass._attributeConfig);A.superclass.constructor.apply(this,arguments);this._dataId=this._id+"data";if(this.get("autoLoad")){this.loadswf();}}H.extend(A,H.Container,{CLASSNAME:"CartesianCanvas",GUID:"yuichart",_attributeConfig:{swfurl:{value:H.config.base+"chart/assets/cartesiancanvas.swf"},chartContainer:{value:null,setter:function(I){return this.setChartContainer(I);},validator:function(I){return H.Lang.isObject(I);}},params:{value:{version:"10.0.0",useExpressInstall:true,fixedAttributes:{allowScriptAccess:"always",allowNetworking:"all",bgcolor:"#ffffff"}},setOnce:true,setter:function(I){return this._mergeStyles(I,{version:"10.0.0",useExpressInstall:true,fixedAttributes:{allowScriptAccess:"always",allowNetworking:"all",bgcolor:"#ffffff"}});},validator:function(I){return H.Lang.isObject(I);}},flashvars:{value:{appname:this._id},setOnce:true,setter:function(I){if(!I){return;}if(!I.hasOwnProperty("appname")||!I.appname){I.appname=this._id;}if(this.get("params").flashVars&&H.Lang.isObject(this.get("params").flashVars)){this.get("params").flashVars=this._mergeStyles(I,this.get("params").flashVars);}else{this.get("params").flashVars=I;}},validator:function(I){return H.Lang.isObject(I);}},autoLoad:{value:true},_autoRender:{value:true,setter:function(I){return this.setAutoRender(I);
}},_dataId:{value:null},dataProvider:{value:null,setter:function(I){this._dataProvider=I;this._initDataProvider();}}},setChartContainer:function(I){if(I&&I.hasOwnProperty("classInstance")){this.chartContainer=I.classInstance;if(I.hasOwnProperty("added")&&!I.added){this._styleObjHash.chart=this.chartContainer._id;return;}}else{this.chartContainer=new B(this);}this._styleObjHash.chart=this.chartContainer._id;this.chartContainer.oElement.addItem(this.chartContainer);},addChildContainers:function(K){var L,I,J,N,M;for(L=0;L<I;L++){J=K[L];if(J.hasOwnProperty("classInstance")){N=J.classInstance;if(J.hasOwnProperty("props")){M=J.props;}this.addItem(N,M);}}},loadswf:function(){this.appswf=new H.SWF(this.oElement,this.get("swfurl"),this.get("params"));this.appswf.on("swfReady",this._init,this);},_init:function(L){var J,K,I;this._setAutoRender();if(this._dataProvider){this._initDataProvider();}this._addBackground();this.swfReadyFlag=true;I=this._items.length;if(I<1){return;}for(J=0;J<I;J++){K=this._items[J];this.addItem(K.item,K.props);}this._updateStyles();},_initDataProvider:function(){if(this.appswf){this.appswf.createInstance(this._dataId,"ChartDataProvider",[this._dataProvider]);}},addTopItem:function(I){this.chartContainer.addTopItem(I);},addRightItem:function(I){this.chartContainer.addRightItem(I);},addBottomItem:function(I){this.chartContainer.addBottomItem(I);},addLeftItem:function(I){this.chartContainer.addLeftItem(I);},addCenterItem:function(I){this.chartContainer.addCenterItem(I);},addItem:function(J,I){D.prototype.addItem.apply(this,arguments);if(this.swfReadyFlag&&J._init){J._init(this);}},setAutoRender:function(I){if(I!=this._autoRender){this._autoRender=I;this._setAutoRender();}},_setAutoRender:function(){if(this.appswf){this.appswf.callSWF("setProperty",[this._id,"autoRender",this._autoRender]);}},toString:function(){return"Chart "+this._id;}});H.augment(A,H.EventTarget);H.Chart=A;function F(J,I){this._attributeConfig=H.merge(this._attributeConfig,F.superclass._attributeConfig);F.superclass.constructor.apply(this,arguments);}H.extend(F,H.SWFWidget,{_attributeConfig:{xaxis:{value:null},yaxis:{value:null},xkey:{value:null},ykey:{value:null}},CLASSNAME:"LineGraph",GUID:"yuilinechart",_init:function(I){this.swfowner=I;this.appswf=this.swfowner.appswf;this.appswf.createInstance(this._id,"LineGraph",["$"+this.get("xaxis")._id+"data","$"+this.get("yaxis")._id+"data",this.get("xkey"),this.get("ykey")]);this._updateStyles();},toString:function(){return"LineGraph "+this._id;}});H.LineGraph=F;function E(J,I){this._attributeConfig=H.merge(this._attributeConfig,E.superclass._attributeConfig);E.superclass.constructor.apply(this,arguments);this._dataId=this._id+"data";}H.extend(E,H.SWFWidget,{GUID:"yuiaxis",_axisType:"Numeric",_keys:[],swfReadyFlag:false,_attributeConfig:{keys:{value:[],setter:function(I){this._keys=I;},getter:function(){return this._keys;}},axisType:{value:"Numeric",setter:function(I){this._axisType=I;},getter:function(){return this._axisType;}}},CLASSNAME:"Axis",_init:function(J){this.swfowner=J;this.appswf=this.swfowner.appswf;this.appswf.createInstance(this._dataId,this.get("axisType")+"Data",["$"+this.swfowner._dataId]);var I,K=this.get("keys");for(I in K){if(K.hasOwnProperty(I)){this.appswf.applyMethod(this._dataId,"addKey",[K[I]]);}}this.appswf.createInstance(this._id,"Axis",["$"+this._dataId]);this.swfReadyFlag=true;},addKey:function(I){this.get("keys").push(I);if(this.appswf){document.getElementById("output").innerHTML+="<br/>addKey.this._dataId: "+this._dataId;this.appswf.applyMethod("$"+this._dataId,"addKey",[I]);}},toString:function(){return"Axis "+this._id;}});H.augment(E,H.SWFWidget);H.Axis=E;function C(J,K,I){if(K){this._type=K;}this._parseConfig(I);this.chart=new H.Chart(J,this._chartConfig);this.xaxis=new H.Axis(this.chart,{axisType:this._xAxisProps.type,styles:this._xaxisstyles});this.yaxis=new H.Axis(this.chart,{axisType:this._yAxisProps.type,styles:this._yaxisstyles});this.data={};this.graph=null;}H.extend(C,H.EventTarget,{_type:"line",_xAxisProps:{type:"Category",key:"item"},_yAxisProps:{type:"Numeric",key:"value"},setData:function(K,J,I){this.data=K;this.chart.set("dataProvider",this.data);this.xaxis.addKey(this._xAxisProps.key);this.yaxis.addKey(this._yAxisProps.key);if(this._type=="line"){this.graph=new H.LineGraph(this.chart,{xaxis:this.xaxis,yaxis:this.yaxis,xkey:J,ykey:I,styles:this._graphstyles});}this.chart.addBottomItem(this.xaxis);this.chart.addLeftItem(this.yaxis);this.chart.addCenterItem(this.graph);},_chartstyles:{chart:{padding:{left:20,top:20,bottom:20,right:20}},background:{fillColor:14607103,borderColor:14607103}},_xaxisstyles:{majorTicks:{color:0},line:{color:0},label:{fontName:"Georgia",fontSize:12,color:0,margin:{top:3}}},_yaxisstyles:{majorTicks:{color:6697779},line:{color:6697779},label:{fontName:"Georgia",fontSize:12,color:0,margin:{right:3}}},_graphstyles:{color:0,alpha:1,weight:"2"},_parseConfig:function(I){var K,J;if(I){if(I.hasOwnProperty("swfurl")){this._chartConfig.swfurl=I.swfurl;}if(I.hasOwnProperty("xaxisprops")){J=I.xaxisprops;if(J.hasOwnProperty("type")){this._xAxisProps.type=J.type;}if(J.hasOwnProperty("key")){this._xAxisProps.key=J.key;}}if(I.hasOwnProperty("yaxisprops")){J=I.yaxisprops;if(J.hasOwnProperty("type")){this._yAxisProps.type=J.type;}if(J.hasOwnProperty("key")){this._yAxisProps.key=J.key;}}if(I.hasOwnProperty("autoRender")){this._chartConfig.autoRender=I.autoRender;}if(this._yAxisProps.type=="Category"){this._yaxisstyles.padding={top:50,bottom:50};this._graphstyles.padding={top:50,bottom:50};}if(this._xAxisProps.type=="Category"){this._xaxisstyles.padding={left:50,right:50};this._graphstyles.padding={left:50,right:50};}if(I.hasOwnProperty("styles")){K=I.styles;if(K.hasOwnProperty("chart")){this._chartstyles.chart=this._parseStyles(this._chartstyles.chart,K.chart);}if(K.hasOwnProperty("background")){this._chartstyles.background=this._parseStyles(this._chartstyles.background,K.background);}if(K.hasOwnProperty("xaxisstyles")){this._xaxisstyles=this._parseStyles(this._xaxisstyles,K.xaxisstyles);
}if(K.hasOwnProperty("yaxisstyles")){this._yaxisstyles=this._parseStyles(this._yaxisstyles,K.yaxisstyles);}if(K.hasOwnProperty("graphstyles")){this._graphstyles=this._parseStyles(this._graphstyles,K.graphstyles);}}}else{if(this._yAxisProps.type=="Category"){this._yaxisstyles.padding={top:50,bottom:50};this._graphstyles.padding={top:50,bottom:50};}if(this._xAxisProps.type=="Category"){this._xaxisstyles.padding={left:50,right:50};this._graphstyles.padding={left:50,right:50};}}this._chartConfig.styles=this._chartstyles;},_chartConfig:{},_parseStyles:function(I,K){var J;if(!I){return K;}for(J in K){if(K.hasOwnProperty(J)){if(I.hasOwnProperty(J)&&H.Lang.isObject(I[J])){I[J]=this._parseStyles(I[J],K[J]);}else{I[J]=K[J];}}}return I;}});H.SimpleChart=C;},"@VERSION@");