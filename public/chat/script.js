const messagesContainer = document.getElementById("messagesContainer")
const messagesDiv = document.getElementById("messages")
const emptyState = document.getElementById("emptyState")
const chatForm = document.getElementById("chatForm")
const messageInput = document.getElementById("messageInput")
const sendBtn = document.getElementById("sendBtn")

const messages = []
let isLoading = false

// 텍스트 입력 시 버튼 활성화/비활성화
messageInput.addEventListener("input", () => {
  sendBtn.disabled = !messageInput.value.trim() || isLoading
  autoResizeTextarea()
})

// 텍스트 영역 자동 크기 조절
function autoResizeTextarea() {
  messageInput.style.height = "auto"
  messageInput.style.height = Math.min(messageInput.scrollHeight, 200) + "px"
}

// Enter 키로 전송 (Shift+Enter는 줄바꿈)
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    if (messageInput.value.trim() && !isLoading) {
      handleSubmit()
    }
  }
})

// 폼 제출
chatForm.addEventListener("submit", (e) => {
  e.preventDefault()
  handleSubmit()
})

function handleSubmit() {
  const content = messageInput.value.trim()
  if (!content || isLoading) return

  // 사용자 메시지 추가
  addMessage("user", content)
  messageInput.value = ""
  messageInput.style.height = "auto"
  sendBtn.disabled = true

  // 로딩 상태 시작
  isLoading = true
  showLoadingBubble()

  // AI 응답 시뮬레이션
  setTimeout(() => {
    hideLoadingBubble()
    addMessage("assistant", "안녕하세요! 저는 AI 어시스턴트입니다. 무엇을 도와드릴까요?")
    isLoading = false
    sendBtn.disabled = !messageInput.value.trim()
  }, 2000)
}

function addMessage(role, content) {
  messages.push({ role, content })

  // 빈 상태 숨기기
  emptyState.classList.add("hidden")

  const messageEl = document.createElement("div")
  messageEl.className = `message ${role}`

  const avatarSvg =
    role === "user"
      ? '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>'
      : '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>'

  messageEl.innerHTML = `
    <div class="message-avatar">${avatarSvg}</div>
    <div class="message-content">${escapeHtml(content)}</div>
  `

  messagesDiv.appendChild(messageEl)
  scrollToBottom()
}

function showLoadingBubble() {
  const loadingEl = document.createElement("div")
  loadingEl.className = "message assistant"
  loadingEl.id = "loadingMessage"

  loadingEl.innerHTML = `
    <div class="message-avatar">
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    </div>
    <div class="loading-bubble">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `

  messagesDiv.appendChild(loadingEl)
  scrollToBottom()
}

function hideLoadingBubble() {
  const loadingEl = document.getElementById("loadingMessage")
  if (loadingEl) {
    loadingEl.remove()
  }
}

function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}
