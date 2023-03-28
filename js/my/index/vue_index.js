// vue3.x_application--------------------------------------------------------------------------Begin
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-sm btn-danger',
        cancelButton: 'ms-3 btn btn-sm btn-success',
    },
    buttonsStyling: false
});

const { createApp, ref } = Vue;
const vue_app = Vue.createApp({
    data() {
        return {
            vtxt: {
                topic: "ToDoList",
            },
            vcla: {
                col_a:"offset-1 col-10",
                topic: "display-3 gf gfw900 text-center text-black text-shine-m",
                card:"card",
                cardh:"card-header fs-5 gf gfw500",
                cardb:"card-body",
                cardtit:"card-title fs-5 gf gfw500",
                cardtxt:"card-text fs-6",
                cardf: "card-footer gf gfw500 mx-3",
                ulnavtabs:"nav nav-tabs card-header-tabs",
                ulnavitem:"nav-item",
                ulnavlink_act:"nav-link active",
                ulnavlink:"nav-link",
            },
            vdat: {
                todo: "",
                sub_todo:"",
                todos: [
                // /*
                    {
                        id:'01',
                        title: '買延長線for my notebook',
                        completed: false,
                        sub_todos: [
                            {
                                id: '0101',
                                title: 'alias fuga error ulla',
                                completed: false
                            },
                            {
                                id: '0102',
                                title: 'sit amet consectetur adipisicing elit.',
                                completed:false
                            },
                            {
                                id: '0103',
                                title: '請點擊右下關閉按鈕回原網頁',
                                completed:false
                            },
                        ]
                    },
                    {
                        id:'02',
                        title: '換小紅車鑰匙電池',
                        completed: false,
                        sub_todos: [
                            {
                                id: '0201',
                                title: 'Fed持續升息 美經濟「著陸」情境有三',
                                completed:false
                            },
                        ]
                    },
                    {
                        id:'03',
                        title: '買OPPO R17保護殼',
                        completed: false,
                        sub_todos: [
                            {
                                id: '0301',
                                title: 'The health benefits of apples',
                                completed:false
                            },             
                        ],
                    },
                    {
                        id:'04',
                        title: '復習功課',
                        completed: false,
                        sub_todos: [
                            {
                                id: '0401',
                                title: 'Excepturi beatae dolor corporis nesciuntm.',
                                completed:false
                            },
                            {
                                id: '0402',
                                title: 'exercitationem hic adipisci ',
                                completed:false
                            },
                            {
                                id: '0403',
                                title: 'MYSQL SELECT,UPDATE,INSERT',
                                completed:false
                            },
                            {
                                id: '0404',
                                title: 'VUE 重寫本週上的的TODOLIST',
                                completed:false
                            },
                        ]
                    },
                    // */
                ],
                completed: [],
                inprogress: [],
                visible: 'all',
                edit_id: '',
                edit_title:'',
                edit_todo:[],
                
                sedit_id: '',
                sedit_title:'',
                sedit_todo: [],
                addsub_todoid: '',
                sub_collapse:true,
            },
        };
    },
    methods: {
        todoC() {
            var vm = this;
            var todo_add = (vm.vdat.todo).trim();
            if ( !todo_add ) { return };
            vm.vdat.todos.push(
                {
                    id: Date.now().toString(),
                    title: todo_add,
                    completed: false,
                    sub_todos:[],             //先建立好空的陣列, 將來push才不會出錯          
                }
            );
            vm.vdat.todo = "";                //新增之後清空
        },
        todoU(obj) { 
            var vm = this;
            vm.vdat.edit_id = obj.id;
            vm.vdat.edit_todo = obj;
            vm.vdat.edit_title = obj.title;
        },
        edit_done(obj) {
            var vm = this;
            obj.title = vm.vdat.edit_title;    //  於此同時, todos也修改了( todos.title=item.title=obj.title)
            vm.vdat.edit_id = '';
            vm.vdat.edit_title = '';
            vm.vdat.edit_todo='';
        },
        edit_cancel(obj) {
            var vm = this;
            vm.vdat.edit_id = '';
            vm.vdat.edit_title = '';
            vm.vdat.edit_todo='';
        },
        todoD(obj) {
            swalWithBootstrapButtons.fire({
                text: "確定刪除'待辦事項'嗎?",
                width: 300,
                showCancelButton: true,
                confirmButtonText: '確定',
                cancelButtonText: '取消',
            }).then((result) => {
                if (result.isConfirmed) {
                    var vm = this;
                    var obj_idx = vm.vdat.todos.indexOf(obj);
                    vm.vdat.todos.splice(obj_idx, 1);
                }
            })
        },
        sub_todoC(obj) {
            var vm = this;
            var sub_todo_add = (vm.vdat.sub_todo).trim();
            if (!sub_todo_add) { return };
            var obj_idx = vm.vdat.todos.indexOf(obj);        // 1-先找到整個物件的索引位置
            var todo = vm.vdat.todos[obj_idx];               // 2-取出該物件  
            todo.sub_todos.push
            ({
                id: Date.now().toString(),
                title: sub_todo_add,
                completed: false,
            });
            vm.vdat.sub_todo = "";                           //新增之後清空
        },
        sub_todoC_done(obj) {
            var vm = this;
            // 關閉前,先新增------------------begin
            var sub_todo_add = (vm.vdat.sub_todo).trim();
            if (!sub_todo_add) {
                vm.vdat.addsub_todoid = ''; 
                return;
            };
            var obj_idx = vm.vdat.todos.indexOf(obj);        // 1-先找到整個物件的索引位置
            var todo = vm.vdat.todos[obj_idx];               // 2-取出該物件    
            todo.sub_todos.push
            ({
                id: Date.now().toString(),
                title: sub_todo_add,
                completed: false,
            });
            // 關閉前,先新增------------------ending
            vm.vdat.addsub_todoid = '';                        // v-if="vdat.addsub_todoid==item.id"<--不成立, 關閉該<input>
        },
        stodoD(obj,sub_obj) {
            swalWithBootstrapButtons.fire({
                text: "確定刪除'明細待辦事項'嗎?",
                width: 350,
                showCancelButton: true,
                confirmButtonText: '確定',
                cancelButtonText: '取消',
            }).then((result) => {
                if (result.isConfirmed) {
                    var vm = this;
                    var obj_idx = vm.vdat.todos.indexOf(obj);               // 1-先找到整個物件的索引位置
                    var todo = vm.vdat.todos[obj_idx];                      // 2-取出該物件    
                    var sub_obj_idx = todo.sub_todos.indexOf(sub_obj);      // 3-在該物件的sub_todos找到該物件的索引
                    vm.vdat.todos[obj_idx].sub_todos.splice(sub_obj_idx,1); // 4-移除該sub_todos
                }
            })
        },
        clear_todos() {
            swalWithBootstrapButtons.fire({
                title: '確定全部刪除嗎?',
                text: "---所有資料都將清空,而且無法復原---",
                // width: 500,
                showCancelButton: true,
                confirmButtonText: '確定',
                cancelButtonText: '取消',
            }).then((result) => {
                if (result.isConfirmed) {
                    var vm = this;
                    vm.vdat.todos = [];
                    
                    swalWithBootstrapButtons.fire(
                        '已刪除!',
                        '您的所有資料,已完全清除',
                        '成功'
                    );
                };
            })
        },
        stodoU(obj) { 
            var vm = this;
            vm.vdat.sedit_id = obj.id;
            vm.vdat.sedit_todo = obj;
            vm.vdat.sedit_title = obj.title;
        },
        sedit_done(obj) {
            var vm = this;
            obj.title = vm.vdat.sedit_title;    //  於此同時, todos也修改了( todos.title=item.title=obj.title)
            vm.vdat.sedit_id = '';
            vm.vdat.sedit_title = '';
            vm.vdat.sedit_todo='';
        },
        sedit_cancel(obj) {
            var vm = this;
            vm.vdat.sedit_id = '';
            vm.vdat.sedit_title = '';
            vm.vdat.sedit_todo='';
        },
        addsub_todo(todo_id) {
            var vm = this;
            vm.vdat.sub_collapse = false;     //新增明細時, 將收合『取消』-->就是打開
            vm.vdat.addsub_todoid = todo_id;
        }
    },
    computed: {
        filter_todo() {
            var vm = this;
            var rtn;
            vm.vdat.completed = [];
            vm.vdat.inprogress = [];
            vm.vdat.todos.forEach(function(item,index) {
                if (item.completed){
                    vm.vdat.completed.push(item);
                } else {
                    vm.vdat.inprogress.push(item);
                }
            });
            switch (vm.vdat.visible) {
                case 'all':
                    return vm.vdat.todos;
                case 'inprogress':
                    return vm.vdat.inprogress;
                case 'completed':
                    return vm.vdat.completed;
            }
        }
    }
});
vue_app.mount("#app");
// Vue.createApp(vue_app).mount("#app");
// vue3.x_application--------------------------------------------------------------------------Ending