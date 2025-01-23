//수정
function modifyRow(event) {
    const btn = event.target;
    const li = btn.closest("tr");
    const careerIn = li.querySelector(".inputCareer div");
    careerIn.innerHTML = `<input class="newCareer" value="">`;
  
    btn.textContent = "수정완료";
  
    btn.addEventListener("click", function () {
      if (careerIn.length < 15) {
        document.getElementById("careerRed").innerText =
          "경력은 최소 15자 이상이어야 합니다.";
        return;
      }
      localStorage.setItem("data_map", JSON.stringify(data_map));
    });
  }


// 수정
function editRow(userInfo, row) {
    const careersCell = row.cells[3];
    const originalCareer = careersCell.innerText;

    const input = document.createElement("input");
    input.type = "text";
    input.value = originalCareer;
    careersCell.innerHTML = "";
    careersCell.appendChild(input);

    // 수정완료버튼
    const editBtn = row.cells[5].querySelector("button");
    editBtn.innerText = "수정완료";
    editBtn.onclick = () => {
      const newCareer = input.value.trim();
      if (newCareer.length < 15) {
        document.getElementById("careersred").innerText =
          "경력은 최소 15자 이상이어야 합니다.";
        return;
      }
      // 로컬스토리지 수정
      careersCell.innerHTML = newCareer;
      userInfo.careers = newCareer;
      localStorage.setItem("userInfo", JSON.stringify(savedData));
      editBtn.innerText = "수정";
      editBtn.onclick = () => editRow(userInfo, row);
    };
  }











// 수정 버튼 클릭 함수
function modBtnClick(event) {
    const btn2 = event.target; // 클릭된 버튼
    const li2 = btn2.closest('tr'); // 해당 버튼이 속한 tr 요소
    const careerTd = li2.querySelector('.career'); // 경력 열 찾기
    const careerOrigin = careerTd.textContent.trim(); // 기존 텍스트 가져오기

    console.log("기존 경력:", careerOrigin);

    // 입력 필드 생성
    careerTd.innerHTML = `<input class="newCareer" type="text" value="${careerOrigin}">`;
    const inputTag = careerTd.querySelector('.newCareer'); // 새로 생성된 input 태그

    // 버튼 텍스트 변경
    btn2.innerText = '수정완료';

    // 수정완료 버튼 클릭 시 이벤트
    const handleUpdate = () => {
        const careerChange = inputTag.value.trim(); // 입력값 가져오기
        console.log("입력된 경력 길이:", careerChange.length);

        if (careerChange.length < 15) {
            document.getElementById('item.id').innerText = '경력 최소 15자 이상';
            console.log("경력 최소 15자 이상 요구됨");
            return;
        }

        // 입력값 업데이트
        careerTd.textContent = careerChange;
        data_map[btn2.getAttribute('index')].career = careerChange; // 데이터 맵 수정

        // 로컬스토리지 저장
        localStorage.setItem('data_map', JSON.stringify(data_map));

        // 버튼 초기화
        btn2.innerText = '수정';

        // 이벤트 핸들러 제거 (중복 방지)
        btn2.removeEventListener('click', handleUpdate);
    };

    // 수정완료 버튼 클릭 이벤트 등록
    btn2.addEventListener('click', handleUpdate, { once: true });
}


function modBtnClick(event) {
  const btn = event.target; // 클릭된 버튼
  const row = btn.closest('tr'); // 버튼이 속한 행
  const careerTd = row.querySelector('.career'); // 경력 칸
  const id = careerTd.getAttribute('data-id'); // 경력 칸의 data-id

  if (btn.innerText === '수정') {
      // 기존 내용을 비우기
      const currentCareer = careerTd.textContent; // 기존 경력값 저장
      careerTd.innerHTML = ''; // 기존 내용을 비움

      // input 필드 생성 후 추가
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.className = 'editCareer';
      inputField.value = currentCareer; // 기존 경력값을 기본값으로 설정
      careerTd.appendChild(inputField);

      // 버튼 텍스트 변경
      btn.innerText = '수정완료';
  } else {
      // 수정 완료 시 처리
      const inputField = careerTd.querySelector('.editCareer'); // input 필드 가져오기
      const newCareer = inputField.value; // 입력값 가져오기

      // 입력값 검증
      if (newCareer.length < 15) {
          alert('경력은 15자 이상이어야 합니다.');
          return;
      }

      // 데이터 업데이트
      const target = data_map.find((item) => item.id === id);
      if (target) {
          target.career = newCareer; // 데이터 수정
      }

      // 로컬스토리지 업데이트
      localStorage.setItem('data_map', JSON.stringify(data_map));

      // 테이블 업데이트
      dataSetting(); // 테이블 다시 렌더링
  }
}

