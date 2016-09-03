(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
  
  // 1.创建一个模块
  var app = angular.module('todoApp',[]); 

  // 2.创建控制器
  app.controller('todoController',['$scope',function($scope){

     // 功能1 展示数据列表
     $scope.tasks=[
     {id:1,name:'吃饭',completed:true},
     {id:2,name:'睡觉',completed:true},
     {id:3,name:'打豆豆',completed:false},
     {id:4,name:'学习',completed:false},
     {id:5,name:'学习',completed:true},
     ];

     // 功能2 添加任务
     // 暴露一个数据模型，用来绑定文本框的值
     $scope.newTask='';
     $scope.add=function(){

        if(!$scope.newTask){
          return;
        }
        // 为了确定id唯一,我们使用数组中最后一个元素的id+1;
        // 数组的长度-1，就是数组最后一个元素的索引.
        var id;
        if($scope.tasks.length==0){
          id=1;
        }else{
          id = $scope.tasks[$scope.tasks.length-1].id + 1;
        }
        $scope.tasks.push({id:id,name:$scope.newTask,completed:false})
        $scope.newTask='';
     }

     // 功能3.删除任务
     $scope.remove=function(id){
        // 遍历数据，判断id是否与某条元素的id相等，相等就删除
        for (var i = 0; i < $scope.tasks.length; i++) {
          var item = $scope.tasks[i];
          if(item.id==id){
            // 从数组中删除一个元素
            $scope.tasks.splice(i,1);
            return;// 删除完之后就没有必要继续循环了，直接退出。
          }
        }
     }

     // 功能4 修改任务
     $scope.isEditingId=-1;   // isEditingId==item.id
     $scope.edit=function(id){
       // 编辑功能并不需要手动操作数组，因为这双向数据绑定
      $scope.isEditingId=id;
     }
     // 保存
     $scope.save=function(){
       $scope.isEditingId=-1;
     }

     // 功能5 切换任务状态
     // 该功能已完成

     // 功能6 批量切换任务状态
     var flag=true;
     $scope.toggleAll=function(){
       // 遍历数组，让数组中每个元素的每个completedd属性为true
       for (var i = 0; i < $scope.tasks.length; i++) {
         var item = $scope.tasks[i];
         item.completed=flag;
       }
       flag=!flag;
     }

     // 功能7 删除所有已完成任务
     $scope.clearAllCompleted=function(){

       // 遍历数组删除,所有已完成任务
       // 不要在循环中改变数组长度,在循环中改变数组长度会导致循环条件发生变化，可以后面的循环就不执行。
       // for (var i = 0; i < $scope.tasks.length; i++) {
       //   var item =$scope.tasks[i];
       //   if(item.completed){
       //      $scope.tasks.splice(i,1);
       //   }
       // }
      
      // var temp =[afaf]
      // 我们可以遍历数组，把所有未完成的任务放到临时数组，然后遍历结束后把把数组重新指向临时数组

      var temp =[];
      for (var i = 0; i < $scope.tasks.length; i++) {
        var item = $scope.tasks[i];
        if(!item.completed){
          temp.push(item);
        }
      }
      $scope.tasks=temp;
     }

     // 控制删除按钮的显示或隐藏
     $scope.isShow=function(){
       // 遍历数组，判断数组中的元素有没有complete为true，只要有就返回true,一个都没有返回false
       
       for (var i = 0; i < $scope.tasks.length; i++) {
           var item = $scope.tasks[i];
           if(item.completed){
               return true;
           }
       }

       return false;
     }

     // 8.显示未完成任务数
     // 使用$watch监视数据模型的变化
     $scope.leftNumber=0;

     // 想监视的数据模型的字符形式的名字,
     $scope.$watch('tasks',function(newValue,oldValue){
        $scope.leftNumber=0;
        for (var i = 0; i < newValue.length; i++) {
          var item = newValue[i];
          if(!item.completed){
            $scope.leftNumber++;
          }
        }
     },true);// 为true是表示深度监听,为监视数组中每个元素的每个属性的变化。
  }])

})(angular);
