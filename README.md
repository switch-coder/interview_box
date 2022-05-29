# 인터뷰박스 과제 할 일 프로젝트

### 필수 과제

- "할 일" 의 생성, 조회, 변경, 삭제 기능

- "할 일"에 인스타그램 또는 페이스북 "태그"와 유사한 "태그"를 부여하고 조회 및 삭제할 수 있는 기능

("태그"가 있는 경우 "할 일" 목록에 함께 보여져야 함)

- 모든 데이터는 클라이언트(로컬)에서 관리하며, 별도 DB서버 없이 구현해야 함

### 기능

1. 생성

- 다이얼로그 생성
- priority MIDDLE
- 생성 전 날짜 선택 불가능
- 생성시 tags 관리 state에 추가 저장

2. 삭제

- 삭제시 alert 창이 뜨고 delted_at 기록과 함께 삭제됨

3. 수정

- 다이얼로그 생성 전 날짜 선택 불가능

4. 조회

- 활성화되 todos
- 완료된 todos

5. 검색

- 태그 / 타이틀 검색 가능
- 태그 검색시 tags state에서 autocomplete로 보여줌

### 파일 구조

📂src
┃ ┣ 📂assets
┃ ┃ ┗ 📜favicon.ico
┃ ┣ 📂components
┃ ┃ ┣ 📜Alerts.tsx
┃ ┃ ┣ 📜CreateTodoDialog.tsx
┃ ┃ ┣ 📜ModifyTodoDialog.tsx
┃ ┃ ┣ 📜TodoItem.tsx
┃ ┃ ┗ 📜TodoListItem.tsx
┃ ┣ 📂enums
┃ ┃ ┗ 📜todo_enums.ts
┃ ┣ 📂types
┃ ┃ ┣ 📜alert_types.ts
┃ ┃ ┗ 📜todo_types.ts
┃ ┣ 📜.DS_Store
┃ ┣ 📜App.tsx
┃ ┣ 📜favicon.svg
┃ ┣ 📜index.css
┃ ┣ 📜logo.svg
┃ ┣ 📜main.tsx
┃ ┗ 📜vite-env.d.ts
┣ 📜index.html
┣ 📜package.json
┣ 📜tsconfig.json
┣ 📜tsconfig.node.json
┣ 📜vite.config.ts
┗ 📜yarn.lock