function modBtnClick(event) {
  const btn2 = event.target;
  const li2 = btn2.closest('tr');
  const careerTd = li2.querySelector('.career'); // 경력창 부분
  let childDiv = careerTd.querySelector("div"); // 조건 메시지 출력 부분

  // childDiv가 없으면 생성
  if (!childDiv) {
      childDiv = document.createElement('div');
      careerTd.appendChild(childDiv);
  }

  if (btn2.innerText === '수정') {
      const careerOrigin = careerTd.textContent.trim(); // 기존 경력값 저장

      // input 태그 생성
      careerTd.innerHTML = `<input class="newCareer" type="text" value="${careerOrigin}">`;
      careerTd.appendChild(childDiv); // childDiv를 다시 추가

      btn2.innerText = '수정완료';
  } else {
      const inputTag = careerTd.querySelector('.newCareer');
      const careerChange = inputTag.value.trim(); // 입력값 가져오기

      if (careerChange.length < 15) {
          childDiv.innerText = '경력 최소 15자 이상';
          return;
      }

      // 경력 업데이트
      careerTd.innerHTML = careerChange;
      careerTd.appendChild(childDiv); // childDiv를 다시 추가
      childDiv.innerText = ''; // 오류 메시지 초기화
      btn2.innerText = '수정';

      // 로컬스토리지에 다시 저장
      const index = btn2.getAttribute('index');
      data_map[index].career = careerChange;
      localStorage.setItem('data_map', JSON.stringify(data_map));
  }
}


function modBtnClick(event) {
  const btn2 = event.target;
  const li2 = btn2.closest('tr');
  const careerTd = li2.querySelector('.career');
  const index = btn2.getAttribute('index'); // 버튼의 index 속성 가져오기
  const inputSpan = careerTd.querySelector(`.span${data_map[index].id}`); // index에 맞는 span 선택

  if (btn2.innerText === '수정') {
      const careerOrigin = careerTd.textContent.trim(); // 기존 경력값 저장
      console.log('커리어 내용 맞니 ', careerOrigin);

      // input 태그 생성
      careerTd.innerHTML = `<input class="newCareer" type="text" value="${careerOrigin}">`;

      btn2.innerText = '수정완료';
  } else {
      const inputTag = careerTd.querySelector('.newCareer');
      const careerChange = inputTag.value.trim(); // 입력값 가져오기
      console.log('길이확인하장 ', careerChange.length);

      if (careerChange.length < 15) {
          inputSpan.innerHTML = '경력 최소 15자 이상';
          console.log(inputSpan);
          console.log('경력최소15자뜨나?');
          return;
      }

      // 경력 업데이트
      careerTd.innerHTML = careerChange;
      btn2.innerText = '수정';

      // 로컬스토리지에 다시 저장
      data_map[index].career = careerChange; // 데이터 업데이트
      localStorage.setItem('data_map', JSON.stringify(data_map));
  }
}



function modBtnClick(event) {
  const btn = event.target; // 클릭된 버튼
  const row = btn.closest('tr'); // 해당 행 가져오기
  const careerCell = row.querySelector('.career'); // 경력 셀 가져오기
  const spanElement = careerCell.querySelector('span'); // span 요소 가져오기
  const index = btn.getAttribute('index'); // 데이터 인덱스 가져오기

  if (btn.innerText === '수정') {
      // 기존 경력값 가져오기
      const currentCareer = careerCell.textContent.trim();
      
      // input 태그로 전환 및 기존 값 넣기
      careerCell.innerHTML = `
          <input type="text" class="newCareer" value="${currentCareer}">
          <span class="span${data_map[index].id}"></span>
      `;
      btn.innerText = '수정완료';
  } else {
      const inputElement = careerCell.querySelector('.newCareer'); // 수정된 input 가져오기
      const newCareer = inputElement.value.trim(); // 입력된 값 가져오기

      if (newCareer.length < 15) {
          // 조건 불만족 시 메시지 표시
          spanElement.textContent = '경력은 최소 15자 이상이어야 합니다.';
          return;
      }

      // 조건 만족 시 경력 업데이트
      spanElement.textContent = ''; // 메시지 제거
      careerCell.innerHTML = `${newCareer}<span class="span${data_map[index].id}"></span>`;
      btn.innerText = '수정';

      // 로컬스토리지 데이터 업데이트
      data_map[index].career = newCareer;
      localStorage.setItem('data_map', JSON.stringify(data_map));
  }
}
