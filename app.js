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

(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    // acc[key] = value;
    acc[task._id] = task;
    // acc = {
    //   task._id: 0
    // }
    return acc;
  }, {});
  //Elements UI - user interface;
  const listContainer = document.querySelector('.tasks-list-section .list-group');
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  const filterContainer = document.querySelector('.filterContainer');

  //events
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);
  filterContainer.addEventListener('click', filterTodos);

  function renderAllTasks(objOfTasks) {
    if (!objOfTasks) {
      console.error('НЕТ ЗАДАЧ');
      return;
    }; //проверка
    const fragment = document.createDocumentFragment();
    Object.values(objOfTasks).forEach(task => {
      const list = listItemTemplate(task);  
      fragment.appendChild(list);
    });
    listContainer.appendChild(fragment);
  };
  function listItemTemplate({ _id, title, body }) {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
    listItem.setAttribute('data-task-id', _id);
    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';
    span.style.fontSize = '1.5rem';
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
    //нужно сделать динамичный сборщик классов
    deleteBtn.textContent = 'Delete task';
    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');
    // 1rem = 16px;
    listItem.appendChild(span);
    listItem.appendChild(deleteBtn);
    listItem.appendChild(article);
    return listItem;
  }
  function onSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    if (!titleValue || !bodyValue) {
      alert('Введите пж инпуты');
      return;
    };
    //проверка
    const listItem = createTask(titleValue, bodyValue);
    const created = listItemTemplate(listItem);
    listContainer.insertAdjacentElement('afterbegin', created);
    form.reset();
  }
  function createTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    }
    objOfTasks[newTask._id] = newTask;
    return { ...newTask };
  }
  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Вы правда хотите удалить [${title}]?`);
    if(!isConfirm) return;
    delete objOfTasks[id];
    return isConfirm;
}
  function onDeleteHandler({ target }) {
    if(target.classList.contains('delete-btn')) {
      const parent = target.parentElement;
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      if (confirmed) parent.remove();
    }
  }
  function filterTodos({ target }) {
    
  }
})(tasks);