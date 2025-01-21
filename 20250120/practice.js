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

const headers = ['이름', '나이', '경력', '별명']; // 테이블 헤더에 id 제거
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

// 로컬스토리지 배열로 변경하는 변수 선언
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

    nameTd.innerHTML = userInfo.name;
    ageTd.innerHTML = userInfo.age;
    careerTd.innerHTML = userInfo.career;
    nickNameTd.innerHTML = userInfo.nickName;

    tr.appendChild(nameTd);
    tr.appendChild(ageTd);
    tr.appendChild(careerTd);
    tr.appendChild(nickNameTd);

    tbody.appendChild(tr);
    table.appendChild(tbody);
};

document.addEventListener('DOMContentLoaded', () => {
    // 새로고침 해도 테이블 데이터 값 유지
    if(data_map){
        data_map.forEach(userInfo => {
            dataSetting(userInfo);
        });
    };

    clickbutton.addEventListener('click', ()=>{
        let userInfo = {
            id: idElement.value,
            name: nameElement.value,
            age: ageElement.value,
            career: careerElement.value,
            nickName: nickNameElement.value
        }

        // id 중복 방지
        let isDuplicatedID = false;
        for(let i=0; i<data_map.length; i++){
            if(data_map[i].id === userInfo.id){
                isDuplicatedID = true;
                break;
            }
        }
        if(isDuplicatedID === true){
            userID.textContent = 'id는 중복 불가입니다.';
        }

        // 별명 중복 방지
        let isDuplicatedNICK = false;
        for(let i=0; i<data_map.length; i++){
            if(data_map[i].nickName === userInfo.nickName){
                isDuplicatedNICK = true;
                break;
            }
        }
        if(isDuplicatedNICK === true){
            userNICKNAME.textContent = '별명은 중복 불가입니다.'
        }

        // 경력과 별명 길이 제한
        if(userInfo.career.length < 15){
            userCAREER.textContent = '경력은 15자 이상이어야 합니다.';
        }
        if(userInfo.nickName.length < 2){
            userNICKNAME.textContent = '별명은 2자 이상이어야 합니다.';
            return;
        }

        data_map.push(userInfo);

        // stringify는 문자열로 변환, setItem은 로컬스토리지에 아이템 추가
        localStorage.setItem('data_map', JSON.stringify(data_map)); 

        dataSetting(userInfo);
    });
})


