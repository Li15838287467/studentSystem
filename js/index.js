$(function() {

	// 左侧激活班级的索引
	var classIndex = 0;
	// 右侧学生所在行的索引
	var trIndex = 0;
	// 所有学生信息来自json.js
	var studentArr = [students_json_01.data,students_json_02.data];

	showUserName();
	showCurrentClass();
	// 默认显示第一个班级的学生信息
	showStuInfo();
	
	// 显示当前用户
	function showUserName() {
		var uname = get_value_from_storage('USERID');
		$('.uname').html(uname);
	}

	// 显示当前所有班级
	function showCurrentClass(leftContent) {
		// class_json来自json.js
		var classArr = class_json.data;
		var liContent = '';
		// var classContent = '';
		for (var i = 0; i < classArr.length; i++) {
			liContent += '<li data-index=' + i +'>' + classArr[i].classname + '</li>';
			// classContent += classArr[i].id;
		}
		$('.class-list').html(liContent);
		// 默认选中第一个班级
		$('.class-list li').eq(0).addClass('active');
		var classText = $('.class-list li').eq(classIndex).html();
		// 默认右侧班级名称
		$('.right-header').html('当前: 首页- ' + classText);
		$('.right-class-name').html(classText);
	}
	// 点击班级列表，切换学生信息
	$('.class-list').delegate('li', 'click', function(leftContent) {
		$('.class-list li').removeClass('active');
		$(this).addClass('active');
		// 更新右侧班级名称
		var leftContent = $(this).html();
		$('.right-header').html('当前: 首页- ' + leftContent);
		$('.right-class-name').html(leftContent);
		classIndex = $(this).attr('data-index');
		showStuInfo(classIndex);
	})

	// 显示学生信息
	function showStuInfo() {
    var studentContent = '';
    for(var i = 0; i< studentArr[classIndex].length; i ++) {
      studentContent += "<tr data-index = " + i + "><td><input type='checkbox' name='' id=''></td><td>"
				+ studentArr[classIndex][i].truename + "</td><td>"
				+ studentArr[classIndex][i].sno + "</td><td>"
				+ studentArr[classIndex][i].tel + "</td><td>" 
				+ (studentArr[classIndex][i].gender == 'm' ? '男' : '女') + "</td><td>" 
				+ studentArr[classIndex][i].age + "</td><td>" 
				+ studentArr[classIndex][i].major + "</td> <td>" 
				+ "<button class='btn btn-edit btn-info btn-index' data-toggle='modal' data-target='#myModal'>编辑</button>" 
				+ "<button class='btn btn-del btn-danger btn-index' data-toggle='modal' data-target='#delModal'>删除</button></td></tr>"
    }
		$('.student-info').html(studentContent);
	}
	
	// 获取学生在本班级中的序号
	$('.student-info').delegate('.btn-index', 'click', function() {
		trIndex = $(this).parents('tr').attr('data-index');
	})

	// 编辑学生信息	
	$('.student-info').delegate('.btn-edit', 'click', function() {
		$('.stu-title').html('编辑');
		var stu = studentArr[classIndex][trIndex];
		// 将该生信息填入对应输入框
		$('.e-name').val(stu.truename);
		$('.e-sno').val(stu.sno);
		$('.e-tel').val(stu.tel);
		$('.e-select').val(stu.gender);
		$('.e-major').val(stu.major);
		$('.e-age').val(stu.age);
		// 当前编辑状态：编辑
		$('.addEditBtn').attr('edd-status', 'edit');
	})

	// 新增学生信息
	$('.add-stu-btn').click(function() {
		// 置空输入框
		$('.e-name').val('');
		$('.e-sno').val('');
		$('.e-tel').val('');
		$('.e-select').val('m');
		$('.e-major').val('');
		$('.e-age').val('');
		// 当前编辑状态：新增
		$('.addEditBtn').attr('edd-status', 'add');
	})

	// 新增或编辑学生的保存按钮
	$('.addEditBtn').click(function() {
		var stu = {};
		stu.truename = $('.e-name').val();
		stu.sno = $('.e-sno').val();
		stu.tel = $('.e-tel').val();
		stu.gender = $('.e-select').val();
		stu.major = $('.e-major').val();
		stu.age = $('.e-age').val();
		// 判断新增还是编辑
		var status = $(this).attr('edd-status');
		if(status == 'add') {
			studentArr[classIndex].push(stu);
		} else {
			studentArr[classIndex].splice(trIndex * 1, 1, stu);
		}
		// 用新的数据更新页面
		showStuInfo();
		// 关闭模态框
		$('#myModal').modal('hide');
	})

	// 删除学生信息
	$('.del-sure').click(function() {
		studentArr[classIndex].splice(trIndex * 1, 1);
		// 用新的数据更新页面
		showStuInfo();
		// 关闭模态框
		$('#delModal').modal('hide');
	})

})