# Fasting-Diary
2020-2021 Project.
<br><br>

# Flow
* index.js
* App.js
<br>Navigation 설정. screen stack 명시

* component/home.js
<br>메인화면. Icons & Calendar & TodaySummary로 구성
<br>TodaySummary를 naver band로 내보내기

  - component/dailytodo.js
<br>Calendar에서 특정 날짜 선택(길게 누르기) 시. 해당 날짜의 DailyTodo 수정
<br>변경사항이 TodaySummary에 표시

  - component/todaysummary.js
<br>Calendar에서 특정 날짜 선택(짧게 누르기) 시. 해당 날짜의 DailyTodo 간략히 표현

  - component/newevent.js
<br>상단 + icon 선택 시. 단식 event 추가

  - component/(개발 전)
<br>상단 ? icon 선택 시. 도움말 보기

  - component/eventlist.js
<br>상단 = icon 선택 시. 단식 event 목록 보기.
<br>특정 단식 event 선택 시 하단에 <수정하기>, <삭제하기>, <차트보기> 버튼 활성화

    * component/editevent.js
<br><수정하기> 선택 시. 특정 단식 event 정보 수정

    * component/deleteevent.js
<br><삭제하기> 선택 시. 특정 단식 event 삭제

    * component/(개발 전)
<br><차트보기> 선택 시. 특정 단식 event 기간 동안의 DailyTodo 수치 추이 차트 생성

  - component/
<br>checkitem.js // true/false switch
<br>countitem.js // -/+ counter
<br>eventitem.js
<br>memoitem.js // text 입력기
<br>memoitemfixed.js // 입력한 text 보기 용도
<br>numericitem.js // numeric 입력기
<br>numericitemdouble.js // 0/0 형태 numeric 2개 입력기. 혈압 입력 용도
<br>numericitemfixed.js // 입력한 numeric 보기 용도

<br><br>

# Todo
* 앱 이름 및 로고 정하기

* 메인화면
  - TodaySummary(Calendar 하단) ui 수정

* DailyTodo
  - 식단 추가 기능 (현미밥, 야채 등 )

* 단식 일정 목록
  - 검색 기능
  - 차트 보기 기능

* 도움말
  - 탭 생성
  - 단식 소개 추가
  - 단식 방법 추가
  - 단식 식품 소개 추가

* 알림
  - 간청소(검은 점)
  - 단식 구간 시작(본단식 - 붉은색, 조절식 - 노란색, 회복색 - 녹색)
  - 단식 구간 끝(본단식 - 붉은색, 조절식 - 노란색, 회복색 - 녹색)
  - 마무리 단식 응원(본단식 - 붉은색, 조절식 - 노란색, 회복색 - 녹색)
