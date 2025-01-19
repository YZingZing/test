// 테이블 생성
const tableWrap = document.querySelector('.main-wrap');
const table = document.createElement('table');
table.classList.add('table');

const headers = ['Name', 'Age', 'Careers', 'NickName']; // 테이블 헤더
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

const tbody = document.createElement('tbody'); // 본문 데이터
const data = [
{
    id: 1,
    name: '김철수',
    age: 14,
    careers: [
        { title: '놀기' },
        { title: '먹기' },
        { title: '자기' },
        { title: '숨쉬기' }
    ],
    nickName: [
        { name: '김안철수' },
        { name: '김김안철수' },
        { name: '박터짐' }
    ]
},
{
    id: 2,
    name: '영희',
    age: 35,
    careers: [
        { title: '놀기' },
        { title: '자전거타기' },
        { title: '오렌지먹기' },
        { title: '사과부시기' }
    ],
    nickName: [
        { name: '김영희' },
        { name: '야생사자' },
        { name: '오올이' }
    ]
},
{
    id: 3,
    name: '박광철',
    age: 20,
    careers: [
        { title: '일수나가기' },
        { title: '돈빌려주기' },
        { title: '공무집행방해하기' },
        { title: '무면허운전하기' }
    ],
    nickName: [
        { name: '대흥역호랑이와사자두마리' },
        { name: '마포불주먹' },
        { name: '전설' },
        { name: '경찰의적' }
    ]
}
];

const div1 = document.createElement('div');
const div2 = document.createElement('div');
const div3 = document.createElement('div');

// 데이터 넣기   
data.forEach(rowData => {
const tr = document.createElement('tr');
tr.classList.add('tr');

const nameTd = document.createElement('td'); // 이름
const ageTd = document.createElement('td'); // 나이
const careerTd = document.createElement('td'); // 커리어
const nickNameTd = document.createElement('td'); // 별명

nameTd.textContent = rowData.name;
ageTd.textContent = rowData.age;

rowData.careers.forEach(career => {
    const div = document.createElement('div');
    div.textContent = career.title;
    careerTd.appendChild(div);
});

rowData.nickName.forEach(nickName => {
    const div = document.createElement('div');
    div.textContent = nickName.name;
    nickNameTd.appendChild(div);
});

tr.appendChild(nameTd);
tr.appendChild(ageTd);
tr.appendChild(careerTd);
tr.appendChild(nickNameTd);

const careers = Array.from(careerTd.children).map(div => div.textContent).join(', ');
const nickNames = Array.from(nickNameTd.children).map(div => div.textContent).join(', ');

// alert 창 출력 함수
tr.addEventListener('click', function () {
    if (rowData.age >= 20) {
        alert(`이름 : ${nameTd.textContent}\n나이 : ${ageTd.textContent} (성인)\n커리어 : ${careers}\n별명 : ${nickNames}`);
    } else {
        alert(`이름 : ${nameTd.textContent}\n나이 : ${ageTd.textContent} (미성년자)\n커리어 : ${careers}\n별명 : ${nickNames}`);
    }
});

tbody.appendChild(tr);

// 나이 구별 div 추가
if (rowData.age < 20) {
    div1.innerHTML += `미성년자 : ${rowData.name}\n커리어 : ${careers}\n별명 : ${nickNames}\n<br />`;
} else {
    div2.innerHTML += `성인 : ${rowData.name}\n커리어 : ${careers}\n별명 : ${nickNames}\n<br />`;
}        
});

// 별명 div 추가
let longPerson = [];
let longNickName = '';

data.forEach(person =>{
    person.nickName.forEach(x =>{
        if(x.name.length > longNickName.length){
            longNickName = x.name;
            longPerson = person;
        }
    })
})
div3.innerHTML += `별명 중 가장 별명이 긴 사람은 ${longPerson.name}이며, 별명은 ${longNickName}입니다.`;

table.appendChild(tbody);
tableWrap.appendChild(table);

tableWrap.appendChild(div1);
tableWrap.appendChild(div2);
tableWrap.appendChild(div3);