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
const table = document.createElement('table');
table.classList.add('table');

const headers = ['이름', '나이', '경력', '별명', '관리']; // 테이블 헤더에 id 제거
const thead = document.createElement('thead');
thead.classList.add('th');
const headerRow = document.createElement('tr');

// 헤더 이름 넣기
headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
});
    
thead.appendChild(headerRow);
table.appendChild(thead);
tableWrap.appendChild(table);

// getItem은 아이템 읽어오기, parse는 배열(객체)로 변환
let data_map = JSON.parse(localStorage.getItem('data_map')) || [];

// 테이블에 데이터 넣는 함수
const dataSetting = (userInfo) => {
    const tbody = document.createElement('tbody');

    const tr = document.createElement('tr');
    tr.classList.add('tr');

    const nameTd = document.createElement('td'); // 이름
    const ageTd = document.createElement('td'); // 나이
    const careerTd = document.createElement('td'); // 커리어
    const nickNameTd = document.createElement('td'); // 별명
    const modifybtn = document.createElement('button'); // 수정버튼
    const delectbtn = document.createElement('button'); // 삭제버튼

    modifybtn.classList.add('modifybtn');
    delectbtn.classList.add('delectbtn');

    nameTd.innerHTML = userInfo.name;
    ageTd.innerHTML = userInfo.age;
    careerTd.innerHTML = userInfo.career;
    nickNameTd.innerHTML = userInfo.nickName;

    tr.appendChild(nameTd);
    tr.appendChild(ageTd);
    tr.appendChild(careerTd);
    tr.appendChild(nickNameTd);
    tr.appendChild(modifybtn);
    tr.appendChild(delectbtn);

    tbody.appendChild(tr);
    table.appendChild(tbody);

    modifybtn.innerHTML = '수정';
    delectbtn.innerHTML = '삭제';
    
    modifybtn.addEventListener('click', modBtnClick);
    delectbtn.addEventListener('click', delBtnClick);

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

// 수정버튼 클릭함수 테스트
function modBtnClick(event){
    const btn2 = event.target;
    const li2 = btn.closest('tr');
}

// 삭제버튼 클릭함수 테스트
function delBtnClick(event){
    const btn = event.target;
    const li = btn.closest('tr');
    li.remove();

    data_map = data_map.filter((result) => result.name !== li.cells[0].innerHTML);

    // 로컬스토리지에 다시 저장
    localStorage.setItem('data_map', JSON.stringify(data_map)); 
}

document.addEventListener('DOMContentLoaded', () => {
    // 새로고침 해도 테이블 데이터 값 유지
    if(data_map){
        data_map.forEach(userInfo => {
            dataSetting(userInfo);
        });
    };

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
    
        dataSetting(userInfo);
    
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