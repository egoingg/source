//12시부터 13시까지는 은행 점검 시간이라서 결제를 할 수 없다

`12 <= 현재시 && 현재시 <= 13 ` => 결재x
`12 > 현재시 || 현재시 > 13` => 결제o

!(12 <= 현재시 && 현재시 <= 13) 

//위에식처럼 반대되는 개념을 만들기위해서
//드모르간 법칙을 이용해서 변경
1. 부등식 반대로
2. 논리곱 논리합 교체
//결괴는 아래와 깉다.


12 > 현재시 || 현재시 > 13
