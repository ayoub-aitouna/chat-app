var socket = io.connect('http://localhost:3000');
// const socket = io();
// console.log('server');
//query Dom
var message = document.querySelector('.in'),
    name__ = document.querySelector('.user_name_input'),
    button = document.querySelector('.send'),
    outcontainer = document.querySelector('.ul'),
    feed = document.querySelector('.feddback');

button.addEventListener('click', () => {

    socket.emit('chat', {
        messgae: message.value,
        Name: name__.value
    })

    message.value = '';
});
message.addEventListener('keypress', () => {

    socket.emit('typing', name__.value);

})
message.addEventListener('keyup', () => {
        console.log('key up');
        if (message.value == '' || message.value.lenght == 0) {
            socket.emit('done', 'none');
        }
    })
    //listen for event
socket.on('chat', (data) => {

    feed.innerHTML = '';
    outcontainer.innerHTML += ` <li>
    <div class="item">
        <p class="name__">` + data.Name + `</p>
        <p class="mesage__">` + data.messgae + `</p>
    </div>
</li>`
})
socket.on('typing', (data) => {
    feed.innerHTML = '<p><em>' + data + 'is typing an message</em></p>';
})
socket.on('done', () => {
    feed.innerHTML = '';
})