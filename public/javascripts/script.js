let last_column_index = 0
let last_card_index = 0

const column_input_html = '<div class="column-header">'
    + '<input class="input" type="text" placeholder="Add a list...">'
    + '<div class="btn-group">'
    + '<button type="button" class="btn column-save" onclick="saveColumn(event)">Save</button>'
    + '<button type="button" class="btn close" onclick="cancelColumn(event)"></button>'
    + '</div>'
    + '</div>'

const card_input_html = '<input class="input" type="text" placeholder="Add a card...">'
    + '<div class="btn-group">'
    + '<button type="button" class="btn column-save" onclick="saveCard(event)">Save</button>'
    + '<button type="button" class="btn close" onclick="cancelCard(event)"></button>'
    + '</div>'

document.getElementById('add-column').addEventListener('click', (e) => {
  const column_group = document.querySelector('.column-group');
  const column = document.createElement('div');
  column.className = "column"
  column.innerHTML = column_input_html;
  column_group.appendChild(column);
  column_group.insertBefore(column, e.currentTarget);
})

function saveColumn(e) {
  const column_el = e.currentTarget.parentNode.parentNode.parentNode
  const column_header = e.currentTarget.parentNode.parentNode
  const column_input = e.currentTarget.parentNode.previousSibling
  const column_name = column_input.value

  if (column_name === '') {
    alert('리스트 이름을 입력해주세요.')
    column_input.focus();
  } else {
    column_header.innerHTML = `<p class='head-copy'>${column_name}</p>`
    const column_content_html = document.createElement('div');
    column_content_html.className = "column-contents"
    column_el.appendChild(column_content_html)
    column_content_html.innerHTML = '<p class="body-copy add" onclick="addCard(event)">Add a card...</p>'

    last_column_index++;
    column_el.id = `column-${last_column_index}`
    column_el.addEventListener('dragenter', dragEnter, false);
    column_el.addEventListener('dragleave', dragLeave, false);
    column_el.addEventListener('dragover', dragOver, false);
    column_el.addEventListener('drop', drop, false);
  }
}

function cancelColumn(e) {
  const column_el = e.currentTarget.parentNode.parentNode.parentNode
  column_el.remove()
}

function addCard(e) {
  const column_contents = e.currentTarget.parentNode
  const card_input = document.createElement('div');
  card_input.className = "card-item"
  card_input.innerHTML = card_input_html;
  column_contents.appendChild(card_input);
}

function saveCard(e) {
  const card_el = e.currentTarget.parentNode.parentNode
  const card_input = e.currentTarget.parentNode.previousSibling
  const card_name = card_input.value

  if (card_name === '') {
    alert('카드 이름을 입력해주세요.')
    card_input.focus();
  } else {
    last_card_index++;
    card_el.id = `card-${last_card_index}`
    card_el.innerHTML = `<p class='body-copy'>${card_name}</p>`
    card_el.setAttribute('draggable', true);
    card_el.addEventListener('dragstart', dragStart, false)
  }
}

function cancelCard(e) {
  const card_el = e.currentTarget.parentNode.parentNode
  card_el.remove()
}

function dragStart(e) {
  e.dataTransfer.setData("cardId", e.target.id);
}

function dragEnter(e) {
  e.preventDefault();
  if (e.target.className === "column-contents") {
    e.target.style.border = "1px dotted #1db1b5";
  } else if (e.target.className === "card-item") {
    e.target.style.border = "1px dotted #1db1b5";
    e.target.style.opacity = "0.6";
  }
}

function dragLeave(e) {
  e.preventDefault();
  e.target.style.borderColor = "transparent";
}

function dragOver(e) {
  e.preventDefault();
}

function swapCard(node1, node2) {
  node1.parentNode.replaceChild(node1, node2);
  node1.parentNode.insertBefore(node2, node1);
  node1.parentNode.insertBefore(node1, node2);
}

function drop(e) {
  e.preventDefault();
  if (e.target.className === "column-contents") {
    const card_id = e.dataTransfer.getData("cardId");
    e.target.appendChild(document.getElementById(card_id));
    e.target.style.borderColor = "transparent";
    e.target.style.opacity = "1";
    document.getElementById(card_id).style.opacity = "1";
  } else if (e.target.className === "card-item") {
    const card_id = e.dataTransfer.getData("cardId");
    if (document.getElementById(card_id).parentNode.parentNode.id
        !== e.target.parentNode.parentNode.id) {
      e.target.parentNode.appendChild(document.getElementById(card_id));
    }
    swapCard(document.getElementById(card_id),
        document.getElementById(e.target.id));
    e.target.style.borderColor = "transparent";
    e.target.style.opacity = "1";
    document.getElementById(card_id).style.opacity = "1";
  }
}
