# NestJS

- Nest는 nodejs 서버 애플리케이션을 구축하기 위한 프레임워크입니다.
- Nest는 서버 애플리케이션 개발시 필요한 많은 부분들을 기본적으로 제공하고 있습니다.
- Nest는 Express 기반으로 만들어졌습니다.
- Nest는Typescript를 사용합니다. javascript도 코딩이 가능합니다.
- Nest는 다음 요소를 포함합니다.
  - OOP - 객체지향 프로그래밍
  - FP - Functional 프로그래밍
  - FRP - Functional React 프로그래밍
- Nest는 외부 모듈을 자유롭게 이용할 수 있습니다.
- Nest는 unit 테스트와 e2e 테스트를 할 수 있는 툴을 제공합니다.

## Nest의 등장 배경

- 최근 Nodejs로 인해 javascript를 이용한 풀스택(클라이언트+서버) 개발이 활발해졌습니다.
- javascript라는 한가지 언어로 개발을 하기 때문에 생산성을 향상시키고 빠른 개발이 가능해졌습니다.
- 그러나 Node.js의 높은 자유도로 인해 Architecture 구성이 어렵고 효과적이지 못했습니다.
- 이를 해결하기 위해 Angular의 아키텍처 사상을 기반으로 Nest가 만들어졌습니다.

## Nest의 장점

- Nest는 Java의 Spring과 같이 규칙을 제공합니다.
- 이로 인해 개발자들이 아키텍처 구성으로 고민해야 할 많은 부분이 해소됩니다.
- 기본적으로 제공하는 라우팅, 보안등의 기능이 많아 편리합니다.
- 외부모듈을 통한 확장이 얼마든지 가능합니다.
- Java+Spring 사용자라면 아키텍처 구조가 비슷해서 쉽게 배울 수 있습니다.
- Angular 사용자도 기본적인 사용법이 동일하므로 쉽게 배울 수 있습니다.

## 프로젝트 구조

- dist : typescript 코드를 컴파일해서 빌드한 .js 파일 저장 폴더
- node_moduels : package.json에 정의된 모듈 설치 폴더
- src : typescript 코드가 저장된 소스 폴더
- test : test 소스 폴더
- package.json
  - 프로젝트의 설정 파일입니다.
  - 사용하는 모듈, 서버 실행 및 빌드등의 스크립트를 정의합니다.

## 기본 개념

- NestJS는 모듈의 집합입니다.
- NestJS는 하나 이상의 모듈이 반드시 있어야 합니다.
- 기능별로 모듈을 생성합니다.
- 각 모듈을 Root module에 imports 시켜주어야 합니다.
- export를 통해 외부에서 module을 사용할 수 있습니다.

## main.ts

- main.ts는 Application의 진입점(Entry Point)입니다.
- main.ts에서는 NestFactory를 사용하여 Application 인스턴스를 생성합니다.
- 생성시에는 AppModule을 사용하도록 지정 합니다.

## app.module.ts

- main.ts에서 지정한 root module입니다.
- NestJS는 모듈 단위로 개발을 진행합니다.
- module은 @Module 데코레이터(decorator)를 사용하여 선언합니다.
- imports는 다른 module을 가져올때 사용합니다.
- controllers는 이 모듈에서 사용하는 컨트롤러의 세트입니다.
- providers는 NestJS의 injector에 의해 인스턴스화 되는 class를 지정합니다.
- export는 이 모듈을 다른 모듈에서 사용하기 위함입니다.

## app.controller.ts

- Nest의 Controller는 Client의 요청(Request)을 받아 처리한 후 응답(Response)하는 역학을 한다.
- controller는 client의 요청에 대한 라우팅을 처리합니다.
- provider인 AppService에게 비즈니스 처리 요청을 보냅니다.
- 서비스에서 받은 결과를 client에 응답으로 보냅니다.
- Controller는 @Controller() 데코레이터를 사용합니다.

## app.service.ts

- controller의 요청을 받은 서비스는 비즈니스 로직을 처리한 후 controller에게 return합니다.

## Request 객체

- NestJS는 Express를 사용하고 있으므로 인해 Request 객체를 사용할 수 있습니다.
- Handler parameter에 @Req() 데코레이터를 사용한다.

## Route parameters

- 동적 라우팅을 위해서는 매개변수를 ":"와 함께 사용할 수 있다.

## 비동기 처리

```JS
@Get()
async findAll(): Promise<any[]> {
  return [];
}
```

## Providers

- provider는 services, repositories, factories, helpers 등이 있습니다.
- provider는 종속성에 의해 Inject(주입)할 수 있습니다.
- 즉, provider 객체의 생성 및 연결은 nest runtime 시스템에 위임될 수 있습니다.
- 컨트롤러는 HTTP 요청을 처리하고 복잡한 작업은 Provider에게 위임을 합니다.
- provider는 module에서 선언하는 일반 javascript class 입니다.

## Service

- nest g service cats
- @Injectable() 이 서비스가 Nest IoC 컨테이너에서 관리하는 클래스임을 선언하는 것입니다.

## Middleware

- nest g middleware logger
- 미들웨어는 라우터 핸들러 이전에 호출되는 함수입니다.
- 클라이언트의 요청을 라우터 핸들러가 받기 전에 가로채 다른 작업을 처리할 수 있습니다.
- 이를 응용하면 여러가지 공통적으로 처리해야 하는 부분들의 처리를 중복 없이 개발할 수 있습니다.
  - 모든 코드가 공통으로 실행해야 하는 인증, 로깅등을 처리할 수 있습니다.
  - 요청과 응답 객체를 변경할 수 있습니다.
  - 요청의 validation을 체크하여 오류 처리를 할 수 있습니다.

- Nest의 미들웨어 사용법
  - @Injectable 데코레이터를 사용합니다.
  - NestMiddleware 인터페이스를 implements 해서 사용합니다.
  - Module의 class 내부에 configure를 사용하여 선언합니다. 이때 NestModule 인터페이스를 implements 합니다.

## 유효성 검사

- Nestjs에서 기본적으로 제공하는 ValidationPipe를 이용하면 요청 Parameter의 유효성을 쉽게 체크하고 처리할 수 있습니다.
- 예를 들면 필수 입력 값의 경우 @IsNotEmpty를 사용하는 것만으로 유효성 체크가 끝이 납니다.
