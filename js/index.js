$(function() {

	showUserName();
	showCurrentClass();
	showStuInfo();

	// 显示当前用户
	function showUserName() {
		var uname = get_value_from_storage('USERID');
		$('.uname').html(uname);
	}

	// 显示当前班级
	function showCurrentClass() {
		// class_json来自json.js
		var classArr = class_json.data;
		var liContent = '';
		// var classContent = '';
		for (var i = 0; i < classArr.length; i++) {
			liContent += '<li>' + classArr[i].classname + '</li>';
			// classContent += classArr[i].id;
		}
		$('.class-list').html(liContent);
	}
	// 事件委托/事件代理
	$('.class-list').delegate('li', 'click', function() {
		$('.class-list li').removeClass('active');
		$(this).addClass('active');
		var leftContent = $(this).html();
		$('.right-header').html('当前: 首页- ' + leftContent);
		$('.right-class-name').html(leftContent);
		// showStuInfo(className);
	})

	// 显示学生信息
	function showStuInfo() {
		// students_json_01来自json.js
		var studentArr = students_json_01.data;
    var studentContent = '';
    for(var i = 0; i< studentArr.length; i ++) {
      studentContent += "<tr data-index = " + i + "><td><input type='checkbox' name='' id=''></td><td>"
					  + studentArr[i].truename + "</td><td>"
					  + studentArr[i].sno + "</td><td>"
					  + studentArr[i].tel + "</td><td>" 
					  + (studentArr[i].gender == 'm' ? '男' : '女') + "</td><td>" 
					  + studentArr[i].age + "</td><td>" 
					  + studentArr[i].major + "</td> <td>" 
					  + "<button class='btn btn-edit btn-info' data-toggle='modal' data-target='#myModal'>编辑</button>" 
					  + "<button class='btn btn-del btn-danger'>删除</button></td></tr>"
    }
		$('.student-info').html(studentContent);
	}
	
	$('.student-info').delegate('.btn-edit', 'click', function() {
		// console.log($(this).parents('tr').attr('data-index'));
		
		// $(this).parents('tr').find('input').prop('checked', true);
	})

})