// 입력 데이터
const idElement = document.getElementById('id');
const nameElement = document.getElementById('name');
const ageElement = document.getElementById('age');
const careerElement = document.getElementById('career');
const nickNameElement = document.getElementById('nickName');
const clickbutton = document.getElementById('btn');

// 조건 불일치 시 나타날 div
const userID = document.getElementById('userID');
const userNAME = document.getElementById('userNAME');
const userAGE = document.getElementById('userAGE');
const userCAREER = document.getElementById('userCAREER');
const userNICKNAME = document.getElementById('userNICKNAME');

// 테이블 생성
const tableWrap = document.querySelector('.main-wrap');
tableWrap.innerHTML = ` 
<table>
    <thead>
      <tr>
        <th>이름</th>
        <th>나이</th>
        <th>커리어</th>
        <th>별명</th>
        <th>관리</th>
      </tr>
    </thead>
    <tbody class="tbody"></tbody>
</table> `;

// getItem은 아이템 읽어오기, parse는 배열(객체)로 변환
let data_map = JSON.parse(localStorage.getItem('data_map')) || [];

// 테이블에 데이터 넣는 함수
const dataSetting = () => {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = data_map
    .map((item, index) => {
        return `
        <tr>
            <td><div class="inputName">${item.name}</div></td>
            <td><div class="inputAge">${item.age}</div></td>
            <td><div class="career">${item.career}</div></td>
            <td><div class="inputNickname">${item.nickName}</div></td>
            <td>
            <button class="modifybtn" index="${index}">수정</button>
            <button class="delectbtn" index="${index}">삭제</button>
            </td>
        </tr>
        `;
    })
    .join("");

    // 수정 및 삭제 버튼 이벤트 리스너 추가
    document.querySelectorAll('.modifybtn').forEach((btn) =>
        btn.addEventListener('click', modBtnClick)
    );
    document.querySelectorAll('.delectbtn').forEach((btn) =>
        btn.addEventListener('click', delBtnClick)
    );
};

// 버튼 활성화 함수
const btnAble = () => {
    const changeNICK = $('#nickName').val();
    const changeCAREER = $("#career").val();
    const changeAGE = $("#age").val();
    const changeID = $("#id").val();

    let isDuplicatedNICK = data_map.some((item) => item.nickName === changeNICK);
    let isDuplicatedID = data_map.some((item) => item.id === changeID);

    if(isDuplicatedID === false && isDuplicatedNICK === false && Number(changeAGE) <= 150 && changeCAREER.length >= 15 && changeNICK.length >= 2){
        clickbutton.disabled = false;
    } else{
        clickbutton.disabled = true;
    }
}

// 수정버튼 이름 바꾸는 함수
function modBtnChange(){
    const modifybtn = document.querySelector('.modifybtn');
    if(modifybtn.innerText = '수정'){
        console.log('바뀌어라얍')
        modifybtn.innerText = '수정완료'
    }
}

// 수정버튼 클릭 함수
function modBtnClick(event){
    modBtnChange();
    const btn2 = event.target;
    const li2 = btn2.closest('tr');

    // 로컬스토리지에 다시 저장
    // localStorage.setItem('data_map', JSON.stringify(data_map));
}

// 삭제버튼 클릭 함수
function delBtnClick(event){
    const btn = event.target;
    const li = btn.closest('tr');
    const nameCheck = li.querySelector('.inputName').innerHTML;
    li.remove();

    data_map = data_map.filter((result) => result.name !== nameCheck);
    console.log(data_map);

    // 로컬스토리지에 다시 저장
    localStorage.setItem('data_map', JSON.stringify(data_map)); 
}

document.addEventListener('DOMContentLoaded', () => {
    // 새로고침 해도 테이블 데이터 값 유지
    if (data_map.length > 0) {
        dataSetting();
    }

    clickbutton.disabled = true;

    // 별명 글자수, 중복 확인
    $("#nickName").on("propertychange change paste input", function() {
        const changeNICK = $('#nickName').val();
        let isDuplicatedNICK = data_map.some((item) => item.nickName === changeNICK);

        if(changeNICK.length < 2){
            userNICKNAME.textContent = '별명은 2자 이상이어야 합니다.';
        } else if(isDuplicatedNICK){
            userNICKNAME.textContent = '별명은 중복 불가입니다.';
        } else{
            userNICKNAME.textContent = changeNICK;
        }

        btnAble();
    });

    // 경력 확인
    $('#career').on('propertychange change paste input', function() {
        const changeCAREER = $("#career").val();

        if(changeCAREER.length < 15){
            userCAREER.textContent = '경력은 15자 이상이어야 합니다.';
        } else{
            userCAREER.textContent = changeCAREER;
        }

        btnAble();
    });

    // 나이 확인
    $('#age').on('propertychange change paste input', function() {
        const changeAGE = $("#age").val();

        if(Number(changeAGE) > 150){
            userAGE.textContent = '나이는 150 이하여야 합니다.';
        } else{
            userAGE.textContent = changeAGE;
        }

        btnAble();
    });

    // id 중복 확인
    $('#id').on('propertychange change paste input', function(){
        const changeID = $("#id").val();
        console.log('왜안떠?')
        let isDuplicatedID = data_map.some((item) => item.id === changeID);

        if(isDuplicatedID){
            userID.textContent = 'id는 중복 불가입니다.';
        } else{
            userID.textContent = changeID;
        }

        btnAble();
    });
    
    // 클릭시 저장 및 출력
    clickbutton.addEventListener('click', ()=>{
        let userInfo = {
            id: idElement.value,
            name: nameElement.value,
            age: ageElement.value,
            career: careerElement.value,
            nickName: nickNameElement.value
        }

        data_map.push(userInfo);
    
        // stringify는 문자열로 변환, setItem은 로컬스토리지에 아이템 추가
        localStorage.setItem('data_map', JSON.stringify(data_map)); 
        dataSetting();
    
        // 원상복귀
        idElement.value = '';
        nameElement.value = '';
        ageElement.value = '';
        careerElement.value = '';
        nickNameElement.value = '';
        
        userID.textContent = '';
        userNAME.textContent = '';
        userAGE.textContent = '';
        userCAREER.textContent = '';
        userNICKNAME.textContent = '';

        clickbutton.disabled = true;
    });

})