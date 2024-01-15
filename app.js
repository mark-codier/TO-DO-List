const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks){
  const objOfTasks = arrOfTasks.reduce((acc,task)=>{
    acc[task._id] = task;
    return acc;
  },{});
  //Element UI - user interface;
  const listContainer = document.querySelector('.tasks-list-section .list-group')
  const form = document.forms['addTask'];
  const inp_t = form.elements['title'];
  const inp_b = form.elements['body'];//[квадратные скобки имеются ввиду что ищем по name]
  //Submit
form.addEventListener('submit',onSubmitHandler)
// map filter find foreach reduce some/every//Закрепить////////////////////////////////////////////////////////////////
listContainer.addEventListener('click',onDeleteHandler);
//////////////////////////////////////////Создаю интерфейс для задач///////////////////////////////////////////////////////////////////////
const divid = document.createElement('div');
divid.classList.add('divid')
const btn1 = document.createElement('button');
const btn2 = document.createElement('button');
const div = document.createElement('div');
    btn1.textContent = "Показать все задачи";
    btn2.textContent = "Показать незавершенные задачи";
    btn1.classList.add('btn-primary','btn','ml-auto');
    btn2.classList.add('btn-primary','btn','ml-auto');
    div.classList.add('div','ml-auto',);
    div.textContent = 'Все задачи';
    divid.appendChild(btn1);
    divid.appendChild(btn2);
    divid.appendChild(div);
    listContainer.appendChild(divid);
    const listContainer1 = listContainer.children;
    console.log(listContainer1  )
btn1.addEventListener('click',function(){
  div.textContent = 'все задачи';
    listContainer1.forEach(e => {
    e.classlist.contains('systemActivated') ? e.classList.remove('systemActivated'):console.log();
    e.classList.contains('display-none') ? e.classList.remove('display-none'):console.log();
  });
})
btn2.addEventListener('click',function(){
  div.textContent = 'Незавершенные задачи';
  listContainer1.forEach(e => {e.classList.add('systemActivated');
  if(e.classList.contains('systemActivated') && e.classList.contains('completed')){
    e.classList.add('display-none');
  }});
});
    renderAllTasks(objOfTasks);
  function listItemTemplate ({_id,title,body}){
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item','d-flex', 'align-items-center', 'flex-wrap','mt-2');
    listItem.setAttribute('data-task-id',_id);
    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontweight = 'bold';
    span.style.fontSize = '1.5rem'
    const dlt_btn = document.createElement('button')
    dlt_btn.classList.add('btn','btn-danger','ml-auto','delete-btn')
    dlt_btn.textContent = " Delete";
    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');
    // listItem.insertAdjacentElement('beforeend',span)
    // listItem.insertAdjacentElement('beforeend',dlt_btn)
    // listItem.insertAdjacentElement('beforeend',article)
    const comp_btn = document.createElement('button');
    comp_btn.classList.add('btn','comp','ml-auto','btn-success');
    comp_btn.textContent = 'Complete';
    listItem.appendChild(span);
    listItem.appendChild(dlt_btn);
    listItem.appendChild(article);
    listItem.appendChild(comp_btn);
    return listItem;
    //1rem = 16px
    //Нужно сделать динамичный сборщик классов
}
function renderAllTasks(objOfTasks){
  if(!objOfTasks){
    console.log('Нет задач');
    return;
  }//Проверка на наличие обьектов
  const fragment = document.createDocumentFragment();
  Object.values(objOfTasks).forEach(task =>{
    const list = listItemTemplate(task);
    fragment.appendChild(list);
  });listContainer.appendChild(fragment);
  }

  function onSubmitHandler(e){
    e.preventDefault();
    const titleValue = inp_t.value;
    const bodyValue = inp_b.value;
    if(!titleValue || !bodyValue){alert('Козел'); return;}
    const listItem = createTask(titleValue,bodyValue);
    const bla = listItemTemplate(listItem);
    listContainer.insertAdjacentElement('afterbegin',bla);
    form.reset()
  }
  function createTask(title,bod){
    const newTask = {
      title,//ПО СИНТАКСИСУ ЕСЛИ ЗНАЧЕНИЕ И ПОЛЕ СОВПАДАЕТ ТО МОЖНО ЗАПИСЫВАТЬ ВОТ ТАК
      body:bod,
      _id:`task-${Math.random()}`,
      completed: false,
    }
    objOfTasks[newTask._id] = newTask;
    return {...newTask};
  }
  function deleteTask(id){
    const {title} = objOfTasks[id];
    const isConfirm = confirm(`Вы искренне уверены в своем пожелании удалить из этого мира ${title}`);
    if(!isConfirm){return;};
    delete objOfTasks[id];
    return isConfirm;
  }
  console.log(objOfTasks)
  function onDeleteHandler({target}){
    if(target.classList.contains('delete-btn')){
      const parent = target.parentElement;
      const id = parent.dataset.taskId;
      const confirmValue =  deleteTask(id);
      if(confirmValue){parent.remove()}
    }else if(target.classList.contains('comp')){
      const parent = target.parentElement;
      parent.classList.add('--bs-success-bg-subtle','completed')
      if(parent.classList.contains('systemActive')){
        parent.classList.add('display-none');
      }
    }};
  })(tasks);
// const titl = document.querySelector('#title'); 
// const bod = document.querySelector('#body');
// const btnAdd = document.querySelector('.btn .btn-primary .mt-4');
// btnAdd.addEventListener('click',function(){
//   const titles = titl.value;
//   const bodys = bod.value;
//   const newObj = {
//     body: bodys,
//     title: titles,
//   };
//   [...rest, newObj] = tasks;
//   console.log(tasks)
// })
