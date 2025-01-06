document.addEventListener("DOMContentLoaded", () => {
    const profileImage = document.getElementById("profile-image");
    const boyfriendTypeSelect = document.getElementById("boyfriend-type");
    const chatBox = document.getElementById("chat-box");
    const chatForm = document.getElementById("chat-form");
    const messageInput = document.getElementById("message-input");
  
    // 대화 상대 선택에 따른 프로필 이미지 변경
    boyfriendTypeSelect.addEventListener("change", () => {
      const selectedType = boyfriendTypeSelect.value;
      if (selectedType === "kind") {
        profileImage.src = "https://img.etoday.co.kr/pto_db/2023/06/600/20230630151522_1901123_683_942.jpg";
      } else if (selectedType === "tsundere") {
        profileImage.src = "https://cdn.pinpointnews.co.kr/news/photo/202304/192169_207951_5051.jpg";
      } else if (selectedType === "funny") {
        profileImage.src = "https://i.pinimg.com/236x/fe/72/a8/fe72a82f713b993fe346aade84bac728.jpg";
      }
    });
  
    // 채팅 메시지 전송 처리
    chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const message = messageInput.value;
      const boyfriendType = boyfriendTypeSelect.value;
  
      addMessage("user", message);
  
      try {
        const response = await fetch("http://localhost:5001/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, boyfriendType }),
        });
  
        const data = await response.json();
        if (response.ok) {
          addMessage("ai", data.reply.content);
        } else {
          addMessage("ai", "죄송합니다. 문제가 발생했어요. 다시 시도해주세요!");
          console.error(data.rawError);
        }
      } catch (error) {
        addMessage("ai", "서버에 연결할 수 없습니다. 다시 시도해주세요.");
        console.error(error);
      }
  
      messageInput.value = "";
    });
  
    function addMessage(sender, text) {
      const messageElement = document.createElement("div");
      messageElement.className = sender === "user" ? "user-message" : "ai-message";
      messageElement.textContent = text;
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  });
  