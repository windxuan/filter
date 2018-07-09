window.onload = function(){
	var oType = document.getElementById('type');
	var oChoose = document.getElementById('choose');
	var oChosDiv = oChoose.getElementsByTagName('div')[0];
	// 数据储存
	var myData = [
		{
			"title": "品牌",
			"data": [ "苹果","小米","锤子","魅族","华为","三星","OPPO","vivo","诺基亚","乐视"]
		},
		{
			"title": "价格",
			"data": ["1000元以下","1000~2000元","2000~4000元","4000元以上"]
		},
		{
			"title": "产地",
			"data": ["北京","广东","湖北","浙江","湖南","温州","烟台","宁夏","甘肃","山西","云南"]
		}
	]
	//利用dom动态添加元素
	for(var i=0; i<myData.length; i++){
		var aLi = document.createElement('li');
		var aSpan = document.createElement('span');

		// 生成span_title的HTML
		aSpan.innerHTML = myData[i].title;
		aLi.appendChild(aSpan);
		for(var j = 0; j<myData[i].data.length; j++){

		// 生成data的HTML
		var aA = document.createElement('a');
		aA.innerHTML = myData[i].data[j];

		aLi.appendChild(aA);
		}
		oType.appendChild(aLi);
		}
	// 生成后获取到每一条数据
	var aLi = oType.getElementsByTagName('li');

	// 最终获取到的数据
	var scoreArr = {
		brand: null,
		place: null,
		price: null
	};
	//用来存放筛选条件
	var arr = [];

	//先将数组中存放aLi.length个0，按li的顺序存放数据
	for(var i = 0; i<aLi.length; i++){
		arr.push(0);
	}
	// 存放每一条数据值
	for(var i=0; i<aLi.length; i++){

		//记录点击的a标签
		aLi[i].prevNode = null;

		//记录每一个li的下标
		aLi[i].index = i;

		var aA = aLi[i].getElementsByTagName('a');

		// 数据值里面的data[n]
		for(var j=0; j<aA.length; j++){
			aA[j].onclick = function(){

			//点击的a标签的父级li
			//既要生成选择的结构，还要对选择的结构进行排序
			//点击同一行筛选条件，只能有一个

			var parent = this.parentNode;

			if(parent.prevNode){
				parent.prevNode.style.color = '';
			}
			this.style.color = '#F56C6C';

			// 添加选中元素
			arr[parent.index] = this.innerText;

			// 匹配对应值
			if (parent.index == 0) {
				scoreArr.brand = arr[parent.index]
			}
			if (parent.index == 1) {
				scoreArr.place = arr[parent.index]
			}
			if (parent.index == 2) {
				scoreArr.price = arr[parent.index]
			}
			console.log(scoreArr);
			console.log(arr[parent.index]);

			// 文本清空，同一个li内仅留下一个
			oChosDiv.innerHTML = '';

			for(var i=0; i<arr.length; i++){
				//只有当arr[i]的值不为0时，即与下标对应的第i个li中有被选中的时候才执行下面的代码
				//生成选中的目标元素
				if(arr[i]){
				var oChotxt = document.createElement('span');
				oChotxt.innerHTML = arr[i];
				var oCxa = document.createElement('a');
				oCxa.innerHTML = ' '+'x';

				//标记商品筛选区的a所在的li是第几个
				oCxa.setAttribute('name',i);

				oChotxt.appendChild(oCxa);
				oChosDiv.appendChild(oChotxt);
				}
			}
			var num = 0;
			var ChoseA = oChosDiv.getElementsByTagName('a');
			for(var i = 0; i<ChoseA.length; i++){
				ChoseA[i].index = i;
				ChoseA[i].onclick = function(){

					// 得到删除a标签在第几个li中
					num = parseInt(this.getAttribute('name'));

					this.parentNode.remove();
					aLi[num].prevNode.style.color = '';
					//让删除的元素在数组中对应下标的值变为0
					arr[num]=0;
					}
				}
				parent.prevNode = this;
				}
			}
		}

		// from表单
        $('.refer').on('click', function() {
          const referArr = ['brand', 'place', 'price'];
          var form = $("<form method='get' active='#'></form>");
          console.log(scoreArr);
          [scoreArr.brand, scoreArr.place, scoreArr.price].forEach(function(item, i) {
              form.append($("<input type='hidden' name=" + referArr[i] + " value=" + item + ">"))
          })

          $(document.body).append(form);
          form.submit();
        });
	}

// var scoreArr = {
// 	brand: [a],
// 	place: [b],
// 	price: [c]
// };
