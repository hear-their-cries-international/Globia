function initChat(){

  document.body.insertAdjacentHTML("beforeend", `
    <div id="chatbox" style="
      position:fixed;
      bottom:10px;
      right:10px;
      width:250px;
      background:white;
      border-radius:10px;
      box-shadow:0 0 10px rgba(0,0,0,0.2);
      font-size:12px;
      z-index:9999;
    ">
      <div style="background:#0a1f44;color:white;padding:8px;">
        Globia AI
      </div>

      <div id="chatBody" style="height:150px;overflow:auto;padding:5px;"></div>

      <div style="display:flex;">
        <input id="chatInput" placeholder="Ask anything..." style="flex:1;padding:5px;">
        <button onclick="sendMsg()" style="background:#ff6600;color:white;border:none;">Send</button>
      </div>
    </div>
  `);
}

async function sendMsg(){
  let input = document.getElementById("chatInput");
  let chat = document.getElementById("chatBody");

  if(!input.value) return;

  chat.innerHTML += `<p><b>You:</b> ${input.value}</p>`;

  const reply = await askAI(input.value);

  chat.innerHTML += `<p><b>AI:</b> ${reply}</p>`;

  input.value="";
  chat.scrollTop = chat.scrollHeight;
}
